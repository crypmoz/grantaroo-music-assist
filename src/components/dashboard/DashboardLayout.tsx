
import { ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthRequiredScreen } from "../statistics/AuthRequiredScreen";
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";
import { BarChart3, FileText, User, Clock, PieChart } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the current tab from URL or default to overview
  const getTabFromUrl = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("tab") || "overview";
  };
  
  const currentTab = getTabFromUrl();
  
  const handleTabChange = (value: string) => {
    // Update URL with the selected tab
    navigate(`/dashboard?tab=${value}`);
  };
  
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-10">
        <Card className="p-8">
          <AuthRequiredScreen onSignInClick={() => {}} />
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Tabs
        defaultValue="overview"
        value={currentTab}
        onValueChange={handleTabChange}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:w-[600px]">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="applications" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Applications</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="statistics" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            <span className="hidden sm:inline">Statistics</span>
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Documents</span>
          </TabsTrigger>
        </TabsList>
        {children}
      </Tabs>
    </div>
  );
};
