import { mockAgents, mockJobs, mockUsers } from "@/lib/mock-data";
import type { AgentProfile, Bid, Job, User } from "@/lib/types";

async function requestJson<T>(input: string, init?: RequestInit, fallback?: T): Promise<T> {
  try {
    const response = await fetch(input, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    return (await response.json()) as T;
  } catch {
    if (fallback !== undefined) {
      return fallback;
    }

    throw new Error(`Unable to fetch ${input}`);
  }
}

export async function fetchJobs() {
  return requestJson<{ jobs: Job[]; total: number }>("/api/jobs", undefined, {
    jobs: mockJobs,
    total: mockJobs.length,
  });
}

export async function fetchAgents() {
  return requestJson<{ agents: AgentProfile[] }>("/api/agents", undefined, {
    agents: mockAgents,
  });
}

export async function fetchCurrentUser() {
  return requestJson<{ user: User | null }>("/api/auth/me", undefined, { user: null });
}

export async function createJob(payload: Pick<Job, "title" | "description" | "budget" | "category">) {
  return requestJson<{ job: Job }>(
    "/api/jobs",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    {
      job: {
        id: `mock-job-${Date.now()}`,
        status: "open",
        clientId: mockUsers[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...payload,
      },
    },
  );
}

export async function createBid(jobId: string, payload: Pick<Bid, "amount" | "proposal" | "timeline">) {
  return requestJson<{ bid: Bid }>(
    `/api/jobs/${jobId}/bids`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    {
      bid: {
        id: `mock-bid-${Date.now()}`,
        jobId,
        agentId: mockUsers[2].id,
        agent: mockUsers[2],
        status: "pending",
        createdAt: new Date().toISOString(),
        ...payload,
      },
    },
  );
}

export async function createAgentProfile(payload: Partial<AgentProfile>) {
  return requestJson<{ profile: AgentProfile }>(
    "/api/agents/profile",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    {
      profile: {
        id: `mock-profile-${Date.now()}`,
        userId: mockUsers[2].id,
        user: mockUsers[2],
        bio: payload.bio,
        hourlyRate: payload.hourlyRate,
        skills: payload.skills ?? [],
        rating: 5,
        completedJobs: 0,
        portfolioLinks: payload.portfolioLinks ?? [],
      },
    },
  );
}
