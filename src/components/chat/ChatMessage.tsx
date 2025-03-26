
import { MessageType } from "@/context/ChatbotContext";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import { motion } from "framer-motion";

type ChatMessageProps = {
  message: MessageType;
};

export const ChatMessage = ({ message }: ChatMessageProps) => {
  // Support both role and sender to handle legacy messages
  const isBot = message.role === "assistant" || message.sender === "bot";
  
  // Convert markdown-like syntax to HTML
  const formatMessage = (content: string) => {
    if (!content) return "";
    
    // Replace markdown bold with HTML
    let formatted = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert bullet points
    formatted = formatted.replace(/^• (.*?)$/gm, '<li>$1</li>');
    if (formatted.includes('<li>')) {
      formatted = formatted.replace(/<li>.*?<\/li>/gs, match => `<ul class="list-disc list-inside my-2">${match}</ul>`);
    }
    
    // Convert line breaks to paragraph breaks
    formatted = formatted.split('\n\n').map(para => 
      para.includes('<ul') ? para : `<p>${para}</p>`
    ).join('');
    
    // Replace single line breaks
    formatted = formatted.replace(/\n/g, '<br>');
    
    // Fix any doubled paragraph tags
    formatted = formatted.replace(/<p><p>/g, '<p>').replace(/<\/p><\/p>/g, '</p>');
    
    return formatted;
  };
  
  return (
    <div
      className={cn(
        "flex w-full my-2",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      {isBot && (
        <div className="flex-shrink-0 mr-2">
          <div className="bg-blue-100 p-2 rounded-full">
            <Bot className="h-4 w-4 text-blue-600" />
          </div>
        </div>
      )}
      
      <div
        className={cn(
          "rounded-xl px-4 py-3 max-w-[85%] shadow-sm",
          isBot 
            ? "bg-white border border-gray-100" 
            : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
        )}
      >
        <div 
          className="whitespace-pre-wrap text-sm"
          dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
        />
        <div className={cn(
          "text-xs mt-1",
          isBot ? "text-gray-400" : "text-white/70"
        )}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      
      {!isBot && (
        <div className="flex-shrink-0 ml-2">
          <div className="bg-indigo-100 p-2 rounded-full">
            <User className="h-4 w-4 text-indigo-600" />
          </div>
        </div>
      )}
    </div>
  );
};
