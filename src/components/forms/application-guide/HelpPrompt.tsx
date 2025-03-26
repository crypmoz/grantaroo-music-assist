
import { motion } from "framer-motion";

export const HelpPrompt = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      className="rounded-md bg-indigo-50 p-4 border border-indigo-100 shadow-sm"
    >
      <p className="font-medium text-indigo-800">Need more help?</p>
      <p className="text-indigo-700 text-sm mt-1">
        Ask the grant assistant for specific guidance or feedback on your draft content.
      </p>
    </motion.div>
  );
};
