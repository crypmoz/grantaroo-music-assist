
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
    const { message, userProfile } = await req.json()
    
    if (!message) {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Create a Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? ""
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Get API key from Supabase secrets
    const DEEPSEEK_API_KEY = Deno.env.get("DEEPSEEK_API_KEY") ?? ""
    if (!DEEPSEEK_API_KEY) {
      throw new Error("Missing DeepSeek API key")
    }

    // Construct context based on user profile if available
    let systemPrompt = "You are a Canada Music Grant Assistant. You provide expert advice on music grant applications."
    
    if (userProfile) {
      systemPrompt += ` The user is a ${userProfile.careerStage} musician in the ${userProfile.genre} genre with ${userProfile.streamingNumbers} streaming numbers. They've previously received ${userProfile.previousGrants} grants. Their current project is a ${userProfile.projectType} with a budget of ${userProfile.projectBudget}.`
    }

    // Find relevant documents based on the user's message
    const relevantDocuments = await findRelevantDocuments(supabase, message)
    
    // Document sources to include in the response
    const documentSources = []
    
    // Add context from relevant documents if available
    if (relevantDocuments && relevantDocuments.length > 0) {
      systemPrompt += " Based on our grant documents database, I can provide you with specific information:"
      
      relevantDocuments.forEach((doc, index) => {
        if (doc.content) {
          // Get a relevant snippet from the document
          const snippet = getRelevantSnippet(doc.content, message, 300)
          systemPrompt += `\n\nFrom document "${doc.file_name}":\n${snippet}`
          
          // Add to document sources for the response
          documentSources.push({
            id: doc.id,
            name: doc.file_name,
            snippet: snippet.substring(0, 150) + "..."
          })
        }
      })
    }

    console.log("Sending prompt to DeepSeek:", message)
    console.log("System prompt:", systemPrompt)

    // Make API call to DeepSeek
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        stream: false
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("DeepSeek API error:", errorText)
      throw new Error(`DeepSeek API error: ${response.status}`)
    }

    const data = await response.json()
    const aiResponse = data.choices[0].message.content
    
    // Store the interaction in the database for future training
    await supabase.from('chat_history').insert({
      user_message: message,
      assistant_response: aiResponse,
      user_profile: userProfile || {},
      document_sources: documentSources.length > 0 ? documentSources : null
    })

    return new Response(
      JSON.stringify({ 
        response: aiResponse,
        sources: documentSources.length > 0 ? documentSources : null
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error("Error:", error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})

// Find relevant documents for the user query
async function findRelevantDocuments(supabase: any, message: string) {
  try {
    // Get all documents (in a production app, you'd implement proper semantic search)
    const { data, error } = await supabase
      .from('grant_documents')
      .select('id, file_name, content, file_type, metadata')
      .limit(5)
    
    if (error) {
      console.error("Error fetching documents:", error)
      return []
    }
    
    if (!data || data.length === 0) {
      return []
    }
    
    // Simple relevance scoring based on keyword matching
    const messageLower = message.toLowerCase()
    const scoredDocs = data.map(doc => {
      let score = 0
      
      // Skip documents without content
      if (!doc.content) return { doc, score: 0 }
      
      const contentLower = doc.content.toLowerCase()
      
      // Extract keywords from the message
      const messageWords = messageLower
        .split(/\W+/)
        .filter(word => word.length > 3)
        .filter(word => !['what', 'when', 'where', 'which', 'with', 'would', 'could', 'should', 'have', 'this', 'that', 'there', 'their', 'about'].includes(word))
      
      // Score each keyword found in the document
      messageWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi')
        const matches = contentLower.match(regex)
        if (matches) {
          score += matches.length
        }
      })
      
      // Bonus for document category matching
      if (doc.metadata && doc.metadata.category) {
        const category = doc.metadata.category.toLowerCase()
        if (messageLower.includes(category)) {
          score += 5
        }
      }
      
      // Bonus for document tags matching
      if (doc.metadata && doc.metadata.tags) {
        doc.metadata.tags.forEach((tag: string) => {
          if (messageLower.includes(tag.toLowerCase())) {
            score += 3
          }
        })
      }
      
      return { doc, score }
    })
    
    // Sort by relevance score and take top 3
    return scoredDocs
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => item.doc)
  } catch (error) {
    console.error("Error finding relevant documents:", error)
    return []
  }
}

// Extract a relevant snippet from document content
function getRelevantSnippet(content: string, query: string, maxLength: number = 500): string {
  // Split into paragraphs
  const paragraphs = content.split(/\n\n+/)
  const queryLower = query.toLowerCase()
  
  // Find the most relevant paragraph
  let bestParagraph = ''
  let bestScore = 0
  
  for (const paragraph of paragraphs) {
    if (paragraph.length < 30) continue // Skip short paragraphs
    
    const paraLower = paragraph.toLowerCase()
    let score = 0
    
    // Extract keywords from query
    const queryWords = queryLower
      .split(/\W+/)
      .filter(word => word.length > 3)
      .filter(word => !['what', 'when', 'where', 'which', 'with', 'would', 'could', 'should', 'have', 'this', 'that', 'there', 'their', 'about'].includes(word))
    
    // Score each keyword found in paragraph
    queryWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi')
      const matches = paraLower.match(regex)
      if (matches) {
        score += matches.length * 2 // Weight exact matches higher
      } else if (paraLower.includes(word)) {
        score += 1 // Partial match
      }
    })
    
    if (score > bestScore) {
      bestScore = score
      bestParagraph = paragraph
    }
  }
  
  // If no good match found, return first substantial paragraph
  if (bestScore === 0) {
    bestParagraph = paragraphs.find(p => p.length > 50) || paragraphs[0] || content.substring(0, maxLength)
  }
  
  // Truncate if needed
  if (bestParagraph.length > maxLength) {
    // Try to find sentence boundaries for clean truncation
    const sentenceEnd = bestParagraph.substring(0, maxLength).lastIndexOf('.')
    if (sentenceEnd > maxLength * 0.7) { // Only use sentence boundary if it's not cutting off too much
      return bestParagraph.substring(0, sentenceEnd + 1)
    }
    return bestParagraph.substring(0, maxLength) + "..."
  }
  
  return bestParagraph
}
