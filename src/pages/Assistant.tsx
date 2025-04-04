
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GrantAssistantLayout } from "@/components/grant-assistant/GrantAssistantLayout";
import { ChatbotProvider } from "@/context/ChatbotContext";

const Assistant = () => {
  return (
    <ChatbotProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <GrantAssistantLayout />
        </main>
        <Footer />
      </div>
    </ChatbotProvider>
  );
};

export default Assistant;
