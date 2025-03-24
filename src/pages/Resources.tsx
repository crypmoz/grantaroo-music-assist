
import { ChatbotProvider } from "@/context/ChatbotContext";
import { ChatBot } from "@/components/ChatBot";
import { NavBar } from "@/components/NavBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const Resources = () => {
  return (
    <ChatbotProvider>
      <div className="min-h-screen bg-background">
        <header className="border-b p-4 md:p-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-primary">Toronto Music Grant Assistant</h1>
              <p className="text-muted-foreground">AI-powered grant writing for musicians</p>
            </div>
          </div>
          <NavBar />
        </header>
        
        <main className="container mx-auto py-8 px-4 md:px-0">
          <h1 className="text-3xl font-bold mb-8">Resources for Musicians</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Funding Organizations</CardTitle>
                <CardDescription>Key grant providers for Toronto musicians</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Toronto Arts Council</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Offers project grants, operating grants, and strategic funding for Toronto-based musicians and music organizations.
                  </p>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" /> Visit Website
                  </Button>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-1">Ontario Arts Council</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Provides grants for music creation, recording, touring, and audience development across Ontario.
                  </p>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" /> Visit Website
                  </Button>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-1">FACTOR</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Foundation Assisting Canadian Talent on Recordings offers various programs for recording, marketing, and touring.
                  </p>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" /> Visit Website
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Grant Writing Guides</CardTitle>
                <CardDescription>Helpful resources for crafting successful applications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Budget Templates</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Download customizable budget templates for music recording, touring, and marketing projects.
                  </p>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" /> Download Templates
                  </Button>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-1">Project Timeline Examples</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Sample timelines for album production, release campaigns, and touring projects.
                  </p>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" /> View Examples
                  </Button>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-1">Grant Writing Workshops</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Information on upcoming virtual and in-person grant writing workshops in Toronto.
                  </p>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" /> See Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Upcoming Grant Deadlines</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-4 text-left">Grant Program</th>
                    <th className="py-2 px-4 text-left">Organization</th>
                    <th className="py-2 px-4 text-left">Deadline</th>
                    <th className="py-2 px-4 text-left">Funding Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4">Music Projects</td>
                    <td className="py-3 px-4">Toronto Arts Council</td>
                    <td className="py-3 px-4">June 1, 2024</td>
                    <td className="py-3 px-4">Up to $10,000</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Juried Sound Recording</td>
                    <td className="py-3 px-4">FACTOR</td>
                    <td className="py-3 px-4">July 15, 2024</td>
                    <td className="py-3 px-4">Up to $15,000</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Music Creation Projects</td>
                    <td className="py-3 px-4">Ontario Arts Council</td>
                    <td className="py-3 px-4">August 3, 2024</td>
                    <td className="py-3 px-4">$3,000 - $12,000</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Concept to Realization</td>
                    <td className="py-3 px-4">Canada Council</td>
                    <td className="py-3 px-4">September 20, 2024</td>
                    <td className="py-3 px-4">Up to $25,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6">Community Support</h2>
            <p className="text-lg mb-4">
              Connect with other musicians and grant recipients in the Toronto area who can share their experiences and advice.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button>Join Our Discord</Button>
              <Button>Monthly Meetups</Button>
              <Button>Peer Review Group</Button>
            </div>
          </div>
        </main>
        
        <ChatBot />
      </div>
    </ChatbotProvider>
  );
};

export default Resources;
