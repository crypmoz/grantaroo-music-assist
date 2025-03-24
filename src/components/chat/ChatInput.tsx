
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
    isLoading, 
    setIsLoading, 
    useEnhancedAI, 
    setUseEnhancedAI, 
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
      addMessage("I'm analyzing your message...", "bot");
      
      // Get response from enhanced AI if enabled
      const response = await getEnhancedResponse(input.trim());
      
      // Replace the "thinking" message with the actual response
      // This is a simplified approach - in a production app you'd want to handle this differently
      setTimeout(() => {
        // Remove the temporary message and add the real one
        addMessage(response, "bot");
      }, 500);
    } catch (error) {
      console.error("Error getting response:", error);
      toast.error("Sorry, I had trouble processing your request.");
      addMessage("I apologize, but I encountered an error. Could you try asking in a different way?", "bot");
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

  const toggleEnhancedAI = () => {
    setUseEnhancedAI(!useEnhancedAI);
    toast.success(useEnhancedAI 
      ? "Switched to basic assistance mode" 
      : "Enhanced AI assistance activated");
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
        
        {isLoading && (
          <span className="text-xs text-muted-foreground animate-pulse">
            Processing...
          </span>
        )}
      </div>
    </div>
  );
};
