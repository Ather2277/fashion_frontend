
import React, { createContext, useContext } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface TokenContextType {
  tokens: number;
  addTokens: (amount: number) => Promise<void>;
  useToken: () => Promise<boolean>;
  isLoadingTokens: boolean;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export function TokenProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const { tokens, freetokens, useToken: authUseToken, addTokens: authAddTokens, isLoading } = auth;
  
  const addTokens = async (amount: number) => {
    await authAddTokens(amount);
  };

  const useToken = async () => {
    return await authUseToken();
  };

  return (
    <TokenContext.Provider value={{ 
      tokens: (tokens || 0) + (freetokens || 0), // Total available tokens with fallbacks
      addTokens, 
      useToken, 
      isLoadingTokens: isLoading 
    }}>
      {children}
    </TokenContext.Provider>
  );
}

export function useTokens() {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error('useTokens must be used within a TokenProvider');
  }
  return context;
}
