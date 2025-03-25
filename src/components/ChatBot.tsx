
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "./chat/ChatMessage";
import { ChatInput } from "./chat/ChatInput";
import { GrantProfileForm } from "./forms/GrantProfileForm";
import { GrantSuggestions } from "./grants/GrantSuggestions";
import { ApplicationFormGuide } from "./forms/ApplicationFormGuide";
import { GrantSuccessStats } from "./analysis/GrantSuccessStats";
import { useChatbot } from "@/context/ChatbotContext";
import { useAuth } from "@/context/AuthContext";
import { X, Maximize, Minimize, MessageCircle, BarChart, Sparkles, Lock } from "lucide-react";
import { PaywallScreen } from "./PaywallScreen";
import { AuthModal } from "./auth/AuthModal";

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { messages, currentStep, addMessage, useEnhancedAI } = useChatbot();
  const { isAuthenticated, isPaidUser } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Send initial welcome message when component mounts
    if (messages.length === 0) {
      setTimeout(() => {
        addMessage("👋 Hi there! I'm your Canada Music Grant Assistant. I can help you find and apply for music grants that match your profile. I'm powered by data from successful grant applications in Canada.", "bot");
        
        // Add a small delay before showing the enhanced AI message
        setTimeout(() => {
          addMessage("✨ I'm now enhanced with AI Grant Tool technology to provide even more insightful grant assistance based on successful applications!", "bot");
          
          // Add a small delay before showing the first question
          setTimeout(() => {
            addMessage("Let me ask you a few questions to find the best grants for you.", "bot");
          }, 1000);
        }, 1000);
      }, 500);
    }
  }, []);

  useEffect(() => {
    // Scroll to the bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  const toggleStats = () => {
    setShowStats(prev => !prev);
    // If showing stats for the first time, add an explanation message
    if (!showStats && currentStep !== "welcome") {
      addMessage("Here's an analysis of successful grant applications from Ontario artists. You can use these insights to strengthen your application.", "bot");
    }
  };

  // Handle login button click
  const handleLoginClick = () => {
    setShowAuthModal(true);
  };

  // Render button only for non-premium users
  if (!isOpen) {
    return (
      <Button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 rounded-full w-14 h-14 shadow-lg"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <>
      <Card
        className={`fixed bottom-4 right-4 shadow-xl transition-all duration-300 ${
          isExpanded 
            ? "w-full h-[90vh] bottom-0 right-0 rounded-none" 
            : "w-[380px] max-w-[90vw] h-[600px] max-h-[90vh]"
        }`}
      >
        <CardHeader className="p-4 pb-2 border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center gap-2">
              Grant Assistant
              {useEnhancedAI && isPaidUser && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Enhanced
                </span>
              )}
              {!isPaidUser && (
                <span className="text-xs bg-amber-100 text-amber-600 px-2 py-1 rounded-full flex items-center gap-1">
                  <Lock className="h-3 w-3" />
                  Premium
                </span>
              )}
            </CardTitle>
            <div className="flex gap-2">
              {currentStep !== "welcome" && isPaidUser && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleStats}
                  className="h-8 w-8"
                  title="View Success Statistics"
                >
                  <BarChart className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleExpand}
                className="h-8 w-8"
              >
                {isExpanded ? (
                  <Minimize className="h-4 w-4" />
                ) : (
                  <Maximize className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleChat}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0 flex flex-col h-[calc(100%-64px)]">
          {!isAuthenticated ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <Lock className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Access Restricted</h3>
              <p className="text-gray-600 mb-6">
                Please sign in to access the Grant Assistant.
              </p>
              <Button onClick={handleLoginClick}>
                Sign In
              </Button>
            </div>
          ) : !isPaidUser ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6">
              <PaywallScreen />
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4">
                {showStats ? (
                  <GrantSuccessStats />
                ) : (
                  <div className="space-y-4">
                    {/* Chat messages */}
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <ChatMessage key={message.id} message={message} />
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                    
                    {/* Dynamic content based on current step */}
                    {currentStep === "welcome" && messages.length >= 3 && (
                      <GrantProfileForm />
                    )}
                    
                    {currentStep === "grant-suggestions" && (
                      <GrantSuggestions />
                    )}
                    
                    {currentStep === "application-form" && (
                      <ApplicationFormGuide />
                    )}
                  </div>
                )}
              </div>
              
              {/* Hide the chat input during profile form completion or when showing stats */}
              {currentStep !== "welcome" && !showStats && <ChatInput />}
            </>
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
