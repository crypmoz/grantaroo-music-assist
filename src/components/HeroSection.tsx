
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative bg-gray-900 overflow-hidden">
      {/* Hero image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/35ab546c-bb47-4005-90f0-4bcf30b2aa99.png" 
          alt="Musician in recording studio" 
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/50"></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            AI Grant Writing Assistance for Canada Musicians
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-100 mb-8"
          >
            Get the funding you need to take your career to the next level with our AI grant writing assistant. 
            Our AI will help you find the right grants, craft compelling applications, and increase your chances of success.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Start writing
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Learn more
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
