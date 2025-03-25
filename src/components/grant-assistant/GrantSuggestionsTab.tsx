
import { useChatbot } from "@/context/ChatbotContext";
import { GrantProfileForm } from "@/components/forms/GrantProfileForm";
import { GrantSuggestions } from "@/components/grants/GrantSuggestions";

export const GrantSuggestionsTab = () => {
  const { currentStep } = useChatbot();

  return (
    <>
      {currentStep === "welcome" ? (
        <GrantProfileForm />
      ) : (
        <GrantSuggestions />
      )}
    </>
  );
};
