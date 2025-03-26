
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useChatbot } from "@/context/ChatbotContext";
import { CheckCircle, Copy, Download, LightbulbIcon, FileText, Clock, DollarSign, BarChartHorizontal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const FORM_SECTIONS = [
  {
    id: "project-summary",
    title: "Project Summary",
    description: "A concise overview of your music project.",
    icon: FileText
  },
  {
    id: "artist-background",
    title: "Artist Background",
    description: "Your musical history, accomplishments, and career trajectory.",
    icon: BarChartHorizontal
  },
  {
    id: "project-timeline",
    title: "Project Timeline",
    description: "Key milestones and deadlines for your project.",
    icon: Clock
  },
  {
    id: "budget",
    title: "Budget Breakdown",
    description: "Detailed allocation of funds for your project.",
    icon: DollarSign
  },
  {
    id: "impact",
    title: "Expected Impact",
    description: "How this project will advance your career and contribute to the music community.",
    icon: BarChartHorizontal
  }
];

export const ApplicationFormGuide = () => {
  const { addMessage, successfulAppData } = useChatbot();
  const [activeTab, setActiveTab] = useState("project-summary");
  
  const getSectionAdvice = (sectionId: string) => {
    // Base advice for each section
    const baseAdvice: Record<string, string> = {
      "project-summary": "Keep your summary brief (150-250 words) and compelling. Clearly state what you're creating, why it matters, and how the grant will help achieve your goals.",
      "artist-background": "Highlight relevant achievements that demonstrate your ability to complete this project. Include streaming numbers, press coverage, previous grants, and collaborations.",
      "project-timeline": "Create a realistic schedule with clear milestones. Show that you've thought through each phase of the project and allocated sufficient time.",
      "budget": "Be detailed and realistic. Include quotes from professionals where possible. Ensure the grant request aligns with the program's funding limits.",
      "impact": "Discuss both personal career advancement and broader community benefit. How will this project help you reach new audiences or contribute to the local music scene?"
    };
    
    // If we have success factors from real applications, incorporate them
    if (successfulAppData.appliedFactors.length > 0) {
      // Filter success factors relevant to this section
      const relevantFactors = filterRelevantFactors(sectionId, successfulAppData.appliedFactors);
      
      if (relevantFactors.length > 0) {
        return `${baseAdvice[sectionId]}\n\n**Tips from successful applications:**\n${relevantFactors.map(f => `• ${f}`).join('\n')}`;
      }
    }
    
    return baseAdvice[sectionId];
  };
  
  const filterRelevantFactors = (sectionId: string, factors: string[]) => {
    // Map section IDs to keywords to match against success factors
    const sectionKeywords: Record<string, string[]> = {
      "project-summary": ["vision", "audience", "clear", "concept", "idea", "purpose"],
      "artist-background": ["previous", "experience", "background", "track record", "history"],
      "project-timeline": ["timeline", "milestone", "schedule", "realistic", "plan"],
      "budget": ["budget", "cost", "financial", "fund", "allocation", "payment"],
      "impact": ["impact", "community", "audience", "outreach", "benefit", "engagement"]
    };
    
    // Filter factors that contain any of the keywords for this section
    return factors.filter(factor => 
      sectionKeywords[sectionId]?.some(keyword => 
        factor.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  };
  
  const handleGetAdvice = () => {
    const advice = getSectionAdvice(activeTab);
    addMessage(`I need help with the ${FORM_SECTIONS.find(s => s.id === activeTab)?.title} section of my application.`, "user");
  };
  
  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };
  
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
        <TabsList className="w-full grid grid-cols-5 mb-4 bg-blue-50/50">
          {FORM_SECTIONS.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <TabsTrigger 
                value={section.id} 
                className="text-xs flex items-center gap-1 data-[state=active]:bg-white"
              >
                <section.icon className="h-3 w-3" />
                <span className="hidden sm:inline">{section.title}</span>
              </TabsTrigger>
            </motion.div>
          ))}
        </TabsList>
        
        {FORM_SECTIONS.map((section, index) => (
          <TabsContent key={section.id} value={section.id} className="mt-0">
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
                    {getSectionAdvice(section.id)}
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
                    onClick={() => handleCopyText(getSectionAdvice(section.id))}
                  >
                    <Copy className="h-4 w-4" />
                    Copy Guidelines
                  </Button>
                </div>
                
                {successfulAppData.appliedFactors.length > 0 && filterRelevantFactors(section.id, successfulAppData.appliedFactors).length > 0 && (
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
          </TabsContent>
        ))}
      </Tabs>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="rounded-md bg-indigo-50 p-4 border border-indigo-100 shadow-sm"
      >
        <p className="font-medium text-indigo-800">Need more help?</p>
        <p className="text-indigo-700 text-sm mt-1">
          Ask the grant assistant for specific guidance or feedback on your draft content.
        </p>
      </motion.div>
    </div>
  );
};
