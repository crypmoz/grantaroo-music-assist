
import { Button } from "@/components/ui/button";
import { Bot, MessageSquarePlus } from "lucide-react";
import { motion } from "framer-motion";

type WelcomeScreenProps = {
  quickPrompts: string[];
  onPromptSelect: (prompt: string) => void;
};

export const WelcomeScreen = ({ quickPrompts, onPromptSelect }: WelcomeScreenProps) => {
  return (
    <motion.div 
      initial={{
        opacity: 0,
        scale: 0.95
      }} 
      animate={{
        opacity: 1,
        scale: 1
      }} 
      transition={{
        duration: 0.5
      }}
      className="flex flex-col items-center justify-center h-64 text-center space-y-4"
    >
      <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-6 rounded-full">
        <Bot className="h-10 w-10 text-blue-600" />
      </div>
      <div>
        <h3 className="text-xl font-medium">Welcome to Grant Assistant</h3>
        <p className="text-muted-foreground max-w-sm mt-2">
          I'm here to help you find music grants in Canada that match your profile and needs. How can I assist you today?
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
              onClick={() => onPromptSelect(prompt)}
            >
              <MessageSquarePlus className="h-3 w-3 mr-2 flex-shrink-0" />
              <span className="truncate">{prompt}</span>
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
