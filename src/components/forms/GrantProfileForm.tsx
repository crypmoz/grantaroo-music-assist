
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  
  const [formData, setFormData] = useState({
    careerStage: "",
    genre: "",
    streamingNumbers: "",
    previousGrants: "",
    projectType: "",
    projectBudget: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.careerStage || !formData.projectType || !formData.projectBudget) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Update context with profile
    setUserProfile(formData);
    
    // Find matching grants
    const matches = findMatchingGrants(formData);
    setSuggestedGrants(matches);
    
    // Add messages to chat
    addMessage("I've completed my profile information", "user");
    
    const botResponse = `Based on your profile as a ${formData.careerStage} in the ${formData.genre || "music"} genre, I've identified ${matches.length} grants that could be a good fit for your ${formData.projectType} project with a budget of ${formData.projectBudget}.`;
    
    addMessage(botResponse, "bot");
    
    // Move to next step
    setCurrentStep("grant-suggestions");
    
    toast.success("Profile analyzed successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4">
      <div className="space-y-4">
        <div>
          <Label htmlFor="careerStage">Career Stage *</Label>
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
        </div>
        
        <div>
          <Label htmlFor="genre">Primary Music Genre</Label>
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
        </div>
        
        <div>
          <Label htmlFor="streamingNumbers">Monthly Streaming Numbers</Label>
          <Input
            id="streamingNumbers"
            placeholder="e.g., 10000"
            onChange={(e) => handleChange("streamingNumbers", e.target.value)}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Approximate monthly streams across all platforms
          </p>
        </div>
        
        <div>
          <Label htmlFor="previousGrants">Previous Grants (if any)</Label>
          <Input
            id="previousGrants"
            placeholder="List any previous grants received"
            onChange={(e) => handleChange("previousGrants", e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="projectType">Project Type *</Label>
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
        </div>
        
        <div>
          <Label htmlFor="projectBudget">Project Budget (CAD) *</Label>
          <Input
            id="projectBudget"
            placeholder="e.g., 10000"
            onChange={(e) => handleChange("projectBudget", e.target.value)}
            required
          />
        </div>
      </div>
      
      <Button type="submit" className="w-full">
        Analyze My Profile
      </Button>
    </form>
  );
};
