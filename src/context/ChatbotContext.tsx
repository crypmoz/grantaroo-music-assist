
import React, { createContext, useContext, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";
import { 
  ChatbotContextType, 
  MessageType, 
  UploadedFile, 
  GrantProfileType, 
  GrantType, 
  SuccessfulAppDataType 
} from "./chatbot/types";
import { defaultContext } from "./chatbot/defaultState";
import { getEnhancedResponse, getBasicAIResponse } from "./chatbot/helpers";

const ChatbotContext = createContext<ChatbotContextType>(defaultContext);

export const useChatbot = () => useContext(ChatbotContext);

export * from "./chatbot/types";

export const ChatbotProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<"welcome" | "profile" | "suggestions" | "application-form">("welcome");
  const [grantProfile, setGrantProfile] = useState<GrantProfileType | null>(null);
  const [userProfile, setUserProfile] = useState<GrantProfileType | null>(null);
  const [useEnhancedAI, setUseEnhancedAI] = useState(true);
  const [suggestedGrants, setSuggestedGrants] = useState<GrantType[]>([]);
  const [successfulAppData, setSuccessfulAppData] = useState<SuccessfulAppDataType>({
    appliedFactors: [],
    isShowingExamples: false
  });
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  
  const { isAuthenticated, isPaidUser } = useAuth();

  const toggleEnhancedAI = () => {
    setUseEnhancedAI((prev) => !prev);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const addUploadedFile = (file: UploadedFile) => {
    setUploadedFiles(prev => [...prev, file]);
  };
  
  const removeUploadedFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const getEnhancedResponseWithProfile = async (userMessage: string): Promise<string> => {
    return getEnhancedResponse(userMessage, userProfile || grantProfile);
  };

  const addMessage = async (content: string, role: "user" | "assistant", attachments?: UploadedFile[]) => {
    const newMessage: MessageType = {
      id: uuidv4(),
      content,
      role,
      timestamp: new Date(),
      attachments: attachments || [],
    };

    setMessages((prev) => [...prev, newMessage]);

    // Clear uploaded files after sending them
    if (attachments && attachments.length > 0) {
      setUploadedFiles([]);
    }

    // If it's a user message, generate a response
    if (role === "user" && (isAuthenticated && isPaidUser)) {
      setIsTyping(true);
      
      try {
        let response;
        
        if (useEnhancedAI) {
          // Use the Supabase edge function for enhanced AI
          response = await getEnhancedResponseWithProfile(content);
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

  return (
    <ChatbotContext.Provider
      value={{
        messages,
        isTyping,
        currentStep,
        grantProfile,
        userProfile,
        useEnhancedAI,
        suggestedGrants,
        successfulAppData,
        isLoading,
        uploadedFiles,
        toggleEnhancedAI,
        addMessage,
        setGrantProfile,
        setUserProfile,
        setCurrentStep,
        clearMessages,
        setSuggestedGrants,
        setSuccessfulAppData,
        setIsLoading,
        getEnhancedResponse: getEnhancedResponseWithProfile,
        addUploadedFile,
        removeUploadedFile,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
};
