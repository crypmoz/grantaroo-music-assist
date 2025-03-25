
import React, { createContext, useContext, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

// Types
type MessageType = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

type GrantProfileType = {
  careerStage: string;
  genre: string;
  streamingNumbers: string;
  previousGrants: string;
  projectType: string;
  projectBudget: string;
};

type ChatbotContextType = {
  messages: MessageType[];
  isTyping: boolean;
  currentStep: "welcome" | "profile" | "suggestions";
  grantProfile: GrantProfileType | null;
  useEnhancedAI: boolean;
  toggleEnhancedAI: () => void;
  addMessage: (content: string, role: "user" | "assistant") => Promise<void>;
  setGrantProfile: (profile: GrantProfileType) => void;
  setCurrentStep: (step: "welcome" | "profile" | "suggestions") => void;
  clearMessages: () => void;
};

const defaultContext: ChatbotContextType = {
  messages: [],
  isTyping: false,
  currentStep: "welcome",
  grantProfile: null,
  useEnhancedAI: true,
  toggleEnhancedAI: () => {},
  addMessage: async () => {},
  setGrantProfile: () => {},
  setCurrentStep: () => {},
  clearMessages: () => {},
};

const ChatbotContext = createContext<ChatbotContextType>(defaultContext);

export const useChatbot = () => useContext(ChatbotContext);

export const ChatbotProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState<"welcome" | "profile" | "suggestions">("welcome");
  const [grantProfile, setGrantProfile] = useState<GrantProfileType | null>(null);
  const [useEnhancedAI, setUseEnhancedAI] = useState(true);
  const { isAuthenticated, isPaidUser } = useAuth();

  const toggleEnhancedAI = () => {
    setUseEnhancedAI((prev) => !prev);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const addMessage = async (content: string, role: "user" | "assistant") => {
    const newMessage: MessageType = {
      id: uuidv4(),
      content,
      role,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);

    // If it's a user message, generate a response
    if (role === "user" && (isAuthenticated && isPaidUser)) {
      setIsTyping(true);
      
      try {
        let response;
        
        if (useEnhancedAI) {
          // Use the Supabase edge function for enhanced AI
          const { data, error } = await supabase.functions.invoke('chat-with-ai', {
            body: { 
              message: content,
              userProfile: grantProfile
            }
          });
          
          if (error) throw new Error(error.message);
          response = data.response;
        } else {
          // Use the basic AI service
          response = await getBasicAIResponse(content);
        }
        
        // Add the assistant's response
        const assistantMessage: MessageType = {
          id: uuidv4(),
          content: response,
          role: "assistant",
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, assistantMessage]);
      } catch (error) {
        console.error("Error getting AI response:", error);
        toast.error("Failed to get AI response. Please try again.");
        
        // Add a fallback message
        const errorMessage: MessageType = {
          id: uuidv4(),
          content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
          role: "assistant",
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  // Basic AI response function
  const getBasicAIResponse = async (userMessage: string): Promise<string> => {
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

  return (
    <ChatbotContext.Provider
      value={{
        messages,
        isTyping,
        currentStep,
        grantProfile,
        useEnhancedAI,
        toggleEnhancedAI,
        addMessage,
        setGrantProfile,
        setCurrentStep,
        clearMessages,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
};
