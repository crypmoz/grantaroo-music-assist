
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, ChevronRight, Clock } from "lucide-react";
import { useState } from "react";

export const SuccessfulExamples = () => {
  const [category, setCategory] = useState("all");

  const examples = [
    {
      id: "ex-1",
      title: "Jazz Ensemble Recording Project",
      grant: "FACTOR - Juried Sound Recording",
      year: "2023",
      amount: "$20,000",
      artistType: "Ensemble",
      category: "recording",
      successFactors: [
        "Clear artistic vision with well-defined audience",
        "Realistic timeline with detailed milestones",
        "Specific marketing plan targeting niche audience"
      ]
    },
    {
      id: "ex-2",
      title: "Indigenous Music Heritage Project",
      grant: "Canada Council for the Arts",
      year: "2022",
      amount: "$18,000",
      artistType: "Solo Artist",
      category: "cultural",
      successFactors: [
        "Strong cultural significance and representation",
        "Meaningful community engagement component",
        "Clear articulation of artistic excellence and impact"
      ]
    },
    {
      id: "ex-3",
      title: "Emerging Artist Debut Album",
      grant: "Ontario Arts Council",
      year: "2023",
      amount: "$9,800",
      artistType: "Emerging Artist",
      category: "recording",
      successFactors: [
        "Innovative artistic approach with clear social impact",
        "Realistic budget with fair compensation practices",
        "Strong letters of support from industry professionals"
      ]
    }
  ];
  
  const filteredExamples = category === "all" 
    ? examples 
    : examples.filter(ex => ex.category === category);

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Successful Grant Examples</CardTitle>
        <CardDescription>
          Learn from funded projects that match your profile
        </CardDescription>
        <Tabs defaultValue="all" value={category} onValueChange={setCategory} className="mt-2">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="recording">Recording</TabsTrigger>
            <TabsTrigger value="cultural">Cultural</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredExamples.map((example) => (
            <div key={example.id} className="border rounded-lg p-3 hover:bg-accent/50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium line-clamp-1">{example.title}</h3>
                <Badge variant="outline" className="text-xs">
                  {example.year}
                </Badge>
              </div>
              
              <div className="text-sm text-muted-foreground mb-1">
                {example.grant}
              </div>
              
              <div className="flex items-center text-sm mb-3">
                <Star className="w-3.5 h-3.5 text-amber-500 mr-1" />
                <span className="font-medium text-amber-700">{example.amount} Awarded</span>
              </div>
              
              <div className="space-y-1.5 mb-3">
                <div className="text-xs font-medium">Success Factors:</div>
                <ul className="text-xs space-y-1">
                  {example.successFactors.map((factor, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <ChevronRight className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Button variant="link" size="sm" className="px-0 h-auto text-xs">
                <ExternalLink className="w-3 h-3 mr-1" />
                View Full Example
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
