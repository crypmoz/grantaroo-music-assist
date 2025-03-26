
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { PaywallScreen } from "@/components/PaywallScreen";
import { GrantAssistantTabs } from "./GrantAssistantTabs";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const GrantAssistantLayout = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated, isPaidUser } = useAuth();
  
  // Handle login button click
  const handleLoginClick = () => {
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col space-y-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <Link to="/dashboard">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Grant Assistant
                </h1>
                <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  AI Powered
                </div>
              </div>
              <p className="text-muted-foreground mt-1 pl-9">
                Get personalized guidance for your music grant applications
              </p>
            </div>
          </div>

          {!isAuthenticated ? (
            <RequireAuthCard onLogin={handleLoginClick} />
          ) : !isPaidUser ? (
            <PaywallScreen />
          ) : (
            <div className="w-full">
              <GrantAssistantTabs />
            </div>
          )}
        </motion.div>
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
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8 border rounded-xl shadow-sm bg-white/80 backdrop-blur-sm"
    >
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
          className="px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          Sign In to Access
        </Button>
      </div>
    </motion.div>
  );
};
