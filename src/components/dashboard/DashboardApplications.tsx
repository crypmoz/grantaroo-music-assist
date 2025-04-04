
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Download, FileEdit, ExternalLink, RefreshCw, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

export const DashboardApplications = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (user) {
      fetchApplications();
    }
  }, [user]);
  
  const fetchApplications = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          grants:grant_id (title, organization, deadline)
        `)
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const getCompletionPercentage = (application) => {
    // Calculate completion based on filled fields
    const totalFields = 6; // Example: budget, timeline, project description, etc.
    let filledFields = 0;
    
    if (application.project_description) filledFields++;
    if (application.timeline) filledFields++;
    if (application.budget && Object.keys(application.budget).length > 0) filledFields++;
    if (application.status !== 'draft') filledFields++; // Consider status as a field
    
    // Additional fields (simulated)
    if (Math.random() > 0.3) filledFields++;
    if (Math.random() > 0.5) filledFields++;
    
    return Math.round((filledFields / totalFields) * 100);
  };
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'draft':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Draft</Badge>;
      case 'ready':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Ready to Submit</Badge>;
      case 'submitted':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Submitted</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  const exportApplication = (application) => {
    // Simulate export
    toast.success("Exporting application...");
    setTimeout(() => {
      toast.success("Application exported successfully!");
    }, 1500);
  };

  return (
    <TabsContent value="applications" className="space-y-4 animate-in">
      <div className="grid gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              My Applications
            </h2>
            <p className="text-muted-foreground">
              Manage and export your grant applications
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={fetchApplications}>
              <RefreshCw className="h-4 w-4 mr-2" /> Refresh
            </Button>
            <Button onClick={() => navigate("/new-application")}>
              New Application
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <Card>
            <CardContent className="flex justify-center items-center h-52">
              <div className="flex flex-col items-center gap-2">
                <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                <p>Loading your applications...</p>
              </div>
            </CardContent>
          </Card>
        ) : applications.length === 0 ? (
          <Card>
            <CardContent className="py-8">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-medium">No Applications Yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Start by finding a grant that matches your profile and create your first application.
                </p>
                <Button onClick={() => navigate("/dashboard", { state: { activeTab: "recommendations" } })}>
                  Find Grants
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => {
              const completionPercentage = getCompletionPercentage(app);
              const isComplete = completionPercentage === 100;
              
              return (
                <Card key={app.id} className={`overflow-hidden ${isComplete ? 'border-green-200' : ''}`}>
                  <CardHeader className="pb-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div>
                        <CardTitle className="text-lg font-semibold">
                          {app.grants?.title || "Untitled Grant"}
                        </CardTitle>
                        <CardDescription>
                          {app.grants?.organization || "Unknown Organization"}
                        </CardDescription>
                      </div>
                      {getStatusBadge(app.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>
                            {app.grants?.deadline ? (
                              `Deadline: ${new Date(app.grants.deadline).toLocaleDateString()}`
                            ) : (
                              "No deadline specified"
                            )}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Last updated: {new Date(app.updated_at).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Completion</span>
                          <span>{completionPercentage}%</span>
                        </div>
                        <Progress value={completionPercentage} />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => navigate(`/apply/${app.grant_id}`, { state: { applicationId: app.id } })}
                      className="flex-1"
                    >
                      <FileEdit className="h-4 w-4 mr-2" /> Edit
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={() => exportApplication(app)}
                      disabled={!isComplete}
                      className="flex-1"
                    >
                      <Download className="h-4 w-4 mr-2" /> Export
                    </Button>
                    
                    {app.grants && (
                      <Button 
                        variant="outline"
                        onClick={() => window.open(`https://example.com/grants/${app.grant_id}`, "_blank")}
                        className="flex-1"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" /> Guidelines
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </TabsContent>
  );
};
