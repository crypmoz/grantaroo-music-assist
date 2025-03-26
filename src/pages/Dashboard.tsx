
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { DashboardApplications } from "@/components/dashboard/DashboardApplications";
import { DashboardProfile } from "@/components/dashboard/DashboardProfile";
import { DashboardStatistics } from "@/components/dashboard/DashboardStatistics";
import { DocumentManager } from "@/components/dashboard/DocumentManager";
import { DocumentStatistics } from "@/components/dashboard/DocumentStatistics";
import { TabsContent } from "@/components/ui/tabs";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-6 pb-16">
        <DashboardLayout>
          <DashboardOverview />
          <DashboardApplications />
          <DashboardProfile />
          <DashboardStatistics />
          <TabsContent value="documents" className="space-y-4 animate-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DocumentStatistics />
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
