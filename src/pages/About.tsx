
import { ChatbotProvider } from "@/context/ChatbotContext";
import { ChatBot } from "@/components/ChatBot";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NavBar } from "@/components/NavBar";

const About = () => {
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
          <h1 className="text-3xl font-bold mb-8">About Our Platform</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
                <CardDescription>Making music grants accessible to all</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The Toronto Music Grant Assistant was created to democratize access to music funding 
                  by providing musicians with AI-powered guidance through the complex grant application 
                  process. We analyze successful applications to help you craft compelling proposals.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
                <CardDescription>Data-driven grant assistance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our platform leverages artificial intelligence to analyze patterns in successful grant 
                  applications. We provide personalized guidance based on your specific project needs and 
                  the requirements of various Toronto and Ontario music grant programs.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Team</h2>
            <p className="text-lg mb-6">
              We're a group of music industry professionals, grant writers, and AI specialists dedicated 
              to helping Toronto's music community thrive through better access to funding opportunities.
            </p>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Technology</h2>
            <p className="text-lg mb-6">
              The Toronto Music Grant Assistant combines cutting-edge AI models with a database of successful 
              grant applications to provide custom guidance for your music project. Our enhanced AI capabilities 
              draw from both general grant writing expertise and specific insights from the Toronto music scene.
            </p>
          </div>
        </main>
        
        <ChatBot />
      </div>
    </ChatbotProvider>
  );
};

export default About;
