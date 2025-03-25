
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Headphones } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { UserProfile } from "./auth/UserProfile";
import { AuthModal } from "./auth/AuthModal";

export const Header = () => {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <Headphones className="h-6 w-6" />
          <span>Canada Music Grant Assistant</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
            About
          </Link>
          <Link to="/resources" className="text-gray-700 hover:text-blue-600 transition-colors">
            Resources
          </Link>
          <Link to="/faq" className="text-gray-700 hover:text-blue-600 transition-colors">
            FAQ
          </Link>
        </nav>
        
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <UserProfile />
          ) : (
            <>
              <Button 
                variant="outline"
                className="hidden md:flex border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={() => setShowAuthModal(true)}
              >
                Log in
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setShowAuthModal(true)}
              >
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </header>
  );
};
