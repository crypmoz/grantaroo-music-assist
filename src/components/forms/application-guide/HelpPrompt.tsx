
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageSquarePlus } from "lucide-react";
import { useChatbot } from "@/context/ChatbotContext";

export const HelpPrompt = () => {
  const { addMessage } = useChatbot();
  
  const handleHelpClick = () => {
    addMessage("I need help with my grant application. Can you provide guidance?", "user");
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      className="rounded-md bg-indigo-50 p-4 border border-indigo-100 shadow-sm"
    >
      <p className="font-medium text-indigo-800">Need more help?</p>
      <p className="text-indigo-700 text-sm mt-1 mb-3">
        Ask the grant assistant for specific guidance or feedback on your draft content.
      </p>
      <Button 
        variant="outline" 
        size="sm"
        onClick={handleHelpClick}
        className="bg-white border-indigo-200 text-indigo-700 hover:bg-indigo-50 w-full"
      >
        <MessageSquarePlus className="h-3.5 w-3.5 mr-1" />
        Ask for assistance
      </Button>
    </motion.div>
  );
};
