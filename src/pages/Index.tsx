
import { GrantApplicationForm } from "@/components/GrantApplicationForm";
import { ChatBot } from "@/components/ChatBot";
import { ChatbotProvider } from "@/context/ChatbotContext";

const Index = () => {
  return (
    <ChatbotProvider>
      <div className="min-h-screen bg-background">
        <header className="border-b p-4">
          <h1 className="text-2xl font-bold text-primary">Toronto Music Grant Assistant</h1>
          <p className="text-muted-foreground">AI-powered grant writing for musicians</p>
        </header>
        
        <div className="container mx-auto py-8">
          <GrantApplicationForm />
        </div>
        
        <ChatBot />
      </div>
    </ChatbotProvider>
  );
};

export default Index;
