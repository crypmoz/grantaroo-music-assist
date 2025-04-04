
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, FileText, Users, BarChart, CircleDollarSign, Brain } from "lucide-react";
import { ReactNode, useState } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Grant Writing Dashboard</h1>
      </div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <div className="border-b pb-2 mb-4">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto">
            <TabsTrigger value="overview" className="py-2.5 flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden md:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="py-2.5 flex items-center gap-2">
              <CircleDollarSign className="h-4 w-4" />
              <span className="hidden md:inline">Recommended Grants</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="py-2.5 flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden md:inline">Artist Profile</span>
            </TabsTrigger>
            <TabsTrigger value="applications" className="py-2.5 flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span className="hidden md:inline">AI Assistant</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="py-2.5 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden md:inline">Documents</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        {children}
      </Tabs>
    </div>
  );
};
