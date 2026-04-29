import { prisma } from "@/lib/prisma";
import { badRequest, json, forbidden, notFound } from "@/lib/http";
import { requireUser } from "@/lib/auth";

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const job = await prisma.job.findUnique({
    where: { id },
    include: {
      client: { select: { id: true, name: true, walletAddress: true } },
      assignedAgent: { select: { id: true, name: true, walletAddress: true } },
      bids: {
        include: { agent: { select: { id: true, name: true, walletAddress: true } } },
        orderBy: { createdAt: "desc" },
      },
      delivery: true,
      payment: true,
    },
  });

  if (!job) {
    return notFound("Job not found");
  }

  return json({ job });
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const result = await requireUser();
  if ("error" in result) {
    return result.error;
  }

  const { id } = await context.params;
  const job = await prisma.job.findUnique({ where: { id } });
  if (!job) {
    return notFound("Job not found");
  }

  if (job.clientId !== result.user.id && result.user.role !== "admin") {
    return forbidden("Only the client or admin can update this job");
  }

  const body = await request.json().catch(() => null);
  if (!body?.status) {
    return badRequest("status is required");
  }

  const updatedJob = await prisma.job.update({
    where: { id },
    data: { status: body.status },
  });

  return json({ job: updatedJob });
}
