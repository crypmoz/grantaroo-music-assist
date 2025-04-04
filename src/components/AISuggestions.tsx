
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Zap, Lightbulb, ClipboardCopy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useChatbot } from "@/context/ChatbotContext";

interface AISuggestionsProps {
  section: string;
}

const sectionSuggestions: Record<string, {
  title: string;
  description: string;
  tips: string[];
  examples: string[];
}> = {
  projectDescription: {
    title: "Project Description",
    description: "AI suggestions for your project description",
    tips: [
      "Clearly articulate your artistic vision and why it matters",
      "Highlight what makes your project unique or innovative",
      "Connect your project to current music trends or cultural conversations",
      "Emphasize outcomes and impact on your career development",
      "Use specific, concrete language rather than vague statements"
    ],
    examples: [
      "\"This album will blend traditional jazz instrumentation with modern electronic production techniques to create a soundscape that bridges generational divides in the genre.\"",
      "\"The recording project will document the evolution of Toronto's hip-hop scene through collaborations with five influential local artists spanning different eras.\""
    ]
  },
  budget: {
    title: "Budget",
    description: "AI suggestions for your budget section",
    tips: [
      "Be detailed and realistic about all costs",
      "Show research by including specific quotes where possible",
      "Demonstrate fair compensation for all artists involved",
      "Include a contingency line (typically 5-10% of total)",
      "Ensure budget aligns with the project scale described"
    ],
    examples: [
      "\"Studio recording: 4 days @ $500/day = $2,000 (quote attached from Revolution Recording)\"",
      "\"Musician fees: 3 session players × $250/session × 2 sessions = $1,500 (based on AFM minimum rates)\""
    ]
  },
  timeline: {
    title: "Timeline",
    description: "AI suggestions for your project timeline",
    tips: [
      "Break down your timeline into specific phases with dates",
      "Build in buffer time for unexpected delays",
      "Include key milestones and deliverables",
      "Demonstrate thoughtful pre-planning for efficiency",
      "Align timeline with the grant's reporting requirements"
    ],
    examples: [
      "\"Pre-production: April 1-30, 2024 (song selection, arrangement finalization, rehearsals)\"",
      "\"Marketing & Promotion: September 1-30, 2024 (press kit creation, single release, social media campaign launch)\""
    ]
  },
  impact: {
    title: "Community Impact",
    description: "AI suggestions for describing your project's impact",
    tips: [
      "Specify exactly who will benefit from your project",
      "Use concrete metrics where possible to measure impact",
      "Connect your work to broader community or industry needs",
      "Demonstrate how the project creates lasting value",
      "Include plans for documentation and sharing of outcomes"
    ],
    examples: [
      "\"This recording project will provide paid opportunities for 5 emerging Toronto jazz musicians while documenting an important musical collaboration.\"",
      "\"The workshop series will engage approximately 60 youth from underserved communities in music production skills, with a goal of 40% continuing to advanced training.\""
    ]
  }
};

export const AISuggestions = ({ section }: AISuggestionsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { addMessage } = useChatbot();
  
  const sectionData = sectionSuggestions[section] || {
    title: "AI Suggestions",
    description: "Select a section to see AI suggestions",
    tips: ["Click into a form field to see suggestions for that section"],
    examples: []
  };

  const handleCopyTip = (tip: string) => {
    navigator.clipboard.writeText(tip);
    toast.success("Copied to clipboard");
  };

  const handleCopyExample = (example: string) => {
    navigator.clipboard.writeText(example);
    toast.success("Copied to clipboard");
  };

  const handleGenerateCustomSuggestion = async () => {
    setIsGenerating(true);
    
    try {
      await addMessage(`Give me a specific suggestion for the ${sectionData.title} section of my grant application. I'm working on a music project.`, "user");
      toast.success("Generating custom suggestions in chat");
    } catch (error) {
      console.error("Error generating suggestions:", error);
      toast.error("Failed to generate suggestions");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-semibold">{sectionData.title}</CardTitle>
        </div>
        <CardDescription>{sectionData.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-amber-500" />
            <h3 className="font-medium text-sm">Tips from Successful Applications</h3>
          </div>
          <ul className="space-y-2">
            {sectionData.tips.map((tip, index) => (
              <li key={index} className="text-sm flex items-start gap-2 group">
                <span className="flex-grow">{tip}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleCopyTip(tip)}
                >
                  <ClipboardCopy className="h-3.5 w-3.5" />
                </Button>
              </li>
            ))}
          </ul>
        </div>

        {sectionData.examples.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              <h3 className="font-medium text-sm">Successful Examples</h3>
            </div>
            <ul className="space-y-3">
              {sectionData.examples.map((example, index) => (
                <li key={index} className="text-sm p-2 bg-muted rounded-md italic group relative">
                  {example}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80"
                    onClick={() => handleCopyExample(example)}
                  >
                    <ClipboardCopy className="h-3.5 w-3.5" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Button
          variant="outline"
          size="sm"
          className="w-full mt-4"
          onClick={handleGenerateCustomSuggestion}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>Generating...</>
          ) : (
            <>
              <Brain className="h-3.5 w-3.5 mr-2" /> Get Custom AI Suggestions
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
