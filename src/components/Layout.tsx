import Link from "next/link";

import { Footer } from "@/components/Footer";
import { WalletConnect } from "@/components/WalletConnect";

const navItems = [
  { href: "/jobs", label: "Jobs" },
  { href: "/agents", label: "Agents" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-900 bg-slate-950/90">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-lg font-semibold tracking-tight text-white">
              Agent Workforce
            </Link>
            <nav className="hidden items-center gap-2 md:flex">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-900 hover:text-white">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <WalletConnect />
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">{children}</main>
      <Footer />
    </div>
  );
}
