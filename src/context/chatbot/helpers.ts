
import { supabase } from "@/integrations/supabase/client";
import { GrantProfileType } from "./types";
import { getAIGrantToolResponse } from "@/services/aiGrantToolService";

// Enhanced AI response function
export const getEnhancedResponse = async (userMessage: string, userProfile: GrantProfileType | null): Promise<string | {text: string, sources: any[]}> => {
  try {
    // First try with Supabase edge function
    console.log("Attempting to use Supabase edge function for AI response");
    const { data, error } = await supabase.functions.invoke('grant-assistant', {
      body: { 
        message: userMessage,
        userProfile
      }
    });
    
    if (error) {
      console.error("Supabase function error:", error);
      throw new Error(error.message);
    }
    
    if (data?.response) {
      console.log("Successfully got response from Supabase function");
      // If the function returns both response text and document sources
      if (data.sources && data.sources.length > 0) {
        return {
          text: data.response,
          sources: data.sources
        };
      }
      // If just returning the text response
      return data.response;
    } else {
      throw new Error("No response returned from Supabase function");
    }
  } catch (error) {
    console.error("Error with Supabase chat function, trying fallback API:", error);
    
    // Try fallback to direct API
    try {
      console.log("Using fallback AI service");
      const response = await getAIGrantToolResponse(userMessage, 
        `You are a Toronto Music Grant Assistant. You provide expert advice on music grant applications. ${userProfile ? `The user is a ${userProfile.careerStage} musician in the ${userProfile.genre} genre.` : ''}`
      );
      return response;
    } catch (secondError) {
      console.error("Both AI services failed:", secondError);
      return getBasicAIResponse(userMessage);
    }
  }
};

// Basic AI response function
export const getBasicAIResponse = async (userMessage: string): Promise<string> => {
  console.log("Using basic AI response function");
  // Simple responses based on keywords in the user message
  const message = userMessage.toLowerCase();
  
  if (message.includes("hello") || message.includes("hi")) {
    return "Hello! How can I assist you with your grant application today?";
  } else if (message.includes("grant") && message.includes("application")) {
    return "For grant applications, focus on clearly articulating your project goals, timeline, and budget. Make sure to highlight the unique value of your project to the music community.";
  } else if (message.includes("budget")) {
    return "When preparing your budget, be detailed and realistic. Include all costs like studio time, equipment, marketing, and personnel. Grant reviewers value transparency and thoroughness in financial planning.";
  } else if (message.includes("deadline")) {
    return "Meeting deadlines is crucial. Most Toronto music grants have specific cycles throughout the year. Make sure to start your application at least 2-3 weeks before the deadline to allow time for revisions.";
  } else if (message.includes("thank")) {
    return "You're welcome! Feel free to ask more questions as you work on your application.";
  } else {
    return "That's a good question. When applying for music grants, focus on clarity, authenticity, and alignment with the funding organization's goals. Is there a specific aspect of the application process you'd like more guidance on?";
  }
};
