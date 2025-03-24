
import React, { createContext, useContext, useState, ReactNode } from "react";

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
};

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const ChatbotProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedGrants, setSuggestedGrants] = useState<GrantType[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [currentStep, setCurrentStep] = useState<string>("welcome");

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
