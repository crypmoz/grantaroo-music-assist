
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { DocumentUpload } from "./DocumentUpload";
import { DocumentList } from "./DocumentList";
import { DocumentItemType } from "./DocumentItem";

export const DocumentManager = () => {
  const [documents, setDocuments] = useState<DocumentItemType[]>([]);
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
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
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
          
          <DocumentUpload 
            userId={user?.id}
            onUploadComplete={fetchDocuments}
          />
        </div>
      </CardHeader>
      <CardContent>
        <DocumentList 
          documents={filteredDocuments} 
          onDocumentsChanged={fetchDocuments}
        />
      </CardContent>
    </Card>
  );
};
