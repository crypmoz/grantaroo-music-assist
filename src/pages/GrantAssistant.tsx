
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { GrantProfileForm } from "@/components/forms/GrantProfileForm";
import { GrantSuggestions } from "@/components/grants/GrantSuggestions";
import { ApplicationFormGuide } from "@/components/forms/ApplicationFormGuide";
import { GrantSuccessStats } from "@/components/analysis/GrantSuccessStats";
import { useChatbot } from "@/context/ChatbotContext";
import { useAuth } from "@/context/AuthContext";
import { Bot, BarChart, Sparkles, Lock, MessageCircle, FilePenLine, FileSearch } from "lucide-react";
import { PaywallScreen } from "@/components/PaywallScreen";
import { AuthModal } from "@/components/auth/AuthModal";

const GrantAssistant = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const { messages, currentStep, addMessage, useEnhancedAI } = useChatbot();
  const { isAuthenticated, isPaidUser } = useAuth();
  
  // Handle login button click
  const handleLoginClick = () => {
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Grant Assistant</h1>
              <p className="text-muted-foreground mt-1">AI-powered guidance for your music grant applications</p>
            </div>
            
            {isPaidUser && (
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => setShowStats(!showStats)}
              >
                <BarChart className="h-4 w-4" />
                {showStats ? "Hide Statistics" : "View Success Statistics"}
              </Button>
            )}
          </div>

          {!isAuthenticated ? (
            <Card className="p-8">
              <div className="flex flex-col items-center justify-center text-center space-y-6">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Lock className="h-10 w-10 text-primary" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Grant Assistant Access</h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Sign in to access our AI-powered Grant Assistant and improve your chances of securing music funding.
                  </p>
                </div>
                <Button 
                  size="lg" 
                  onClick={handleLoginClick}
                  className="px-8"
                >
                  Sign In to Access
                </Button>
              </div>
            </Card>
          ) : !isPaidUser ? (
            <PaywallScreen />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="h-[70vh] shadow-md border-primary/20">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                    <div className="p-4 border-b bg-muted/50">
                      <TabsList className="grid grid-cols-3">
                        <TabsTrigger value="chat" className="flex items-center gap-2">
                          <MessageCircle className="h-4 w-4" />
                          Chat
                        </TabsTrigger>
                        <TabsTrigger value="application" className="flex items-center gap-2">
                          <FilePenLine className="h-4 w-4" />
                          Application Guide
                        </TabsTrigger>
                        <TabsTrigger value="suggestions" className="flex items-center gap-2">
                          <FileSearch className="h-4 w-4" />
                          Grant Finder
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    <TabsContent value="chat" className="flex-grow flex flex-col h-full p-0 m-0">
                      <ScrollArea className="flex-grow p-4">
                        <div className="space-y-4 pb-4">
                          {messages.map((message) => (
                            <ChatMessage key={message.id} message={message} />
                          ))}
                          {messages.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
                              <div className="bg-primary/10 p-4 rounded-full">
                                <Bot className="h-10 w-10 text-primary" />
                              </div>
                              <div>
                                <h3 className="text-lg font-medium">Welcome to Grant Assistant</h3>
                                <p className="text-muted-foreground max-w-sm">
                                  I'm here to help you find and apply for music grants that match your profile.
                                </p>
                              </div>
                              <Button onClick={() => addMessage("Hi there! Can you help me with my grant application?", "user")}>
                                Start a conversation
                              </Button>
                            </div>
                          )}
                        </div>
                      </ScrollArea>
                      
                      <div className="mt-auto p-4 border-t">
                        <ChatInput />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="application" className="flex-grow p-0 m-0 overflow-auto">
                      <ScrollArea className="h-full">
                        <div className="p-4">
                          <ApplicationFormGuide />
                        </div>
                      </ScrollArea>
                    </TabsContent>
                    
                    <TabsContent value="suggestions" className="flex-grow p-0 m-0 overflow-auto">
                      <ScrollArea className="h-full">
                        <div className="p-4">
                          {currentStep === "welcome" ? (
                            <GrantProfileForm />
                          ) : (
                            <GrantSuggestions />
                          )}
                        </div>
                      </ScrollArea>
                    </TabsContent>
                  </Tabs>
                </Card>
              </div>
              
              <div className="lg:col-span-1">
                <Card className="h-[70vh] overflow-hidden shadow-md border-primary/20">
                  <CardContent className="p-0 h-full flex flex-col">
                    <div className="bg-primary/10 p-4 border-b">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-5 w-5 text-primary" />
                          <h3 className="font-semibold">AI Insights</h3>
                        </div>
                        {useEnhancedAI && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full flex items-center gap-1">
                            <Sparkles className="h-3 w-3" />
                            Enhanced
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <ScrollArea className="flex-grow p-4">
                      {showStats ? (
                        <GrantSuccessStats />
                      ) : (
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm">Grant Application Tips</h4>
                            <ul className="text-sm space-y-2">
                              <li className="p-3 bg-muted/50 rounded-md">🎯 <strong>Be specific</strong> about your project goals and timeline</li>
                              <li className="p-3 bg-muted/50 rounded-md">💰 <strong>Detail your budget</strong> with realistic cost breakdowns</li>
                              <li className="p-3 bg-muted/50 rounded-md">🌟 <strong>Highlight your unique value</strong> and what sets you apart</li>
                              <li className="p-3 bg-muted/50 rounded-md">📊 <strong>Quantify impact</strong> with concrete metrics and outcomes</li>
                            </ul>
                          </div>
                          
                          <Separator />
                          
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm">Success Factors</h4>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="p-3 bg-green-50 rounded-md border border-green-100">
                                <div className="font-medium text-green-800">Clear Objectives</div>
                                <div className="text-green-700 text-xs">93% success rate</div>
                              </div>
                              <div className="p-3 bg-amber-50 rounded-md border border-amber-100">
                                <div className="font-medium text-amber-800">Budget Precision</div>
                                <div className="text-amber-700 text-xs">87% success rate</div>
                              </div>
                              <div className="p-3 bg-blue-50 rounded-md border border-blue-100">
                                <div className="font-medium text-blue-800">Community Impact</div>
                                <div className="text-blue-700 text-xs">82% success rate</div>
                              </div>
                              <div className="p-3 bg-purple-50 rounded-md border border-purple-100">
                                <div className="font-medium text-purple-800">Innovation</div>
                                <div className="text-purple-700 text-xs">78% success rate</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
};

export default GrantAssistant;
