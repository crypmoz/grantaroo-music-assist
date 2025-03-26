
import { useState, useEffect } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useChatbot } from "@/context/ChatbotContext";
import { motion } from "framer-motion";
import { ChatTab } from "./ChatTab";
import { ApplicationGuideTab } from "./ApplicationGuideTab";
import { GrantSuggestionsTab } from "./GrantSuggestionsTab";
import { Button } from "@/components/ui/button";
import { MessageCircle, FilePenLine, FileSearch } from "lucide-react";

export const GrantAssistantTabs = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const { currentStep } = useChatbot();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden space-y-4">
      {/* Custom tab navigation */}
      <div className="bg-white p-2 rounded-lg shadow-sm border flex">
        <TabButton 
          isActive={activeTab === "chat"} 
          onClick={() => setActiveTab("chat")}
          icon={<MessageCircle className="h-4 w-4" />}
          label="AI Chat"
        />
        <TabButton 
          isActive={activeTab === "application"} 
          onClick={() => setActiveTab("application")}
          icon={<FilePenLine className="h-4 w-4" />}
          label="Application Guide"
        />
        <TabButton 
          isActive={activeTab === "suggestions"} 
          onClick={() => setActiveTab("suggestions")}
          icon={<FileSearch className="h-4 w-4" />}
          label="Grant Finder"
        />
      </div>

      {/* Tab content */}
      <div className="flex-grow bg-white rounded-lg shadow-sm border overflow-hidden h-[calc(100vh-220px)]">
        {mounted && (
          <Tabs value={activeTab} className="h-full">
            <TabsContent value="chat" className="h-full m-0 p-0">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <ChatTab />
              </motion.div>
            </TabsContent>
            
            <TabsContent value="application" className="h-full m-0 p-0">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <ApplicationGuideTab />
              </motion.div>
            </TabsContent>
            
            <TabsContent value="suggestions" className="h-full m-0 p-0">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <GrantSuggestionsTab />
              </motion.div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

type TabButtonProps = {
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
};

const TabButton = ({ isActive, onClick, icon, label }: TabButtonProps) => (
  <Button
    variant="ghost"
    onClick={onClick}
    className={`flex-1 rounded-md py-3 flex gap-2 justify-center items-center transition-all ${
      isActive 
        ? "bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700" 
        : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </Button>
);
