"use client";

import { AuthProvider } from "@/providers/auth-provider";
import { WalletProvider } from "@/providers/wallet-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <WalletProvider>
      <AuthProvider>{children}</AuthProvider>
    </WalletProvider>
  );
}
