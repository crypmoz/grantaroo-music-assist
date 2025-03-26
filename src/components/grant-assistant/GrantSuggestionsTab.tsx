import { useChatbot } from "@/context/ChatbotContext";
import { GrantProfileForm } from "@/components/forms/GrantProfileForm";
import { GrantSuggestions } from "@/components/grants/GrantSuggestions";
import { ScrollArea } from "@/components/ui/scroll-area";
export const GrantSuggestionsTab = () => {
  const {
    currentStep
  } = useChatbot();
  return <div className="h-full flex flex-col overflow-hidden">
      <ScrollArea className="flex-1">
        <div className="p-4 pb-16 mx-[233px] px-[38px] py-[160px]">
          {currentStep === "welcome" ? <GrantProfileForm /> : <GrantSuggestions />}
        </div>
      </ScrollArea>
    </div>;
};