
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "./auth/AuthModal";
import { v4 as uuidv4 } from "uuid";
import { getBasicAIResponse } from "@/context/chatbot/helpers";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

// Import refactored components
import { ChatToggleButton } from "./chatbot/ChatToggleButton";
import { ChatHeader } from "./chatbot/ChatHeader";
import { FreeChatMessageComponent, FreeChatMessage } from "./chatbot/FreeChatMessage";
import { ChatTypingIndicator } from "./chatbot/ChatTypingIndicator";
import { WelcomeScreen } from "./chatbot/WelcomeScreen";
import { ProfileCollectionStep, ProfileState } from "./chatbot/ProfileCollectionStep";
import { ChatInput } from "./chatbot/ChatInput";
import { ChatFooter } from "./chatbot/ChatFooter";
import { PaywallScreen } from "./chatbot/PaywallScreen";

// Define the ChatStep type to ensure proper type checking
type ChatStep = "chat" | "profile" | "paywall";

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [messages, setMessages] = useState<FreeChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState<ChatStep>("chat");
  const [profile, setProfile] = useState<ProfileState>({
    careerStage: "",
    genre: "",
    projectType: "",
    projectBudget: "",
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const { isAuthenticated, isPaidUser } = useAuth();

  // Quick prompts for chat suggestions
  const quickPrompts = [
    "How can I improve my application?",
    "What makes a good budget section?",
    "Tips for standing out from other applicants?",
    "Common mistakes to avoid in applications?"
  ];

  // Scroll to bottom of chat when messages update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Add initial welcome message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: FreeChatMessage = {
        id: uuidv4(),
        content: "Hello! I'm your grant assistant. I can help you find music grants in Canada that match your profile and needs. How can I assist you today?",
        role: "assistant",
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  const handleLoginClick = () => {
    setShowAuthModal(true);
  };

  const resetChat = () => {
    setMessages([]);
    setCurrentStep("chat");
    setProfile({
      careerStage: "",
      genre: "",
      projectType: "",
      projectBudget: "",
    });
  };

  const addMessage = async (content: string, role: "user" | "assistant") => {
    const newMessage: FreeChatMessage = {
      id: uuidv4(),
      content,
      role,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);

    // If it's a user message, generate a response
    if (role === "user") {
      setIsTyping(true);
      
      try {
        // Check for profile collection triggers
        if (content.toLowerCase().includes("grant") && 
            (content.toLowerCase().includes("find") || 
             content.toLowerCase().includes("recommend") || 
             content.toLowerCase().includes("suggest") || 
             content.toLowerCase().includes("match"))) {
          
          setTimeout(() => {
            setIsTyping(false);
            
            const responseMessage: FreeChatMessage = {
              id: uuidv4(),
              content: "I'd be happy to suggest grants that match your profile! To provide the most relevant recommendations, I'll need a few details about you and your project.",
              role: "assistant",
              timestamp: new Date(),
            };
            
            setMessages(prev => [...prev, responseMessage]);
            setCurrentStep("profile");
          }, 1500);
          
          return;
        }
        
        // For regular chat messages
        setTimeout(async () => {
          try {
            const response = await getBasicAIResponse(content);
            
            const responseMessage: FreeChatMessage = {
              id: uuidv4(),
              content: response,
              role: "assistant",
              timestamp: new Date(),
            };
            
            setMessages(prev => [...prev, responseMessage]);
            setIsTyping(false);
          } catch (error) {
            console.error("Error getting AI response:", error);
            
            const errorMessage: FreeChatMessage = {
              id: uuidv4(),
              content: "I apologize, but I'm having trouble generating a response right now. Please try again in a moment.",
              role: "assistant",
              timestamp: new Date(),
            };
            
            setMessages(prev => [...prev, errorMessage]);
            setIsTyping(false);
          }
        }, 1500);
      } catch (error) {
        console.error("Error in message handling:", error);
        setIsTyping(false);
        
        const errorMessage: FreeChatMessage = {
          id: uuidv4(),
          content: "Something went wrong. Please try again.",
          role: "assistant",
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, errorMessage]);
      }
    }
  };

  const handleFindGrantsClick = () => {
    if (messages.length > 1) {
      setCurrentStep("profile");
      addMessage("I'd like to find grants that match my profile", "user");
    }
  };

  const handleProfileComplete = (completedProfile: ProfileState) => {
    setProfile(completedProfile);
    
    // Add the profile questions and answers to the chat
    addMessage(`Based on your profile as a ${completedProfile.careerStage} in the ${completedProfile.genre} genre with a ${completedProfile.projectType} project and a budget of $${completedProfile.projectBudget}, I've found several grants that match your needs!`, "assistant");
    
    setTimeout(() => {
      setCurrentStep("paywall");
    }, 1000);
  };

  // Format message content with basic markdown support
  const formatMessage = (content: string) => {
    if (!content) return "";
    
    // Replace markdown bold with HTML
    let formatted = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert line breaks to paragraph breaks
    formatted = formatted.split('\n\n').map(para => `<p>${para}</p>`).join('');
    
    // Replace single line breaks
    formatted = formatted.replace(/\n/g, '<br>');
    
    return formatted;
  };

  // Show minimized chat button
  if (!isOpen) {
    return <ChatToggleButton onClick={toggleChat} />;
  }

  return (
    <>
      <Card
        className={cn(
          "fixed shadow-xl transition-all duration-300 z-50",
          isExpanded 
            ? "w-full h-[90vh] bottom-0 right-0 rounded-none" 
            : isMobile
              ? "w-full h-[80vh] bottom-0 right-0 left-0 rounded-t-lg rounded-b-none"
              : "w-[380px] max-w-[90vw] h-[500px] max-h-[90vh] bottom-4 right-4"
        )}
      >
        <ChatHeader 
          isExpanded={isExpanded} 
          onToggleExpand={toggleExpand} 
          onClose={toggleChat} 
        />
        
        <CardContent className="p-0 flex flex-col h-[calc(100%-64px)]">
          {(currentStep === "chat" || currentStep === "profile") && (
            <>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <FreeChatMessageComponent
                      key={message.id}
                      message={message}
                      formatMessage={formatMessage}
                    />
                  ))}
                  
                  {isTyping && <ChatTypingIndicator />}
                  
                  <div ref={scrollRef} />
                  
                  {messages.length === 0 && (
                    <WelcomeScreen 
                      quickPrompts={quickPrompts} 
                      onPromptSelect={(prompt) => addMessage(prompt, "user")} 
                    />
                  )}
                </div>
                
                {currentStep === "profile" && (
                  <ProfileCollectionStep
                    onComplete={handleProfileComplete}
                    onCancel={() => setCurrentStep("chat")}
                  />
                )}
              </div>
              
              {currentStep === "chat" && (
                <div className="mt-auto p-4 border-t bg-white/50 backdrop-blur-sm">
                  <ChatInput 
                    onSendMessage={(content) => addMessage(content, "user")}
                    isTyping={isTyping}
                  />
                  
                  <ChatFooter 
                    onFindGrantsClick={handleFindGrantsClick}
                    onResetChat={resetChat}
                    isTyping={isTyping}
                    hasMessages={messages.length > 1}
                  />
                </div>
              )}
            </>
          )}
          
          {currentStep === "paywall" && (
            <PaywallScreen 
              isAuthenticated={isAuthenticated}
              isPaidUser={isPaidUser}
              profile={profile}
              onLoginClick={handleLoginClick}
              onResetChat={resetChat}
            />
          )}
        </CardContent>
      </Card>
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
};
