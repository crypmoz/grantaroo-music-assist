
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, FilePenLine, FileSearch } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatTab } from "./ChatTab";
import { ApplicationGuideTab } from "./ApplicationGuideTab";
import { GrantSuggestionsTab } from "./GrantSuggestionsTab";
import { useChatbot } from "@/context/ChatbotContext";

export const GrantAssistantTabs = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const { currentStep } = useChatbot();

  return (
    <Card className="h-[70vh] shadow-md border-primary/20">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
        <div className="p-4 border-b bg-muted/50">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="application" className="flex items-center gap-2">
              <FilePenLine className="h-4 w-4" />
              Application Guide
            </TabsTrigger>
            <TabsTrigger value="suggestions" className="flex items-center gap-2">
              <FileSearch className="h-4 w-4" />
              Grant Finder
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="chat" className="flex-grow flex flex-col h-full p-0 m-0">
          <ChatTab />
        </TabsContent>
        
        <TabsContent value="application" className="flex-grow p-0 m-0 overflow-auto">
          <ScrollArea className="h-full">
            <div className="p-4">
              <ApplicationGuideTab />
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="suggestions" className="flex-grow p-0 m-0 overflow-auto">
          <ScrollArea className="h-full">
            <div className="p-4">
              <GrantSuggestionsTab />
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
