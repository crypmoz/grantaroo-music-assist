
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useChatbot } from "@/context/ChatbotContext";
import { ArrowUp } from "lucide-react";

export const ChatInput = () => {
  const [input, setInput] = useState("");
  const { addMessage, isLoading } = useChatbot();

  const handleSendMessage = () => {
    if (!input.trim() || isLoading) return;
    
    addMessage(input, "user");
    setInput("");
    
    // Simulate bot response
    // In a real app, this would call an API
    setTimeout(() => {
      addMessage("I'm analyzing your message. Let me think about that...", "bot");
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex items-end gap-2 p-2 border-t">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type your message..."
        className="resize-none min-h-[60px]"
        disabled={isLoading}
      />
      <Button 
        onClick={handleSendMessage} 
        disabled={!input.trim() || isLoading}
        className="h-[60px] w-[60px]"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </div>
  );
};
