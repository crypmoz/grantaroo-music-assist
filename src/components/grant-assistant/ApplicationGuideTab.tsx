import { ApplicationFormGuide } from "@/components/forms/ApplicationFormGuide";
import { ScrollArea } from "@/components/ui/scroll-area";
export const ApplicationGuideTab = () => {
  return <ScrollArea className="h-full">
      <div className="p-4 pb-16 py-[16px] my-[14px] mx-[115px]">
        <ApplicationFormGuide className="my-0 px-[151px] mx-[11px]" />
      </div>
    </ScrollArea>;
};