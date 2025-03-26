
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

type ChatToggleButtonProps = {
  onClick: () => void;
};

export const ChatToggleButton = ({ onClick }: ChatToggleButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-4 right-4 rounded-full w-14 h-14 shadow-lg z-50"
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  );
};
