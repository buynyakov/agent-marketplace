"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { mockUsers } from "@/lib/mock-data";
import type { User, UserRole } from "@/lib/types";
import { useWallet } from "@/providers/wallet-provider";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isSigningIn: boolean;
  signIn: (role?: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
  selectedRole: UserRole;
  setSelectedRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { address, disconnect } = useWallet();
  const [user, setUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>("client");

  const signIn = useCallback(async (role: UserRole = selectedRole) => {
    const fallbackUser = mockUsers.find((candidate) => candidate.role === role) ?? mockUsers[0];
    setUser({ ...fallbackUser, walletAddress: address ?? fallbackUser.walletAddress });
  }, [address, selectedRole]);

  const signOut = useCallback(async () => {
    setUser(null);
    disconnect();
  }, [disconnect]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isSigningIn: false,
      signIn,
      signOut,
      selectedRole,
      setSelectedRole,
    }),
    [selectedRole, signIn, signOut, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
