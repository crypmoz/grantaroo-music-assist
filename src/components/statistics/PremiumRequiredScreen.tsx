
import { PaywallScreen } from "@/components/PaywallScreen";
import { useAuth } from "@/context/AuthContext";
import { AuthRequiredScreen } from "./AuthRequiredScreen";
import { useState } from "react";
import { AuthModal } from "../auth/AuthModal";

export const PremiumRequiredScreen = () => {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSignInClick = () => {
    setShowAuthModal(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Grant Statistics</h1>
        <p className="text-muted-foreground mb-6">
          Sign in to access detailed statistics and analytics
        </p>
        <AuthRequiredScreen onSignInClick={handleSignInClick} />
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto text-center mb-8">
      <h1 className="text-3xl font-bold mb-2">Grant Statistics</h1>
      <p className="text-muted-foreground">
        Upgrade to premium to access detailed statistics and analytics
      </p>
      <div className="flex justify-center mt-6">
        <PaywallScreen />
      </div>
    </div>
  );
};
