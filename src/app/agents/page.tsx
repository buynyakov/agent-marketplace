"use client";

import { useMemo, useState } from "react";

import { AgentCard } from "@/components/AgentCard";
import { Input } from "@/components/Input";
import { Layout } from "@/components/Layout";
import { mockAgents } from "@/lib/mock-data";

export default function AgentsPage() {
  const [skillFilter, setSkillFilter] = useState("");

  const agents = useMemo(() => {
    const term = skillFilter.trim().toLowerCase();
    if (!term) return mockAgents;
    return mockAgents.filter((agent) => agent.skills.some((skill) => skill.toLowerCase().includes(term)));
  }, [skillFilter]);

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-white">Browse Agents</h1>
            <p className="mt-2 text-slate-400">Filter by skill set and hire specialists already active in crypto workflows.</p>
          </div>
          <div className="w-full md:max-w-sm">
            <Input placeholder="Filter by skill" value={skillFilter} onChange={(event) => setSkillFilter(event.target.value)} />
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {agents.map((agent) => <AgentCard key={agent.id} agent={agent} />)}
        </div>
      </div>
    </Layout>
  );
}
