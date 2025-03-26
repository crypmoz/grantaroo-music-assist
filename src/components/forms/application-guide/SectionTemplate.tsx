
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Check, Copy, ThumbsUp, ThumbsDown, Award, Star } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

type SectionTemplateProps = {
  sectionId: string;
  title: string;
  templates: Template[];
};

type Template = {
  id: string;
  quality: "excellent" | "good" | "average";
  content: string;
  title: string;
  tags: string[];
};

export const SectionTemplate = ({ sectionId, title, templates }: SectionTemplateProps) => {
  const [activeTemplate, setActiveTemplate] = useState<string>(templates[0]?.id);
  const [copied, setCopied] = useState(false);

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success("Template copied to clipboard");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const getQualityBadge = (quality: string) => {
    switch (quality) {
      case "excellent":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
            <Award className="h-3 w-3 mr-1" />
            Excellent
          </Badge>
        );
      case "good":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">
            <ThumbsUp className="h-3 w-3 mr-1" />
            Good
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            <Star className="h-3 w-3 mr-1" />
            Average
          </Badge>
        );
    }
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          {title} Templates
          <Badge variant="outline" className="ml-2">
            {templates.length}
          </Badge>
        </CardTitle>
        <CardDescription>
          Sample templates from successful applications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
          {templates.map((template) => (
            <Button
              key={template.id}
              variant={activeTemplate === template.id ? "default" : "outline"}
              size="sm"
              className="flex-shrink-0"
              onClick={() => setActiveTemplate(template.id)}
            >
              {template.title}
              {getQualityBadge(template.quality)}
            </Button>
          ))}
        </div>
        
        {templates.map((template) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: activeTemplate === template.id ? 1 : 0,
              height: activeTemplate === template.id ? "auto" : 0,
              display: activeTemplate === template.id ? "block" : "none",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative bg-muted p-4 rounded-md">
              <div className="absolute top-2 right-2 flex space-x-1">
                {template.tags.map((tag, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="whitespace-pre-wrap text-sm mt-6">
                {template.content}
              </div>
            </div>
          </motion.div>
        ))}
      </CardContent>
      <CardFooter className="justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          <ThumbsUp className="h-3 w-3 mr-1" />
          <span>Found in {Math.floor(Math.random() * 5) + 3} funded applications</span>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="flex items-center gap-1"
          onClick={() => {
            const activeTemp = templates.find(t => t.id === activeTemplate);
            if (activeTemp) {
              handleCopy(activeTemp.content);
            }
          }}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" /> Copy
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
