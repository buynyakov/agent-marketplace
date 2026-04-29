import { notFound } from "next/navigation";

import { Badge } from "@/components/Badge";
import { BidCard } from "@/components/BidCard";
import { BidForm } from "@/components/BidForm";
import { Layout } from "@/components/Layout";
import { getBidsForJob, getClientForJob, getDeliveryForJob, getJobById } from "@/lib/mock-data";
import { formatCurrency, formatDate, shortenAddress } from "@/lib/utils";

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = getJobById(id);
  if (!job) notFound();

  const bids = getBidsForJob(job.id);
  const client = getClientForJob(job);
  const delivery = getDeliveryForJob(job.id);

  return (
    <Layout>
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-900 bg-slate-900/60 p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{job.category}</p>
                <h1 className="mt-3 text-4xl font-semibold text-white">{job.title}</h1>
              </div>
              <Badge variant={job.status}>{job.status}</Badge>
            </div>
            <p className="mt-6 text-base leading-8 text-slate-300">{job.description}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-sm text-slate-500">Budget</p>
                <p className="mt-2 text-lg font-semibold text-cyan-300">{formatCurrency(job.budget)} USDC</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-sm text-slate-500">Posted</p>
                <p className="mt-2 text-lg font-semibold text-white">{formatDate(job.createdAt)}</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-sm text-slate-500">Client</p>
                <p className="mt-2 text-lg font-semibold text-white">{client?.name ?? "Unknown"}</p>
              </div>
            </div>
          </div>

          <section className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold text-white">Bids</h2>
              <p className="text-sm text-slate-500">Agents compete on cost, timeline, and execution quality.</p>
            </div>
            <div className="space-y-4">
              {bids.length ? bids.map((bid) => <BidCard key={bid.id} bid={bid} canAccept />) : <p className="text-slate-500">No bids yet.</p>}
            </div>
          </section>

          {job.status === "in_progress" ? (
            <section className="rounded-2xl border border-slate-900 bg-slate-900/60 p-6">
              <h2 className="text-2xl font-semibold text-white">Delivery</h2>
              {delivery ? (
                <div className="mt-4 space-y-3 text-sm text-slate-300">
                  <Badge variant={delivery.status}>{delivery.status}</Badge>
                  <p>{delivery.deliverables}</p>
                  <p className="text-slate-500">Submitted {formatDate(delivery.submittedAt)}</p>
                </div>
              ) : (
                <p className="mt-4 text-slate-500">No delivery submitted yet.</p>
              )}
            </section>
          ) : null}
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-900 bg-slate-900/60 p-5">
            <h3 className="text-lg font-semibold text-white">Client Info</h3>
            <p className="mt-3 text-sm text-slate-300">{client?.name}</p>
            <p className="text-sm text-slate-500">{client?.email}</p>
            <p className="mt-2 text-xs text-slate-500">Wallet: {shortenAddress(client?.walletAddress ?? "")}</p>
          </div>
          <BidForm jobId={job.id} />
        </div>
      </div>
    </Layout>
  );
}
