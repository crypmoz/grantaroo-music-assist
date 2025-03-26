
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DocumentItem, DocumentItemType } from "./DocumentItem";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DocumentListProps {
  documents: DocumentItemType[];
  onDocumentsChanged: () => void;
}

export const DocumentList = ({ documents, onDocumentsChanged }: DocumentListProps) => {
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
      
      onDocumentsChanged();
      toast.success("Document deleted");
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error("Failed to delete document");
    }
  };

  const handleTagAdded = (documentId: string, tags: string[]) => {
    onDocumentsChanged();
  };

  return (
    <ScrollArea className="h-[300px] pr-4">
      {documents.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No documents found
        </div>
      ) : (
        <div className="space-y-3">
          {documents.map((doc) => (
            <DocumentItem 
              key={doc.id} 
              document={doc} 
              onDelete={deleteDocument}
              onTagAdded={handleTagAdded}
            />
          ))}
        </div>
      )}
    </ScrollArea>
  );
};
