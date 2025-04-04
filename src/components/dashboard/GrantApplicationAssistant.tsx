
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircleCheck, FileText, PlayCircle, ScrollText, Brain, Hammer, LightbulbIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const GrantApplicationAssistant = () => {
  const navigate = useNavigate();
  
  const applicationSections = [
    {
      id: "project-summary",
      title: "Project Summary",
      description: "Concise overview of your music project",
      icon: <ScrollText className="h-5 w-5" />,
      aiTips: 3
    },
    {
      id: "artist-background",
      title: "Artist Background",
      description: "Your musical experience and accomplishments",
      icon: <FileText className="h-5 w-5" />,
      aiTips: 4
    },
    {
      id: "project-details",
      title: "Project Details",
      description: "In-depth explanation of your project",
      icon: <Hammer className="h-5 w-5" />,
      aiTips: 6
    },
    {
      id: "budget",
      title: "Budget",
      description: "Financial breakdown of your project",
      icon: <PlayCircle className="h-5 w-5" />,
      aiTips: 5
    }
  ];

  return (
    <TabsContent value="applications" className="animate-in">
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">
            Grant Application Assistant
          </h2>
          <Button onClick={() => navigate("/apply")}>
            Start New Application
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-500" />
                How Our AI Helps You
              </CardTitle>
              <CardDescription>
                Our AI analyzes successful grant applications to help you craft winning proposals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CircleCheck className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <strong className="font-medium">Document Analysis</strong>: Upload grant guidelines, 
                    and our AI will give you focused suggestions aligned with the funder's goals
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CircleCheck className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <strong className="font-medium">Section-by-Section Guidance</strong>: Get specific 
                    suggestions for each part of your application based on successful examples
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CircleCheck className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <strong className="font-medium">Grant Matching</strong>: Our system recommends 
                    grants that best match your profile and project
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CircleCheck className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <strong className="font-medium">Success Patterns</strong>: Learn what has worked 
                    for other musicians in your genre and career stage
                  </div>
                </li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-border">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <LightbulbIcon className="h-4 w-4 text-amber-500" />
                  Application Sections with AI Assistance
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {applicationSections.map((section) => (
                    <div key={section.id} className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                      <div className="rounded-full p-2 bg-primary/10">
                        {section.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{section.title}</h4>
                        <p className="text-xs text-muted-foreground">{section.description}</p>
                        <div className="text-xs text-primary mt-1">
                          {section.aiTips} AI-powered suggestions
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TabsContent>
  );
};
