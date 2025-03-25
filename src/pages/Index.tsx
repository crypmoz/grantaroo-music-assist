
import { GrantApplicationForm } from "@/components/GrantApplicationForm";
import { ChatBot } from "@/components/ChatBot";
import { ChatbotProvider } from "@/context/ChatbotContext";
import { Button } from "@/components/ui/button";
import { MessageCircle, Music, Award, FileText, Zap, Clock, Users, BarChart3 } from "lucide-react";
import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { motion } from "framer-motion";

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  
  return (
    <ChatbotProvider>
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
        <header className="border-b p-4 md:p-6 bg-white/80 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-primary">Canada Music Grant Assistant</h1>
              <p className="text-muted-foreground">AI-powered grant writing for musicians</p>
            </div>
            <div className="hidden md:block">
              <p className="text-sm text-muted-foreground">Helping artists secure funding since 2024</p>
            </div>
          </div>
          <NavBar />
        </header>
        
        <main className="container mx-auto py-8 px-4 md:px-0">
          {!showForm ? (
            <div className="max-w-6xl mx-auto">
              {/* Hero section with enhanced animations and graphics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 relative">
                {/* Decorative floating elements */}
                <motion.div 
                  className="absolute -top-10 -left-10 w-24 h-24 bg-blue-200 rounded-full opacity-20 hidden lg:block"
                  animate={{ 
                    y: [0, -15, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                <motion.div 
                  className="absolute bottom-10 right-0 w-16 h-16 bg-purple-300 rounded-full opacity-20 hidden lg:block"
                  animate={{ 
                    y: [0, 15, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1
                  }}
                />
                
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                  className="space-y-6"
                >
                  <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
                    Find the <span className="text-blue-600 relative">
                      Perfect Grant
                      <motion.div 
                        className="absolute bottom-1 left-0 h-2 bg-blue-200 w-full -z-10 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.5, duration: 0.7 }}
                      />
                    </span> for Your Music Project
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    Our AI-powered assistant will guide you through every step of the grant application process,
                    from matching you with the right opportunities to helping you complete your application.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button 
                      size="lg" 
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white relative overflow-hidden group"
                      onClick={() => setShowForm(true)}
                    >
                      <motion.span
                        className="absolute inset-0 w-full h-full bg-white/10 transform -translate-x-full"
                        animate={{ translateX: ["100%", "-100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                      />
                      <FileText className="h-5 w-5" />
                      View Application Form
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="flex items-center gap-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                      onClick={() => {
                        const chatbotButton = document.querySelector('.fixed.bottom-4.right-4') as HTMLButtonElement;
                        if (chatbotButton) chatbotButton.click();
                      }}
                    >
                      <MessageCircle className="h-5 w-5" />
                      Chat with Grant Assistant
                    </Button>
                  </div>
                </motion.div>
                
                {/* Enhanced visual card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="hidden lg:block"
                >
                  <div className="relative w-full max-w-md">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
                    <div className="relative bg-white/90 shadow-xl rounded-2xl p-8 backdrop-blur-sm border border-white/20">
                      <div className="flex flex-col h-full justify-center items-center space-y-6">
                        <motion.div 
                          className="bg-blue-100 p-6 rounded-full"
                          whileHover={{ 
                            scale: 1.05,
                            rotate: 5,
                            backgroundColor: "#dbeafe" // lighter blue 
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <Award className="h-12 w-12 text-blue-600" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-center">Increase Your Success Rate</h3>
                        <p className="text-center text-muted-foreground">
                          Musicians who use our platform are 3x more likely to receive grant funding
                        </p>
                        
                        {/* Animated success tracker */}
                        <div className="w-full bg-gray-100 rounded-full h-4 mt-2">
                          <motion.div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ width: "75%" }}
                            transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
                          />
                        </div>
                        <div className="flex justify-between w-full text-xs text-gray-500">
                          <span>Regular Application</span>
                          <span>With Our Platform</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Enhanced features section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
              >
                {/* Feature cards with hover effects */}
                <motion.div 
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                  whileHover={{ y: -5, backgroundColor: "#f8fafc" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
                  <p className="text-muted-foreground">
                    Get personalized advice from our AI that's trained on successful grant applications
                  </p>
                  <motion.div 
                    className="w-1/3 h-1 bg-blue-200 mt-4 rounded-full"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
                
                <motion.div 
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                  whileHover={{ y: -5, backgroundColor: "#fdf4ff" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-purple-100 p-3 rounded-full w-fit mb-4">
                    <FileText className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Application Templates</h3>
                  <p className="text-muted-foreground">
                    Access proven templates and examples that have helped artists secure funding
                  </p>
                  <motion.div 
                    className="w-1/3 h-1 bg-purple-200 mt-4 rounded-full"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
                
                <motion.div 
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                  whileHover={{ y: -5, backgroundColor: "#eef2ff" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-indigo-100 p-3 rounded-full w-fit mb-4">
                    <Music className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Industry Specific</h3>
                  <p className="text-muted-foreground">
                    Tailored specifically for the Canadian music industry and its unique funding landscape
                  </p>
                  <motion.div 
                    className="w-1/3 h-1 bg-indigo-200 mt-4 rounded-full"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
              
              {/* Stats section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                className="mb-16 p-8 bg-white rounded-xl shadow-md"
              >
                <h3 className="text-2xl font-bold mb-6 text-center">Why Musicians Trust Our Platform</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <motion.div 
                    className="text-center p-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-4">
                      <Zap className="h-6 w-6 text-green-600" />
                    </div>
                    <motion.div 
                      className="text-3xl font-bold text-green-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.0, duration: 0.5 }}
                    >
                      87%
                    </motion.div>
                    <p className="text-muted-foreground">Success Rate</p>
                  </motion.div>
                  
                  <motion.div 
                    className="text-center p-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <motion.div 
                      className="text-3xl font-bold text-blue-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.1, duration: 0.5 }}
                    >
                      1,200+
                    </motion.div>
                    <p className="text-muted-foreground">Musicians Helped</p>
                  </motion.div>
                  
                  <motion.div 
                    className="text-center p-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-4">
                      <BarChart3 className="h-6 w-6 text-purple-600" />
                    </div>
                    <motion.div 
                      className="text-3xl font-bold text-purple-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2, duration: 0.5 }}
                    >
                      $4.2M
                    </motion.div>
                    <p className="text-muted-foreground">Funding Secured</p>
                  </motion.div>
                  
                  <motion.div 
                    className="text-center p-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="bg-orange-100 p-3 rounded-full w-fit mx-auto mb-4">
                      <Clock className="h-6 w-6 text-orange-600" />
                    </div>
                    <motion.div 
                      className="text-3xl font-bold text-orange-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.3, duration: 0.5 }}
                    >
                      3x
                    </motion.div>
                    <p className="text-muted-foreground">Faster Applications</p>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Enhanced CTA section */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.0 }}
                className="relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
                <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuLWNpcmNsZXMiIHg9IjAiIHk9IjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjEiIC8+PC9wYXR0ZXJuPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybi1jaXJjbGVzKSIgLz48L3N2Zz4=')] bg-repeat"></div>
                
                <div className="relative z-10 p-10 rounded-2xl shadow-lg">
                  <div className="max-w-2xl mx-auto text-center">
                    <motion.h2 
                      className="text-3xl font-bold mb-4 text-white"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.1 }}
                    >
                      Ready to Start Your Application?
                    </motion.h2>
                    <motion.p 
                      className="text-xl mb-6 text-blue-100"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      Let our AI assistant help you craft a compelling grant application that stands out
                    </motion.p>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.3 }}
                    >
                      <Button 
                        size="lg" 
                        className="bg-white text-blue-600 hover:bg-blue-50 relative overflow-hidden group"
                        onClick={() => setShowForm(true)}
                      >
                        <span className="relative z-10">Get Started Now</span>
                        <motion.span 
                          className="absolute inset-0 bg-blue-100 transform scale-x-0 origin-left"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="mb-6"
                onClick={() => setShowForm(false)}
              >
                Back to Home
              </Button>
              <GrantApplicationForm />
            </>
          )}
        </main>
        
        <ChatBot />
      </div>
    </ChatbotProvider>
  );
};

export default Index;
