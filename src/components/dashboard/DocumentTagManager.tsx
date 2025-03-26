
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DocumentTagManagerProps {
  documentId: string;
  existingTags: string[];
  onTagAdded: (documentId: string, tags: string[]) => void;
}

export const DocumentTagManager = ({ documentId, existingTags, onTagAdded }: DocumentTagManagerProps) => {
  const addTag = async (newTag: string) => {
    if (!newTag.trim()) return;
    
    const updatedTags = [...existingTags, newTag];
    
    try {
      const { error } = await supabase
        .from('grant_documents')
        .update({
          metadata: { 
            tags: updatedTags 
          }
        })
        .eq('id', documentId);
        
      if (error) throw error;
      
      onTagAdded(documentId, updatedTags);
      toast.success("Tag added");
    } catch (error) {
      console.error("Error adding tag:", error);
      toast.error("Failed to add tag");
    }
  };

  return (
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
          <Input placeholder="Enter tag" id={`tag-input-${documentId}`} />
          <Button 
            onClick={() => {
              const input = document.getElementById(`tag-input-${documentId}`) as HTMLInputElement;
              if (input && input.value) {
                addTag(input.value);
                input.value = '';
              }
            }}
          >
            Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
