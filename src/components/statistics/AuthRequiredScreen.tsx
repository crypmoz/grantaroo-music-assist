
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AuthRequiredScreenProps {
  onSignInClick: () => void;
}

export const AuthRequiredScreen = ({ onSignInClick }: AuthRequiredScreenProps) => {
  return (
    <Card className="max-w-md mx-auto">
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <CardTitle>Sign in to view statistics</CardTitle>
          <CardDescription>
            Track your application statistics and success rates.
          </CardDescription>
          <Button 
            onClick={onSignInClick}
            className="w-full"
          >
            Sign In
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
