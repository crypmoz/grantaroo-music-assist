
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { FORM_SECTIONS } from "./FormSections";

type SectionTabsProps = {
  activeTab: string;
  onChange: (value: string) => void;
};

export const SectionTabs = ({ activeTab, onChange }: SectionTabsProps) => {
  return (
    <TabsList className="w-full grid grid-cols-5 mb-4 bg-blue-50/50">
      {FORM_SECTIONS.map((section, index) => (
        <motion.div
          key={section.id}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <TabsTrigger 
            value={section.id} 
            className="text-xs flex items-center gap-1 data-[state=active]:bg-white"
            onClick={() => onChange(section.id)}
          >
            <section.icon className="h-3 w-3" />
            <span className="hidden sm:inline">{section.title}</span>
          </TabsTrigger>
        </motion.div>
      ))}
    </TabsList>
  );
};
