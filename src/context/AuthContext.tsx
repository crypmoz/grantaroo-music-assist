
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";

type UserProfile = {
  id: string;
  email: string;
  name: string;
  hasPaid: boolean;
};

type AuthContextType = {
  user: UserProfile | null;
  session: Session | null;
  isAuthenticated: boolean;
  isPaidUser: boolean;
  login: (email: string, password: string) => Promise<{ error: any | null }>;
  signup: (name: string, email: string, password: string) => Promise<{ error: any | null }>;
  logout: () => Promise<void>;
  completePayment: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  
  // Initialize auth state
  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        if (currentSession?.user) {
          // Create user profile from session data
          const userProfile: UserProfile = {
            id: currentSession.user.id,
            email: currentSession.user.email || '',
            name: currentSession.user.user_metadata?.name || currentSession.user.email?.split('@')[0] || '',
            hasPaid: currentSession.user.user_metadata?.hasPaid || false,
          };
          setUser(userProfile);
        } else {
          setUser(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      if (currentSession?.user) {
        // Create user profile from session data
        const userProfile: UserProfile = {
          id: currentSession.user.id,
          email: currentSession.user.email || '',
          name: currentSession.user.user_metadata?.name || currentSession.user.email?.split('@')[0] || '',
          hasPaid: currentSession.user.user_metadata?.hasPaid || false,
        };
        setUser(userProfile);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Login error:", error.message);
        return { error };
      }
      
      return { error: null };
    } catch (error) {
      console.error("Login exception:", error);
      return { error };
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            hasPaid: false,
          }
        }
      });
      
      if (error) {
        console.error("Signup error:", error.message);
        return { error };
      }
      
      return { error: null };
    } catch (error) {
      console.error("Signup exception:", error);
      return { error };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const completePayment = async () => {
    if (user && session) {
      try {
        // Update user metadata to reflect paid status
        const { error } = await supabase.auth.updateUser({
          data: { hasPaid: true }
        });
        
        if (error) {
          console.error("Failed to update payment status:", error);
          return;
        }
        
        // Update local state
        setUser({
          ...user,
          hasPaid: true
        });
      } catch (error) {
        console.error("Error updating payment status:", error);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAuthenticated: !!user && !!session,
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
