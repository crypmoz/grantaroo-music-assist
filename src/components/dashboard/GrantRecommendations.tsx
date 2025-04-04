
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { CalendarIcon, ClockIcon, DollarSign, PercentIcon, Medal } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export const GrantRecommendations = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

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

  const handleStartApplication = (grantId: string) => {
    if (isAuthenticated) {
      navigate(`/grant-assistant?grantId=${grantId}`);
    } else {
      navigate("/grant-assistant");
    }
  };

  return (
    <TabsContent value="recommendations" className="space-y-4 animate-in">
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">
            Recommended Grants For You
          </h2>
          <Button variant="outline" onClick={() => navigate("/grant-assistant")}>
            Find More Grants
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((grant) => (
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
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => handleStartApplication(grant.id)}
                >
                  Start Application
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </TabsContent>
  );
};
