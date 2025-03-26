
import { Button } from "@/components/ui/button";
import { FileText, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type DocumentSource = {
  id: string;
  name: string;
  snippet: string;
};

type DocumentSourceIndicatorProps = {
  sources: DocumentSource[];
};

export const DocumentSourceIndicator = ({ sources }: DocumentSourceIndicatorProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <div className="mt-2 border rounded-lg p-2 bg-blue-50/50">
      <Button
        variant="ghost"
        size="sm"
        className="w-full flex justify-between items-center text-blue-600 h-auto py-1"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <FileText className="h-3 w-3 mr-2" />
          <span className="text-xs">
            {sources.length === 1
              ? "1 document source"
              : `${sources.length} document sources`}
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-3 w-3" />
        ) : (
          <ChevronDown className="h-3 w-3" />
        )}
      </Button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-2 space-y-2 pt-2 border-t text-xs">
              {sources.map((source) => (
                <div key={source.id} className="space-y-1">
                  <div className="font-medium text-blue-700">{source.name}</div>
                  <div className="text-muted-foreground bg-white p-2 rounded border">
                    "{source.snippet}"
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
