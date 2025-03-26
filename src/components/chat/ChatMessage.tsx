
import { MessageType, UploadedFile, GrantType } from "@/context/ChatbotContext";
import { cn } from "@/lib/utils";
import { Bot, User, FileText, Download, Calendar, Link as LinkIcon, DollarSign, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type ChatMessageProps = {
  message: MessageType;
};

export const ChatMessage = ({ message }: ChatMessageProps) => {
  // Support both role and sender to handle legacy messages
  const isBot = message.role === "assistant" || message.sender === "bot";
  
  // Convert markdown-like syntax to HTML
  const formatMessage = (content: string) => {
    if (!content) return "";
    
    // Replace markdown bold with HTML
    let formatted = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert bullet points
    formatted = formatted.replace(/^• (.*?)$/gm, '<li>$1</li>');
    if (formatted.includes('<li>')) {
      formatted = formatted.replace(/<li>.*?<\/li>/gs, match => `<ul class="list-disc list-inside my-2">${match}</ul>`);
    }
    
    // Convert line breaks to paragraph breaks
    formatted = formatted.split('\n\n').map(para => 
      para.includes('<ul') ? para : `<p>${para}</p>`
    ).join('');
    
    // Replace single line breaks
    formatted = formatted.replace(/\n/g, '<br>');
    
    // Fix any doubled paragraph tags
    formatted = formatted.replace(/<p><p>/g, '<p>').replace(/<\/p><\/p>/g, '</p>');
    
    return formatted;
  };

  // Extract grant information if present in message content
  const extractGrantInfo = (content: string): GrantType | null => {
    // Simple regex pattern to detect grant information
    // Actual implementation would need more robust parsing
    const grantMatch = content.match(/Grant Name: (.*?)\nProvider: (.*?)\nDeadline: (.*?)\nAmount: (.*?)(\n|$)/);
    
    if (grantMatch) {
      return {
        id: "extracted-grant", // Placeholder ID
        name: grantMatch[1],
        provider: grantMatch[2],
        deadline: grantMatch[3],
        maxAmount: grantMatch[4],
        eligibility: [],
        url: "#"
      };
    }
    return null;
  };

  // Function to handle file download
  const handleFileDownload = (file: UploadedFile) => {
    const url = URL.createObjectURL(file.data);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Extract grant info if any
  const grantInfo = isBot ? extractGrantInfo(message.content) : null;
  
  // Filter out grant info from message content if it was detected
  const messageContent = grantInfo 
    ? message.content.replace(/Grant Name: (.*?)\nProvider: (.*?)\nDeadline: (.*?)\nAmount: (.*?)(\n|$)/, '') 
    : message.content;
  
  return (
    <div
      className={cn(
        "flex w-full my-4",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      {isBot && (
        <div className="flex-shrink-0 mr-2">
          <div className="bg-blue-100 p-2 rounded-full">
            <Bot className="h-4 w-4 text-blue-600" />
          </div>
        </div>
      )}
      
      <div
        className={cn(
          "rounded-2xl px-4 py-3 max-w-[85%] shadow-sm",
          isBot 
            ? "bg-white border border-gray-100" 
            : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
        )}
      >
        <div 
          className="whitespace-pre-wrap text-sm"
          dangerouslySetInnerHTML={{ __html: formatMessage(messageContent) }}
        />
        
        {/* Display grant information in card format if detected */}
        {grantInfo && (
          <div className="mt-4 mb-2">
            <Card className="border-l-4 border-l-primary bg-blue-50/50">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{grantInfo.name}</CardTitle>
                    <p className="text-xs text-muted-foreground">{grantInfo.provider}</p>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <Check className="h-3 w-3 mr-1" /> Match
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-blue-500" />
                    <p>{grantInfo.deadline}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3 text-green-500" />
                    <p>{grantInfo.maxAmount}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-xs h-7 w-full"
                >
                  <LinkIcon className="h-3 w-3 mr-1" />
                  View Details
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
        
        {/* Display file attachments if any */}
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 space-y-1">
            <p className={cn(
              "text-xs font-medium",
              isBot ? "text-gray-500" : "text-white/80"
            )}>
              Attachments:
            </p>
            <div className="flex flex-col gap-1">
              {message.attachments.map((file) => (
                <div 
                  key={file.id}
                  className={cn(
                    "flex items-center justify-between rounded p-2 text-xs",
                    isBot ? "bg-gray-50" : "bg-blue-700/50"
                  )}
                >
                  <div className="flex items-center space-x-2 overflow-hidden">
                    <FileText className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{file.name}</span>
                  </div>
                  <Button 
                    variant={isBot ? "outline" : "secondary"}
                    size="icon"
                    className="h-5 w-5"
                    onClick={() => handleFileDownload(file)}
                  >
                    <Download className="h-2 w-2" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className={cn(
          "text-xs mt-1",
          isBot ? "text-gray-400" : "text-white/70"
        )}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      
      {!isBot && (
        <div className="flex-shrink-0 ml-2">
          <div className="bg-indigo-100 p-2 rounded-full">
            <User className="h-4 w-4 text-indigo-600" />
          </div>
        </div>
      )}
    </div>
  );
};
