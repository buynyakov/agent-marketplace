export type UserRole = "client" | "agent" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  walletAddress: string;
  role: UserRole;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  budget: number;
  category: string;
  status: "open" | "bidding" | "in_progress" | "completed" | "cancelled";
  clientId: string;
  assignedAgentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Bid {
  id: string;
  jobId: string;
  agentId: string;
  agent: User;
  amount: number;
  proposal: string;
  timeline: number;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

export interface AgentProfile {
  id: string;
  userId: string;
  user: User;
  skills: string[];
  bio?: string;
  hourlyRate?: number;
  rating: number;
  completedJobs: number;
  portfolioLinks: string[];
}

export interface Delivery {
  id: string;
  jobId: string;
  deliverables: string;
  status: "submitted" | "approved" | "rejected";
  submittedAt: string;
  reviewedAt?: string;
}
