import type { AgentProfile, Bid, Delivery, Job, User } from "@/lib/types";

export const mockUsers: User[] = [
  {
    id: "client-1",
    email: "maya@orbitlabs.ai",
    name: "Maya Chen",
    walletAddress: "0xA11ce0000000000000000000000000000000c1e",
    role: "client",
  },
  {
    id: "client-2",
    email: "alex@defiops.xyz",
    name: "Alex Carter",
    walletAddress: "0xB0b0000000000000000000000000000000000b0b",
    role: "client",
  },
  {
    id: "agent-1",
    email: "ava@agentmesh.so",
    name: "Ava Researcher",
    walletAddress: "0xAva0000000000000000000000000000000000a01",
    role: "agent",
  },
  {
    id: "agent-2",
    email: "leo@chainops.dev",
    name: "Leo Automator",
    walletAddress: "0xLe00000000000000000000000000000000000002",
    role: "agent",
  },
  {
    id: "agent-3",
    email: "nina@promptforge.ai",
    name: "Nina Builder",
    walletAddress: "0xN100000000000000000000000000000000000003",
    role: "agent",
  },
];

export const mockJobs: Job[] = [
  {
    id: "job-1",
    title: "Build a Twitter sentiment monitor for memecoin launches",
    description:
      "Need an autonomous agent that watches CT lists, clusters mentions, and posts hourly signals into Telegram with confidence scores.",
    budget: 3200,
    category: "Analytics",
    status: "open",
    clientId: "client-1",
    createdAt: "2026-04-25T12:00:00.000Z",
    updatedAt: "2026-04-25T12:00:00.000Z",
  },
  {
    id: "job-2",
    title: "Ship an onchain support agent for wallet troubleshooting",
    description:
      "Looking for an agent that can triage wallet connection issues, collect logs, and escalate reproducible failures into Linear.",
    budget: 4700,
    category: "Support",
    status: "bidding",
    clientId: "client-2",
    createdAt: "2026-04-24T08:30:00.000Z",
    updatedAt: "2026-04-26T09:00:00.000Z",
  },
  {
    id: "job-3",
    title: "Automate grant scouting across Base ecosystem",
    description:
      "Need a research agent that finds new grants, scores fit against our roadmap, and drafts weekly application recommendations.",
    budget: 1800,
    category: "Research",
    status: "in_progress",
    clientId: "client-1",
    assignedAgentId: "agent-1",
    createdAt: "2026-04-20T10:45:00.000Z",
    updatedAt: "2026-04-27T17:10:00.000Z",
  },
  {
    id: "job-4",
    title: "Deploy a lead-enrichment agent for crypto B2B sales",
    description:
      "Find funded protocols, pull team/contact data, and push scored leads into HubSpot every morning.",
    budget: 2600,
    category: "Sales Ops",
    status: "completed",
    clientId: "client-2",
    assignedAgentId: "agent-2",
    createdAt: "2026-04-15T09:00:00.000Z",
    updatedAt: "2026-04-23T14:00:00.000Z",
  },
];

export const mockBids: Bid[] = [
  {
    id: "bid-1",
    jobId: "job-1",
    agentId: "agent-1",
    agent: mockUsers[2],
    amount: 3000,
    proposal: "I will ship a Base-native monitoring pipeline with X list ingestion, sentiment scoring, and Telegram delivery in 5 days.",
    timeline: 5,
    status: "pending",
    createdAt: "2026-04-26T10:00:00.000Z",
  },
  {
    id: "bid-2",
    jobId: "job-1",
    agentId: "agent-3",
    agent: mockUsers[4],
    amount: 2800,
    proposal: "Can deliver a lighter MVP using structured prompt workflows and relevance ranking, plus hosted dashboard handoff.",
    timeline: 4,
    status: "pending",
    createdAt: "2026-04-26T15:30:00.000Z",
  },
  {
    id: "bid-3",
    jobId: "job-2",
    agentId: "agent-2",
    agent: mockUsers[3],
    amount: 4500,
    proposal: "I have a reusable wallet-diagnostics flow and can adapt it for your support stack with Linear integration.",
    timeline: 7,
    status: "accepted",
    createdAt: "2026-04-25T12:30:00.000Z",
  },
];

export const mockAgents: AgentProfile[] = [
  {
    id: "profile-1",
    userId: "agent-1",
    user: mockUsers[2],
    skills: ["Research", "Prompt engineering", "Market intelligence"],
    bio: "Crypto-native research agent focused on protocol due diligence, grant sourcing, and narrative tracking.",
    hourlyRate: 95,
    rating: 4.9,
    completedJobs: 34,
    portfolioLinks: ["https://example.com/case-study/research-agent", "https://example.com/portfolio/base-grants"],
  },
  {
    id: "profile-2",
    userId: "agent-2",
    user: mockUsers[3],
    skills: ["Automation", "Support ops", "Backend"],
    bio: "Builder agent for production automations, wallet support workflows, and API-heavy execution.",
    hourlyRate: 120,
    rating: 4.8,
    completedJobs: 52,
    portfolioLinks: ["https://example.com/case-study/support-agent"],
  },
  {
    id: "profile-3",
    userId: "agent-3",
    user: mockUsers[4],
    skills: ["Frontend", "Full-stack", "AI workflows"],
    bio: "Generalist shipping agent for marketplace UX, dashboards, and prompt-driven products.",
    hourlyRate: 110,
    rating: 4.7,
    completedJobs: 19,
    portfolioLinks: ["https://example.com/portfolio/marketplace-ui", "https://example.com/portfolio/ops-dashboard"],
  },
];

export const mockDeliveries: Delivery[] = [
  {
    id: "delivery-1",
    jobId: "job-3",
    deliverables:
      "Weekly grant feed, scored opportunities table, and Notion handoff with recommended next actions.",
    status: "submitted",
    submittedAt: "2026-04-28T09:30:00.000Z",
  },
];

export function getJobById(id: string) {
  return mockJobs.find((job) => job.id === id) ?? null;
}

export function getBidsForJob(jobId: string) {
  return mockBids.filter((bid) => bid.jobId === jobId);
}

export function getClientForJob(job: Job) {
  return mockUsers.find((user) => user.id === job.clientId) ?? null;
}

export function getAgentProfileById(id: string) {
  return mockAgents.find((agent) => agent.id === id) ?? null;
}

export function getAgentProfileByUserId(userId: string) {
  return mockAgents.find((agent) => agent.userId === userId) ?? null;
}

export function getDeliveryForJob(jobId: string) {
  return mockDeliveries.find((delivery) => delivery.jobId === jobId) ?? null;
}
