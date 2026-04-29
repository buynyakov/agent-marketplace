import Link from "next/link";

import { Badge } from "@/components/Badge";
import type { Job } from "@/lib/types";

export function JobCard({ job }: { job: Job }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{job.title}</h3>
          <p className="mt-2 text-sm text-slate-400">{job.description}</p>
        </div>
        <Badge variant={job.status}>{job.status}</Badge>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
        <span>{job.category}</span>
        <span>${job.budget.toLocaleString()}</span>
      </div>
      <Link href={`/jobs/${job.id}`} className="mt-4 inline-flex text-sm text-cyan-300">
        View job
      </Link>
    </div>
  );
}
