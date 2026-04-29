import { prisma } from "@/lib/prisma";
import { badRequest, json, forbidden, notFound } from "@/lib/http";
import { requireUser } from "@/lib/auth";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const result = await requireUser();
  if ("error" in result) {
    return result.error;
  }

  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  if (!body?.bidId) {
    return badRequest("bidId is required");
  }

  const job = await prisma.job.findUnique({ where: { id } });
  if (!job) {
    return notFound("Job not found");
  }

  if (job.clientId !== result.user.id && result.user.role !== "admin") {
    return forbidden("Only the client or admin can assign a bid");
  }

  const bid = await prisma.bid.findUnique({ where: { id: body.bidId } });
  if (!bid || bid.jobId !== id) {
    return notFound("Bid not found for this job");
  }

  const updated = await prisma.$transaction(async (tx) => {
    await tx.bid.updateMany({ where: { jobId: id }, data: { status: "rejected" } });
    await tx.bid.update({ where: { id: bid.id }, data: { status: "accepted" } });

    return tx.job.update({
      where: { id },
      data: {
        assignedAgentId: bid.agentId,
        status: "in_progress",
      },
      include: {
        assignedAgent: { select: { id: true, name: true, walletAddress: true } },
      },
    });
  });

  return json({ job: updated });
}
