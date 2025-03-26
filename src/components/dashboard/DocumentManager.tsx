
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { FileText, Trash2, Download, Clock, Tag } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

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
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    
    fetchDocuments();
  }, [user]);

  const fetchDocuments = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('grant_documents')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setDocuments(data.map(doc => ({
        id: doc.id,
        fileName: doc.file_name,
        fileType: doc.file_type,
        filePath: doc.file_path,
        createdAt: doc.created_at,
        metadata: doc.metadata || {}
      })));
    } catch (error) {
      console.error("Error fetching documents:", error);
      toast.error("Failed to load documents");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteDocument = async (id: string, filePath: string) => {
    try {
      // First delete from storage
      const { error: storageError } = await supabase
        .storage
        .from('grant_resources')
        .remove([filePath]);
        
      if (storageError) throw storageError;
      
      // Then delete record from database
      const { error: dbError } = await supabase
        .from('grant_documents')
        .delete()
        .eq('id', id);
        
      if (dbError) throw dbError;
      
      setDocuments(documents.filter(doc => doc.id !== id));
      toast.success("Document deleted successfully");
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error("Failed to delete document");
    }
  };

  const downloadDocument = async (filePath: string, fileName: string) => {
    try {
      const { data, error } = await supabase
        .storage
        .from('grant_resources')
        .download(filePath);
        
      if (error) throw error;
      
      // Create download link
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading document:", error);
      toast.error("Failed to download document");
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) {
      return <FileText className="h-5 w-5 text-red-500" />;
    } else if (fileType.includes('word') || fileType.includes('document')) {
      return <FileText className="h-5 w-5 text-blue-500" />;
    } else {
      return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "Unknown size";
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Grant Documents</CardTitle>
          <CardDescription>Manage your uploaded grant resources</CardDescription>
        </CardHeader>
        <CardContent>
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-4 mb-4">
              <Skeleton className="h-12 w-12 rounded-md" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grant Documents</CardTitle>
        <CardDescription>Manage your uploaded grant resources</CardDescription>
      </CardHeader>
      <CardContent>
        {documents.length === 0 ? (
          <div className="text-center py-6">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No documents uploaded yet</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => window.location.href = '/assistant'}
            >
              Upload Documents
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-start justify-between p-3 border rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="bg-muted p-2 rounded-md">
                    {getFileIcon(doc.fileType)}
                  </div>
                  <div>
                    <h4 className="font-medium">{doc.fileName}</h4>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {format(new Date(doc.createdAt), 'MMM d, yyyy')}
                      <span className="mx-2">•</span>
                      {formatFileSize(doc.metadata?.size)}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {doc.metadata?.tags?.map((tag, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                      {doc.metadata?.category && (
                        <Badge variant="secondary" className="text-xs">
                          {doc.metadata.category}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => downloadDocument(doc.filePath, doc.fileName)}
                    title="Download"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteDocument(doc.id, doc.filePath)}
                    className="text-destructive"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
