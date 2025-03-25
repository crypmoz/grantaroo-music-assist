
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { useState } from "react";

type DashboardLayoutProps = {
  children: React.ReactNode;
  defaultTab?: string;
};

export const DashboardLayout = ({ children, defaultTab = "overview" }: DashboardLayoutProps) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState(defaultTab);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center space-y-4 max-w-md mx-auto">
            <h2 className="text-2xl font-bold">Sign in to access your dashboard</h2>
            <p className="text-muted-foreground">
              Track your applications, view your statistics, and manage your profile.
            </p>
            <button 
              onClick={() => setShowAuthModal(true)}
              className="px-4 py-2 bg-primary text-white rounded-md"
            >
              Sign In
            </button>
          </div>
        </main>
        <Footer />
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-6 max-w-6xl mx-auto">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your applications and track your progress
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="statistics">Statistics</TabsTrigger>
            </TabsList>
            
            {children}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};
