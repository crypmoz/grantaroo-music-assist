
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { DashboardApplications } from "@/components/dashboard/DashboardApplications";
import { DashboardProfile } from "@/components/dashboard/DashboardProfile";
import { DashboardStatistics } from "@/components/dashboard/DashboardStatistics";
import { TabsContent } from "@/components/ui/tabs";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <DashboardOverview />
      <DashboardApplications />
      <DashboardProfile />
      <DashboardStatistics />
    </DashboardLayout>
  );
};

export default Dashboard;
