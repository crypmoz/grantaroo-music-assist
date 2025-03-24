
import { GrantApplicationForm } from "@/components/GrantApplicationForm";
import { ChatBot } from "@/components/ChatBot";
import { ChatbotProvider } from "@/context/ChatbotContext";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { NavBar } from "@/components/NavBar";

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  
  return (
    <ChatbotProvider>
      <div className="min-h-screen bg-background">
        <header className="border-b p-4 md:p-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-primary">Toronto Music Grant Assistant</h1>
              <p className="text-muted-foreground">AI-powered grant writing for musicians</p>
            </div>
            <div className="hidden md:block">
              <p className="text-sm text-muted-foreground">Helping artists secure funding since 2024</p>
            </div>
          </div>
          <NavBar />
        </header>
        
        <main className="container mx-auto py-8 px-4 md:px-0">
          {!showForm ? (
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold">Find the Perfect Grant for Your Music Project</h2>
              <p className="text-xl text-muted-foreground">
                Our AI-powered assistant will guide you through every step of the grant application process,
                from matching you with the right opportunities to helping you complete your application.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <Button 
                  size="lg" 
                  className="flex items-center gap-2"
                  onClick={() => setShowForm(true)}
                >
                  View Application Form
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="flex items-center gap-2"
                  onClick={() => {
                    const chatbotButton = document.querySelector('.fixed.bottom-4.right-4') as HTMLButtonElement;
                    if (chatbotButton) chatbotButton.click();
                  }}
                >
                  <MessageCircle className="h-5 w-5" />
                  Chat with Grant Assistant
                </Button>
              </div>
            </div>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="mb-6"
                onClick={() => setShowForm(false)}
              >
                Back to Home
              </Button>
              <GrantApplicationForm />
            </>
          )}
        </main>
        
        <ChatBot />
      </div>
    </ChatbotProvider>
  );
};

export default Index;
