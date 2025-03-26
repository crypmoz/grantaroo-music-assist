
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, File, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useChatbot } from "@/context/ChatbotContext";
import { motion } from "framer-motion";

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

  const handleFiles = (files: FileList) => {
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
    validSizeFiles.forEach(file => {
      const newFile: UploadedFile = {
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        type: file.type,
        data: file
      };
      
      addUploadedFile(newFile);
      toast.success(`Uploaded ${file.name}`);
    });
    
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
          <Upload className={cn(
            "h-6 w-6 mb-1",
            dragActive ? "text-primary" : "text-muted-foreground"
          )} />
          <p className="text-sm font-medium">
            {isUploading ? "Uploading..." : "Drop files or click to upload"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Word documents and PDFs up to 10MB
          </p>
        </div>
      </div>
    </div>
  );
};
