
import { ChatbotProvider } from "@/context/ChatbotContext";
import { ChatBot } from "@/components/ChatBot";
import { NavBar } from "@/components/NavBar";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { HelpCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion } from "framer-motion";

const faqItems = [
  {
    question: "What types of music grants are available in Canada?",
    answer: `<p class="mb-2">Canada offers various grants for musicians, including:</p>
    <ul class="list-disc pl-6 space-y-1">
      <li>Canada Arts Council Music Projects</li>
      <li>Ontario Arts Council Music Creation Projects</li>
      <li>FACTOR Juried Sound Recording Program</li>
      <li>Canada Council for the Arts Music Grants</li>
      <li>Ontario Music Investment Fund</li>
      <li>Canada Music Industry Initiative</li>
    </ul>
    <p class="mt-2">Each has different eligibility requirements and funding amounts.</p>`
  },
  {
    question: "How can your AI assistant help with my grant application?",
    answer: "Our AI assistant analyzes successful grant applications to provide tailored advice for your specific project. It can help you refine your project description, budget planning, timeline creation, and audience development strategy. The assistant can identify gaps in your application and suggest improvements based on what has worked for successful applicants."
  },
  {
    question: "What makes a successful music grant application?",
    answer: "Successful applications typically have clear project objectives, realistic budgets, well-defined timelines, and demonstrate both artistic merit and community impact. They articulate how the project aligns with the funder's priorities and provide evidence of the applicant's capability to complete the project successfully. Our data shows that applications with specific, measurable outcomes tend to receive higher scores from reviewers."
  },
  {
    question: "How far in advance should I apply for a music grant?",
    answer: "Most grants have specific application deadlines and funding cycles. We recommend starting your application at least 8-12 weeks before the deadline. Major grants like those from the Canada Council for the Arts or Ontario Arts Council may have results announced 3-6 months after submission, so plan your project timeline accordingly."
  },
  {
    question: "What information should I prepare before using your assistant?",
    answer: `Before starting, gather information about your project including:
    <ul class="list-disc pl-6 space-y-1 mt-2">
      <li>Project description and artistic vision</li>
      <li>Estimated budget with expense categories</li>
      <li>Project timeline and milestones</li>
      <li>Your artistic resume or bio</li>
      <li>Past work samples (if applicable)</li>
      <li>Target audience and community impact</li>
      <li>Marketing and distribution plans</li>
    </ul>
    Having this information ready will help our assistant provide more specific and useful guidance.`
  },
  {
    question: "How does the Enhanced AI feature work?",
    answer: "Our Enhanced AI feature uses the AI Grant Tool language model to provide more sophisticated analysis and recommendations. When enabled, your queries are processed through an advanced AI system that has been specifically trained on successful grant applications and music industry knowledge. This allows for more nuanced and contextual advice tailored to Canada's music grant ecosystem. You can toggle this feature on or off in the chat interface."
  },
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredFaqs = searchQuery === "" 
    ? faqItems 
    : faqItems.filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );

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
              <HelpCircle className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-primary">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Find answers to common questions about our platform and music grants in Canada
            </p>
            
            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                type="text"
                placeholder="Search questions..."
                className="pl-10 bg-white/80 backdrop-blur-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6 md:p-8 mb-12"
          >
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 last:border-0">
                  <AccordionTrigger className="text-lg font-medium hover:text-blue-600 transition-colors py-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground py-3">
                    <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                  </AccordionContent>
                </AccordionItem>
              ))}
              
              {filteredFaqs.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No matching questions found.</p>
                  <Button 
                    variant="outline"
                    onClick={() => setSearchQuery("")}
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                  >
                    Clear Search
                  </Button>
                </div>
              )}
            </Accordion>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl overflow-hidden shadow-md">
              <div className="px-6 py-8 md:py-10 md:px-10 text-white">
                <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
                <p className="mb-6 text-purple-100">
                  Our AI assistant is available 24/7 to answer any specific questions about your grant application
                </p>
                <Button 
                  variant="secondary"
                  className="bg-white text-indigo-600 hover:bg-indigo-50"
                  onClick={() => {
                    const chatbotButton = document.querySelector('.fixed.bottom-4.right-4') as HTMLButtonElement;
                    if (chatbotButton) chatbotButton.click();
                  }}
                >
                  Chat with AI Assistant
                </Button>
              </div>
            </div>
          </motion.div>
        </main>
        
        <ChatBot />
      </div>
    </ChatbotProvider>
  );
};

export default FAQ;
