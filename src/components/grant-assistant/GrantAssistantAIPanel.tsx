
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { GrantSuccessStats } from "@/components/analysis/GrantSuccessStats";
import { useChatbot } from "@/context/ChatbotContext";
import { Sparkles } from "lucide-react";

interface GrantAssistantAIPanelProps {
  showStats: boolean;
}

export const GrantAssistantAIPanel = ({ showStats }: GrantAssistantAIPanelProps) => {
  const { useEnhancedAI } = useChatbot();

  return (
    <Card className="h-[70vh] overflow-hidden shadow-md border-primary/20">
      <CardContent className="p-0 h-full flex flex-col">
        <div className="bg-primary/10 p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
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
            <GrantSuccessStats />
          ) : (
            <DefaultAIInsights />
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

const DefaultAIInsights = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="font-medium text-sm">Grant Application Tips</h4>
        <ul className="text-sm space-y-2">
          <li className="p-3 bg-muted/50 rounded-md">🎯 <strong>Be specific</strong> about your project goals and timeline</li>
          <li className="p-3 bg-muted/50 rounded-md">💰 <strong>Detail your budget</strong> with realistic cost breakdowns</li>
          <li className="p-3 bg-muted/50 rounded-md">🌟 <strong>Highlight your unique value</strong> and what sets you apart</li>
          <li className="p-3 bg-muted/50 rounded-md">📊 <strong>Quantify impact</strong> with concrete metrics and outcomes</li>
        </ul>
      </div>
      
      <Separator />
      
      <div className="space-y-2">
        <h4 className="font-medium text-sm">Success Factors</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="p-3 bg-green-50 rounded-md border border-green-100">
            <div className="font-medium text-green-800">Clear Objectives</div>
            <div className="text-green-700 text-xs">93% success rate</div>
          </div>
          <div className="p-3 bg-amber-50 rounded-md border border-amber-100">
            <div className="font-medium text-amber-800">Budget Precision</div>
            <div className="text-amber-700 text-xs">87% success rate</div>
          </div>
          <div className="p-3 bg-blue-50 rounded-md border border-blue-100">
            <div className="font-medium text-blue-800">Community Impact</div>
            <div className="text-blue-700 text-xs">82% success rate</div>
          </div>
          <div className="p-3 bg-purple-50 rounded-md border border-purple-100">
            <div className="font-medium text-purple-800">Innovation</div>
            <div className="text-purple-700 text-xs">78% success rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};
