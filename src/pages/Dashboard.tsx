
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { GrantRecommendations } from "@/components/dashboard/GrantRecommendations";
import { DashboardProfile } from "@/components/dashboard/DashboardProfile";
import { GrantApplicationAssistant } from "@/components/dashboard/GrantApplicationAssistant";
import { DashboardApplications } from "@/components/dashboard/DashboardApplications";
import { TabsContent } from "@/components/ui/tabs";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-6 pb-16">
        <DashboardLayout>
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
