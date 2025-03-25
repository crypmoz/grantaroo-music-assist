
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { PaywallScreen } from "@/components/PaywallScreen";
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const Statistics = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated, isPaidUser } = useAuth();
  
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
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <CardTitle>Sign in to view statistics</CardTitle>
                <CardDescription>
                  Track your application statistics and success rates.
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
  
  if (!isPaidUser) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-xl mx-auto text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Grant Statistics</h1>
            <p className="text-muted-foreground">
              Upgrade to premium to access detailed statistics and analytics
            </p>
          </div>
          <div className="flex justify-center">
            <PaywallScreen />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Grant Statistics</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold text-center mb-3 text-blue-600">67%</div>
                <p className="text-center text-sm text-muted-foreground">
                  6 out of 9 applications approved
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Total Funding</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold text-center mb-3 text-green-600">$25,000</div>
                <p className="text-center text-sm text-muted-foreground">
                  Across all successful grants
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Grant Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold text-center mb-3">10</div>
                <p className="text-center text-sm text-muted-foreground">
                  Total applications to date
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Application Status</CardTitle>
                    <CardDescription>
                      Distribution of your application statuses
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={applicationStatusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {applicationStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Grant Categories</CardTitle>
                    <CardDescription>
                      Types of grants you've applied for
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={grantCategoryData}
                          cx="50%"
                          cy="50%"
                          outerRadius={90}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {grantCategoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Activity</CardTitle>
                  <CardDescription>
                    Your grant application activity over time
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyActivityData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="applications" fill="#2196F3" name="Applications" />
                      <Bar dataKey="approvals" fill="#4CAF50" name="Approvals" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="categories">
              <Card>
                <CardHeader>
                  <CardTitle>Grant Categories Analysis</CardTitle>
                  <CardDescription>
                    Success rates by different grant categories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {grantCategoryData.map((category) => (
                      <div key={category.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{category.name}</span>
                          <span className="text-sm">{category.value} applications</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full" 
                            style={{ 
                              backgroundColor: category.color,
                              width: `${Math.min(100, (category.value / 5) * 100)}%`
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Statistics;
