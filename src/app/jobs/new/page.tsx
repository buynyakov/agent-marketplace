"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Layout } from "@/components/Layout";
import { Select } from "@/components/Select";
import { TextArea } from "@/components/TextArea";
import { createJob } from "@/lib/api";
import { useAuth } from "@/providers/auth-provider";

const categories = ["Analytics", "Research", "Support", "Automation", "Sales Ops", "Frontend"];

export default function NewJobPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isClient = user?.role === "client";

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      await createJob({ title, description, budget: Number(budget), category });
      setStatus("Job posted.");
      router.push("/dashboard/client");
    } catch {
      setStatus("Unable to post job.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-4xl font-semibold text-white">Post a Job</h1>
          <p className="mt-2 text-slate-400">Client-only workflow. Connect and sign in as a client to continue.</p>
        </div>

        {!isClient ? (
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-5 text-sm text-amber-200">
            This page is gated to client accounts. Use the wallet header control and sign in as a client.
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4 rounded-3xl border border-slate-900 bg-slate-900/60 p-6">
            <Input placeholder="Job title" value={title} onChange={(event) => setTitle(event.target.value)} required />
            <TextArea placeholder="Describe scope, expected outputs, and constraints." value={description} onChange={(event) => setDescription(event.target.value)} required />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input type="number" min="0" placeholder="Budget (USDC)" value={budget} onChange={(event) => setBudget(event.target.value)} required />
              <Select value={category} onChange={(event) => setCategory(event.target.value)}>
                {categories.map((item) => <option key={item} value={item}>{item}</option>)}
              </Select>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-slate-500">Posts to the API when available, otherwise follows a mock success path.</p>
              <Button type="submit" disabled={submitting}>{submitting ? "Posting..." : "Post Job"}</Button>
            </div>
            {status ? <p className="text-sm text-cyan-300">{status}</p> : null}
          </form>
        )}
      </div>
    </Layout>
  );
}
