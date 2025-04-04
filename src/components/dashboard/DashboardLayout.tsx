
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, FileText, User, Award, Brain } from "lucide-react";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const DashboardLayout = ({ children, activeTab, onTabChange }: DashboardLayoutProps) => {
  return (
    <div className="container mx-auto px-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Grant Application Portal</h1>
      </div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={onTabChange}>
        <div className="border-b pb-2 mb-4">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto">
            <TabsTrigger value="overview" className="py-2.5 flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden md:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="py-2.5 flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden md:inline">My Profile</span>
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="py-2.5 flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span className="hidden md:inline">Find Grants</span>
            </TabsTrigger>
            <TabsTrigger value="applications" className="py-2.5 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden md:inline">My Applications</span>
            </TabsTrigger>
            <TabsTrigger value="assistant" className="py-2.5 flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span className="hidden md:inline">AI Assistant</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        {children}
      </Tabs>
    </div>
  );
};
