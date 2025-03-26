
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUp, Trash2, Tag, File } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/context/AuthContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

type DocumentItem = {
  id: string;
  fileName: string;
  fileType: string;
  filePath: string;
  createdAt: string;
  metadata: {
    tags?: string[];
    category?: string;
    size?: number;
  };
};

export const DocumentManager = () => {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { user } = useAuth();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('grant_documents')
        .select('*')
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      if (data) {
        const formattedDocs = data.map(doc => ({
          id: doc.id,
          fileName: doc.file_name,
          fileType: doc.file_type,
          filePath: doc.file_path,
          createdAt: new Date(doc.created_at).toLocaleDateString(),
          metadata: doc.metadata || { tags: [], category: 'general' }
        }));
        
        setDocuments(formattedDocs);
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const uploadDocument = async () => {
    if (!selectedFile || !user) return;
    
    setIsUploading(true);
    
    try {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('grant_resources')
        .upload(filePath, selectedFile);
        
      if (uploadError) throw uploadError;
      
      const { error: insertError } = await supabase
        .from('grant_documents')
        .insert({
          user_id: user.id,
          file_name: selectedFile.name,
          file_type: selectedFile.type,
          file_path: filePath,
          metadata: {
            size: selectedFile.size,
            category: 'grant',
            tags: []
          }
        });
        
      if (insertError) throw insertError;
      
      setSelectedFile(null);
      fetchDocuments();
      toast.success("Document uploaded successfully");
    } catch (error) {
      console.error("Error uploading document:", error);
      toast.error("Failed to upload document");
    } finally {
      setIsUploading(false);
    }
  };

  const deleteDocument = async (id: string, filePath: string) => {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('grant_resources')
        .remove([filePath]);
        
      if (storageError) throw storageError;
      
      // Delete from database
      const { error: dbError } = await supabase
        .from('grant_documents')
        .delete()
        .eq('id', id);
        
      if (dbError) throw dbError;
      
      // Remove from local state
      setDocuments(prev => prev.filter(doc => doc.id !== id));
      toast.success("Document deleted");
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error("Failed to delete document");
    }
  };

  const addTag = async (documentId: string, newTag: string) => {
    const document = documents.find(doc => doc.id === documentId);
    if (!document) return;
    
    const currentTags = document.metadata.tags || [];
    const updatedTags = [...currentTags, newTag];
    
    try {
      const { error } = await supabase
        .from('grant_documents')
        .update({
          metadata: { ...document.metadata, tags: updatedTags }
        })
        .eq('id', documentId);
        
      if (error) throw error;
      
      // Update local state
      setDocuments(prev => prev.map(doc => 
        doc.id === documentId 
          ? { ...doc, metadata: { ...doc.metadata, tags: updatedTags } } 
          : doc
      ));
      
      toast.success("Tag added");
    } catch (error) {
      console.error("Error adding tag:", error);
      toast.error("Failed to add tag");
    }
  };

  const filteredDocuments = selectedCategory === "all"
    ? documents
    : documents.filter(doc => doc.metadata.category === selectedCategory);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Document Manager</CardTitle>
        <CardDescription>Upload and manage your grant-related documents</CardDescription>
        <div className="flex flex-wrap gap-2 mt-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Documents</SelectItem>
              <SelectItem value="grant">Grant Applications</SelectItem>
              <SelectItem value="portfolio">Portfolio</SelectItem>
              <SelectItem value="financial">Financial</SelectItem>
              <SelectItem value="general">General</SelectItem>
            </SelectContent>
          </Select>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="ml-auto">
                <FileUp className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Document</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="border-2 border-dashed rounded-md p-6 text-center">
                  <input 
                    type="file"
                    id="document-upload"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                  <label 
                    htmlFor="document-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <FileUp className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="font-medium">Click to upload</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      PDF or Word documents up to 10MB
                    </p>
                  </label>
                </div>
                
                {selectedFile && (
                  <div className="bg-muted p-3 rounded-md">
                    <p className="text-sm font-medium truncate">{selectedFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}
                
                <div className="flex justify-end mt-4">
                  <Button 
                    onClick={uploadDocument} 
                    disabled={!selectedFile || isUploading}
                  >
                    {isUploading ? "Uploading..." : "Upload Document"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No documents found
            </div>
          ) : (
            <div className="space-y-3">
              {filteredDocuments.map((doc) => (
                <div key={doc.id} className="border rounded-md p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <File className="h-5 w-5 text-blue-500 mt-1 mr-3" />
                      <div>
                        <p className="font-medium truncate max-w-[180px]">{doc.fileName}</p>
                        <p className="text-xs text-muted-foreground">{doc.createdAt}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {doc.metadata.tags && doc.metadata.tags.map((tag, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Tag className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Add Tag</DialogTitle>
                          </DialogHeader>
                          <div className="flex items-center space-x-2">
                            <Input placeholder="Enter tag" id={`tag-input-${doc.id}`} />
                            <Button 
                              onClick={() => {
                                const input = document.getElementById(`tag-input-${doc.id}`) as HTMLInputElement;
                                if (input && input.value) {
                                  addTag(doc.id, input.value);
                                  input.value = '';
                                }
                              }}
                            >
                              Add
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive"
                        onClick={() => deleteDocument(doc.id, doc.filePath)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
