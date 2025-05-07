import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from "sonner";
import authService from '@/services/auth';

type User = {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
  tokens: number;
  freeTokens: number;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  useToken: () => Promise<boolean>;
  addTokens: (amount: number) => Promise<void>;
  refreshUser: () => Promise<void>;  // ✅ Added here
  tokens: number;
  freeTokens: number;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tokens, setTokens] = useState(0);
  const [freeTokens, setFreeTokens] = useState(0);
  
  useEffect(() => {
    const checkUser = async () => {
      setIsLoading(true);
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setUser({
            id: currentUser.$id,
            name: currentUser.name,
            email: currentUser.email,
            photoUrl: currentUser.photoUrl,
            tokens: currentUser.tokens || 0,
            freeTokens: currentUser.freeTokens || 0
          });
          setTokens(currentUser.tokens || 0);
          setFreeTokens(currentUser.freeTokens || 0);
        }
      } catch (error) {
        console.error("Failed to check user session:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkUser();
  }, []);

  const refreshUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setUser({
          id: currentUser.$id,
          name: currentUser.name,
          email: currentUser.email,
          photoUrl: currentUser.photoUrl,
          tokens: currentUser.tokens || 0,
          freeTokens: currentUser.freeTokens || 0
        });
        setTokens(currentUser.tokens || 0);
        setFreeTokens(currentUser.freeTokens || 0);
      }
    } catch (error) {
      console.error("Failed to refresh user:", error);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const session = await authService.login({ email, password });
      if (session) {
        await refreshUser();
        toast.success("Welcome back!");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await authService.loginWithGoogle();
    } catch (error) {
      toast.error("Google login failed. Please try again.");
      setIsLoading(false);
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const session = await authService.createAccount({ name, email, password });
      if (session) {
        await refreshUser();
        toast.success("Account created successfully!");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Account created successfully!. Please Sign in to continue.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setTokens(0);
      setFreeTokens(0);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };
  
  const useToken = async () => {
    if (!user) return false;
    
    try {
      const success = await authService.useToken(user.id);
      if (success) {
        if (freeTokens > 0) {
          setFreeTokens(prev => prev - 1);
        } else if (tokens > 0) {
          setTokens(prev => prev - 1);
        }
        return true;
      } else {
        toast.error("You don't have enough tokens. Please purchase more.");
        return false;
      }
    } catch (error) {
      console.error("Error using token:", error);
      toast.error("Failed to use token. Please try again.");
      return false;
    }
  };
  
  const addTokens = async (amount: number) => {
    if (!user) return;
    
    try {
      const success = await authService.addTokens(user.id, amount);
      if (success) {
        await refreshUser(); // ✅ refresh after adding tokens
        toast.success(`${amount} tokens added to your account!`);
      }
    } catch (error) {
      console.error("Error adding tokens:", error);
      toast.error("Failed to add tokens. Please try again.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        loginWithGoogle,
        signup,
        logout,
        useToken,
        addTokens,
        refreshUser, // ✅ added here
        tokens,
        freeTokens
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
