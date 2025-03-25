
import { ChatbotProvider } from "@/context/ChatbotContext";
import { ChatBot } from "@/components/ChatBot";
import { NavBar } from "@/components/NavBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ExternalLink, 
  FileText, 
  Download, 
  Calendar, 
  Clock, 
  Users, 
  BookOpen,
  BarChart3
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const Resources = () => {
  return (
    <ChatbotProvider>
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
        <header className="border-b p-4 md:p-6 bg-white/80 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-primary">Canada Music Grant Assistant</h1>
              <p className="text-muted-foreground">AI-powered grant writing for musicians</p>
            </div>
          </div>
          <NavBar />
        </header>
        
        <main className="container mx-auto py-12 px-4 md:px-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-primary">Resources for Musicians</h1>
            <p className="text-xl text-muted-foreground">
              Everything you need to succeed with your grant applications and music projects
            </p>
          </motion.div>
          
          <Tabs defaultValue="funding" className="mb-16">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 h-auto mb-8">
              <TabsTrigger value="funding" className="py-3 text-sm">Funding Organizations</TabsTrigger>
              <TabsTrigger value="guides" className="py-3 text-sm">Grant Writing Guides</TabsTrigger>
              <TabsTrigger value="deadlines" className="py-3 text-sm">Upcoming Deadlines</TabsTrigger>
            </TabsList>
            
            <TabsContent value="funding">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <Card className="bg-white/80 backdrop-blur-sm border-blue-100 hover:shadow-md transition-all overflow-hidden group">
                  <div className="h-3 bg-blue-500"></div>
                  <CardHeader>
                    <CardTitle>Canada Arts Council</CardTitle>
                    <CardDescription>National arts funding body</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      Offers project grants, operating grants, and strategic funding for Canadian-based musicians and music organizations.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="bg-blue-50">Music</Badge>
                      <Badge variant="outline" className="bg-blue-50">Recording</Badge>
                      <Badge variant="outline" className="bg-blue-50">Touring</Badge>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center gap-2 w-full">
                      <ExternalLink className="h-4 w-4" /> Visit Website
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/80 backdrop-blur-sm border-purple-100 hover:shadow-md transition-all overflow-hidden group">
                  <div className="h-3 bg-purple-500"></div>
                  <CardHeader>
                    <CardTitle>FACTOR</CardTitle>
                    <CardDescription>Foundation Assisting Canadian Talent</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      Foundation Assisting Canadian Talent on Recordings offers various programs for recording, marketing, and touring.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="bg-purple-50">Albums</Badge>
                      <Badge variant="outline" className="bg-purple-50">Marketing</Badge>
                      <Badge variant="outline" className="bg-purple-50">Videos</Badge>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center gap-2 w-full">
                      <ExternalLink className="h-4 w-4" /> Visit Website
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/80 backdrop-blur-sm border-indigo-100 hover:shadow-md transition-all overflow-hidden group">
                  <div className="h-3 bg-indigo-500"></div>
                  <CardHeader>
                    <CardTitle>Ontario Arts Council</CardTitle>
                    <CardDescription>Provincial arts organization</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      Provides grants for music creation, recording, touring, and audience development across Ontario.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="bg-indigo-50">Creation</Badge>
                      <Badge variant="outline" className="bg-indigo-50">Development</Badge>
                      <Badge variant="outline" className="bg-indigo-50">Touring</Badge>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center gap-2 w-full">
                      <ExternalLink className="h-4 w-4" /> Visit Website
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="guides">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <Card className="bg-white/80 backdrop-blur-sm border-green-100 hover:shadow-md transition-all">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-green-100 p-2 rounded-full">
                        <FileText className="h-5 w-5 text-green-600" />
                      </div>
                      <CardTitle>Budget Templates</CardTitle>
                    </div>
                    <CardDescription>Financial planning tools for your project</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      Download customizable budget templates for music recording, touring, and marketing projects that meet the requirements of major Canadian funding bodies.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Excel</Badge>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Google Sheets</Badge>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">PDF</Badge>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center gap-2 w-full border-green-600 text-green-600 hover:bg-green-50">
                      <Download className="h-4 w-4" /> Download Templates
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/80 backdrop-blur-sm border-blue-100 hover:shadow-md transition-all">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <CardTitle>Project Timeline Examples</CardTitle>
                    </div>
                    <CardDescription>Effective project planning guides</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      Sample timelines for album production, release campaigns, and touring projects that demonstrate realistic milestones and professional planning.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Album Production</Badge>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Tour Planning</Badge>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Marketing</Badge>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center gap-2 w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                      <ExternalLink className="h-4 w-4" /> View Examples
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/80 backdrop-blur-sm border-purple-100 hover:shadow-md transition-all md:col-span-2">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <Users className="h-5 w-5 text-purple-600" />
                      </div>
                      <CardTitle>Grant Writing Workshops</CardTitle>
                    </div>
                    <CardDescription>Learn from industry experts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      Information on upcoming virtual and in-person grant writing workshops in Canada, featuring seasoned grant writers and music industry professionals.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="flex gap-3 items-start p-4 bg-purple-50 rounded-lg">
                        <Calendar className="h-5 w-5 text-purple-600 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-medium">FACTOR Application Masterclass</h4>
                          <p className="text-sm text-muted-foreground mb-1">June 15, 2024</p>
                          <Badge variant="outline" className="bg-white">Virtual</Badge>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 items-start p-4 bg-purple-50 rounded-lg">
                        <Calendar className="h-5 w-5 text-purple-600 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-medium">Arts Council Grant Workshop</h4>
                          <p className="text-sm text-muted-foreground mb-1">July 8, 2024</p>
                          <Badge variant="outline" className="bg-white">In-Person</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="flex items-center gap-2 w-full md:w-auto border-purple-600 text-purple-600 hover:bg-purple-50">
                      <ExternalLink className="h-4 w-4" /> See Full Schedule
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="deadlines">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-blue-100 mb-8">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Clock className="h-5 w-5 text-blue-600" />
                      </div>
                      <CardTitle>Upcoming Grant Deadlines</CardTitle>
                    </div>
                    <CardDescription>
                      Stay on top of important application dates for Canadian music grants
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="py-3 px-4 text-left font-medium text-muted-foreground">Grant Program</th>
                            <th className="py-3 px-4 text-left font-medium text-muted-foreground">Organization</th>
                            <th className="py-3 px-4 text-left font-medium text-muted-foreground">Deadline</th>
                            <th className="py-3 px-4 text-left font-medium text-muted-foreground">Funding Amount</th>
                            <th className="py-3 px-4 text-left font-medium text-muted-foreground">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
                            <td className="py-4 px-4">
                              <div className="font-medium">Music Projects</div>
                              <div className="text-sm text-muted-foreground">Creation & Production</div>
                            </td>
                            <td className="py-4 px-4">Canada Arts Council</td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-blue-600" />
                                June 1, 2024
                              </div>
                            </td>
                            <td className="py-4 px-4">Up to $10,000</td>
                            <td className="py-4 px-4">
                              <Badge className="bg-green-100 text-green-800">Open</Badge>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
                            <td className="py-4 px-4">
                              <div className="font-medium">Juried Sound Recording</div>
                              <div className="text-sm text-muted-foreground">Album Production</div>
                            </td>
                            <td className="py-4 px-4">FACTOR</td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-blue-600" />
                                July 15, 2024
                              </div>
                            </td>
                            <td className="py-4 px-4">Up to $15,000</td>
                            <td className="py-4 px-4">
                              <Badge className="bg-amber-100 text-amber-800">Coming Soon</Badge>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
                            <td className="py-4 px-4">
                              <div className="font-medium">Music Creation Projects</div>
                              <div className="text-sm text-muted-foreground">Composition & Songwriting</div>
                            </td>
                            <td className="py-4 px-4">Ontario Arts Council</td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-blue-600" />
                                August 3, 2024
                              </div>
                            </td>
                            <td className="py-4 px-4">$3,000 - $12,000</td>
                            <td className="py-4 px-4">
                              <Badge className="bg-amber-100 text-amber-800">Coming Soon</Badge>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
                            <td className="py-4 px-4">
                              <div className="font-medium">Concept to Realization</div>
                              <div className="text-sm text-muted-foreground">Project Development</div>
                            </td>
                            <td className="py-4 px-4">Canada Council</td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-blue-600" />
                                September 20, 2024
                              </div>
                            </td>
                            <td className="py-4 px-4">Up to $25,000</td>
                            <td className="py-4 px-4">
                              <Badge className="bg-slate-100 text-slate-800">Upcoming</Badge>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl text-white p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mt-20 -mr-20"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -mb-10 -ml-10"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                        <BarChart3 className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold">Get a Personalized Deadline Calendar</h3>
                    </div>
                    
                    <p className="mb-6 text-indigo-100 max-w-lg">
                      Let our AI assistant create a custom calendar of relevant grant deadlines based on your artist profile and project needs
                    </p>
                    
                    <Button 
                      className="bg-white text-indigo-600 hover:bg-indigo-50"
                      onClick={() => {
                        const chatbotButton = document.querySelector('.fixed.bottom-4.right-4') as HTMLButtonElement;
                        if (chatbotButton) chatbotButton.click();
                      }}
                    >
                      Create My Calendar
                    </Button>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 text-center">Community Support</h2>
              <p className="text-lg mb-8 text-center text-muted-foreground max-w-2xl mx-auto">
                Connect with other musicians and grant recipients in the Canada area who can share their experiences and advice.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-blue-100 hover:shadow-md transition-all bg-gradient-to-br from-blue-50 to-white">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-blue-100 p-3 rounded-full mb-4">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="font-medium mb-2">Discord Community</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Join our active community of musicians sharing grant writing tips and experiences
                      </p>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">Join Our Discord</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-purple-100 hover:shadow-md transition-all bg-gradient-to-br from-purple-50 to-white">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-purple-100 p-3 rounded-full mb-4">
                        <Calendar className="h-6 w-6 text-purple-600" />
                      </div>
                      <h3 className="font-medium mb-2">Monthly Meetups</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Attend virtual and in-person events where you can network with other musicians
                      </p>
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white">View Schedule</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-indigo-100 hover:shadow-md transition-all bg-gradient-to-br from-indigo-50 to-white">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-indigo-100 p-3 rounded-full mb-4">
                        <FileText className="h-6 w-6 text-indigo-600" />
                      </div>
                      <h3 className="font-medium mb-2">Peer Review Group</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Get feedback on your grant application from successful applicants before submission
                      </p>
                      <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Join Group</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </main>
        
        <ChatBot />
      </div>
    </ChatbotProvider>
  );
};

export default Resources;
