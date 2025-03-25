
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { CalendarClock, Clock, Edit, FileText, ArrowRight, Plus, Loader2 } from "lucide-react";

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

const Applications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated, user, session } = useAuth();
  
  useEffect(() => {
    const fetchApplications = async () => {
      if (!isAuthenticated || !user) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
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
          .order('updated_at', { ascending: false });
          
        if (error) {
          console.error('Error fetching applications:', error);
          throw error;
        }
        
        console.log('Fetched applications:', data);
        setApplications(data || []);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchApplications();
  }, [isAuthenticated, user]);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">Draft</Badge>;
      case 'submitted':
        return <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">Submitted</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-800 border-red-200">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">My Grant Applications</h1>
            
            <Link to="/new-application">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Application
              </Button>
            </Link>
          </div>
          
          {!isAuthenticated ? (
            <Card>
              <CardContent className="p-8">
                <div className="flex flex-col items-center justify-center text-center space-y-6">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <FileText className="h-10 w-10 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Sign in to view your applications</h2>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Track your grant applications, receive updates, and get expert assistance.
                    </p>
                  </div>
                  <Button onClick={() => setShowAuthModal(true)}>
                    Sign In
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : isLoading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : applications.length === 0 ? (
            <Card>
              <CardContent className="p-8">
                <div className="flex flex-col items-center justify-center text-center space-y-6">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <FileText className="h-10 w-10 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">No applications yet</h2>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Start your first grant application to track your progress and receive assistance.
                    </p>
                  </div>
                  <Link to="/new-application">
                    <Button>
                      Start New Application
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {applications.map((application) => (
                <Card key={application.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <CardTitle className="mb-1">
                          {application.grant?.title || "Untitled Application"}
                        </CardTitle>
                        <CardDescription>
                          {application.grant?.organization || "Personal Project"}
                        </CardDescription>
                      </div>
                      {getStatusBadge(application.status)}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pb-2">
                    <div className="mb-4">
                      <p className="text-sm line-clamp-3">
                        {application.project_description || "No project description yet."}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {new Date(application.updated_at).toLocaleDateString()}
                      </div>
                      
                      {application.grant?.deadline && (
                        <div className="flex items-center gap-1">
                          <CalendarClock className="h-4 w-4" />
                          Due: {new Date(application.grant.deadline).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </CardContent>
                  
                  <Separator />
                  
                  <CardFooter className="py-3 flex justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/edit-application/${application.id}`} className="flex items-center gap-1">
                        <Edit className="h-4 w-4" />
                        Edit
                      </Link>
                    </Button>
                    
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/application/${application.id}`} className="flex items-center gap-1">
                        View Details
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
};

export default Applications;
