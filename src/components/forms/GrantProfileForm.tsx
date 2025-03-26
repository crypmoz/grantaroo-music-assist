
import { useState } from "react";
import { useChatbot } from "@/context/ChatbotContext";
import { findMatchingGrants } from "@/data/grantsData";
import { toast } from "sonner";
import { QuestionItem } from "./grant-profile/QuestionItem";
import { NavigationButtons } from "./grant-profile/NavigationButtons";
import { getProfileQuestions, QuestionType } from "./grant-profile/ProfileQuestions";

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

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const questions = getProfileQuestions({ handleChange });
  
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

  const currentQuestionData: QuestionType = questions[currentQuestion];

  return (
    <div className="space-y-6 p-1 animate-fadeIn">
      <QuestionItem 
        question={currentQuestionData.question}
        required={currentQuestionData.required}
      >
        {currentQuestionData.component}
      </QuestionItem>
      
      <NavigationButtons 
        isLastQuestion={currentQuestion === questions.length - 1}
        isRequired={currentQuestionData.required}
        onNext={handleNext}
        onSkip={handleSkip}
      />
    </div>
  );
};
