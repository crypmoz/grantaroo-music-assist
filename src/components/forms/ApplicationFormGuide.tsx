
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useChatbot } from "@/context/ChatbotContext";
import { FileText } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { FormSectionCard } from "./application-guide/FormSectionCard";
import { formSections } from "./application-guide/FormSections";
import { getSectionAdvice, filterRelevantFactors } from "./application-guide/SectionAdvice";
import { HelpPrompt } from "./application-guide/HelpPrompt";
import { SectionTabs } from "./application-guide/SectionTabs";
import { cn } from "@/lib/utils";

interface ApplicationFormGuideProps {
  className?: string;
}

export const ApplicationFormGuide = ({ className }: ApplicationFormGuideProps) => {
  const { successfulAppData, addMessage } = useChatbot();
  const [activeTab, setActiveTab] = useState("project-summary");
  
  return (
    <div className={cn("space-y-4", className)}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-2 mb-4"
      >
        <div className="bg-blue-100 p-2 rounded-full">
          <FileText className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-medium text-blue-700">Grant Application Guide</h3>
          <p className="text-xs text-blue-500">AI-powered section recommendations</p>
        </div>
      </motion.div>
      
      <Tabs defaultValue="project-summary" value={activeTab} onValueChange={setActiveTab}>
        <SectionTabs activeTab={activeTab} onChange={setActiveTab} />
        
        {formSections.map((section) => (
          <TabsContent key={section.id} value={section.id} className="mt-0">
            <FormSectionCard
              id={section.id}
              title={section.title}
              description={section.description}
              icon={section.icon}
              examples={section.examples}
              tips={section.tips}
              advice={getSectionAdvice(section.id, successfulAppData)}
              hasSuccessInsights={
                successfulAppData.appliedFactors.length > 0 && 
                filterRelevantFactors(section.id, successfulAppData.appliedFactors).length > 0
              }
              relevantFactors={filterRelevantFactors(section.id, successfulAppData.appliedFactors)}
            />
          </TabsContent>
        ))}
      </Tabs>
      
      <HelpPrompt onSelectPrompt={(prompt) => addMessage(prompt, "user")} />
    </div>
  );
};
