
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DocumentUploadProps {
  userId: string | undefined;
  onUploadComplete: () => void;
}

export const DocumentUpload = ({ userId, onUploadComplete }: DocumentUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const uploadDocument = async () => {
    if (!selectedFile || !userId) return;
    
    setIsUploading(true);
    
    try {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${userId}/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('grant_resources')
        .upload(filePath, selectedFile);
        
      if (uploadError) throw uploadError;
      
      const { error: insertError } = await supabase
        .from('grant_documents')
        .insert({
          user_id: userId,
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
      onUploadComplete();
      toast.success("Document uploaded successfully");
    } catch (error) {
      console.error("Error uploading document:", error);
      toast.error("Failed to upload document");
    } finally {
      setIsUploading(false);
    }
  };

  return (
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
  );
};
