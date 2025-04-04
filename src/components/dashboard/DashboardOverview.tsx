
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, Award, Sparkles, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { RecentApplicationsList } from "./RecentApplicationsList";
import { TabsContent } from "@/components/ui/tabs";

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

export const DashboardOverview = () => {
  const [recentApplications, setRecentApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isPaidUser } = useAuth();

  useEffect(() => {
    const fetchRecentApplications = async () => {
      if (!user) return;
      
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
  }, [user]);

  return (
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
                <Link to="/assistant">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    See Premium Features
                  </Button>
                </Link>
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
          <RecentApplicationsList applications={recentApplications} isLoading={isLoading} />
        </CardContent>
      </Card>
    </TabsContent>
  );
};
