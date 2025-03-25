
import { PaywallScreen } from "@/components/PaywallScreen";

export const PremiumRequiredScreen = () => {
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
