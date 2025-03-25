
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useChatbot } from "@/context/ChatbotContext";
import { ArrowUp, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const ChatInput = () => {
  const [input, setInput] = useState("");
  const { 
    addMessage, 
    isTyping, 
    isLoading,
    setIsLoading,
    useEnhancedAI, 
    toggleEnhancedAI,
    getEnhancedResponse 
  } = useChatbot();

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    // Add user message
    addMessage(input, "user");
    setInput("");
    setIsLoading(true);
    
    try {
      // First add a "thinking" message
      const thinkingMessage = "I'm analyzing your message...";
      
      // Get response from enhanced AI if enabled
      const response = await getEnhancedResponse(input.trim());
      
      // No need to add these placeholder messages anymore since 
      // addMessage already handles the response generation
      
    } catch (error) {
      console.error("Error getting response:", error);
      toast.error("Sorry, I had trouble processing your request.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col gap-2 p-2 border-t">
      <div className="flex items-end gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          className="resize-none min-h-[60px]"
          disabled={isLoading || isTyping}
        />
        <Button 
          onClick={handleSendMessage} 
          disabled={!input.trim() || isLoading || isTyping}
          className="h-[60px] w-[60px]"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex justify-between items-center px-1">
        <button 
          onClick={toggleEnhancedAI}
          className={cn(
            "flex items-center gap-1 text-xs",
            useEnhancedAI ? "text-primary" : "text-muted-foreground"
          )}
        >
          <Sparkles className={cn(
            "h-3 w-3", 
            useEnhancedAI ? "text-primary" : "text-muted-foreground"
          )} />
          {useEnhancedAI ? "Enhanced AI: On" : "Enhanced AI: Off"}
        </button>
        
        {(isLoading || isTyping) && (
          <span className="text-xs text-muted-foreground animate-pulse">
            Processing...
          </span>
        )}
      </div>
    </div>
  );
};
