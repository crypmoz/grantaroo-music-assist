
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Maximize, Minimize, X } from "lucide-react";

type ChatHeaderProps = {
  isExpanded: boolean;
  onToggleExpand: () => void;
  onClose: () => void;
};

export const ChatHeader = ({ isExpanded, onToggleExpand, onClose }: ChatHeaderProps) => {
  return (
    <CardHeader className="p-4 pb-2 border-b">
      <div className="flex justify-between items-center">
        <CardTitle className="text-lg flex items-center gap-2">
          Grant Assistant
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Free</span>
        </CardTitle>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleExpand}
            className="h-8 w-8"
          >
            {isExpanded ? (
              <Minimize className="h-4 w-4" />
            ) : (
              <Maximize className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </CardHeader>
  );
};
