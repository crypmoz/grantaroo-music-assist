
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { GrantRecommendations } from "@/components/dashboard/GrantRecommendations";
import { DashboardProfile } from "@/components/dashboard/DashboardProfile";
import { GrantApplicationAssistant } from "@/components/dashboard/GrantApplicationAssistant";
import { DashboardApplications } from "@/components/dashboard/DashboardApplications";
import { TabsContent } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
    
    // Check if a specific tab was requested in the location state
    if (location.state && location.state.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [isAuthenticated, navigate, location.state]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-6 pb-16">
        <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
          <TabsContent value="overview" className="space-y-4 animate-in">
            <DashboardOverview />
          </TabsContent>
          
          <TabsContent value="profile" className="animate-in">
            <DashboardProfile />
          </TabsContent>
          
          <TabsContent value="recommendations" className="animate-in">
            <GrantRecommendations />
          </TabsContent>
          
          <TabsContent value="applications" className="animate-in">
            <DashboardApplications />
          </TabsContent>
          
          <TabsContent value="assistant" className="animate-in">
            <GrantApplicationAssistant />
          </TabsContent>
        </DashboardLayout>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
