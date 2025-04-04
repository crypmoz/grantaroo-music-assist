
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { ChatTab } from "./ChatTab";
import { GrantSuggestionsTab } from "./GrantSuggestionsTab";
import { DocumentAnalysisTab } from "./DocumentAnalysisTab";
import { Brain, FileText, Search } from "lucide-react";

export const GrantAssistantLayout = () => {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">AI Grant Assistant</h1>
      </div>
      
      <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab}>
        <div className="border-b pb-2 mb-6">
          <TabsList className="h-auto">
            <TabsTrigger value="chat" className="flex items-center gap-2 py-2.5">
              <Brain className="h-4 w-4" />
              <span>Ask AI</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2 py-2.5">
              <FileText className="h-4 w-4" />
              <span>Document Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="suggestions" className="flex items-center gap-2 py-2.5">
              <Search className="h-4 w-4" />
              <span>Find Grants</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <div className="bg-card rounded-lg p-4 border min-h-[70vh]">
          <TabsContent value="chat" className="h-full mt-0">
            <ChatTab />
          </TabsContent>
          
          <TabsContent value="documents" className="h-full mt-0">
            <DocumentAnalysisTab />
          </TabsContent>
          
          <TabsContent value="suggestions" className="h-full mt-0">
            <GrantSuggestionsTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
