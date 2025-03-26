
import { Bot, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export const ChatTypingIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-start gap-2"
    >
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
        <Bot className="h-5 w-5 text-blue-600" />
      </div>
      <div className="bg-gray-100 rounded-lg p-3 relative max-w-[80%]">
        <div className="flex space-x-1">
          <span className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
          <span className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
          <span className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></span>
        </div>
      </div>
    </motion.div>
  );
};
