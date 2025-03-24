
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { useChatbot } from "@/context/ChatbotContext";
import { Upload, ArrowRight, ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

// Sample application sections for demo purposes
const applicationSections = [
  {
    id: "project-summary",
    label: "Project Summary",
    description: "Provide a clear, concise overview of your project (150-250 words)",
    tips: [
      "Be specific about what you want to accomplish",
      "Highlight what makes your project unique",
      "Mention the intended audience/community impact",
      "Connect your project to the grant's objectives"
    ],
    examples: "Our album 'Urban Melodies' will explore the intersection of jazz and electronic music, creating an immersive sonic experience that reflects Toronto's diverse musical landscape. The project includes studio recording of 8 original compositions, collaborating with 5 local musicians, and will culminate in a release concert at the Rivoli."
  },
  {
    id: "artist-background",
    label: "Artist Background",
    description: "Describe your musical background, achievements, and career trajectory (200-300 words)",
    tips: [
      "Highlight relevant experience and training",
      "Mention notable performances or releases",
      "Include awards, press coverage, or critical reception",
      "Explain how this project fits into your artistic development"
    ],
    examples: "With over 5 years in Toronto's indie scene, I've released two EPs that received coverage in NOW Magazine and CBC Radio. My 2022 EP 'Northbound' reached 100,000+ streams and led to performances at NXNE and Canadian Music Week. This project represents my transition to a fuller ensemble sound, building on my established audience while pushing my artistic boundaries."
  },
  {
    id: "budget",
    label: "Budget",
    description: "Provide a detailed breakdown of project expenses and revenue sources",
    tips: [
      "Include quotes from service providers when possible",
      "Be realistic and detailed about all costs",
      "Ensure budget items align with project description",
      "Include both confirmed and anticipated funding sources",
      "Reflect fair compensation for all artists involved"
    ],
    examples: "Studio recording (10 days @ $500/day): $5,000\nMusician fees (5 musicians): $3,500\nMixing and mastering: $2,000\nAlbum artwork and design: $1,200\nDigital distribution: $300\nMarketing and promotion: $1,000\nTOTAL: $13,000"
  },
  {
    id: "timeline",
    label: "Project Timeline",
    description: "Outline the schedule for your project, from pre-production to completion",
    tips: [
      "Include specific dates or months for key milestones",
      "Account for potential delays",
      "Include pre-production, production, and post-production phases",
      "Include marketing and release plans"
    ],
    examples: "June-July 2024: Pre-production, finalize arrangements\nAugust 2024: Studio recording sessions\nSeptember 2024: Mixing and mastering\nOctober 2024: Artwork and promotional materials\nNovember 2024: Digital release and promotion\nDecember 2024: Release concert at The Great Hall"
  },
  {
    id: "supporting-materials",
    label: "Supporting Materials",
    description: "Upload samples of your previous work, press coverage, or other relevant documents",
    tips: [
      "Include your strongest work samples",
      "Provide context for each supporting document",
      "Ensure files meet the technical requirements (format, size)",
      "Include press coverage or testimonials if available"
    ],
    examples: "1. Demo recording of two tracks from the proposed album\n2. Press clippings from NOW Magazine interview\n3. Video of recent live performance\n4. Letter of support from venue partner\n5. Music CV with detailed performance history"
  }
];

export const ApplicationFormGuide = () => {
  const { addMessage } = useChatbot();
  const [activeTab, setActiveTab] = useState("project-summary");
  const [formContent, setFormContent] = useState<Record<string, string>>({});
  
  const activeSection = applicationSections.find(section => section.id === activeTab);
  const currentIndex = applicationSections.findIndex(section => section.id === activeTab);
  
  const handleNext = () => {
    if (currentIndex < applicationSections.length - 1) {
      setActiveTab(applicationSections[currentIndex + 1].id);
    }
  };
  
  const handlePrev = () => {
    if (currentIndex > 0) {
      setActiveTab(applicationSections[currentIndex - 1].id);
    }
  };
  
  const handleContentChange = (content: string) => {
    setFormContent(prev => ({
      ...prev,
      [activeTab]: content
    }));
  };
  
  const handleSaveProgress = () => {
    // In a real app, this would save to a database
    toast.success("Progress saved successfully!");
    
    addMessage(`I've completed the ${activeSection?.label} section of my application.`, "user");
    
    setTimeout(() => {
      addMessage(`Great progress on the ${activeSection?.label}! Your content looks strong. Remember to address all the key points from the guidelines before finalizing.`, "bot");
    }, 500);
  };
  
  const handleUpload = () => {
    // In a real app, this would trigger a file upload
    toast.success("File uploaded successfully!");
  };

  return (
    <div className="p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-4">
          {applicationSections.map(section => (
            <TabsTrigger 
              key={section.id} 
              value={section.id}
              className="text-xs md:text-sm"
            >
              {section.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {applicationSections.map(section => (
          <TabsContent key={section.id} value={section.id} className="space-y-4">
            <h3 className="text-lg font-medium">{section.label}</h3>
            <p className="text-sm text-muted-foreground">
              {section.description}
            </p>
            
            <Card className="bg-secondary/50">
              <CardContent className="pt-6">
                <h4 className="font-medium mb-2">Writing Tips</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {section.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
                
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Example</h4>
                  <p className="text-sm bg-background p-3 rounded-md whitespace-pre-wrap">
                    {section.examples}
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {section.id === "supporting-materials" ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Drag and drop files, or click to upload
                </p>
                <Button onClick={handleUpload} variant="outline" className="mt-4">
                  Upload Files
                </Button>
              </div>
            ) : (
              <Textarea
                value={formContent[section.id] || ""}
                onChange={(e) => handleContentChange(e.target.value)}
                placeholder={`Write your ${section.label.toLowerCase()} here...`}
                className="min-h-[200px]"
              />
            )}
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        
        <Button
          onClick={handleSaveProgress}
          variant="secondary"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Progress
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={currentIndex === applicationSections.length - 1}
        >
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
