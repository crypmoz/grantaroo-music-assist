
import { GrantApplicationForm } from "@/components/GrantApplicationForm";
import { ChatBot } from "@/components/ChatBot";
import { ChatbotProvider } from "@/context/ChatbotContext";

const Index = () => {
  return (
    <ChatbotProvider>
      <div className="min-h-screen bg-background">
        <header className="border-b p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary">Toronto Music Grant Assistant</h1>
            <p className="text-muted-foreground">AI-powered grant writing for musicians</p>
          </div>
          <div className="hidden md:block">
            <p className="text-sm text-muted-foreground">Helping artists secure funding since 2024</p>
          </div>
        </header>
        
        <main className="container mx-auto py-8 px-4 md:px-0">
          <GrantApplicationForm />
        </main>
        
        <ChatBot />
      </div>
    </ChatbotProvider>
  );
};

export default Index;
