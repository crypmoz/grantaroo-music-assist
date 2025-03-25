
import { ChatbotProvider } from "@/context/ChatbotContext";
import { ChatBot } from "@/components/ChatBot";
import { NavBar } from "@/components/NavBar";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <ChatbotProvider>
      <div className="min-h-screen bg-background">
        <header className="border-b p-4 md:p-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-primary">Canada Music Grant Assistant</h1>
              <p className="text-muted-foreground">AI-powered grant writing for musicians</p>
            </div>
          </div>
          <NavBar />
        </header>
        
        <main className="container mx-auto py-8 px-4 md:px-0">
          <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
          
          <div className="mb-12">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-medium">
                  What types of music grants are available in Canada?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <p className="mb-2">Canada offers various grants for musicians, including:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Canada Arts Council Music Projects</li>
                    <li>Ontario Arts Council Music Creation Projects</li>
                    <li>FACTOR Juried Sound Recording Program</li>
                    <li>Canada Council for the Arts Music Grants</li>
                    <li>Ontario Music Investment Fund</li>
                    <li>Canada Music Industry Initiative</li>
                  </ul>
                  <p className="mt-2">Each has different eligibility requirements and funding amounts.</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-medium">
                  How can your AI assistant help with my grant application?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Our AI assistant analyzes successful grant applications to provide tailored advice for your specific project. 
                  It can help you refine your project description, budget planning, timeline creation, and audience development strategy. 
                  The assistant can identify gaps in your application and suggest improvements based on what has worked for successful applicants.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-medium">
                  What makes a successful music grant application?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Successful applications typically have clear project objectives, realistic budgets, well-defined timelines, 
                  and demonstrate both artistic merit and community impact. They articulate how the project aligns with the 
                  funder's priorities and provide evidence of the applicant's capability to complete the project successfully. 
                  Our data shows that applications with specific, measurable outcomes tend to receive higher scores from reviewers.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-medium">
                  How far in advance should I apply for a music grant?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Most grants have specific application deadlines and funding cycles. We recommend starting your application 
                  at least 8-12 weeks before the deadline. Major grants like those from the Canada Council for the Arts or 
                  Ontario Arts Council may have results announced 3-6 months after submission, so plan your project timeline accordingly.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg font-medium">
                  What information should I prepare before using your assistant?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Before starting, gather information about your project including:
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>Project description and artistic vision</li>
                    <li>Estimated budget with expense categories</li>
                    <li>Project timeline and milestones</li>
                    <li>Your artistic resume or bio</li>
                    <li>Past work samples (if applicable)</li>
                    <li>Target audience and community impact</li>
                    <li>Marketing and distribution plans</li>
                  </ul>
                  Having this information ready will help our assistant provide more specific and useful guidance.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-lg font-medium">
                  How does the Enhanced AI feature work?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Our Enhanced AI feature uses the AI Grant Tool language model to provide more sophisticated analysis and recommendations. 
                  When enabled, your queries are processed through an advanced AI system that has been specifically trained on successful 
                  grant applications and music industry knowledge. This allows for more nuanced and contextual advice tailored to 
                  Canada's music grant ecosystem. You can toggle this feature on or off in the chat interface.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </main>
        
        <ChatBot />
      </div>
    </ChatbotProvider>
  );
};

export default FAQ;
