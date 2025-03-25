
import { MessageCircle, FileText, Award } from "lucide-react";
import { motion } from "framer-motion";

export const HowItWorks = () => {
  const features = [
    {
      icon: <MessageCircle className="h-6 w-6 text-blue-600" />,
      title: "Real-time writing assistance",
      description: "Our AI assistant helps you write better, faster, and with more confidence."
    },
    {
      icon: <FileText className="h-6 w-6 text-blue-600" />,
      title: "Craft compelling applications",
      description: "Our AI helps you find the right grants and craft compelling applications."
    },
    {
      icon: <Award className="h-6 w-6 text-blue-600" />,
      title: "Increase your chances of success",
      description: "Our AI helps you identify potential pitfalls and increase your chances of success."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our AI grant writing assistant helps you at every stage of the grant writing process, from finding 
            the right grants to crafting compelling applications and increasing your chances of success.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
