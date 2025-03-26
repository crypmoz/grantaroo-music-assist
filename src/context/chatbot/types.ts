
import { ReactNode } from "react";

export type MessageType = {
  id: string;
  content: string;
  role: "user" | "assistant";
  sender?: "user" | "bot"; // For backward compatibility
  timestamp: Date;
  attachments?: UploadedFile[];
  sources?: {
    id: string;
    name: string;
    snippet: string;
  }[];
};

export type UploadedFile = {
  id: string;
  name: string;
  size: number;
  type: string;
  data: File;
};

export type GrantType = {
  id: string;
  name: string;
  provider: string;
  deadline: string;
  maxAmount: string;
  description?: string;
  eligibility: string[];
  url: string;
};

export type GrantProfileType = {
  careerStage: string;
  genre: string;
  projectType: string;
  projectBudget: string;
  streamingNumbers?: string;
  previousGrants?: string;
};

export type SuccessfulAppDataType = {
  appliedFactors: string[];
  isShowingExamples: boolean;
};

export type ChatbotContextType = {
  messages: MessageType[];
  isTyping: boolean;
  currentStep: "welcome" | "profile" | "suggestions" | "application-form";
  grantProfile: GrantProfileType | null;
  userProfile: GrantProfileType | null;
  useEnhancedAI: boolean;
  suggestedGrants: GrantType[];
  successfulAppData: SuccessfulAppDataType;
  isLoading: boolean;
  uploadedFiles: UploadedFile[];
  toggleEnhancedAI: () => void;
  addMessage: (content: string, role: "user" | "assistant", attachments?: UploadedFile[]) => void;
  setGrantProfile: (profile: GrantProfileType) => void;
  setUserProfile: (profile: GrantProfileType | null) => void;
  setCurrentStep: (step: "welcome" | "profile" | "suggestions" | "application-form") => void;
  clearMessages: () => void;
  setSuggestedGrants: (grants: GrantType[]) => void;
  setSuccessfulAppData: (data: SuccessfulAppDataType) => void;
  setIsLoading: (isLoading: boolean) => void;
  getEnhancedResponse: (userMessage: string) => Promise<string>;
  addUploadedFile: (file: UploadedFile) => void;
  removeUploadedFile: (fileId: string) => void;
};
