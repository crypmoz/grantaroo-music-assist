
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageSquarePlus, HelpCircle } from "lucide-react";
import { useChatbot } from "@/context/ChatbotContext";

interface HelpPromptProps {
  sectionName?: string;
  onSelectPrompt: (prompt: string) => void;
}

export const HelpPrompt = ({ sectionName, onSelectPrompt }: HelpPromptProps) => {
  const { addMessage } = useChatbot();
  
  const handleHelpClick = () => {
    const prompt = sectionName 
      ? `I need help with the ${sectionName} section of my grant application. Can you provide guidance?`
      : "I need help with my grant application. Can you provide guidance?";
    
    if (onSelectPrompt) {
      onSelectPrompt(prompt);
    } else {
      addMessage(prompt, "user");
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      className="rounded-md bg-blue-50 p-4 border border-blue-100 shadow-sm"
    >
      <div className="flex items-start gap-3">
        <div className="bg-blue-100 p-2 rounded-full mt-1">
          <HelpCircle className="h-4 w-4 text-blue-600" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-blue-800">Need more help?</p>
          <p className="text-blue-700 text-sm mt-1 mb-3">
            Ask the grant assistant for specific guidance or feedback on your draft content.
          </p>
          <Button 
            size="sm"
            onClick={handleHelpClick}
            className="bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 w-full"
          >
            <MessageSquarePlus className="h-3.5 w-3.5 mr-1" />
            Ask for assistance
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
