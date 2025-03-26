
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

type ChatFooterProps = {
  onFindGrantsClick: () => void;
  onResetChat: () => void;
  isTyping: boolean;
  hasMessages: boolean;
};

export const ChatFooter = ({ onFindGrantsClick, onResetChat, isTyping, hasMessages }: ChatFooterProps) => {
  return (
    <div className="mt-2 flex justify-between items-center">
      <Button
        variant="ghost" 
        size="sm" 
        onClick={onFindGrantsClick}
        className="text-xs text-muted-foreground flex items-center gap-1"
        disabled={isTyping || !hasMessages}
      >
        <PlusCircle className="h-3 w-3" />
        Find Matching Grants
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={onResetChat}
        className="text-xs text-muted-foreground"
      >
        Reset Chat
      </Button>
    </div>
  );
};
