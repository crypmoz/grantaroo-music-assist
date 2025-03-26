
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? ""
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { documentId } = await req.json()
    
    if (!documentId) {
      return new Response(
        JSON.stringify({ error: "Document ID is required" }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Get the document record
    const { data: document, error: documentError } = await supabase
      .from('grant_documents')
      .select('*')
      .eq('id', documentId)
      .single()

    if (documentError || !document) {
      console.error("Error fetching document:", documentError)
      return new Response(
        JSON.stringify({ error: "Document not found" }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
      )
    }

    // Get the file content from storage
    const { data: fileData, error: fileError } = await supabase
      .storage
      .from('grant_resources')
      .download(document.file_path)

    if (fileError || !fileData) {
      console.error("Error downloading file:", fileError)
      return new Response(
        JSON.stringify({ error: "File not found in storage" }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
      )
    }

    let content = ""
    let metadata = document.metadata || {}
    
    console.log("Processing document:", document.file_name, "of type:", document.file_type)
    
    // Process file based on type
    if (document.file_type === 'application/pdf') {
      // For a production app, you would use a PDF parsing library
      // For this example, we'll just extract text with a basic approach
      const text = await fileData.text()
      content = text.replace(/\r\n/g, '\n') // Normalize line endings
      
      // Extract basic metadata
      metadata = {
        ...metadata,
        size: fileData.size,
        pageCount: estimatePdfPageCount(text),
        processingDate: new Date().toISOString(),
        category: detectDocumentCategory(text),
        tags: extractKeywords(text)
      }
    } else if (document.file_type.includes('text/') || 
               document.file_type === 'application/msword' ||
               document.file_type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      content = await fileData.text()
      
      // Extract basic metadata for text/word documents
      metadata = {
        ...metadata,
        size: fileData.size,
        wordCount: countWords(content),
        processingDate: new Date().toISOString(),
        category: detectDocumentCategory(content),
        tags: extractKeywords(content)
      }
    } else {
      return new Response(
        JSON.stringify({ error: "Unsupported file type" }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Create chunks for more efficient retrieval
    const chunks = createContentChunks(content)
    metadata.chunkCount = chunks.length

    // Update the document with the extracted content and metadata
    const { error: updateError } = await supabase
      .from('grant_documents')
      .update({ 
        content,
        metadata
      })
      .eq('id', documentId)

    if (updateError) {
      console.error("Error updating document content:", updateError)
      return new Response(
        JSON.stringify({ error: "Failed to update document content" }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Document processed successfully",
        metadata
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error("Error processing document:", error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})

// Helper functions for document processing

function estimatePdfPageCount(text: string): number {
  // A very rough estimate based on average words per page
  const wordCount = countWords(text)
  return Math.max(1, Math.ceil(wordCount / 500))
}

function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length
}

function detectDocumentCategory(text: string): string {
  const textLower = text.toLowerCase()
  
  // Simple keyword-based categorization
  if (textLower.includes('factor') || textLower.includes('juried') || textLower.includes('recording grant')) {
    return 'Recording Grants'
  } else if (textLower.includes('tour') || textLower.includes('showcase') || textLower.includes('performance')) {
    return 'Touring & Showcase Grants'
  } else if (textLower.includes('marketing') || textLower.includes('promotion') || textLower.includes('publicity')) {
    return 'Marketing & Promotion'
  } else if (textLower.includes('application') || textLower.includes('guidelines') || textLower.includes('eligibility')) {
    return 'Application Guidelines'
  } else if (textLower.includes('budget') || textLower.includes('financial') || textLower.includes('expense')) {
    return 'Budget & Financial'
  } else {
    return 'General Information'
  }
}

function extractKeywords(text: string): string[] {
  const keywordPatterns = [
    'grant', 'funding', 'application', 'eligibility', 'deadline',
    'budget', 'artist', 'music', 'recording', 'production',
    'tour', 'showcase', 'marketing', 'promotion', 'factor',
    'ontario', 'toronto', 'canada', 'canadian', 'jury',
    'review', 'criteria', 'assessment', 'timeline', 'schedule',
    'requirement', 'document', 'portfolio', 'sample', 'demo',
    'emerging', 'established', 'indigenous', 'diversity', 'inclusion'
  ]
  
  const textLower = text.toLowerCase()
  const foundKeywords = keywordPatterns.filter(keyword => textLower.includes(keyword))
  
  // Deduplicate and return up to 5 keywords
  return [...new Set(foundKeywords)].slice(0, 5)
}

function createContentChunks(content: string, maxChunkSize = 500): string[] {
  // Split content into paragraphs
  const paragraphs = content.split(/\n\n+/)
  const chunks: string[] = []
  let currentChunk = ''
  
  for (const paragraph of paragraphs) {
    // If adding this paragraph would exceed max chunk size, save current chunk and start a new one
    if (currentChunk.length + paragraph.length > maxChunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk.trim())
      currentChunk = paragraph
    } else {
      currentChunk += (currentChunk ? '\n\n' : '') + paragraph
    }
  }
  
  // Add the last chunk if not empty
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim())
  }
  
  return chunks
}
