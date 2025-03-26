
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { FORM_SECTIONS } from "./FormSections";

type SectionTabsProps = {
  activeTab: string;
  onChange: (value: string) => void;
};

export const SectionTabs = ({ activeTab, onChange }: SectionTabsProps) => {
  return (
    <div className="bg-white p-2 rounded-lg shadow-sm border mb-4">
      <div className="grid grid-cols-5 gap-1">
        {FORM_SECTIONS.map((section, index) => (
          <motion.button
            key={section.id}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`flex flex-col items-center py-2 px-1 rounded-md transition-all ${
              activeTab === section.id 
                ? "bg-blue-50 text-blue-700" 
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            }`}
            onClick={() => onChange(section.id)}
          >
            <section.icon className={`h-4 w-4 ${activeTab === section.id ? "text-blue-600" : "text-gray-500"}`} />
            <span className="hidden sm:inline text-xs mt-1 font-medium">{section.title}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
