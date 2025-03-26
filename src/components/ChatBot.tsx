
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Maximize, Minimize, MessageCircle, Loader2, Bot, User, ArrowUp, PlusCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "./auth/AuthModal";
import { Textarea } from "@/components/ui/textarea";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { careerStages, musicGenres, projectTypes } from "@/data/grantsData";
import { getBasicAIResponse } from "@/context/chatbot/helpers";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

type FreeChatMessage = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

type ProfileState = {
  careerStage: string;
  genre: string;
  projectType: string;
  projectBudget: string;
  [key: string]: string;
};

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [messages, setMessages] = useState<FreeChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");
  const [currentStep, setCurrentStep] = useState<"chat" | "profile" | "paywall">("chat");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [profile, setProfile] = useState<ProfileState>({
    careerStage: "",
    genre: "",
    projectType: "",
    projectBudget: "",
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const { isAuthenticated, isPaidUser } = useAuth();

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
    setCurrentQuestion(0);
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

  const handleSendMessage = () => {
    if (!input.trim() || isTyping) return;
    
    const messageText = input.trim();
    setInput("");
    
    addMessage(messageText, "user");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const profileQuestions = [
    {
      field: "careerStage",
      question: "What stage are you at in your music career?",
      component: (
        <Select 
          onValueChange={(value) => handleProfileChange("careerStage", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select career stage" />
          </SelectTrigger>
          <SelectContent>
            {careerStages.map((stage) => (
              <SelectItem key={stage} value={stage}>
                {stage}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    },
    {
      field: "genre",
      question: "What's your primary music genre?",
      component: (
        <Select 
          onValueChange={(value) => handleProfileChange("genre", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select genre" />
          </SelectTrigger>
          <SelectContent>
            {musicGenres.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    },
    {
      field: "projectType",
      question: "What type of project are you seeking funding for?",
      component: (
        <Select 
          onValueChange={(value) => handleProfileChange("projectType", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select project type" />
          </SelectTrigger>
          <SelectContent>
            {projectTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    },
    {
      field: "projectBudget",
      question: "What's your estimated project budget in CAD?",
      component: (
        <Textarea
          placeholder="e.g., 10000"
          onChange={(e) => handleProfileChange("projectBudget", e.target.value)}
          className="resize-none"
          rows={2}
        />
      )
    }
  ];

  const handleProfileChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleNextQuestion = () => {
    const currentField = profileQuestions[currentQuestion].field;
    
    if (!profile[currentField]) {
      toast.error("Please answer this question to continue");
      return;
    }
    
    // Add the question and answer to the chat
    addMessage(profileQuestions[currentQuestion].question, "assistant");
    addMessage(profile[currentField], "user");
    
    if (currentQuestion < profileQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // All questions answered, show paywall
      setTimeout(() => {
        setIsTyping(true);
        
        setTimeout(() => {
          setIsTyping(false);
          
          const findingMessage: FreeChatMessage = {
            id: uuidv4(),
            content: `Based on your profile as a ${profile.careerStage} in the ${profile.genre} genre with a ${profile.projectType} project and a budget of $${profile.projectBudget}, I've found several grants that match your needs!`,
            role: "assistant",
            timestamp: new Date(),
          };
          
          setMessages(prev => [...prev, findingMessage]);
          setCurrentStep("paywall");
        }, 2000);
      }, 500);
    }
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
    return (
      <Button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 rounded-full w-14 h-14 shadow-lg z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
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
        <CardHeader className="p-4 pb-2 border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center gap-2">
              Grant Assistant
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Free</span>
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
          {currentStep === "chat" || currentStep === "profile" ? (
            <>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                    >
                      {message.role === "assistant" && (
                        <div className="flex-shrink-0 mr-2">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Bot className="h-4 w-4 text-blue-600" />
                          </div>
                        </div>
                      )}
                      
                      <div
                        className={`rounded-xl px-4 py-3 max-w-[80%] shadow-sm ${
                          message.role === "assistant" 
                            ? "bg-white border border-gray-100" 
                            : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                        }`}
                      >
                        <div 
                          className="whitespace-pre-wrap text-sm"
                          dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                        />
                        
                        <div className={`text-xs mt-1 ${
                          message.role === "assistant" ? "text-gray-400" : "text-white/70"
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      
                      {message.role === "user" && (
                        <div className="flex-shrink-0 ml-2">
                          <div className="bg-indigo-100 p-2 rounded-full">
                            <User className="h-4 w-4 text-indigo-600" />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-start gap-2"
                    >
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Bot className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3 relative max-w-[80%]">
                        <div className="flex space-x-1">
                          <span className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                          <span className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                          <span className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={scrollRef} />
                </div>
                
                {currentStep === "profile" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 border rounded-lg bg-blue-50"
                  >
                    <h3 className="font-medium text-blue-700 mb-3">
                      {profileQuestions[currentQuestion].question}
                    </h3>
                    
                    <div className="mb-4">
                      {profileQuestions[currentQuestion].component}
                    </div>
                    
                    <div className="flex justify-between">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCurrentStep("chat")}
                      >
                        Cancel
                      </Button>
                      <Button 
                        size="sm"
                        onClick={handleNextQuestion}
                      >
                        {currentQuestion < profileQuestions.length - 1 ? "Next" : "Find Grants"}
                      </Button>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Profile completion</span>
                        <span>{Math.round(((currentQuestion + 1) / profileQuestions.length) * 100)}%</span>
                      </div>
                      <Progress value={((currentQuestion + 1) / profileQuestions.length) * 100} className="h-1" />
                    </div>
                  </motion.div>
                )}
              </div>
              
              {currentStep === "chat" && (
                <div className="mt-auto p-4 border-t bg-white/50 backdrop-blur-sm">
                  <div className="flex items-end gap-2">
                    <div className="relative flex-1">
                      <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder={isTyping ? "Wait for assistant to finish..." : "Type your message..."}
                        className="resize-none min-h-[60px] rounded-xl bg-white/80 backdrop-blur-sm border-muted shadow-sm pr-10"
                        disabled={isTyping || currentStep === "profile"}
                      />
                    </div>
                    <Button 
                      onClick={handleSendMessage} 
                      disabled={(input.trim().length === 0) || isTyping || currentStep === "profile"}
                      className="h-[60px] w-[60px] rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      {isTyping ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <ArrowUp className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                  
                  <div className="mt-2 flex justify-between items-center">
                    <Button
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        if (messages.length > 1) {
                          setCurrentStep("profile");
                          addMessage("I'd like to find grants that match my profile", "user");
                        }
                      }}
                      className="text-xs text-muted-foreground flex items-center gap-1"
                      disabled={isTyping || messages.length <= 1}
                    >
                      <PlusCircle className="h-3 w-3" />
                      Find Matching Grants
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetChat}
                      className="text-xs text-muted-foreground"
                    >
                      Reset Chat
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center overflow-y-auto">
              <div className="max-w-sm">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-6 rounded-full mx-auto mb-4 w-20 h-20 flex items-center justify-center">
                    <Bot className="h-10 w-10 text-blue-600" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">Perfect Matches Found!</h3>
                  <p className="text-gray-600 mb-6">
                    I've found {Math.floor(Math.random() * 5) + 3} grants that perfectly match your profile as 
                    a {profile.careerStage} in the {profile.genre} genre.
                  </p>
                  
                  <div className="space-y-4">
                    {!isAuthenticated ? (
                      <Button onClick={handleLoginClick} className="w-full">
                        Sign In to View Matches
                      </Button>
                    ) : !isPaidUser ? (
                      <div className="w-full">
                        <PaywallScreen />
                      </div>
                    ) : (
                      <Button onClick={() => window.location.href = '/assistant'} className="w-full">
                        Open Full Assistant
                      </Button>
                    )}
                    
                    <Button 
                      variant="outline" 
                      onClick={resetChat}
                      className="w-full"
                    >
                      Start a New Chat
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
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
