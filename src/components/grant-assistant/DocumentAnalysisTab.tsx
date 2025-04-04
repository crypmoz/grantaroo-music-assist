
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Brain, FileUp, Sparkles, FileText, FileCheck, BarChart, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useChatbot } from "@/context/ChatbotContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { UploadedFile } from "@/context/chatbot/types";
import { DocumentItem, DocumentItemType } from "@/components/dashboard/DocumentItem";
import { Badge } from "@/components/ui/badge";

export const DocumentAnalysisTab = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState("grant-guidelines");
  const [documents, setDocuments] = useState<DocumentItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const { isAuthenticated, user } = useAuth();
  const { addMessage, addUploadedFile } = useChatbot();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }
    
    if (!isAuthenticated) {
      toast.error("Please sign in to upload files");
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      // Upload to storage
      const fileName = `${Date.now()}-${selectedFile.name}`;
      const filePath = `${user!.id}/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('grant_resources')
        .upload(filePath, selectedFile);
        
      if (uploadError) throw uploadError;
      
      // Create record in database
      const { data, error: dbError } = await supabase
        .from('grant_documents')
        .insert({
          file_name: selectedFile.name,
          file_path: filePath,
          file_type: selectedFile.type,
          metadata: {
            category: documentType,
            tags: []
          },
          user_id: user!.id
        })
        .select()
        .single();
        
      if (dbError) throw dbError;
      
      // Process document through edge function
      const { error: processError } = await supabase.functions.invoke(
        'process-document',
        {
          body: { documentId: data.id }
        }
      );
      
      if (processError) {
        console.error("Error processing document:", processError);
        toast.warning("Document uploaded but automatic analysis failed. You can still use it for reference.");
      } else {
        toast.success("Document uploaded and analyzed successfully");
      }
      
      // Clear form and reload documents
      setSelectedFile(null);
      setDocumentType("grant-guidelines");
      fetchDocuments();
      
      // Create a proper ChatBot UploadedFile object
      const uploadedFile: UploadedFile = {
        id: data.id,
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type,
        data: selectedFile
      };
      
      // Add to chatbot context for immediate use
      addUploadedFile(uploadedFile);
      
      // Switch to the analyze tab
      setActiveTab("analyze");
    } catch (error) {
      console.error("Error uploading document:", error);
      toast.error("Failed to upload document");
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const fetchDocuments = async () => {
    if (!isAuthenticated) return;
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('grant_documents')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      // Map the snake_case properties from Supabase to the camelCase properties expected by DocumentItemType
      const formattedDocs: DocumentItemType[] = data.map(doc => {
        // Safely extract metadata properties with proper type handling
        const metadata = doc.metadata as Record<string, any> || {};
        
        return {
          id: doc.id,
          fileName: doc.file_name,
          fileType: doc.file_type,
          filePath: doc.file_path,
          createdAt: new Date(doc.created_at).toLocaleDateString(),
          metadata: {
            tags: Array.isArray(metadata.tags) ? metadata.tags : [],
            category: typeof metadata.category === 'string' ? metadata.category : 'general',
            size: typeof metadata.size === 'number' ? metadata.size : undefined
          }
        };
      });
      
      setDocuments(formattedDocs);
    } catch (error) {
      console.error("Error fetching documents:", error);
      toast.error("Failed to load documents");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAnalyzeDocument = async (document: DocumentItemType) => {
    try {
      // Add to chat
      await addMessage(`Please analyze the document "${document.fileName}" I've uploaded. What are the key requirements and what makes a successful application based on this document?`, "user");
      
      toast.success("Document sent for analysis. Check the chat tab for insights.");
      
      // Switch to chat tab
      setActiveTab("chat");
    } catch (error) {
      console.error("Error analyzing document:", error);
      toast.error("Failed to analyze document");
    }
  };
  
  // Fetch documents on component mount
  useState(() => {
    fetchDocuments();
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-full">
      <div className="lg:col-span-3">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Document Management
            </CardTitle>
            <CardDescription>
              Upload and analyze grant guidelines, application forms, and successful examples
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="upload">Upload</TabsTrigger>
                <TabsTrigger value="analyze">Your Documents</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload" className="animate-in">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="docType">Document Type</Label>
                    <select 
                      id="docType" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={documentType}
                      onChange={(e) => setDocumentType(e.target.value)}
                    >
                      <option value="grant-guidelines">Grant Guidelines</option>
                      <option value="application-form">Application Form</option>
                      <option value="successful-example">Successful Application Example</option>
                      <option value="reference-material">Reference Material</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="file">Upload Document</Label>
                    <Input 
                      id="file" 
                      type="file" 
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.txt"
                    />
                    <p className="text-xs text-muted-foreground">
                      Upload PDF, Word, or text files (max 5MB)
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      onClick={handleUpload} 
                      className="w-full"
                      disabled={!selectedFile || isAnalyzing}
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <FileUp className="mr-2 h-4 w-4" />
                          Upload and Analyze
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="analyze" className="animate-in">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Your Documents</h3>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={fetchDocuments}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Refresh"
                      )}
                    </Button>
                  </div>
                  
                  <ScrollArea className="h-[360px]">
                    {documents.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        {isLoading ? "Loading documents..." : "No documents found"}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {documents.map((doc) => (
                          <div key={doc.id} className="border rounded-lg p-3 hover:bg-accent/50 transition-colors">
                            <div className="flex justify-between mb-2">
                              <h4 className="font-medium">{doc.fileName}</h4>
                              <span className="text-xs text-muted-foreground">
                                {doc.createdAt}
                              </span>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mb-3">
                              <Badge variant="outline">
                                {doc.metadata?.category || "Document"}
                              </Badge>
                              {doc.metadata?.tags?.map((tag: string, idx: number) => (
                                <Badge key={idx} variant="secondary">{tag}</Badge>
                              ))}
                            </div>
                            
                            <div className="flex items-center space-x-2 mt-2">
                              <Button 
                                size="sm" 
                                variant="default"
                                onClick={() => handleAnalyzeDocument(doc)}
                              >
                                <Brain className="h-3.5 w-3.5 mr-1" />
                                Analyze
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                              >
                                <FileCheck className="h-3.5 w-3.5 mr-1" />
                                View
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Document Insights
            </CardTitle>
            <CardDescription>
              Our AI analyzes your documents to extract key insights
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Card className="bg-primary/5 border-primary/10">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <Brain className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">How AI Document Analysis Works</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Upload grant guidelines or successful applications to get AI-powered insights:
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 pl-7">
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">1. Document Extraction</h4>
                      <p className="text-xs text-muted-foreground">
                        Our AI extracts and processes text from uploaded PDFs, Word docs, and text files
                      </p>
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">2. Key Requirement Analysis</h4>
                      <p className="text-xs text-muted-foreground">
                        Identifies essential criteria, deadlines, and eligibility requirements
                      </p>
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">3. Success Pattern Recognition</h4>
                      <p className="text-xs text-muted-foreground">
                        Analyzes successful examples to identify patterns and effective approaches
                      </p>
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">4. Personalized Guidance</h4>
                      <p className="text-xs text-muted-foreground">
                        Provides tailored suggestions based on your artist profile and project
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-background rounded-md p-3 border">
                    <h4 className="text-sm font-medium flex items-center gap-1.5">
                      <BarChart className="h-3.5 w-3.5 text-primary" />
                      Grant Success Factors
                    </h4>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="text-xs p-2 bg-accent/50 rounded">
                        <span className="font-medium">Clear Objectives</span>
                        <div className="w-full bg-background rounded-full h-1.5 mt-1">
                          <div className="bg-green-500 h-1.5 rounded-full" style={{width: "95%"}}></div>
                        </div>
                      </div>
                      <div className="text-xs p-2 bg-accent/50 rounded">
                        <span className="font-medium">Budget Detail</span>
                        <div className="w-full bg-background rounded-full h-1.5 mt-1">
                          <div className="bg-green-500 h-1.5 rounded-full" style={{width: "87%"}}></div>
                        </div>
                      </div>
                      <div className="text-xs p-2 bg-accent/50 rounded">
                        <span className="font-medium">Timeline Quality</span>
                        <div className="w-full bg-background rounded-full h-1.5 mt-1">
                          <div className="bg-green-500 h-1.5 rounded-full" style={{width: "84%"}}></div>
                        </div>
                      </div>
                      <div className="text-xs p-2 bg-accent/50 rounded">
                        <span className="font-medium">Impact Statement</span>
                        <div className="w-full bg-background rounded-full h-1.5 mt-1">
                          <div className="bg-green-500 h-1.5 rounded-full" style={{width: "79%"}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button onClick={() => setActiveTab("upload")} className="w-full">
                    <FileUp className="mr-2 h-4 w-4" />
                    Upload Document to Analyze
                  </Button>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
