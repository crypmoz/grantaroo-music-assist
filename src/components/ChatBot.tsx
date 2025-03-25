
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Maximize, Minimize, MessageCircle, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "./auth/AuthModal";
import { Link } from "react-router-dom";
import { PaywallScreen } from "./PaywallScreen";

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated, isPaidUser } = useAuth();

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  // Handle login button click
  const handleLoginClick = () => {
    setShowAuthModal(true);
  };

  // Show minimized chat button
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
            : "w-[380px] max-w-[90vw] h-[500px] max-h-[90vh]"
        }`}
      >
        <CardHeader className="p-4 pb-2 border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center gap-2">
              Grant Assistant
            </CardTitle>
            <div className="flex gap-2">
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
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <Lock className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Enhanced Experience Available</h3>
            <p className="text-gray-600 mb-6">
              For a better grant writing experience, visit our full-featured Grant Assistant page.
            </p>
            {!isAuthenticated ? (
              <Button onClick={handleLoginClick}>
                Sign In to Access
              </Button>
            ) : !isPaidUser ? (
              <div className="w-full">
                <PaywallScreen />
              </div>
            ) : (
              <Button onClick={() => window.location.href = '/assistant'}>
                Open Full Assistant
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
};
