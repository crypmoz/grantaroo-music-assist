
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, Loader2 } from "lucide-react";

type ChatInputProps = {
  onSendMessage: (content: string) => void;
  isTyping: boolean;
  disabled?: boolean;
};

export const ChatInput = ({ onSendMessage, isTyping, disabled = false }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (!input.trim() || isTyping || disabled) return;
    
    const messageText = input.trim();
    setInput("");
    
    onSendMessage(messageText);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex items-end gap-2">
      <div className="relative flex-1">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={isTyping ? "Wait for assistant to finish..." : "Type your message..."}
          className="resize-none min-h-[60px] rounded-xl bg-white/80 backdrop-blur-sm border-muted shadow-sm pr-10"
          disabled={isTyping || disabled}
        />
      </div>
      <Button 
        onClick={handleSendMessage} 
        disabled={(input.trim().length === 0) || isTyping || disabled}
        className="h-[60px] w-[60px] rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
      >
        {isTyping ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <ArrowUp className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};
