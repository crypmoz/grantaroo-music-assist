
// Types for ChatbotContext
export type MessageType = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  sender?: "user" | "bot"; // For backward compatibility
  attachments?: UploadedFile[]; // Added for file attachments
};

export type UploadedFile = {
  id: string;
  name: string;
  size: number;
  type: string;
  data: File;
};

export type GrantProfileType = {
  careerStage: string;
  genre: string;
  streamingNumbers: string;
  previousGrants: string;
  projectType: string;
  projectBudget: string;
};

export type SuccessfulAppDataType = {
  appliedFactors: string[];
  isShowingExamples: boolean;
};

export type GrantType = {
  id: string;
  name: string;
  provider: string;
  maxAmount: string;
  deadline: string;
  url: string;
  eligibility: string[];
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
  addMessage: (content: string, role: "user" | "assistant", attachments?: UploadedFile[]) => Promise<void>;
  setGrantProfile: (profile: GrantProfileType) => void;
  setUserProfile: (profile: GrantProfileType) => void;
  setCurrentStep: (step: "welcome" | "profile" | "suggestions" | "application-form") => void;
  clearMessages: () => void;
  setSuggestedGrants: (grants: GrantType[]) => void;
  setSuccessfulAppData: (data: SuccessfulAppDataType) => void;
  setIsLoading: (loading: boolean) => void;
  getEnhancedResponse: (message: string) => Promise<string>;
  addUploadedFile: (file: UploadedFile) => void;
  removeUploadedFile: (fileId: string) => void;
};
