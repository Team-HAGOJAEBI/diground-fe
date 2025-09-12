"use client";

import { createContext, ReactNode } from "react";

import { useSession } from "next-auth/react";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  session: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  const isAuthenticated = !!session;

  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    session: session,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
