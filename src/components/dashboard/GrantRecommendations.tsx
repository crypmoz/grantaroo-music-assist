
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

export const GrantRecommendations = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { setCurrentStep, setSuggestedGrants } = useChatbot();
  const [userProfile, setUserProfile] = useState(null);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const [recommendedGrants, setRecommendedGrants] = useState([]);

  useEffect(() => {
    if (user) {
      // Get user profile
      const fetchProfile = async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (data) {
          setUserProfile(data);
        }
      };
      
      fetchProfile();
    }
  }, [user]);
  
  const getRecommendations = async () => {
    setIsLoadingRecommendations(true);
    
    // In a real app, this would be a more sophisticated AI matching algorithm
    // For now, we'll use the basic recommendations
    const recommendations = [
      {
        id: "factor-jsp",
        name: "Juried Sound Recording",
        provider: "FACTOR",
        matchScore: 92,
        deadline: "May 30, 2024",
        amount: "$25,000",
        description: "For professional musicians with commercial releases to fund album recording costs"
      },
      {
        id: "tac-music",
        name: "Music Creation and Recording",
        provider: "Canada Arts Council",
        matchScore: 86,
        deadline: "July 1, 2024",
        amount: "$15,000",
        description: "For professional artists creating original music in Canada"
      },
      {
        id: "oac-recording",
        name: "Popular Music Recording",
        provider: "Ontario Arts Council",
        matchScore: 78,
        deadline: "August 20, 2024",
        amount: "$10,000",
        description: "For Ontario-based musicians with prior releases"
      }
    ];
    
    // Store recommendations for use in other components
    setSuggestedGrants(recommendations);
    setRecommendedGrants(recommendations);
    
    setIsLoadingRecommendations(false);
  };

  useEffect(() => {
    if (userProfile) {
      getRecommendations();
    }
  }, [userProfile]);

  const handleStartApplication = (grant) => {
    // In a real implementation, you would:
    // 1. Create the application in the database
    // 2. Redirect to the application form pre-filled with profile data
    
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
                      {grant.matchScore}% Match
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
                      <span>Amount: {grant.amount}</span>
                    </div>
                    <p className="mt-2">{grant.description}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => window.open(`https://example.com/grants/${grant.id}`, "_blank")}
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
