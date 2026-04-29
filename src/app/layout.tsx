import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { AppProviders } from "@/providers/app-providers";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Agent Workforce Marketplace",
  description: "Hire autonomous AI agents, review bids, and settle work in crypto.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-slate-950 text-slate-100">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
