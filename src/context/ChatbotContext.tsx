
import React, { createContext, useContext, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

export type MessageType = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
};

export type GrantType = {
  id: string;
  name: string;
  provider: string;
  deadline: string;
  maxAmount: string;
  eligibility: string[];
  url: string;
};

export type UserProfile = {
  careerStage: string;
  genre: string;
  streamingNumbers: string;
  previousGrants: string;
  projectType: string;
  projectBudget: string;
};

export type SuccessfulApplicationData = {
  appliedFactors: string[];
  isShowingExamples: boolean;
};

type ChatbotContextType = {
  messages: MessageType[];
  addMessage: (content: string, sender: "user" | "bot") => void;
  clearMessages: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  suggestedGrants: GrantType[];
  setSuggestedGrants: (grants: GrantType[]) => void;
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  currentStep: string;
  setCurrentStep: (step: string) => void;
  successfulAppData: SuccessfulApplicationData;
  setSuccessfulAppData: (data: SuccessfulApplicationData) => void;
  useEnhancedAI: boolean;
  setUseEnhancedAI: (use: boolean) => void;
  getEnhancedResponse: (userMessage: string) => Promise<string>;
};

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const ChatbotProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedGrants, setSuggestedGrants] = useState<GrantType[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [currentStep, setCurrentStep] = useState<string>("welcome");
  const [useEnhancedAI, setUseEnhancedAI] = useState<boolean>(true); // Default to using enhanced AI
  const [successfulAppData, setSuccessfulAppData] = useState<SuccessfulApplicationData>({
    appliedFactors: [],
    isShowingExamples: false
  });

  const addMessage = (content: string, sender: "user" | "bot") => {
    const newMessage = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const getEnhancedResponse = async (userMessage: string): Promise<string> => {
    if (!useEnhancedAI) {
      return "I'd be happy to help with your grant application! What specific aspect would you like assistance with?";
    }
    
    try {
      const { data, error } = await supabase.functions.invoke('grant-assistant', {
        body: { 
          message: userMessage,
          userProfile: userProfile 
        }
      });

      if (error) throw error;
      
      return data.response;
    } catch (error) {
      console.error("Error invoking edge function:", error);
      return "I'm having trouble connecting to my enhanced AI capabilities right now. Let me provide basic assistance instead.";
    }
  };

  return (
    <ChatbotContext.Provider
      value={{
        messages,
        addMessage,
        clearMessages,
        isLoading,
        setIsLoading,
        suggestedGrants,
        setSuggestedGrants,
        userProfile,
        setUserProfile,
        currentStep,
        setCurrentStep,
        successfulAppData,
        setSuccessfulAppData,
        useEnhancedAI,
        setUseEnhancedAI,
        getEnhancedResponse,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error("useChatbot must be used within a ChatbotProvider");
  }
  return context;
};
