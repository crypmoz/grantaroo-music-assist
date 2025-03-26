
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { GrantSuccessStats } from "@/components/analysis/GrantSuccessStats";
import { useChatbot } from "@/context/ChatbotContext";
import { Sparkles, BrainCircuit, TrendingUp, PieChart, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface GrantAssistantAIPanelProps {
  showStats: boolean;
}

export const GrantAssistantAIPanel = ({ showStats }: GrantAssistantAIPanelProps) => {
  const { useEnhancedAI } = useChatbot();

  return (
    <Card className="h-[70vh] overflow-hidden shadow-lg border-primary/20 rounded-xl">
      <CardContent className="p-0 h-full flex flex-col">
        <div className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold">AI Insights</h3>
            </div>
            {useEnhancedAI && (
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Enhanced
              </span>
            )}
          </div>
        </div>
        
        <ScrollArea className="flex-grow p-4">
          {showStats ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <GrantSuccessStats />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <DefaultAIInsights />
            </motion.div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

const DefaultAIInsights = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h4 className="font-medium text-sm flex items-center gap-2 text-blue-700">
          <CheckCircle className="h-4 w-4" />
          Grant Application Tips
        </h4>
        <ul className="text-sm space-y-2">
          <motion.li 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="p-3 bg-blue-50 border border-blue-100 rounded-md shadow-sm"
          >
            <span className="font-medium">Be specific</span> about your project goals and timeline
          </motion.li>
          <motion.li 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="p-3 bg-indigo-50 border border-indigo-100 rounded-md shadow-sm"
          >
            <span className="font-medium">Detail your budget</span> with realistic cost breakdowns
          </motion.li>
          <motion.li 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="p-3 bg-purple-50 border border-purple-100 rounded-md shadow-sm"
          >
            <span className="font-medium">Highlight your unique value</span> and what sets you apart
          </motion.li>
          <motion.li 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="p-3 bg-teal-50 border border-teal-100 rounded-md shadow-sm"
          >
            <span className="font-medium">Quantify impact</span> with concrete metrics and outcomes
          </motion.li>
        </ul>
      </div>
      
      <Separator />
      
      <div className="space-y-3">
        <h4 className="font-medium text-sm flex items-center gap-2 text-blue-700">
          <TrendingUp className="h-4 w-4" />
          Success Factors
        </h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="p-3 bg-green-50 rounded-md border border-green-100 shadow-sm"
          >
            <div className="font-medium text-green-800">Clear Objectives</div>
            <div className="text-green-700 text-xs">93% success rate</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="p-3 bg-amber-50 rounded-md border border-amber-100 shadow-sm"
          >
            <div className="font-medium text-amber-800">Budget Precision</div>
            <div className="text-amber-700 text-xs">87% success rate</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="p-3 bg-blue-50 rounded-md border border-blue-100 shadow-sm"
          >
            <div className="font-medium text-blue-800">Community Impact</div>
            <div className="text-blue-700 text-xs">82% success rate</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="p-3 bg-purple-50 rounded-md border border-purple-100 shadow-sm"
          >
            <div className="font-medium text-purple-800">Innovation</div>
            <div className="text-purple-700 text-xs">78% success rate</div>
          </motion.div>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-3">
        <h4 className="font-medium text-sm flex items-center gap-2 text-blue-700">
          <PieChart className="h-4 w-4" />
          Grant Analysis
        </h4>
        <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100 shadow-sm">
          <p className="text-sm text-blue-800">
            Based on your profile, your application has a <span className="font-bold text-blue-700">76% match rate</span> with successful grants in your category.
          </p>
        </div>
      </div>
    </div>
  );
};
