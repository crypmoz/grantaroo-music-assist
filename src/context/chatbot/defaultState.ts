
import { ChatbotContextType } from "./types";

export const defaultContext: ChatbotContextType = {
  messages: [],
  isTyping: false,
  currentStep: "welcome",
  grantProfile: null,
  userProfile: null,
  useEnhancedAI: true,
  suggestedGrants: [],
  successfulAppData: { appliedFactors: [], isShowingExamples: false },
  isLoading: false,
  uploadedFiles: [],
  toggleEnhancedAI: () => {},
  addMessage: async () => {},
  setGrantProfile: () => {},
  setUserProfile: () => {},
  setCurrentStep: () => {},
  clearMessages: () => {},
  setSuggestedGrants: () => {},
  setSuccessfulAppData: () => {},
  setIsLoading: () => {},
  getEnhancedResponse: async () => "",
  addUploadedFile: () => {},
  removeUploadedFile: () => {},
};
