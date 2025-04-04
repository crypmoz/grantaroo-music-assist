
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Brain, Lightbulb, FileText, Sparkles } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

export const GrantApplicationAssistant = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("help");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState("");
  
  const handleGenerateContent = () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt first");
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = {
        bio: "Your artist bio should highlight your unique musical journey and artistic vision. Start with your background, mention key achievements, and emphasize what makes your music distinctive. Describe your artistic philosophy and future goals while keeping the tone professional yet engaging.",
        budget: "For your budget section, be specific and comprehensive. Break down costs by categories like recording ($5,000), mixing/mastering ($2,000), musicians ($3,000), artwork ($800), and promotion ($1,200). Include quotes from professionals where possible, and ensure your numbers are realistic and well-researched.",
        impact: "When describing community impact, focus on both immediate and long-term benefits. Explain how your project will engage the local music community through mentorship, collaborations, or workshops. Quantify your reach with specific audience numbers and provide examples of previous community work you've done."
      };
      
      let generatedText = "";
      
      if (prompt.toLowerCase().includes("bio") || prompt.toLowerCase().includes("biography")) {
        generatedText = responses.bio;
      } else if (prompt.toLowerCase().includes("budget") || prompt.toLowerCase().includes("financial")) {
        generatedText = responses.budget;
      } else if (prompt.toLowerCase().includes("impact") || prompt.toLowerCase().includes("community")) {
        generatedText = responses.impact;
      } else {
        generatedText = "Based on your prompt, I recommend focusing on these key aspects in your application:\n\n1. Clearly articulate your artistic vision and how this grant will help you achieve it.\n\n2. Provide specific details about your project timeline, milestones, and deliverables.\n\n3. Demonstrate the impact your project will have on both your career development and the broader music community.\n\n4. Include relevant past experiences that showcase your ability to successfully complete the project.";
      }
      
      setResult(generatedText);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <TabsContent value="assistant" className="space-y-4 animate-in">
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              AI Grant Application Assistant
            </CardTitle>
            <CardDescription>
              Get AI help with drafting and improving different sections of your grant application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="help" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid grid-cols-3 gap-2">
                <TabsTrigger value="help" className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Get Help
                </TabsTrigger>
                <TabsTrigger value="improve" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Improve Text
                </TabsTrigger>
                <TabsTrigger value="templates" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Templates
                </TabsTrigger>
              </TabsList>
              
              <div>
                {activeTab === "help" && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Ask the AI to help you draft a specific section of your application or get advice on grant writing.
                    </p>
                    
                    <div className="space-y-2">
                      <Textarea 
                        placeholder="Example: Help me write an artist bio for my grant application"
                        className="min-h-24"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                      />
                      
                      <div className="flex justify-between">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => setPrompt("Help me write an artist bio")}>
                            Artist Bio
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => setPrompt("Help me create a project budget")}>
                            Budget
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => setPrompt("Help me describe the community impact")}>
                            Impact
                          </Button>
                        </div>
                        
                        <Button 
                          onClick={handleGenerateContent}
                          disabled={isGenerating || !prompt.trim()}
                        >
                          {isGenerating ? "Generating..." : "Generate"}
                        </Button>
                      </div>
                    </div>
                    
                    {result && (
                      <Card className="border-green-200 bg-green-50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">AI Suggestion</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ScrollArea className="h-48">
                            <div className="space-y-2 whitespace-pre-wrap">
                              {result}
                            </div>
                          </ScrollArea>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              navigator.clipboard.writeText(result);
                              toast.success("Copied to clipboard");
                            }}
                          >
                            Copy to Clipboard
                          </Button>
                        </CardFooter>
                      </Card>
                    )}
                  </div>
                )}
                
                {activeTab === "improve" && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Paste text from your application to get AI suggestions for improvements.
                    </p>
                    
                    <div className="space-y-2">
                      <Textarea 
                        placeholder="Paste your text here for AI improvement suggestions"
                        className="min-h-32"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                      />
                      
                      <div className="flex justify-end">
                        <Button 
                          onClick={handleGenerateContent}
                          disabled={isGenerating || !prompt.trim()}
                        >
                          {isGenerating ? "Analyzing..." : "Improve Text"}
                        </Button>
                      </div>
                    </div>
                    
                    {result && (
                      <Card className="border-blue-200 bg-blue-50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Improvement Suggestions</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ScrollArea className="h-48">
                            <div className="space-y-2 whitespace-pre-wrap">
                              {result}
                            </div>
                          </ScrollArea>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              navigator.clipboard.writeText(result);
                              toast.success("Copied to clipboard");
                            }}
                          >
                            Copy to Clipboard
                          </Button>
                        </CardFooter>
                      </Card>
                    )}
                  </div>
                )}
                
                {activeTab === "templates" && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Use pre-made templates for common grant application sections.
                    </p>
                    
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Artist Bio Template</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                          <p>A structured template for writing a professional artist biography.</p>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => {
                              setActiveTab("help");
                              setPrompt("Generate artist bio template");
                              handleGenerateContent();
                            }}
                          >
                            Use Template
                          </Button>
                        </CardFooter>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Project Timeline</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                          <p>A template for creating a detailed project timeline with milestones.</p>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => {
                              setActiveTab("help");
                              setPrompt("Generate project timeline template");
                              handleGenerateContent();
                            }}
                          >
                            Use Template
                          </Button>
                        </CardFooter>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Budget Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                          <p>A comprehensive budget template with common music project expense categories.</p>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => {
                              setActiveTab("help");
                              setPrompt("Generate budget breakdown template");
                              handleGenerateContent();
                            }}
                          >
                            Use Template
                          </Button>
                        </CardFooter>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Community Impact</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                          <p>A template for describing how your project will benefit the music community.</p>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => {
                              setActiveTab("help");
                              setPrompt("Generate community impact template");
                              handleGenerateContent();
                            }}
                          >
                            Use Template
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                )}
              </div>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              onClick={() => navigate("/grant-assistant")}
              className="w-full"
            >
              Open Full AI Assistant
            </Button>
          </CardFooter>
        </Card>
      </div>
    </TabsContent>
  );
};
