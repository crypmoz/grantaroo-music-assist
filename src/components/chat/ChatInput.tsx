
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useChatbot } from "@/context/ChatbotContext";
import { ArrowUp, Sparkles, Loader2, Lightbulb, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { FileUpload } from "./FileUpload";

export const ChatInput = () => {
  const [input, setInput] = useState("");
  const [showFileUpload, setShowFileUpload] = useState(false);
  const { 
    addMessage, 
    isTyping, 
    isLoading,
    setIsLoading,
    useEnhancedAI, 
    toggleEnhancedAI,
    getEnhancedResponse,
    uploadedFiles
  } = useChatbot();

  const handleSendMessage = async () => {
    if ((!input.trim() && uploadedFiles.length === 0) || isLoading) return;
    
    const messageText = input.trim() ? input.trim() : 
      uploadedFiles.length > 0 ? "I'm uploading some files for you to review." : "";
    
    // Add user message with any attachments
    addMessage(messageText, "user", uploadedFiles.length > 0 ? [...uploadedFiles] : undefined);
    setInput("");
    setIsLoading(true);
    setShowFileUpload(false);
    
    try {
      // Get response from enhanced AI if enabled
      const response = await getEnhancedResponse(messageText);
      
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

  const toggleFileUpload = () => {
    setShowFileUpload(prev => !prev);
  };

  const suggestionPrompts = [
    "How should I structure my artist bio?",
    "What's most important in the budget section?"
  ];

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex flex-col gap-1">
        <div className="flex space-x-2">
          {suggestionPrompts.map((prompt, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: i * 0.1 }}
            >
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs bg-muted/50"
                onClick={() => {
                  setInput(prompt);
                }}
              >
                <Lightbulb className="h-3 w-3 mr-1 text-amber-500" />
                {prompt}
              </Button>
            </motion.div>
          ))}
        </div>
        
        {showFileUpload && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="my-2"
          >
            <FileUpload />
          </motion.div>
        )}
        
        <div className="flex items-end gap-2 mt-2">
          <div className="relative flex-1">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="resize-none min-h-[60px] rounded-xl bg-white/80 backdrop-blur-sm border-muted shadow-sm pr-10"
              disabled={isLoading || isTyping}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 bottom-2 h-8 w-8 text-muted-foreground hover:text-primary"
              onClick={toggleFileUpload}
            >
              <Paperclip 
                className={cn(
                  "h-4 w-4 transition-colors",
                  showFileUpload && "text-primary",
                  uploadedFiles.length > 0 && "text-blue-500"
                )} 
              />
              {uploadedFiles.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white w-4 h-4 rounded-full text-[10px] flex items-center justify-center">
                  {uploadedFiles.length}
                </span>
              )}
            </Button>
          </div>
          <Button 
            onClick={handleSendMessage} 
            disabled={(input.trim().length === 0 && uploadedFiles.length === 0) || isLoading || isTyping}
            className="h-[60px] w-[60px] rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            {isLoading || isTyping ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <ArrowUp className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      
      <div className="flex justify-between items-center px-1">
        <button 
          onClick={toggleEnhancedAI}
          className={cn(
            "flex items-center gap-1 text-xs font-medium transition-colors duration-200",
            useEnhancedAI ? "text-blue-600" : "text-muted-foreground"
          )}
        >
          <Sparkles className={cn(
            "h-3 w-3", 
            useEnhancedAI ? "text-blue-600" : "text-muted-foreground"
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
