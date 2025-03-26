import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle, ChevronDown, ChevronUp, Check, Star, Copy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useChatbot } from "@/context/ChatbotContext";
import { toast } from "sonner";
import { Section } from "./FormSections";
import { HelpPrompt } from "./HelpPrompt";

export type Template = {
  id: string;
  quality: "excellent" | "good" | "average";
  title: string;
  content: string;
  tags: string[];
};

export interface FormSectionCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  examples?: Template[];
  tips?: string[];
  advice?: string;
  hasSuccessInsights?: boolean;
  relevantFactors?: string[];
}

export const FormSectionCard = ({
  id,
  title,
  description,
  icon,
  examples,
  tips,
  advice,
  hasSuccessInsights,
  relevantFactors
}: FormSectionCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [userContent, setUserContent] = useState("");
  const { addMessage } = useChatbot();

  const handleSubmitForFeedback = () => {
    if (!userContent.trim()) {
      toast.error("Please enter some content to get feedback");
      return;
    }
    
    const prompt = `I'm working on the ${title.toLowerCase()} section of my grant application. Here's what I've written:\n\n${userContent}\n\nCan you give me feedback and suggestions to improve this section?`;
    
    addMessage(prompt, "user");
    toast.success("Your content has been sent for feedback!");
  };
  
  const handleCopyExample = (example: Template) => {
    setUserContent(example.content);
    toast.success(`Example copied to editor!`);
  };
  
  const handleGetHelp = (prompt: string) => {
    addMessage(prompt, "user");
  };

  const getExampleBadgeColor = (quality: "excellent" | "good" | "average") => {
    switch (quality) {
      case "excellent":
        return "bg-green-100 text-green-700 border-green-200";
      case "good":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "average":
        return "bg-amber-100 text-amber-700 border-amber-200";
      default:
        return "";
    }
  };

  const getExampleBadgeIcon = (quality: "excellent" | "good" | "average") => {
    switch (quality) {
      case "excellent":
        return <Check className="h-3 w-3 mr-1" />;
      case "good":
        return <Star className="h-3 w-3 mr-1" />;
      case "average":
        return null;
      default:
        return null;
    }
  };

  return (
    <Card className="mb-4 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="p-4 pb-0 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              {icon}
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <CardContent className="p-4">
            <div className="space-y-4">
              {/* Tips Section */}
              {tips && tips.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-blue-500" />
                    Essential Tips
                  </h4>
                  <ul className="space-y-1 text-sm">
                    {tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="bg-primary/10 text-primary font-medium rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5">
                          {index + 1}
                        </span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Expert Advice */}
              {advice && (
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-md">
                  <h4 className="text-sm font-medium mb-2 text-blue-700">Expert Insights</h4>
                  <p className="text-sm text-blue-700 whitespace-pre-line">{advice}</p>
                  
                  {hasSuccessInsights && relevantFactors && relevantFactors.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-blue-200">
                      <h5 className="text-xs font-medium mb-1 text-blue-700">Insights from successful applications:</h5>
                      <ul className="space-y-1">
                        {relevantFactors.map((factor, idx) => (
                          <li key={idx} className="text-xs text-blue-700 flex items-start gap-1">
                            <Check className="h-3 w-3 text-blue-500 mt-0.5" />
                            <span>{factor}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              
              {/* Quick Help Prompts */}
              <HelpPrompt onSelectPrompt={handleGetHelp} />
              
              {/* Content Editor */}
              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium">Your content</h4>
                  {examples && examples.length > 0 && (
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="text-xs p-0 h-auto"
                      onClick={() => setShowExamples(!showExamples)}
                    >
                      {showExamples ? "Hide Examples" : "Show Examples"}
                    </Button>
                  )}
                </div>
                
                <Textarea
                  placeholder={`Start drafting your ${title.toLowerCase()} here...`}
                  className="min-h-[150px]"
                  value={userContent}
                  onChange={(e) => setUserContent(e.target.value)}
                />
                
                <div className="flex justify-end">
                  <Button 
                    size="sm"
                    onClick={handleSubmitForFeedback}
                    disabled={!userContent.trim()}
                  >
                    Get AI Feedback
                  </Button>
                </div>
              </div>
              
              {/* Example Sections */}
              {showExamples && examples && examples.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3 pt-4 border-t"
                >
                  <h4 className="text-sm font-medium">Example submissions</h4>
                  
                  {examples.map((example) => (
                    <div key={example.id} className="border rounded-md p-3 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-sm">{example.title}</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            <Badge 
                              variant="outline" 
                              className={cn("text-xs", getExampleBadgeColor(example.quality))}
                            >
                              {getExampleBadgeIcon(example.quality)}
                              {example.quality.charAt(0).toUpperCase() + example.quality.slice(1)}
                            </Badge>
                            
                            {example.tags.map((tag, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7"
                          onClick={() => handleCopyExample(example)}
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      <div className="text-sm text-muted-foreground bg-muted/50 p-2 rounded-md whitespace-pre-wrap">
                        {example.content}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </CardContent>
        </motion.div>
      )}
    </Card>
  );
};
