
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { StatisticsSummary } from "@/components/statistics/StatisticsSummary";
import { StatisticsOverview } from "@/components/statistics/StatisticsOverview";
import { AuthRequiredScreen } from "@/components/statistics/AuthRequiredScreen";
import { PremiumRequiredScreen } from "@/components/statistics/PremiumRequiredScreen";

const Statistics = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated, isPaidUser } = useAuth();
  
  // Sample statistics data
  const statisticsData = {
    successRate: {
      percentage: 67,
      approvedCount: 6,
      totalCount: 9
    },
    totalFunding: {
      amount: "$25,000",
      description: "Across all successful grants"
    },
    applications: {
      count: 10,
      description: "Total applications to date"
    }
  };
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <AuthRequiredScreen onSignInClick={() => setShowAuthModal(true)} />
        </main>
        <Footer />
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
      </div>
    );
  }
  
  if (!isPaidUser) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <PremiumRequiredScreen />
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Grant Statistics</h1>
          
          <StatisticsSummary {...statisticsData} />
          <StatisticsOverview />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Statistics;
