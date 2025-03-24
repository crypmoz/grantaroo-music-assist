
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useChatbot } from "@/context/ChatbotContext";
import { ExternalLink } from "lucide-react";

export const GrantSuggestions = () => {
  const { suggestedGrants, addMessage, setCurrentStep } = useChatbot();

  const handleSelectGrant = (grantId: string) => {
    const selectedGrant = suggestedGrants.find(g => g.id === grantId);
    
    if (selectedGrant) {
      addMessage(`I'd like to apply for the ${selectedGrant.name} grant from ${selectedGrant.provider}`, "user");
      
      setTimeout(() => {
        addMessage(`Great choice! The ${selectedGrant.name} grant offers up to ${selectedGrant.maxAmount} and has a deadline of ${selectedGrant.deadline}. Let's start working on your application. I'll guide you through each section of the form.`, "bot");
        setCurrentStep("application-form");
      }, 500);
    }
  };

  return (
    <div className="space-y-4 p-4">
      <h3 className="text-lg font-medium">Recommended Grants</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Based on your profile, these grants may be a good fit for your project.
      </p>
      
      <div className="space-y-4">
        {suggestedGrants.map((grant) => (
          <Card key={grant.id} className="border-l-4 border-l-primary">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{grant.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{grant.provider}</p>
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
            <CardFooter className="flex justify-between pt-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open(grant.url, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Official Page
              </Button>
              <Button 
                size="sm"
                onClick={() => handleSelectGrant(grant.id)}
              >
                Select Grant
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
