
import { Link } from "react-router-dom";
import { Mail, Phone, Clock, HelpCircle, BookOpen, Users, Briefcase } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-gray-200 p-2 rounded-full">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">info@canadamusicgrantwriting.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-gray-200 p-2 rounded-full">
                  <Phone className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-600">647-123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-gray-200 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Hours</p>
                  <p className="text-gray-600">Monday - Friday, 9am - 5pm</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Support Options */}
          <div>
            <h3 className="text-xl font-bold mb-6">Support Options</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-gray-200 p-2 rounded-full">
                  <HelpCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Knowledge Base</p>
                  <p className="text-gray-600">Get answers to your questions from our team of experts.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-gray-200 p-2 rounded-full">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Guides</p>
                  <p className="text-gray-600">Learn how to use Canada Music Grant Writing with our helpful guides.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-gray-200 p-2 rounded-full">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Community</p>
                  <p className="text-gray-600">Join our community to connect with other users, share ideas, and give feedback.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">About</Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-600 hover:text-blue-600 transition-colors">Resources</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-blue-600 transition-colors">FAQ</Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-6 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Canada Music Grant Assistant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
