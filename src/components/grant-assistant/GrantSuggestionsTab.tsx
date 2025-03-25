
import { useChatbot } from "@/context/ChatbotContext";
import { GrantProfileForm } from "@/components/forms/GrantProfileForm";
import { GrantSuggestions } from "@/components/grants/GrantSuggestions";
import { ScrollArea } from "@/components/ui/scroll-area";

export const GrantSuggestionsTab = () => {
  const { currentStep } = useChatbot();

  return (
    <ScrollArea className="h-full">
      <div className="p-4">
        {currentStep === "welcome" ? (
          <GrantProfileForm />
        ) : (
          <GrantSuggestions />
        )}
      </div>
    </ScrollArea>
  );
};
