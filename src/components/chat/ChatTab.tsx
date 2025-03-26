
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { useChatbot } from "@/context/ChatbotContext";
import { Button } from "@/components/ui/button";
import { Bot, HelpCircle, MessageSquarePlus } from "lucide-react";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const ChatTab = () => {
  const { messages, addMessage } = useChatbot();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const quickPrompts = [
    "How can I improve my application?",
    "What makes a good budget section?",
    "Tips for standing out from other applicants?",
    "Common mistakes to avoid in applications?"
  ];

  return (
    <>
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4 pb-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ChatMessage message={message} />
            </motion.div>
          ))}
          <div ref={scrollRef} />
          
          {messages.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center h-64 text-center space-y-4"
            >
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-6 rounded-full">
                <Bot className="h-10 w-10 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-medium">Welcome to Grant Assistant</h3>
                <p className="text-muted-foreground max-w-sm mt-2">
                  I'm here to help you find and apply for music grants that match your profile.
                  You can also upload documents to help me understand your work better.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4 w-full max-w-md">
                {quickPrompts.map((prompt, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                  >
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full justify-start text-xs text-left font-normal h-auto py-2"
                      onClick={() => addMessage(prompt, "user")}
                    >
                      <MessageSquarePlus className="h-3 w-3 mr-2 flex-shrink-0" />
                      <span className="truncate">{prompt}</span>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>
      
      <div className="mt-auto p-4 border-t bg-white/50 backdrop-blur-sm">
        <ChatInput />
      </div>
    </>
  );
};
