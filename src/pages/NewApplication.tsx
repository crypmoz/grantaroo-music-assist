
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { GrantApplicationForm } from "@/components/GrantApplicationForm";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

type Grant = {
  id: string;
  title: string;
  organization: string;
  deadline: string;
  amount: string; // Changed to string to match the type definition
  category: string;
  description?: string;
  requirements?: string[];
  created_at?: string;
};

const NewApplication = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoadingGrants, setIsLoadingGrants] = useState(true);
  const [grants, setGrants] = useState<Grant[]>([]);
  const [filteredGrants, setFilteredGrants] = useState<Grant[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchGrants = async () => {
      try {
        const { data, error } = await supabase
          .from('grants')
          .select('*')
          .order('deadline', { ascending: true });
          
        if (error) throw error;
        
        // Convert the amount to string for each grant
        const grantsWithStringAmount = data?.map(grant => ({
          ...grant,
          amount: String(grant.amount)
        })) || [];
        
        setGrants(grantsWithStringAmount);
        setFilteredGrants(grantsWithStringAmount);
      } catch (error) {
        console.error('Error fetching grants:', error);
      } finally {
        setIsLoadingGrants(false);
      }
    };
    
    fetchGrants();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = grants.filter(grant => 
        grant.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        grant.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        grant.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredGrants(filtered);
    } else {
      setFilteredGrants(grants);
    }
  }, [searchQuery, grants]);

  // Format the deadline date
  const formatDeadline = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  // Check if a deadline is approaching (within 14 days)
  const isDeadlineApproaching = (dateString: string) => {
    const deadline = new Date(dateString);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 14 && diffDays >= 0;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Start New Application</h1>
            <p className="text-muted-foreground">
              Choose from available grants or create a custom application
            </p>
          </div>
          
          {!isAuthenticated ? (
            <Card>
              <CardContent className="p-8">
                <div className="flex flex-col items-center justify-center text-center space-y-6">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <Search className="h-10 w-10 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Sign in to start an application</h2>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Create your account to apply for grants and get expert assistance.
                    </p>
                  </div>
                  <Button onClick={() => setShowAuthModal(true)}>
                    Sign In
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Available Grants</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <Input
                      placeholder="Search grants by title, organization, or category..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="max-w-xl"
                    />
                  </div>
                  
                  {isLoadingGrants ? (
                    <div className="flex items-center justify-center p-12">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : filteredGrants.length === 0 ? (
                    <div className="text-center p-8">
                      <p className="text-muted-foreground">No matching grants found.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredGrants.map((grant) => (
                        <Card key={grant.id} className="overflow-hidden hover:shadow-md transition-shadow">
                          <CardContent className="p-5">
                            <div className="mb-4">
                              <h3 className="font-medium text-lg line-clamp-2">{grant.title}</h3>
                              <p className="text-sm text-muted-foreground">{grant.organization}</p>
                            </div>
                            
                            <div className="flex items-center justify-between mb-4">
                              <div className="text-sm">
                                <span className="font-medium">Amount:</span> ${parseInt(grant.amount).toLocaleString()}
                              </div>
                              <div className="text-sm">
                                <span className="font-medium">Category:</span> {grant.category}
                              </div>
                            </div>
                            
                            <div className="mb-4">
                              <div className={`text-sm ${isDeadlineApproaching(grant.deadline) ? 'text-red-600 font-medium' : ''}`}>
                                <span className="font-medium">Deadline:</span> {formatDeadline(grant.deadline)}
                                {isDeadlineApproaching(grant.deadline) && ' (Soon!)'}
                              </div>
                            </div>
                            
                            <Button asChild className="w-full">
                              <Link to={`/apply/${grant.id}`}>Apply Now</Link>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Custom Application</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Start a custom application if you're preparing for a grant not listed above.
                  </p>
                  <Button asChild>
                    <Link to="/apply">Start Custom Application</Link>
                  </Button>
                </CardContent>
              </Card>
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

export default NewApplication;
