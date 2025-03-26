
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, FilePenLine, FileSearch, Sparkles } from "lucide-react";
import { ChatTab } from "./ChatTab";
import { ApplicationGuideTab } from "./ApplicationGuideTab";
import { GrantSuggestionsTab } from "./GrantSuggestionsTab";
import { useChatbot } from "@/context/ChatbotContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const GrantAssistantTabs = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const { currentStep } = useChatbot();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Card className="h-[70vh] shadow-lg border-primary/20 overflow-hidden rounded-xl">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
        <div className="p-4 border-b bg-muted/30 backdrop-blur-sm">
          <TabsList className="grid grid-cols-3 rounded-lg p-1 bg-muted/60">
            <TabsTrigger 
              value="chat" 
              className={cn(
                "flex items-center gap-2 rounded-md transition-all duration-200",
                activeTab === "chat" ? "text-primary" : "text-muted-foreground"
              )}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="font-medium">AI Chat</span>
            </TabsTrigger>
            <TabsTrigger 
              value="application" 
              className={cn(
                "flex items-center gap-2 rounded-md transition-all duration-200",
                activeTab === "application" ? "text-primary" : "text-muted-foreground"
              )}
            >
              <FilePenLine className="h-4 w-4" />
              <span className="font-medium">Application Guide</span>
            </TabsTrigger>
            <TabsTrigger 
              value="suggestions" 
              className={cn(
                "flex items-center gap-2 rounded-md transition-all duration-200",
                activeTab === "suggestions" ? "text-primary" : "text-muted-foreground"
              )}
            >
              <FileSearch className="h-4 w-4" />
              <span className="font-medium">Grant Finder</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {mounted && (
          <>
            <TabsContent value="chat" className="flex-grow flex flex-col h-full p-0 m-0 overflow-hidden">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <ChatTab />
              </motion.div>
            </TabsContent>
            
            <TabsContent value="application" className="flex-grow p-0 m-0 overflow-hidden">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <ApplicationGuideTab />
              </motion.div>
            </TabsContent>
            
            <TabsContent value="suggestions" className="flex-grow p-0 m-0 overflow-hidden">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <GrantSuggestionsTab />
              </motion.div>
            </TabsContent>
          </>
        )}
      </Tabs>
    </Card>
  );
};
