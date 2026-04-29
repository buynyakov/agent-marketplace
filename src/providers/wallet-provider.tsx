"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
    };
  }
}

interface WalletContextValue {
  address: string | null;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  signMessage: (message: string) => Promise<string>;
}

const WalletContext = createContext<WalletContextValue | null>(null);
const STORAGE_KEY = "agent-marketplace-wallet";

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return globalThis.localStorage.getItem(STORAGE_KEY);
  });

  const connect = async () => {
    const nextAddress = "0xDEMO000000000000000000000000000000000001";
    setAddress(nextAddress);
    globalThis.localStorage.setItem(STORAGE_KEY, nextAddress);
  };

  const disconnect = () => {
    setAddress(null);
    globalThis.localStorage.removeItem(STORAGE_KEY);
  };

  const signMessage = useCallback(async (message: string) => {
    if (!address) throw new Error("Wallet not connected");
    return `mock-signature:${message}:${address}`;
  }, [address]);

  const value = useMemo<WalletContextValue>(
    () => ({ address, isConnected: Boolean(address), connect, disconnect, signMessage }),
    [address, signMessage],
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) throw new Error("useWallet must be used within WalletProvider");
  return context;
}
