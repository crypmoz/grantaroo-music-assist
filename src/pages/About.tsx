
import { ChatbotProvider } from "@/context/ChatbotContext";
import { ChatBot } from "@/components/ChatBot";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NavBar } from "@/components/NavBar";
import { Award, Users, LightbulbIcon, BarChart3, MusicIcon } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
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
            className="mb-12 max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">About Our Platform</h1>
            <p className="text-xl text-muted-foreground">
              We're on a mission to democratize access to music funding in Canada through 
              innovative AI technology and industry expertise.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full bg-white/80 backdrop-blur-sm border-blue-100 hover:shadow-md transition-all overflow-hidden group">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-bl-full -z-10 group-hover:bg-blue-500/20 transition-colors"></div>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Award className="h-5 w-5 text-blue-600" />
                    </div>
                    <CardTitle>Our Mission</CardTitle>
                  </div>
                  <CardDescription className="text-base">Making music grants accessible to all</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    The Canada Music Grant Assistant was created to democratize access to music funding 
                    by providing musicians with AI-powered guidance through the complex grant application 
                    process. We analyze successful applications to help you craft compelling proposals.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="h-full bg-white/80 backdrop-blur-sm border-indigo-100 hover:shadow-md transition-all overflow-hidden group">
                <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/10 rounded-bl-full -z-10 group-hover:bg-indigo-500/20 transition-colors"></div>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-indigo-100 p-2 rounded-full">
                      <LightbulbIcon className="h-5 w-5 text-indigo-600" />
                    </div>
                    <CardTitle>How It Works</CardTitle>
                  </div>
                  <CardDescription className="text-base">Data-driven grant assistance</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our platform leverages artificial intelligence to analyze patterns in successful grant 
                    applications. We provide personalized guidance based on your specific project needs and 
                    the requirements of various Canadian music grant programs.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-16 bg-white rounded-2xl p-10 shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold">Our Team</h2>
            </div>
            <p className="text-lg mb-8 text-muted-foreground">
              We're a group of music industry professionals, grant writers, and AI specialists dedicated 
              to helping Canada's music community thrive through better access to funding opportunities.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-purple-50 p-6 rounded-xl">
                <h3 className="font-semibold mb-2">Music Industry Experts</h3>
                <p className="text-sm text-muted-foreground">
                  Former label executives, managers, and artists who understand the industry from the inside
                </p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="font-semibold mb-2">Grant Specialists</h3>
                <p className="text-sm text-muted-foreground">
                  Professionals with years of experience in securing music funding across Canada
                </p>
              </div>
              
              <div className="bg-indigo-50 p-6 rounded-xl">
                <h3 className="font-semibold mb-2">AI Researchers</h3>
                <p className="text-sm text-muted-foreground">
                  Technical experts who design our intelligent systems to provide accurate guidance
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-100 p-3 rounded-full">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold">Our Technology</h2>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-10 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuLWNpcmNsZXMiIHg9IjAiIHk9IjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjEiIC8+PC9wYXR0ZXJuPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybi1jaXJjbGVzKSIgLz48L3N2Zz4=')] opacity-50"></div>
              <div className="relative z-10">
                <p className="text-lg mb-6 max-w-3xl text-blue-100">
                  The Canada Music Grant Assistant combines cutting-edge AI models with a database of successful 
                  grant applications to provide custom guidance for your music project. Our enhanced AI capabilities 
                  draw from both general grant writing expertise and specific insights from the Canadian music scene.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                    <h3 className="font-semibold mb-2 text-white">Personalized Recommendations</h3>
                    <p className="text-sm text-blue-100">
                      Our system adapts to your specific project needs, career stage, and musical genre to provide tailored advice
                    </p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                    <h3 className="font-semibold mb-2 text-white">Success Pattern Analysis</h3>
                    <p className="text-sm text-blue-100">
                      We continuously analyze successful grant applications to identify patterns and strategies that work
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center justify-center"
          >
            <Card className="max-w-2xl w-full bg-white/80 backdrop-blur-sm border-blue-100">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-green-100 p-2 rounded-full">
                    <MusicIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <CardTitle>Join Our Community</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Connect with fellow musicians and creators who are navigating the grant landscape. 
                  Share experiences, get advice, and celebrate successes together.
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="bg-green-50 px-4 py-2 rounded-full text-sm text-green-700">Monthly Webinars</div>
                  <div className="bg-blue-50 px-4 py-2 rounded-full text-sm text-blue-700">Success Stories</div>
                  <div className="bg-purple-50 px-4 py-2 rounded-full text-sm text-purple-700">Discussion Forums</div>
                  <div className="bg-indigo-50 px-4 py-2 rounded-full text-sm text-indigo-700">Networking Events</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
        
        <ChatBot />
      </div>
    </ChatbotProvider>
  );
};

export default About;
