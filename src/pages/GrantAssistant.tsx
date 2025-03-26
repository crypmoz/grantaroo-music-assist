
import { GrantAssistantLayout } from "@/components/grant-assistant/GrantAssistantLayout";
import { ChatbotProvider } from "@/context/ChatbotContext";

const GrantAssistant = () => {
  return (
    <ChatbotProvider>
      <GrantAssistantLayout />
    </ChatbotProvider>
  );
};

export default GrantAssistant;
