
import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PaywallScreen as FullPaywallScreen } from "@/components/PaywallScreen";

type PaywallScreenProps = {
  isAuthenticated: boolean;
  isPaidUser: boolean;
  profile: {
    careerStage: string;
    genre: string;
    projectType: string;
    projectBudget: string;
  };
  onLoginClick: () => void;
  onResetChat: () => void;
};

export const PaywallScreen = ({ 
  isAuthenticated, 
  isPaidUser, 
  profile, 
  onLoginClick, 
  onResetChat 
}: PaywallScreenProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center overflow-y-auto">
      <div className="max-w-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-6 rounded-full mx-auto mb-4 w-20 h-20 flex items-center justify-center">
            <Bot className="h-10 w-10 text-blue-600" />
          </div>
          
          <h3 className="text-xl font-bold mb-2">Perfect Matches Found!</h3>
          <p className="text-gray-600 mb-6">
            I've found {Math.floor(Math.random() * 5) + 3} grants that perfectly match your profile as 
            a {profile.careerStage} in the {profile.genre} genre.
          </p>
          
          <div className="space-y-4">
            {!isAuthenticated ? (
              <Button onClick={onLoginClick} className="w-full">
                Sign In to View Matches
              </Button>
            ) : !isPaidUser ? (
              <div className="w-full">
                <FullPaywallScreen />
              </div>
            ) : (
              <Button onClick={() => window.location.href = '/assistant'} className="w-full">
                Open Full Assistant
              </Button>
            )}
            
            <Button 
              variant="outline" 
              onClick={onResetChat}
              className="w-full"
            >
              Start a New Chat
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
