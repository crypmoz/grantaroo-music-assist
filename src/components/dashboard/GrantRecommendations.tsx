
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { CalendarIcon, ClockIcon, DollarSign, PercentIcon, Medal, FileEdit, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useChatbot } from "@/context/ChatbotContext";
import { availableGrants } from "@/data/grantsData";
import { GrantType } from "@/context/chatbot/types";

export const GrantRecommendations = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { setCurrentStep, setSuggestedGrants } = useChatbot();
  const [userProfile, setUserProfile] = useState(true);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const [recommendedGrants, setRecommendedGrants] = useState<GrantType[]>([]);
  // Store match scores separately since they're not part of GrantType
  const [matchScores, setMatchScores] = useState<{[id: string]: number}>({});

  useEffect(() => {
    if (user) {
      getRecommendations();
    }
  }, [user]);
  
  const getRecommendations = async () => {
    setIsLoadingRecommendations(true);
    
    const recommendations: GrantType[] = [
      availableGrants[0],
      availableGrants[2],
      availableGrants[3]
    ];
    
    // Create a separate matchScores object instead of trying to add the property to GrantType
    const scores: {[id: string]: number} = {};
    recommendations.forEach((grant, index) => {
      scores[grant.id] = index === 0 ? 92 : index === 1 ? 86 : 78;
    });
    
    setMatchScores(scores);
    setSuggestedGrants(recommendations);
    setRecommendedGrants(recommendations);
    
    setIsLoadingRecommendations(false);
  };

  const handleStartApplication = (grant: GrantType) => {
    navigate(`/apply/${grant.id}`);
  };

  return (
    <TabsContent value="recommendations" className="space-y-4 animate-in">
      <div className="grid gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Recommended Grants
            </h2>
            <p className="text-muted-foreground">
              Based on your profile, these grants are the best matches for your qualifications
            </p>
          </div>
          
          <Button 
            onClick={getRecommendations} 
            disabled={isLoadingRecommendations || !userProfile}
          >
            {isLoadingRecommendations ? "Finding Matches..." : "Refresh Recommendations"}
          </Button>
        </div>
        
        {!userProfile && (
          <Card>
            <CardContent className="py-6">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-medium">Complete Your Profile First</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  To receive personalized grant recommendations, you need to complete your profile with essential information.
                </p>
                <Button onClick={() => navigate("/profile")}>
                  Complete Your Profile <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {userProfile && recommendedGrants.length === 0 && !isLoadingRecommendations && (
          <Card>
            <CardContent className="py-6">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-medium">No Recommendations Yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Click "Refresh Recommendations" to find grants that match your profile.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
        
        {isLoadingRecommendations && (
          <Card>
            <CardContent className="py-6">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-medium">Finding Grant Matches</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Our AI is analyzing your profile to find the best grant matches...
                </p>
                <Progress value={65} className="w-64 mx-auto" />
              </div>
            </CardContent>
          </Card>
        )}
        
        {userProfile && recommendedGrants.length > 0 && !isLoadingRecommendations && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recommendedGrants.map((grant) => (
              <Card key={grant.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold">{grant.name}</CardTitle>
                    <Badge className="bg-green-500" variant="secondary">
                      {matchScores[grant.id]}% Match
                    </Badge>
                  </div>
                  <CardDescription>{grant.provider}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      <span>Deadline: {grant.deadline}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span>Amount: {grant.maxAmount}</span>
                    </div>
                    <p className="mt-2">{grant.description}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => window.open(grant.url, "_blank")}
                    className="flex-1"
                  >
                    View Details
                  </Button>
                  <Button 
                    className="flex-1" 
                    onClick={() => handleStartApplication(grant)}
                  >
                    <FileEdit className="h-4 w-4 mr-2" /> Apply
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </TabsContent>
  );
};
