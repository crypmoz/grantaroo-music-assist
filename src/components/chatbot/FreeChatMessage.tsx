
import { User, Bot } from "lucide-react";
import { motion } from "framer-motion";

export type FreeChatMessage = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

type FreeChatMessageProps = {
  message: FreeChatMessage;
  formatMessage: (content: string) => string;
};

export const FreeChatMessageComponent = ({ message, formatMessage }: FreeChatMessageProps) => {
  const isAssistant = message.role === "assistant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}
    >
      {isAssistant && (
        <div className="flex-shrink-0 mr-2">
          <div className="bg-blue-100 p-2 rounded-full">
            <Bot className="h-4 w-4 text-blue-600" />
          </div>
        </div>
      )}
      
      <div
        className={`rounded-xl px-4 py-3 max-w-[80%] shadow-sm ${
          isAssistant 
            ? "bg-white border border-gray-100" 
            : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
        }`}
      >
        <div 
          className="whitespace-pre-wrap text-sm"
          dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
        />
        
        <div className={`text-xs mt-1 ${
          isAssistant ? "text-gray-400" : "text-white/70"
        }`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      
      {!isAssistant && (
        <div className="flex-shrink-0 ml-2">
          <div className="bg-indigo-100 p-2 rounded-full">
            <User className="h-4 w-4 text-indigo-600" />
          </div>
        </div>
      )}
    </motion.div>
  );
};
