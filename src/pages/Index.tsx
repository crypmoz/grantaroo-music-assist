
import { useState } from "react";
import { GrantApplicationForm } from "@/components/GrantApplicationForm";
import { ChatBot } from "@/components/ChatBot";
import { ChatbotProvider } from "@/context/ChatbotContext";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { CallToAction } from "@/components/CallToAction";
import { ContactSection } from "@/components/ContactSection";
import { motion } from "framer-motion";

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  
  return (
    <ChatbotProvider>
      <div className="min-h-screen bg-white">
        <Header />
        
        <main>
          {!showForm ? (
            <>
              <HeroSection />
              
              {/* Trusted by section */}
              <motion.section 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="py-12 bg-gray-50"
              >
                <div className="container mx-auto px-4">
                  <div className="text-center mb-8">
                    <p className="text-gray-500 uppercase tracking-wider text-sm font-medium">
                      Trusted by musicians across Canada
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                    <img src="/placeholder.svg" alt="Logo 1" className="h-12 opacity-50" />
                    <img src="/placeholder.svg" alt="Logo 2" className="h-12 opacity-50" />
                    <img src="/placeholder.svg" alt="Logo 3" className="h-12 opacity-50" />
                    <img src="/placeholder.svg" alt="Logo 4" className="h-12 opacity-50" />
                    <img src="/placeholder.svg" alt="Logo 5" className="h-12 opacity-50" />
                  </div>
                </div>
              </motion.section>
              
              <HowItWorks />
              
              {/* Success Stories Section */}
              <motion.section 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="py-20 bg-gray-50"
              >
                <div className="container mx-auto px-4">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                      Read how musicians across Canada have used our platform to secure funding and advance their careers.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Success Story Cards */}
                    {[1, 2, 3].map((item) => (
                      <motion.div 
                        key={item}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: item * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                      >
                        <img 
                          src={`/lovable-uploads/31de3fac-c732-4f53-bb13-86bde610ee0d.png`} 
                          alt={`Success story ${item}`}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2">Sarah Johnson</h3>
                          <p className="text-blue-600 font-medium mb-3">$25,000 FACTOR Grant</p>
                          <p className="text-gray-600 mb-4">
                            "The AI assistant helped me identify key areas to strengthen in my application. 
                            I was able to secure a FACTOR grant that funded my album production."
                          </p>
                          <Button variant="link" className="p-0 text-blue-600">Read full story</Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.section>
              
              {/* Statistics Section */}
              <motion.section 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="py-20 bg-blue-600 text-white"
              >
                <div className="container mx-auto px-4">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                      We've helped musicians across Canada secure funding and advance their careers.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                      { number: "$4.2M", label: "Funding Secured" },
                      { number: "1,200+", label: "Musicians Helped" },
                      { number: "87%", label: "Success Rate" },
                      { number: "3x", label: "Faster Applications" }
                    ].map((stat, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-lg"
                      >
                        <p className="text-4xl font-bold mb-2">{stat.number}</p>
                        <p className="text-blue-100">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.section>
              
              <CallToAction />
              <ContactSection />
            </>
          ) : (
            <div className="container mx-auto py-8 px-4">
              <Button 
                variant="outline" 
                className="mb-6"
                onClick={() => setShowForm(false)}
              >
                Back to Home
              </Button>
              <GrantApplicationForm />
            </div>
          )}
        </main>
        
        <Footer />
        <ChatBot />
      </div>
    </ChatbotProvider>
  );
};

export default Index;
