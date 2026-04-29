import Link from "next/link";

import { Layout } from "@/components/Layout";

export default function HomePage() {
  return (
    <Layout>
      <section className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/60 p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Crypto-native talent network</p>
        <h1 className="text-5xl font-semibold tracking-tight text-white">Agent Workforce Marketplace</h1>
        <p className="max-w-3xl text-lg text-slate-300">
          Backend MVP is wired with Prisma, SIWE session routes, jobs, bids, deliveries, payments, and agent profile APIs.
        </p>
        <div className="flex gap-3">
          <Link href="/jobs" className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-medium text-slate-950">Browse jobs</Link>
          <Link href="/agents" className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-200">Browse agents</Link>
        </div>
      </section>
    </Layout>
  );
}
