
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Copy, LightbulbIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useChatbot } from "@/context/ChatbotContext";
import { toast } from "sonner";

type FormSectionCardProps = {
  section: {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
  };
  advice: string;
  hasSuccessInsights: boolean;
  relevantFactors: string[];
};

export const FormSectionCard = ({ 
  section, 
  advice,
  hasSuccessInsights,
  relevantFactors
}: FormSectionCardProps) => {
  const { addMessage } = useChatbot();
  
  const handleGetAdvice = () => {
    addMessage(`I need help with the ${section.title} section of my application.`, "user");
  };
  
  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-4 border-blue-100 shadow-sm">
        <h4 className="font-medium text-blue-800">{section.title}</h4>
        <p className="text-sm text-muted-foreground mb-4">{section.description}</p>
        
        <div className="rounded-lg bg-blue-50/50 p-4 border border-blue-100 mb-4">
          <p className="text-sm text-blue-800 whitespace-pre-wrap">
            {advice}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          <Button 
            variant="default" 
            size="sm" 
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700"
            onClick={handleGetAdvice}
          >
            <LightbulbIcon className="h-4 w-4" />
            Get Expert Advice
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1 border-blue-200 text-blue-700"
            onClick={() => {
              addMessage(`Can you provide a template for the ${section.title} section?`, "user");
            }}
          >
            <CheckCircle className="h-4 w-4" />
            Request Template
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1 border-blue-200 text-blue-700"
            onClick={() => handleCopyText(advice)}
          >
            <Copy className="h-4 w-4" />
            Copy Guidelines
          </Button>
        </div>
        
        {hasSuccessInsights && (
          <div className="mt-4 p-3 bg-green-50 rounded-md border border-green-100">
            <p className="text-sm font-medium text-green-800 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Success Insights Available
            </p>
            <p className="text-xs text-green-700 mt-1">
              This section has insights from successful applications
            </p>
          </div>
        )}
      </Card>
    </motion.div>
  );
};
