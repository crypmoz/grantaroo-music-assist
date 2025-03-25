
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BarChart, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { PaywallScreen } from "@/components/PaywallScreen";
import { GrantAssistantTabs } from "./GrantAssistantTabs";
import { GrantAssistantAIPanel } from "./GrantAssistantAIPanel";

export const GrantAssistantLayout = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const { isAuthenticated, isPaidUser } = useAuth();
  
  // Handle login button click
  const handleLoginClick = () => {
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Grant Assistant</h1>
              <p className="text-muted-foreground mt-1">AI-powered guidance for your music grant applications</p>
            </div>
            
            {isPaidUser && (
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => setShowStats(!showStats)}
              >
                <BarChart className="h-4 w-4" />
                {showStats ? "Hide Statistics" : "View Success Statistics"}
              </Button>
            )}
          </div>

          {!isAuthenticated ? (
            <RequireAuthCard onLogin={handleLoginClick} />
          ) : !isPaidUser ? (
            <PaywallScreen />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <GrantAssistantTabs />
              </div>
              
              <div className="lg:col-span-1">
                <GrantAssistantAIPanel showStats={showStats} />
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
};

const RequireAuthCard = ({ onLogin }: { onLogin: () => void }) => {
  return (
    <div className="p-8 border rounded-lg shadow-sm">
      <div className="flex flex-col items-center justify-center text-center space-y-6">
        <div className="bg-primary/10 p-4 rounded-full">
          <Lock className="h-10 w-10 text-primary" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Grant Assistant Access</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Sign in to access our AI-powered Grant Assistant and improve your chances of securing music funding.
          </p>
        </div>
        <Button 
          size="lg" 
          onClick={onLogin}
          className="px-8"
        >
          Sign In to Access
        </Button>
      </div>
    </div>
  );
};
