
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
    
    // Process file based on type
    if (document.file_type === 'application/pdf') {
      // For a production app, you would use a PDF parsing library
      // For this example, we'll just extract text with a basic approach
      const text = await fileData.text()
      content = text.replace(/\r\n/g, '\n') // Normalize line endings
    } else if (document.file_type.includes('text/') || 
               document.file_type === 'application/msword' ||
               document.file_type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      content = await fileData.text()
    } else {
      return new Response(
        JSON.stringify({ error: "Unsupported file type" }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Update the document with the extracted content
    const { error: updateError } = await supabase
      .from('grant_documents')
      .update({ content })
      .eq('id', documentId)

    if (updateError) {
      console.error("Error updating document content:", updateError)
      return new Response(
        JSON.stringify({ error: "Failed to update document content" }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    return new Response(
      JSON.stringify({ success: true, message: "Document processed successfully" }),
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
