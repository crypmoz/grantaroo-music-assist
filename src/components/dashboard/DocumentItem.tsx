
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { File, Trash2, ExternalLink } from "lucide-react";
import { DocumentTagManager } from "./DocumentTagManager";
import { supabase } from "@/integrations/supabase/client";

export interface DocumentItemType {
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
}

interface DocumentItemProps {
  document: DocumentItemType;
  onDelete: (id: string, filePath: string) => Promise<void>;
  onTagAdded: (documentId: string, tags: string[]) => void;
  searchHighlight?: string;
}

export const DocumentItem = ({ document, onDelete, onTagAdded, searchHighlight = "" }: DocumentItemProps) => {
  const highlightText = (text: string) => {
    if (!searchHighlight.trim()) return text;
    
    const parts = text.split(new RegExp(`(${searchHighlight})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === searchHighlight.toLowerCase() ? 
        <span key={i} className="bg-yellow-200 dark:bg-yellow-800">{part}</span> : part
    );
  };
  
  const getFileUrl = async () => {
    const { data } = await supabase.storage
      .from('grant_resources')
      .createSignedUrl(document.filePath, 60);
      
    if (data?.signedUrl) {
      window.open(data.signedUrl, '_blank');
    }
  };

  return (
    <div className="border rounded-md p-3">
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <File className="h-5 w-5 text-blue-500 mt-1 mr-3" />
          <div>
            <p className="font-medium truncate max-w-[180px]">
              {searchHighlight ? highlightText(document.fileName) : document.fileName}
            </p>
            <p className="text-xs text-muted-foreground">{document.createdAt}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {document.metadata.tags && document.metadata.tags.map((tag, i) => (
                <Badge key={i} variant="outline" className={`text-xs ${
                  searchHighlight && tag.toLowerCase().includes(searchHighlight.toLowerCase()) 
                    ? "bg-yellow-100 dark:bg-yellow-900" 
                    : ""
                }`}>
                  {searchHighlight ? highlightText(tag) : tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-blue-500"
            onClick={getFileUrl}
            title="Preview document"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
          
          <DocumentTagManager 
            documentId={document.id} 
            existingTags={document.metadata.tags || []} 
            onTagAdded={onTagAdded}
          />
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-destructive"
            onClick={() => onDelete(document.id, document.filePath)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
