
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ArrowRight, UserCircle, Award, FileText, Brain, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const DashboardOverview = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profileComplete, setProfileComplete] = useState(false);
  const [applicationsCount, setApplicationsCount] = useState(0);
  
  useEffect(() => {
    if (user) {
      // Check if profile is complete
      const checkProfile = async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (data && Object.keys(data).length > 3) { // Basic check if profile has enough data
          setProfileComplete(true);
        }
      };
      
      // Get applications count
      const getApplications = async () => {
        const { count, error } = await supabase
          .from('applications')
          .select('*', { count: 'exact' })
          .eq('user_id', user.id);
        
        if (count !== null) {
          setApplicationsCount(count);
        }
      };
      
      checkProfile();
      getApplications();
    }
  }, [user]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Welcome to your Grant Portal</h2>
      <p className="text-muted-foreground">
        Follow these steps to find and apply for grants that match your profile.
      </p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className={profileComplete ? "border-green-200 bg-green-50" : ""}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <UserCircle className="h-5 w-5 text-primary" />
              Step 1: Complete Your Profile
            </CardTitle>
            <CardDescription>
              Add your essential information that will be used for all grant applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              {profileComplete 
                ? "Your profile is complete! This information will be used to recommend grants and pre-fill applications." 
                : "Please complete your profile with all required information for grant matching."}
            </p>
            <Button 
              onClick={() => navigate("/profile")} 
              variant={profileComplete ? "outline" : "default"}
              className="w-full"
            >
              {profileComplete ? "Update Profile" : "Complete Profile"} <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
        
        <Card className={profileComplete ? "" : "opacity-70"}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Step 2: Find Matching Grants
            </CardTitle>
            <CardDescription>
              Discover grants that match your profile and requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Our AI will analyze your profile and recommend grants that best match your qualifications.
            </p>
            <Button 
              onClick={() => navigate("/dashboard", { state: { activeTab: "recommendations" } })}
              disabled={!profileComplete}
              className="w-full"
            >
              Find Grants <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
        
        <Card className={applicationsCount > 0 ? "border-blue-200 bg-blue-50" : "opacity-70"}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Step 3: Draft Applications
            </CardTitle>
            <CardDescription>
              Create and manage your grant applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              {applicationsCount > 0 
                ? `You have ${applicationsCount} application${applicationsCount > 1 ? 's' : ''} in progress.` 
                : "Select a grant and start drafting your application with AI assistance."}
            </p>
            <Button 
              onClick={() => navigate("/dashboard", { state: { activeTab: "applications" } })}
              disabled={applicationsCount === 0 && !profileComplete}
              className="w-full"
            >
              {applicationsCount > 0 ? "View Applications" : "Start Application"} <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Grant Assistant
          </CardTitle>
          <CardDescription>
            Get personalized help at any stage of your grant application process
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate("/grant-assistant")}
            className="flex-1"
          >
            Ask Questions
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate("/dashboard", { state: { activeTab: "assistant" } })}
            className="flex-1"
          >
            AI Writing Help
          </Button>
          <Button 
            variant="outline" 
            disabled={applicationsCount === 0}
            onClick={() => navigate("/dashboard", { state: { activeTab: "applications" } })}
            className="flex-1"
          >
            <Download className="h-4 w-4 mr-2" /> Export Applications
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
