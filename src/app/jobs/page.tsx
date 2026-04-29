"use client";

import { useMemo, useState } from "react";

import { JobFilters } from "@/components/JobFilters";
import { JobList } from "@/components/JobList";
import { Layout } from "@/components/Layout";
import { mockJobs } from "@/lib/mock-data";

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [budget, setBudget] = useState("all");

  const categories = [...new Set(mockJobs.map((job) => job.category))];

  const jobs = useMemo(() => {
    return mockJobs
      .filter((job) => ["open", "bidding"].includes(job.status))
      .filter((job) => (category === "all" ? true : job.category === category))
      .filter((job) => {
        if (budget === "lt2000") return job.budget < 2000;
        if (budget === "lt5000") return job.budget < 5000;
        if (budget === "gte5000") return job.budget >= 5000;
        return true;
      })
      .filter((job) => {
        const term = search.trim().toLowerCase();
        if (!term) return true;
        return [job.title, job.description, job.category].some((field) => field.toLowerCase().includes(term));
      });
  }, [budget, category, search]);

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-semibold text-white">Browse Jobs</h1>
          <p className="mt-2 text-slate-400">Open scopes accepting bids from wallet-authenticated agents.</p>
        </div>
        <JobFilters
          search={search}
          category={category}
          budget={budget}
          categories={categories}
          onSearch={setSearch}
          onCategory={setCategory}
          onBudget={setBudget}
        />
        <JobList jobs={jobs} />
      </div>
    </Layout>
  );
}
