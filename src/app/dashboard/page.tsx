"use client";

import Link from "next/link";

import { AgentProfileForm } from "@/components/AgentProfileForm";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Layout } from "@/components/Layout";
import { getAgentProfileByUserId, mockBids, mockJobs } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";

export default function AgentDashboardPage() {
  const { user } = useAuth();
  const profile = user ? getAgentProfileByUserId(user.id) : null;
  const myBids = user ? mockBids.filter((bid) => bid.agentId === user.id) : [];
  const activeJobs = user ? mockJobs.filter((job) => job.assignedAgentId === user.id && job.status === "in_progress") : [];
  const completedJobs = user ? mockJobs.filter((job) => job.assignedAgentId === user.id && job.status === "completed") : [];
  const earnings = completedJobs.reduce((total, job) => total + job.budget, 0);

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-white">Agent Dashboard</h1>
            <p className="mt-2 text-slate-400">Track bids, active jobs, and completed work.</p>
          </div>
          <Link href="/jobs"><Button variant="secondary">Find more jobs</Button></Link>
        </div>

        {user?.role !== "agent" ? (
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-5 text-sm text-amber-200">
            Sign in as an agent to view your dashboard state.
          </div>
        ) : null}

        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: "Pending bids", value: myBids.filter((bid) => bid.status === "pending").length.toString() },
            { label: "Accepted bids", value: myBids.filter((bid) => bid.status === "accepted").length.toString() },
            { label: "Active jobs", value: activeJobs.length.toString() },
            { label: "Earnings", value: `${formatCurrency(earnings)} USDC` },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-900 bg-slate-900/60 p-5">
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-slate-900 bg-slate-900/60 p-5">
              <h2 className="text-xl font-semibold text-white">My Bids</h2>
              <div className="mt-4 space-y-3">
                {myBids.map((bid) => (
                  <div key={bid.id} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 p-4">
                    <div>
                      <p className="font-medium text-white">{mockJobs.find((job) => job.id === bid.jobId)?.title}</p>
                      <p className="text-sm text-slate-500">{formatCurrency(bid.amount)} USDC · {bid.timeline} days</p>
                    </div>
                    <Badge variant={bid.status}>{bid.status}</Badge>
                  </div>
                ))}
              </div>
            </section>
            <section className="rounded-2xl border border-slate-900 bg-slate-900/60 p-5">
              <h2 className="text-xl font-semibold text-white">Completed Jobs</h2>
              <div className="mt-4 space-y-3">
                {completedJobs.map((job) => (
                  <div key={job.id} className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                    <p className="font-medium text-white">{job.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{formatCurrency(job.budget)} USDC paid</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <div>
            {profile ? (
              <div className="rounded-2xl border border-slate-900 bg-slate-900/60 p-5">
                <h2 className="text-xl font-semibold text-white">Profile Snapshot</h2>
                <p className="mt-3 text-sm text-slate-300">{profile.bio}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {profile.skills.map((skill) => <span key={skill} className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">{skill}</span>)}
                </div>
              </div>
            ) : (
              <AgentProfileForm />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
