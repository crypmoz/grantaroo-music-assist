
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useChatbot } from "@/context/ChatbotContext";
import { careerStages, musicGenres, projectTypes, findMatchingGrants } from "@/data/grantsData";
import { toast } from "sonner";

export const GrantProfileForm = () => {
  const { setUserProfile, addMessage, setSuggestedGrants, setCurrentStep } = useChatbot();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState({
    careerStage: "",
    genre: "",
    streamingNumbers: "",
    previousGrants: "",
    projectType: "",
    projectBudget: "",
  });

  const questions = [
    {
      id: "careerStage",
      question: "What stage are you at in your music career?",
      required: true,
      component: (
        <Select 
          onValueChange={(value) => handleChange("careerStage", value)} 
          required
        >
          <SelectTrigger id="careerStage">
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
      id: "genre",
      question: "What's your primary music genre?",
      required: false,
      component: (
        <Select 
          onValueChange={(value) => handleChange("genre", value)}
        >
          <SelectTrigger id="genre">
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
      id: "streamingNumbers",
      question: "Approximately how many monthly streams do you have across all platforms?",
      required: false,
      component: (
        <Input
          id="streamingNumbers"
          placeholder="e.g., 10000"
          onChange={(e) => handleChange("streamingNumbers", e.target.value)}
        />
      )
    },
    {
      id: "previousGrants",
      question: "Have you received any grants before? If yes, please list them.",
      required: false,
      component: (
        <Input
          id="previousGrants"
          placeholder="List any previous grants received"
          onChange={(e) => handleChange("previousGrants", e.target.value)}
        />
      )
    },
    {
      id: "projectType",
      question: "What type of project are you seeking funding for?",
      required: true,
      component: (
        <Select 
          onValueChange={(value) => handleChange("projectType", value)}
          required
        >
          <SelectTrigger id="projectType">
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
      id: "projectBudget",
      question: "What's your estimated project budget in CAD?",
      required: true,
      component: (
        <Input
          id="projectBudget"
          placeholder="e.g., 10000"
          onChange={(e) => handleChange("projectBudget", e.target.value)}
          required
        />
      )
    }
  ];

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleNext = () => {
    const currentField = questions[currentQuestion].id;
    
    // Validate required fields
    if (questions[currentQuestion].required && !formData[currentField as keyof typeof formData]) {
      toast.error("This field is required");
      return;
    }
    
    // Add the question and answer to the chat
    const question = questions[currentQuestion].question;
    const answer = formData[currentField as keyof typeof formData];
    
    // Only add to chat if there's an answer (for optional fields)
    if (answer) {
      addMessage(question, "assistant");
      addMessage(answer, "user");
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      completeProfile();
    }
  };

  const completeProfile = () => {
    // Update context with profile
    setUserProfile(formData);
    
    // Find matching grants
    const matches = findMatchingGrants(formData);
    setSuggestedGrants(matches);
    
    // Add a summary message
    const botResponse = `Based on your profile as a ${formData.careerStage} in the ${formData.genre || "music"} genre, I've identified ${matches.length} grants that could be a good fit for your ${formData.projectType} project with a budget of ${formData.projectBudget}.`;
    
    addMessage(botResponse, "assistant");
    
    // Move to next step
    setCurrentStep("suggestions");
    
    toast.success("Profile analyzed successfully!");
  };

  const handleSkip = () => {
    if (!questions[currentQuestion].required) {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        
        // Add the skipped question to chat
        addMessage(questions[currentQuestion].question, "assistant");
        addMessage("I prefer not to answer this question", "user");
      } else {
        completeProfile();
      }
    } else {
      toast.error("This information is required for grant matching");
    }
  };

  return (
    <div className="space-y-6 p-1 animate-fadeIn">
      <div className="mb-4">
        <h3 className="text-lg font-medium">
          {questions[currentQuestion].question}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {questions[currentQuestion].required ? "* Required" : "Optional"}
        </p>
      </div>
      
      <div>
        {questions[currentQuestion].component}
      </div>
      
      <div className="flex gap-2">
        <Button 
          onClick={handleNext} 
          className="flex-1"
        >
          {currentQuestion === questions.length - 1 ? "Complete Profile" : "Next"}
        </Button>
        
        {!questions[currentQuestion].required && (
          <Button 
            variant="outline" 
            onClick={handleSkip}
          >
            Skip
          </Button>
        )}
      </div>
    </div>
  );
};
