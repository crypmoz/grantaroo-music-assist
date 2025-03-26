
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useChatbot } from "@/context/ChatbotContext";
import { FileText, LightbulbIcon } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { FormSectionCard } from "./application-guide/FormSectionCard";
import { FORM_SECTIONS } from "./application-guide/FormSections";
import { getSectionAdvice, filterRelevantFactors } from "./application-guide/SectionAdvice";
import { HelpPrompt } from "./application-guide/HelpPrompt";
import { SectionTabs } from "./application-guide/SectionTabs";

export const ApplicationFormGuide = () => {
  const { addMessage, successfulAppData } = useChatbot();
  const [activeTab, setActiveTab] = useState("project-summary");
  
  return (
    <div className="space-y-4 p-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between"
      >
        <h3 className="text-lg font-medium flex items-center gap-2 text-blue-700">
          <FileText className="h-5 w-5" />
          Grant Application Guide
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            AI-Powered
          </span>
        </h3>
      </motion.div>
      
      <Tabs defaultValue="project-summary" className="w-full" onValueChange={setActiveTab}>
        <SectionTabs activeTab={activeTab} onChange={setActiveTab} />
        
        {FORM_SECTIONS.map((section) => (
          <TabsContent key={section.id} value={section.id} className="mt-0">
            <FormSectionCard
              section={section}
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
      
      <HelpPrompt />
    </div>
  );
};
