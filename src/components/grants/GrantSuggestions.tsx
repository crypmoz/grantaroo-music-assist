
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useChatbot } from "@/context/ChatbotContext";
import { ExternalLink, Check, LightbulbIcon } from "lucide-react";
import { findSuccessfulApplications, getRelevantSuccessFactors } from "@/data/successfulGrantsData";
import { Badge } from "@/components/ui/badge";

export const GrantSuggestions = () => {
  const { 
    suggestedGrants, 
    addMessage, 
    setCurrentStep, 
    userProfile, 
    successfulAppData,
    setSuccessfulAppData 
  } = useChatbot();

  const handleSelectGrant = (grantId: string) => {
    const selectedGrant = suggestedGrants.find(g => g.id === grantId);
    
    if (selectedGrant) {
      // Get success factors based on this grant's successful applications
      const successFactors = findSuccessfulApplications(grantId)
        .flatMap(app => app.successFactors);
      
      // Store these factors for use in the application form guide
      setSuccessfulAppData({
        ...successfulAppData,
        appliedFactors: [...new Set(successFactors)]
      });

      addMessage(`I'd like to apply for the ${selectedGrant.name} grant from ${selectedGrant.provider}`, "user");
      
      setTimeout(() => {
        addMessage(`Great choice! The ${selectedGrant.name} grant offers up to ${selectedGrant.maxAmount} and has a deadline of ${selectedGrant.deadline}. Let's start working on your application. I'll guide you through each section of the form using insights from successful applications.`, "assistant");
        setCurrentStep("application-form");
      }, 500);
    }
  };

  const showSuccessfulExamples = (grantId: string) => {
    const examples = findSuccessfulApplications(grantId);
    
    if (examples && examples.length > 0) {
      // Toggle showing examples in the UI
      setSuccessfulAppData({
        ...successfulAppData,
        isShowingExamples: !successfulAppData.isShowingExamples
      });
      
      // Add a message with example information
      const example = examples[0]; // Taking the first example for now
      addMessage(`📊 **Success Analysis**: ${example.projectDescription}\n\n💰 Awarded ${example.amountAwarded} in ${example.yearAwarded}\n\n**Key Success Factors:**\n${example.successFactors.map(f => `• ${f}`).join('\n')}\n\n**Budget Approach:**\n${example.budgetHighlights}`, "assistant");
    }
  };

  // Get general success factors based on user profile
  const getSuccessInsights = () => {
    if (!userProfile) return;
    
    const relevantFactors = getRelevantSuccessFactors(
      userProfile.careerStage,
      userProfile.projectType
    );
    
    if (relevantFactors.length > 0) {
      addMessage(`📈 Based on successful ${userProfile.careerStage.toLowerCase()} applications for ${userProfile.projectType.toLowerCase()} projects, here are key factors that led to success:\n\n${relevantFactors.map(f => `• ${f}`).join('\n')}`, "assistant");
    }
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Recommended Grants</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={getSuccessInsights}
          className="flex items-center gap-1"
        >
          <LightbulbIcon className="h-4 w-4" />
          Success Insights
        </Button>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        Based on your profile, these grants may be a good fit for your project.
      </p>
      
      <div className="space-y-4">
        {suggestedGrants.map((grant) => {
          const successExamples = findSuccessfulApplications(grant.id);
          const hasExamples = successExamples.length > 0;
          
          return (
            <Card key={grant.id} className="border-l-4 border-l-primary">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{grant.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{grant.provider}</p>
                  </div>
                  {hasExamples && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <Check className="h-3 w-3 mr-1" /> Success Data
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="font-medium">Deadline</p>
                    <p>{grant.deadline}</p>
                  </div>
                  <div>
                    <p className="font-medium">Max Amount</p>
                    <p>{grant.maxAmount}</p>
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="font-medium text-sm">Eligibility</p>
                  <ul className="list-disc list-inside text-sm">
                    {grant.eligibility.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2 flex-wrap gap-2">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(grant.url, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Official Page
                  </Button>
                  
                  {hasExamples && (
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={() => showSuccessfulExamples(grant.id)}
                    >
                      <LightbulbIcon className="h-4 w-4 mr-1" />
                      Success Example
                    </Button>
                  )}
                </div>
                
                <Button 
                  size="sm"
                  onClick={() => handleSelectGrant(grant.id)}
                >
                  Select Grant
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
