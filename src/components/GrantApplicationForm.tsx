
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AISuggestions } from "./AISuggestions";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, BookOpen, HelpCircle } from "lucide-react";
import { AuthRequiredScreen } from "./statistics/AuthRequiredScreen";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ApplicationFormGuide } from "./forms/ApplicationFormGuide";

const formSchema = z.object({
  artistName: z.string().min(2, "Artist name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  projectTitle: z.string().min(5, "Project title must be at least 5 characters"),
  projectDescription: z.string().min(100, "Please provide more detail (minimum 100 characters)"),
  budget: z.string().min(1, "Please enter a budget amount"),
  timeline: z.string().min(20, "Please provide more detail about your timeline"),
  impact: z.string().min(50, "Please describe the impact in more detail"),
});

export const GrantApplicationForm = () => {
  const [currentSection, setCurrentSection] = useState("projectDescription");
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("write");
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { grantId } = useParams();
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      artistName: "",
      email: "",
      projectTitle: "",
      projectDescription: "",
      budget: "",
      timeline: "",
      impact: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!isAuthenticated || !user) {
      toast.error("Please sign in to save your application");
      setShowAuthModal(true);
      return;
    }

    setIsSaving(true);
    
    try {
      // Convert the budget to a numeric value if possible
      const budget = parseFloat(values.budget) || values.budget;
      
      // Create application in Supabase
      const { data, error } = await supabase
        .from('applications')
        .insert({
          user_id: user.id,
          grant_id: grantId || null,
          project_description: values.projectDescription,
          timeline: values.timeline,
          budget: {
            amount: budget,
            details: "Budget details will be added in a separate section"
          },
          status: 'draft'
        })
        .select()
        .single();

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }
      
      // Also save AI suggestions for each section
      const { error: suggestionsError } = await supabase.from('ai_suggestions').insert([
        {
          application_id: data.id,
          category: 'project_description',
          suggestion: 'Enhance your project description by adding more details about the artistic vision.'
        },
        {
          application_id: data.id,
          category: 'timeline',
          suggestion: 'Consider breaking down your timeline into specific milestones with target dates.'
        },
        {
          application_id: data.id,
          category: 'budget',
          suggestion: 'Be more specific about how the budget will be allocated across different aspects of the project.'
        }
      ]);
      
      if (suggestionsError) {
        console.error("Error saving suggestions:", suggestionsError);
      }
      
      toast.success("Application draft saved successfully!");
      
      // Redirect to application dashboard
      setTimeout(() => {
        navigate('/applications');
      }, 1500);
    } catch (error: any) {
      console.error("Error saving application:", error);
      toast.error(error.message || "Failed to save application. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignIn = () => {
    setShowAuthModal(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-6 pb-16">
          <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-primary mb-6">Grant Application Assistant</h2>
            <AuthRequiredScreen onSignInClick={handleSignIn} />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-6 pb-16">
        <div className="max-w-6xl mx-auto p-6 animate-fadeIn">
          <h2 className="text-3xl font-bold text-primary mb-6">Grant Application Assistant</h2>
          
          <Tabs defaultValue="write" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <TabsList>
                <TabsTrigger value="write" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Write Application
                </TabsTrigger>
                <TabsTrigger value="guide" className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  AI Writing Guide
                </TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => navigate("/dashboard")}>
                  Cancel
                </Button>
                <Button onClick={form.handleSubmit(onSubmit)} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                    </>
                  ) : (
                    "Save Application Draft"
                  )}
                </Button>
              </div>
            </div>
            
            <TabsContent value="write" className="space-y-6 animate-in">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Grant Application Draft</CardTitle>
                      <CardDescription>
                        Fill out each section of your grant application. The AI assistant will analyze your content and provide suggestions.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...form}>
                        <form className="space-y-6">
                          <FormField
                            control={form.control}
                            name="artistName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Artist/Band Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter your name or band name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="your@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="projectTitle"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Project Title</FormLabel>
                                <FormControl>
                                  <Input placeholder="Give your project a title" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="projectDescription"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Project Description</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Describe your project in detail..."
                                    className="h-32"
                                    onFocus={() => setCurrentSection("projectDescription")}
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Explain what you want to achieve with this grant
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="budget"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Budget Request</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Enter amount needed"
                                    onFocus={() => setCurrentSection("budget")}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="timeline"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Project Timeline</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Outline your project timeline..."
                                    className="h-32"
                                    onFocus={() => setCurrentSection("timeline")}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="impact"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Community Impact</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Describe how your project will impact the Toronto music community..."
                                    className="h-32"
                                    onFocus={() => setCurrentSection("impact")}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-1">
                  <AISuggestions section={currentSection} />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="guide" className="animate-in">
              <ApplicationFormGuide />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};
