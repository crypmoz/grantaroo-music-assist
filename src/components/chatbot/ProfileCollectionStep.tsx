
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { careerStages, musicGenres, projectTypes } from "@/data/grantsData";
import { useState } from "react";

export type ProfileState = {
  careerStage: string;
  genre: string;
  projectType: string;
  projectBudget: string;
  [key: string]: string;
};

type ProfileQuestion = {
  field: string;
  question: string;
  component: React.ReactNode;
};

type ProfileCollectionStepProps = {
  onComplete: (profile: ProfileState) => void;
  onCancel: () => void;
};

export const ProfileCollectionStep = ({ onComplete, onCancel }: ProfileCollectionStepProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [profile, setProfile] = useState<ProfileState>({
    careerStage: "",
    genre: "",
    projectType: "",
    projectBudget: "",
  });

  const handleProfileChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const profileQuestions: ProfileQuestion[] = [
    {
      field: "careerStage",
      question: "What stage are you at in your music career?",
      component: (
        <Select 
          onValueChange={(value) => handleProfileChange("careerStage", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select career stage" />
          </SelectTrigger>
          <SelectContent>
            {careerStages.map((stage) => (
              <SelectItem key={stage} value={stage}>
                {stage}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    },
    {
      field: "genre",
      question: "What's your primary music genre?",
      component: (
        <Select 
          onValueChange={(value) => handleProfileChange("genre", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select genre" />
          </SelectTrigger>
          <SelectContent>
            {musicGenres.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    },
    {
      field: "projectType",
      question: "What type of project are you seeking funding for?",
      component: (
        <Select 
          onValueChange={(value) => handleProfileChange("projectType", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select project type" />
          </SelectTrigger>
          <SelectContent>
            {projectTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    },
    {
      field: "projectBudget",
      question: "What's your estimated project budget in CAD?",
      component: (
        <Textarea
          placeholder="e.g., 10000"
          onChange={(e) => handleProfileChange("projectBudget", e.target.value)}
          className="resize-none"
          rows={2}
        />
      )
    }
  ];

  const handleNextQuestion = () => {
    const currentField = profileQuestions[currentQuestion].field;
    
    if (!profile[currentField]) {
      toast.error("Please answer this question to continue");
      return;
    }
    
    if (currentQuestion < profileQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // All questions answered
      onComplete(profile);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 p-4 border rounded-lg bg-blue-50"
    >
      <h3 className="font-medium text-blue-700 mb-3">
        {profileQuestions[currentQuestion].question}
      </h3>
      
      <div className="mb-4">
        {profileQuestions[currentQuestion].component}
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          size="sm"
          onClick={handleNextQuestion}
        >
          {currentQuestion < profileQuestions.length - 1 ? "Next" : "Find Grants"}
        </Button>
      </div>
      
      <div className="mt-4 pt-3 border-t">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Profile completion</span>
          <span>{Math.round(((currentQuestion + 1) / profileQuestions.length) * 100)}%</span>
        </div>
        <Progress value={((currentQuestion + 1) / profileQuestions.length) * 100} className="h-1" />
      </div>
    </motion.div>
  );
};
