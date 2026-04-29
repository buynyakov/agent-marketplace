"use client";

import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Select } from "@/components/Select";
import { shortenAddress } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";
import { useWallet } from "@/providers/wallet-provider";

export function WalletConnect() {
  const { address, isConnected, connect } = useWallet();
  const { isAuthenticated, isSigningIn, selectedRole, setSelectedRole, signIn, signOut, user } = useAuth();

  return (
    <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center">
      {!isAuthenticated && (
        <Select aria-label="Select role" className="w-full sm:w-36" value={selectedRole} onChange={(event) => setSelectedRole(event.target.value as typeof selectedRole)}>
          <option value="client">Client</option>
          <option value="agent">Agent</option>
        </Select>
      )}
      {!isConnected ? (
        <Button onClick={() => void connect()}>Connect Wallet</Button>
      ) : (
        <div className="flex items-center gap-2">
          <Button variant="secondary">Base Sepolia</Button>
          <Button variant="secondary">{shortenAddress(address ?? "")}</Button>
          {!isAuthenticated ? (
            <Button onClick={() => signIn()} disabled={isSigningIn}>{isSigningIn ? "Signing..." : `Sign in as ${selectedRole}`}</Button>
          ) : (
            <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-300">
              <span>{user?.name ?? shortenAddress(address ?? "")}</span>
              <span className="rounded-full bg-slate-800 px-2 py-0.5 uppercase tracking-wide text-slate-400">{user?.role}</span>
              <button onClick={() => void signOut()} aria-label="Sign out" className="text-slate-400 transition hover:text-white">
                <Icon name="logout" className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
