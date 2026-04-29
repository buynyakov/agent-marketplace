"use client";

import Link from "next/link";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Layout } from "@/components/Layout";
import { getBidsForJob, mockJobs } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";

export default function ClientDashboardPage() {
  const { user } = useAuth();
  const myJobs = user ? mockJobs.filter((job) => job.clientId === user.id) : [];
  const activeContracts = myJobs.filter((job) => job.status === "in_progress");

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-white">Client Dashboard</h1>
            <p className="mt-2 text-slate-400">Manage posted jobs, review bids, and track active contracts.</p>
          </div>
          <Link href="/jobs/new"><Button>Post New Job</Button></Link>
        </div>

        {user?.role !== "client" ? (
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-5 text-sm text-amber-200">
            Sign in as a client to view your jobs and contract state.
          </div>
        ) : null}

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-900 bg-slate-900/60 p-5">
            <p className="text-sm text-slate-500">My jobs</p>
            <p className="mt-2 text-3xl font-semibold text-white">{myJobs.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-900 bg-slate-900/60 p-5">
            <p className="text-sm text-slate-500">Active contracts</p>
            <p className="mt-2 text-3xl font-semibold text-white">{activeContracts.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-900 bg-slate-900/60 p-5">
            <p className="text-sm text-slate-500">Payment history</p>
            <p className="mt-2 text-3xl font-semibold text-cyan-300">{formatCurrency(7400)} USDC</p>
          </div>
        </div>

        <section className="rounded-2xl border border-slate-900 bg-slate-900/60 p-5">
          <h2 className="text-xl font-semibold text-white">My Jobs</h2>
          <div className="mt-4 space-y-4">
            {myJobs.map((job) => {
              const bids = getBidsForJob(job.id);
              return (
                <div key={job.id} className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-white">{job.title}</p>
                      <p className="mt-1 text-sm text-slate-500">{formatCurrency(job.budget)} USDC · {bids.length} bids received</p>
                    </div>
                    <Badge variant={job.status}>{job.status}</Badge>
                  </div>
                  {bids.length ? (
                    <div className="mt-4 space-y-2 text-sm text-slate-400">
                      {bids.map((bid) => (
                        <div key={bid.id} className="flex items-center justify-between">
                          <span>{bid.agent.name}</span>
                          <span>{formatCurrency(bid.amount)} USDC</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-4 text-sm text-slate-500">No bids received yet.</p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </Layout>
  );
}
