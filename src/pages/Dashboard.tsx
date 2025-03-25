
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { 
  FileText, 
  BarChart3, 
  User, 
  Search, 
  Plus, 
  Clock, 
  CalendarClock, 
  Award,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { PaywallScreen } from "@/components/PaywallScreen";

type Application = {
  id: string;
  created_at: string;
  updated_at: string;
  status: string;
  project_description: string;
  timeline: string;
  budget: any;
  grant: {
    id: string;
    title: string;
    organization: string;
    deadline: string;
  } | null;
};

const Dashboard = () => {
  const [recentApplications, setRecentApplications] = useState<Application[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const { isAuthenticated, user, isPaidUser } = useAuth();

  useEffect(() => {
    const fetchRecentApplications = async () => {
      if (!isAuthenticated || !user) return;
      
      try {
        const { data, error } = await supabase
          .from('applications')
          .select(`
            id, 
            created_at, 
            updated_at, 
            status, 
            project_description, 
            timeline, 
            budget,
            grant:grant_id (
              id,
              title,
              organization,
              deadline
            )
          `)
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false })
          .limit(3);
          
        if (error) throw error;
        
        setRecentApplications(data || []);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRecentApplications();
  }, [isAuthenticated, user]);

  // Format date to readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get status badge style
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <User className="h-12 w-12 mx-auto text-primary" />
                <CardTitle>Sign in to access your dashboard</CardTitle>
                <CardDescription>
                  Track your applications, view your statistics, and manage your profile.
                </CardDescription>
                <Button 
                  onClick={() => setShowAuthModal(true)}
                  className="w-full"
                >
                  Sign In
                </Button>
              </div>
            </CardContent>
          </Card>
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
            
            <TabsContent value="overview" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Quick stats cards */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Applications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-3">{recentApplications.length}</div>
                    <Link to="/applications">
                      <Button variant="outline" className="w-full">View All Applications</Button>
                    </Link>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      Subscription
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-medium mb-3">
                      {isPaidUser ? (
                        <span className="text-green-600">Premium</span>
                      ) : (
                        <span className="text-amber-600">Free</span>
                      )}
                    </div>
                    {!isPaidUser && (
                      <Button 
                        onClick={() => window.location.href = '/assistant'} 
                        className="w-full"
                      >
                        Upgrade to Premium
                      </Button>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      Grant Assistant
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {isPaidUser ? (
                      <>
                        <p className="text-muted-foreground text-sm">
                          Your AI-powered grant writing assistant is ready to help.
                        </p>
                        <Link to="/assistant">
                          <Button className="w-full">Open Assistant</Button>
                        </Link>
                      </>
                    ) : (
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm mb-2">Unlock AI-powered grant assistance</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.location.href = '/assistant'}
                          className="w-full"
                        >
                          See Premium Features
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              {/* Recent Applications */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Recent Applications</span>
                    <Link to="/applications">
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        View All <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {recentApplications.length === 0 ? (
                    <div className="text-center p-6">
                      <FileText className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-muted-foreground mb-4">No applications yet</p>
                      <Link to="/new-application">
                        <Button className="flex items-center gap-2">
                          <Plus className="h-4 w-4" />
                          Start New Application
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recentApplications.map((app) => (
                        <div key={app.id} className="flex items-center justify-between border-b pb-4">
                          <div>
                            <div className="font-medium">
                              {app.grant?.title || "Custom Application"}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {app.grant?.organization || "Personal Project"}
                            </div>
                            <div className="flex items-center gap-4 text-xs mt-1">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Updated {formatDate(app.updated_at)}
                              </span>
                              {app.grant?.deadline && (
                                <span className="flex items-center gap-1">
                                  <CalendarClock className="h-3 w-3" />
                                  Due {formatDate(app.grant.deadline)}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`text-xs px-2 py-1 rounded ${getStatusClass(app.status)}`}>
                              {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                            </span>
                            <Link to={`/edit-application/${app.id}`}>
                              <Button variant="outline" size="sm">
                                Continue
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                      
                      <div className="pt-2">
                        <Link to="/new-application">
                          <Button variant="outline" className="w-full flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Start New Application
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="applications" className="pt-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>My Applications</CardTitle>
                    <Link to="/new-application">
                      <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        New Application
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  {recentApplications.length === 0 ? (
                    <div className="text-center p-6">
                      <FileText className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-muted-foreground mb-4">No applications yet</p>
                      <Link to="/new-application">
                        <Button className="flex items-center gap-2">
                          <Plus className="h-4 w-4" />
                          Start New Application
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <Link to="/applications" className="block">
                        <Button variant="secondary" className="w-full">
                          View All Applications
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="profile" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Profile</CardTitle>
                  <CardDescription>
                    View and update your profile information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/profile">
                    <Button variant="outline">View & Edit Profile</Button>
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="statistics" className="pt-6">
              {isPaidUser ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Grant Success Statistics</CardTitle>
                    <CardDescription>
                      View analytics about your grant applications and success rate
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link to="/stats">
                      <Button variant="outline">View Detailed Statistics</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <PaywallScreen />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
