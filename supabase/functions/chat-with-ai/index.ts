
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
    const { message, userProfile, fileContents } = await req.json()
    
    if (!message && !fileContents) {
      return new Response(
        JSON.stringify({ error: "Message or file contents are required" }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Create a Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? ""
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Get API key from environment variables
    const DEEPSEEK_API_KEY = Deno.env.get("DEEPSEEK_API_KEY") ?? ""
    if (!DEEPSEEK_API_KEY) {
      throw new Error("Missing DeepSeek API key")
    }

    // Construct context based on user profile if available
    let systemPrompt = "You are a Toronto Music Grant Assistant. You provide expert advice on music grant applications based on data from successful Ontario grants. Be specific, concise, and actionable."
    
    if (userProfile) {
      systemPrompt += ` The user is a ${userProfile.careerStage} musician in the ${userProfile.genre} genre with ${userProfile.streamingNumbers} streaming numbers. They've previously received ${userProfile.previousGrants} grants. Their current project is a ${userProfile.projectType} with a budget of ${userProfile.projectBudget}.`
    }

    // Add file context if available
    if (fileContents) {
      systemPrompt += ` The user has shared document(s) containing additional information. Use this information to provide more tailored advice.`
    }

    // Fetch some recent successful applications from the database for additional context
    const { data: successfulApps, error: appsError } = await supabase
      .from('applications')
      .select('*')
      .eq('status', 'approved')
      .limit(3)
    
    if (successfulApps && successfulApps.length > 0) {
      systemPrompt += ` Based on successful applications, consider these factors: detailed project descriptions, clear timelines, and itemized budgets.`
    }

    // Construct user message with file contents if available
    let userMessage = message
    if (fileContents) {
      userMessage += `\n\nFile contents:\n${fileContents}`
    }

    console.log("Sending prompt to DeepSeek:", userMessage)
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
          { role: "user", content: userMessage }
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
      user_message: userMessage,
      assistant_response: aiResponse,
      user_profile: userProfile || {},
      has_file_attachments: fileContents ? true : false
    }).catch(err => {
      console.error("Error storing chat history:", err)
      // Continue execution even if storing fails
    })

    return new Response(
      JSON.stringify({ response: aiResponse }),
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
