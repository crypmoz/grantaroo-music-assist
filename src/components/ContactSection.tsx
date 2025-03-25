
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Clock } from "lucide-react";

export const ContactSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need help with grant writing or just have questions?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We are here to help. We offer a variety of support options and are happy to assist you in whatever way works best for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">info@canadamusicgrantwriting.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Phone className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-600">647-123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Hours</p>
                  <p className="text-gray-600">Monday - Friday, 9am - 5pm</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold mb-4">Send us a message</h4>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Input id="email" type="email" placeholder="Your email" />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <Input id="subject" placeholder="Subject" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <Textarea id="message" placeholder="Your message" rows={4} />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Send Message</Button>
              </form>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6">Support Options</h3>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-600">
                <h4 className="text-xl font-semibold mb-2">Knowledge Base</h4>
                <p className="text-gray-600 mb-4">Get answers to your questions from our team of experts.</p>
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">Browse Knowledge Base</Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-600">
                <h4 className="text-xl font-semibold mb-2">Guides</h4>
                <p className="text-gray-600 mb-4">Learn how to use Canada Music Grant Writing with our helpful guides.</p>
                <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">View Guides</Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-600">
                <h4 className="text-xl font-semibold mb-2">Community</h4>
                <p className="text-gray-600 mb-4">Join our community to connect with other users, share ideas, and give feedback.</p>
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">Join Community</Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-orange-600">
                <h4 className="text-xl font-semibold mb-2">Professional Services</h4>
                <p className="text-gray-600 mb-4">Get assistance with your grant writing from our team of experts.</p>
                <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">Learn About Services</Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
