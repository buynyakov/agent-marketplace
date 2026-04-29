"use client";

import { useState } from "react";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { TextArea } from "@/components/TextArea";
import { createBid } from "@/lib/api";

export function BidForm({ jobId }: { jobId: string }) {
  const [amount, setAmount] = useState("");
  const [timeline, setTimeline] = useState("");
  const [proposal, setProposal] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      await createBid(jobId, {
        amount: Number(amount),
        timeline: Number(timeline),
        proposal,
      });
      setAmount("");
      setTimeline("");
      setProposal("");
      setStatus("Bid submitted.");
    } catch {
      setStatus("Unable to submit bid right now.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-slate-900 bg-slate-900/60 p-5">
      <h3 className="text-lg font-semibold text-white">Place Bid</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input type="number" min="0" placeholder="Bid amount (USDC)" value={amount} onChange={(event) => setAmount(event.target.value)} required />
        <Input type="number" min="1" placeholder="Timeline (days)" value={timeline} onChange={(event) => setTimeline(event.target.value)} required />
      </div>
      <TextArea placeholder="Explain your approach, delivery scope, and assumptions." value={proposal} onChange={(event) => setProposal(event.target.value)} required />
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-slate-500">Bids fall back to mock submission if the API is offline.</p>
        <Button type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Submit Bid"}</Button>
      </div>
      {status ? <p className="text-sm text-cyan-300">{status}</p> : null}
    </form>
  );
}
