
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApplicationStatusChart } from "./ApplicationStatusChart";
import { GrantCategoryChart } from "./GrantCategoryChart";
import { MonthlyActivityChart } from "./MonthlyActivityChart";
import { CategoryAnalysis } from "./CategoryAnalysis";

// Mock data for the charts
const applicationStatusData = [
  { name: 'Draft', value: 4, color: '#FFCA28' },
  { name: 'Submitted', value: 3, color: '#2196F3' },
  { name: 'Approved', value: 2, color: '#4CAF50' },
  { name: 'Rejected', value: 1, color: '#F44336' },
];

const grantCategoryData = [
  { name: 'Recording', value: 4, color: '#8884d8' },
  { name: 'Touring', value: 3, color: '#83a6ed' },
  { name: 'Marketing', value: 2, color: '#8dd1e1' },
  { name: 'Video', value: 2, color: '#82ca9d' },
  { name: 'Development', value: 1, color: '#ffc658' },
];

const monthlyActivityData = [
  { name: 'Jan', applications: 2, approvals: 0 },
  { name: 'Feb', applications: 3, approvals: 1 },
  { name: 'Mar', applications: 1, approvals: 0 },
  { name: 'Apr', applications: 4, approvals: 2 },
  { name: 'May', applications: 2, approvals: 1 },
  { name: 'Jun', applications: 5, approvals: 0 },
];

export const StatisticsOverview = () => {
  return (
    <Tabs defaultValue="overview">
      <TabsList className="mb-6">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="categories">Categories</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ApplicationStatusChart data={applicationStatusData} />
          <GrantCategoryChart data={grantCategoryData} />
        </div>
      </TabsContent>
      
      <TabsContent value="activity">
        <MonthlyActivityChart data={monthlyActivityData} />
      </TabsContent>
      
      <TabsContent value="categories">
        <CategoryAnalysis data={grantCategoryData} />
      </TabsContent>
    </Tabs>
  );
};
