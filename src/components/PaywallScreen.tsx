
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export const PaywallScreen = () => {
  const { completePayment, isAuthenticated } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in before subscribing");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      completePayment();
      toast.success("Payment successful! You now have access to the Grant Assistant.");
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <Card className="w-[380px] max-w-full shadow-lg">
      <CardHeader className="bg-blue-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl">Premium Access</CardTitle>
        <CardDescription className="text-blue-100">
          Unlock our AI-powered Grant Assistant
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="text-center mb-6">
          <span className="text-3xl font-bold">$19.99</span>
          <span className="text-gray-500">/month</span>
          <p className="text-sm text-muted-foreground mt-1">Cancel anytime</p>
        </div>
        
        <div className="space-y-3">
          {[
            "AI-powered grant writing assistant",
            "24/7 access to grant experts",
            "Grant success metrics & analysis",
            "Custom application guides",
            "Personalized grant suggestions"
          ].map((feature, index) => (
            <div key={index} className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <p className="text-gray-700">{feature}</p>
            </div>
          ))}
          
          {[
            "Face-to-face consultations",
            "Full application submission service"
          ].map((feature, index) => (
            <div key={index} className="flex items-center text-gray-400">
              <X className="h-5 w-5 text-gray-300 mr-2 flex-shrink-0" />
              <p>{feature}</p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Button 
          onClick={handleSubscribe} 
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Subscribe Now"}
        </Button>
        
        <Button variant="ghost" size="sm" asChild className="w-full">
          <Link to="/dashboard" className="flex items-center justify-center gap-1">
            Return to Dashboard
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
