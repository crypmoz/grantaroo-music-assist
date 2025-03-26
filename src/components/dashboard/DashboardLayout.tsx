
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, FileText, User, BarChart } from "lucide-react";

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
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-6 max-w-md mx-auto p-8 bg-white rounded-xl shadow-md"
          >
            <h2 className="text-2xl font-bold">Sign in to access your dashboard</h2>
            <p className="text-muted-foreground">
              Track your applications, view your statistics, and manage your profile.
            </p>
            <button 
              onClick={() => setShowAuthModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              Sign In
            </button>
          </motion.div>
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your applications and track your progress
            </p>
          </motion.div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <TabsList className="grid w-full grid-cols-4 p-1 bg-muted/60 rounded-lg">
                <TabsTrigger 
                  value="overview" 
                  className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="applications" 
                  className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600"
                >
                  <FileText className="h-4 w-4" />
                  Applications
                </TabsTrigger>
                <TabsTrigger 
                  value="profile" 
                  className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600"
                >
                  <User className="h-4 w-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger 
                  value="statistics" 
                  className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600"
                >
                  <BarChart className="h-4 w-4" />
                  Statistics
                </TabsTrigger>
              </TabsList>
            </motion.div>
            
            {children}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};
