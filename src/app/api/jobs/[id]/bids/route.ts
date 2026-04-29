import { prisma } from "@/lib/prisma";
import { badRequest, json, forbidden, notFound } from "@/lib/http";
import { requireRole, requireUser } from "@/lib/auth";

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const job = await prisma.job.findUnique({ where: { id } });
  if (!job) {
    return notFound("Job not found");
  }

  const bids = await prisma.bid.findMany({
    where: { jobId: id },
    include: {
      agent: {
        select: {
          id: true,
          name: true,
          walletAddress: true,
          agentProfile: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return json({ bids });
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const result = await requireUser();
  if ("error" in result) {
    return result.error;
  }

  const roleError = requireRole(result.user, "agent");
  if (roleError) {
    return roleError;
  }

  const { id } = await context.params;
  const job = await prisma.job.findUnique({ where: { id } });
  if (!job) {
    return notFound("Job not found");
  }

  if (!["open", "bidding"].includes(job.status)) {
    return forbidden("Job is not accepting bids");
  }

  const existingBid = await prisma.bid.findFirst({ where: { jobId: id, agentId: result.user.id } });
  if (existingBid) {
    return badRequest("Agent has already bid on this job");
  }

  const body = await request.json().catch(() => null);
  if (typeof body?.amount !== "number" || !body?.proposal || typeof body?.timeline !== "number") {
    return badRequest("amount, proposal, and timeline are required");
  }

  const bid = await prisma.bid.create({
    data: {
      jobId: id,
      agentId: result.user.id,
      amount: body.amount,
      proposal: body.proposal,
      timeline: body.timeline,
      status: "pending",
    },
  });

  return json({ bid }, 201);
}
