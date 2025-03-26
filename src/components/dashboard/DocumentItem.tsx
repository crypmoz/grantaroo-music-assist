
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { File, Trash2 } from "lucide-react";
import { DocumentTagManager } from "./DocumentTagManager";

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
}

export const DocumentItem = ({ document, onDelete, onTagAdded }: DocumentItemProps) => {
  return (
    <div className="border rounded-md p-3">
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <File className="h-5 w-5 text-blue-500 mt-1 mr-3" />
          <div>
            <p className="font-medium truncate max-w-[180px]">{document.fileName}</p>
            <p className="text-xs text-muted-foreground">{document.createdAt}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {document.metadata.tags && document.metadata.tags.map((tag, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-1">
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
