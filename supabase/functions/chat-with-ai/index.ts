
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
    console.log("Received request to chat-with-ai function");
    
    const requestData = await req.json().catch(error => {
      console.error("Error parsing request JSON:", error);
      throw new Error("Invalid JSON in request body");
    });
    
    const { message, userProfile, fileContents } = requestData;
    
    if (!message && !fileContents) {
      return new Response(
        JSON.stringify({ error: "Message or file contents are required" }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Create a Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? ""
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    
    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase credentials");
      throw new Error("Server configuration error: Missing Supabase credentials");
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Get API key from environment variables
    const DEEPSEEK_API_KEY = Deno.env.get("DEEPSEEK_API_KEY") ?? ""
    if (!DEEPSEEK_API_KEY) {
      console.error("Missing DeepSeek API key");
      throw new Error("Server configuration error: Missing DeepSeek API key");
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
    try {
      const { data: successfulApps, error: appsError } = await supabase
        .from('applications')
        .select('*')
        .eq('status', 'approved')
        .limit(3)
      
      if (appsError) {
        console.error("Error fetching successful applications:", appsError);
      } else if (successfulApps && successfulApps.length > 0) {
        systemPrompt += ` Based on successful applications, consider these factors: detailed project descriptions, clear timelines, and itemized budgets.`
      }
    } catch (dbError) {
      console.error("Database query error:", dbError);
      // Continue execution even if DB query fails
    }

    // Construct user message with file contents if available
    let userMessage = message
    if (fileContents) {
      userMessage += `\n\nFile contents:\n${fileContents}`
    }

    console.log("System prompt:", systemPrompt);
    console.log("Sending request to DeepSeek API");

    // Make API call to DeepSeek
    try {
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
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("DeepSeek API error:", errorText);
        throw new Error(`DeepSeek API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
        console.error("Invalid response format from DeepSeek API:", data);
        throw new Error("Invalid response format from AI provider");
      }
      
      const aiResponse = data.choices[0].message.content;
      console.log("Successfully received response from DeepSeek API");
      
      // Store the interaction in the database for future training
      try {
        await supabase.from('chat_history').insert({
          user_message: userMessage,
          assistant_response: aiResponse,
          user_profile: userProfile || {},
          has_file_attachments: fileContents ? true : false
        });
        console.log("Successfully stored chat history in database");
      } catch (dbError) {
        console.error("Error storing chat history:", dbError);
        // Continue execution even if storing fails
      }

      return new Response(
        JSON.stringify({ response: aiResponse }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (apiError) {
      console.error("Error calling DeepSeek API:", apiError);
      throw apiError;
    }
  } catch (error) {
    console.error("General error in chat-with-ai function:", error.message);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        response: "I'm having trouble connecting to my AI capabilities right now. Please try again in a moment, or ask me a different question." 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
