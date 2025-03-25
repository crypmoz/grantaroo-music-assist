
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type User = {
  id: string;
  email: string;
  name: string;
  hasPaid: boolean;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isPaidUser: boolean;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
  completePayment: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Check localStorage on init to restore user session
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string) => {
    // In a real app, this would validate with a backend
    // For demo purposes, we'll create a mock user
    const newUser = {
      id: "user-" + Date.now(),
      email,
      name: email.split("@")[0],
      hasPaid: false,
    };
    
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const signup = (name: string, email: string, password: string) => {
    // In a real app, this would create an account with a backend
    const newUser = {
      id: "user-" + Date.now(),
      email,
      name,
      hasPaid: false,
    };
    
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const completePayment = () => {
    if (user) {
      const paidUser = { ...user, hasPaid: true };
      setUser(paidUser);
      localStorage.setItem("user", JSON.stringify(paidUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isPaidUser: !!user?.hasPaid,
        login,
        signup,
        logout,
        completePayment,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
