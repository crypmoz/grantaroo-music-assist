
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type NavigationButtonsProps = {
  isLastQuestion: boolean;
  isRequired: boolean;
  onNext: () => void;
  onSkip: () => void;
};

export const NavigationButtons = ({ 
  isLastQuestion,
  isRequired,
  onNext,
  onSkip
}: NavigationButtonsProps) => {
  return (
    <div className="flex gap-2">
      <Button 
        onClick={onNext} 
        className="flex-1"
      >
        {isLastQuestion ? "Complete Profile" : "Next"}
      </Button>
      
      {!isRequired && (
        <Button 
          variant="outline" 
          onClick={onSkip}
        >
          Skip
        </Button>
      )}
    </div>
  );
};
