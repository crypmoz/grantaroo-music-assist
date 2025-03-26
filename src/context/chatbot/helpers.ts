
import { supabase } from "@/integrations/supabase/client";
import { GrantProfileType } from "./types";

// Enhanced AI response function
export const getEnhancedResponse = async (userMessage: string, userProfile: GrantProfileType | null): Promise<string> => {
  try {
    // Call the Supabase edge function for AI response
    const { data, error } = await supabase.functions.invoke('chat-with-ai', {
      body: { 
        message: userMessage,
        userProfile
      }
    });
    
    if (error) throw new Error(error.message);
    return data.response || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Error in getEnhancedResponse:", error);
    return "I'm having trouble connecting to my enhanced capabilities. Let me provide basic assistance instead.";
  }
};

// Basic AI response function
export const getBasicAIResponse = async (userMessage: string): Promise<string> => {
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
