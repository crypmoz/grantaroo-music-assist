
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { GrantApplicationAssistant } from "@/components/dashboard/GrantApplicationAssistant";
import { DashboardProfile } from "@/components/dashboard/DashboardProfile";
import { GrantRecommendations } from "@/components/dashboard/GrantRecommendations";
import { DocumentManager } from "@/components/dashboard/DocumentManager";
import { SuccessfulExamples } from "@/components/dashboard/SuccessfulExamples";
import { DashboardApplications } from "@/components/dashboard/DashboardApplications";
import { DashboardStatistics } from "@/components/dashboard/DashboardStatistics";
import { TabsContent } from "@/components/ui/tabs";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-6 pb-16">
        <DashboardLayout>
          <DashboardOverview />
          <GrantRecommendations />
          <DashboardProfile />
          <DashboardApplications />
          <DashboardStatistics />
          <TabsContent value="documents" className="space-y-4 animate-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SuccessfulExamples />
              <DocumentManager />
            </div>
          </TabsContent>
        </DashboardLayout>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
