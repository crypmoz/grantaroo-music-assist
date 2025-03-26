
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, File, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useChatbot } from "@/context/ChatbotContext";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { v4 as uuidv4 } from "uuid";

export type UploadedFile = {
  id: string;
  name: string;
  size: number;
  type: string;
  data: File;
};

export const FileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const { uploadedFiles, addUploadedFile, removeUploadedFile } = useChatbot();
  const { user } = useAuth();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = async (files: FileList) => {
    setIsUploading(true);
    const fileArray = Array.from(files);
    
    // Filter for Word and PDF files
    const validFiles = fileArray.filter(file => {
      const fileType = file.type;
      return fileType === "application/pdf" || 
             fileType === "application/msword" || 
             fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    });
    
    if (validFiles.length !== fileArray.length) {
      toast.error("Only Word documents and PDFs are accepted");
    }
    
    if (validFiles.length === 0) {
      setIsUploading(false);
      return;
    }
    
    // Size validation (10MB limit)
    const validSizeFiles = validFiles.filter(file => file.size <= 10 * 1024 * 1024);
    
    if (validSizeFiles.length !== validFiles.length) {
      toast.error("Files must be smaller than 10MB");
    }
    
    // Process valid files
    for (const file of validSizeFiles) {
      try {
        // First add to local state for immediate feedback
        const newFile: UploadedFile = {
          id: uuidv4(),
          name: file.name,
          size: file.size,
          type: file.type,
          data: file
        };
        
        addUploadedFile(newFile);
        
        // Check if user is authenticated before uploading to Supabase
        if (user) {
          const filePath = `${user.id}/${Date.now()}_${file.name}`;
          
          // Upload to Supabase storage
          const { data: storageData, error: storageError } = await supabase.storage
            .from('grant_resources')
            .upload(filePath, file, {
              cacheControl: '3600',
              upsert: false
            });
            
          if (storageError) {
            console.error("Error uploading file to storage:", storageError);
            toast.error(`Failed to upload ${file.name}: ${storageError.message}`);
            continue;
          }
          
          // Create database record
          const { data: docData, error: docError } = await supabase
            .from('grant_documents')
            .insert({
              user_id: user.id,
              file_path: filePath,
              file_name: file.name,
              file_type: file.type,
              metadata: { 
                original_size: file.size,
                upload_date: new Date().toISOString()
              }
            })
            .select()
            .single();
            
          if (docError) {
            console.error("Error creating document record:", docError);
            toast.error(`Failed to process ${file.name}: ${docError.message}`);
            continue;
          }
          
          // Process the document
          const processResponse = await fetch('/api/process-document', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              documentId: docData.id
            })
          });
          
          if (!processResponse.ok) {
            console.error("Error processing document:", await processResponse.text());
            toast.warning(`File uploaded but processing delayed: ${file.name}`);
          } else {
            toast.success(`Uploaded and processed ${file.name}`);
          }
        } else {
          // If not authenticated, just use the file for the current chat session
          toast.success(`Added ${file.name} to current chat`);
        }
      } catch (error) {
        console.error("Error handling file:", error);
        toast.error(`Error handling file: ${file.name}`);
      }
    }
    
    setIsUploading(false);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="w-full">
      {uploadedFiles.length > 0 && (
        <div className="mb-2 space-y-1">
          <p className="text-xs font-medium text-muted-foreground mb-1">Uploaded files:</p>
          {uploadedFiles.map((file) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between bg-muted/50 rounded-md p-2 text-sm"
            >
              <div className="flex items-center space-x-2 overflow-hidden">
                <File className="h-4 w-4 flex-shrink-0 text-blue-500" />
                <span className="truncate">{file.name}</span>
                <span className="text-xs text-muted-foreground">
                  {formatFileSize(file.size)}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => removeUploadedFile(file.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </motion.div>
          ))}
        </div>
      )}
      
      <div
        className={cn(
          "relative border-2 border-dashed border-muted rounded-md p-4 transition-colors",
          dragActive ? "border-primary bg-muted" : "hover:bg-muted/30",
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleFileDrop}
      >
        <input
          id="file-upload"
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          multiple
          disabled={isUploading}
        />
        <div className="flex flex-col items-center justify-center text-center">
          {isUploading ? (
            <>
              <Loader2 className="h-6 w-6 mb-1 animate-spin text-primary" />
              <p className="text-sm font-medium">Uploading files...</p>
            </>
          ) : (
            <>
              <Upload className={cn(
                "h-6 w-6 mb-1",
                dragActive ? "text-primary" : "text-muted-foreground"
              )} />
              <p className="text-sm font-medium">
                Drop files or click to upload
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Word documents and PDFs up to 10MB
              </p>
              {user ? (
                <p className="text-xs text-blue-600 mt-2">
                  Files will be used to train the grant assistant
                </p>
              ) : (
                <p className="text-xs text-amber-600 mt-2">
                  Sign in to save files for future sessions
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
