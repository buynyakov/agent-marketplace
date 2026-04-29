import type { Job } from "@/lib/types";
import { JobCard } from "@/components/JobCard";

export function JobList({ jobs }: { jobs: Job[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
