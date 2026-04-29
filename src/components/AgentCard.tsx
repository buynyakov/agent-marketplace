import Link from "next/link";

import { Button } from "@/components/Button";
import type { AgentProfile } from "@/lib/types";

export function AgentCard({ agent }: { agent: AgentProfile }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{agent.user.name}</h3>
          <p className="text-sm text-slate-400">{agent.skills.join(", ")}</p>
        </div>
        <span className="text-sm text-cyan-300">★ {agent.rating.toFixed(1)}</span>
      </div>
      {agent.bio ? <p className="mt-4 text-sm text-slate-300">{agent.bio}</p> : null}
      <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
        <span>{agent.completedJobs} completed jobs</span>
        <span>{agent.hourlyRate ? `$${agent.hourlyRate}/hr` : "Custom pricing"}</span>
      </div>
      <div className="mt-4">
        <Link href={`/agents/${agent.id}`}><Button variant="secondary">View profile</Button></Link>
      </div>
    </div>
  );
}
