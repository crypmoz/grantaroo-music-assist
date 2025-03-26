
import { ApplicationFormGuide } from "@/components/forms/ApplicationFormGuide";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ApplicationGuideTab = () => {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <ScrollArea className="flex-1">
        <div className="p-4 pb-16">
          <ApplicationFormGuide />
        </div>
      </ScrollArea>
    </div>
  );
};
