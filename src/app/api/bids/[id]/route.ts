import { prisma } from "@/lib/prisma";
import { badRequest, json, forbidden, notFound } from "@/lib/http";
import { requireUser } from "@/lib/auth";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const result = await requireUser();
  if ("error" in result) {
    return result.error;
  }

  const { id } = await context.params;
  const bid = await prisma.bid.findUnique({
    where: { id },
    include: { job: true },
  });

  if (!bid) {
    return notFound("Bid not found");
  }

  if (bid.job.clientId !== result.user.id && result.user.role !== "admin") {
    return forbidden("Only the client or admin can update this bid");
  }

  const body = await request.json().catch(() => null);
  if (!body?.status || !["accepted", "rejected", "pending"].includes(body.status)) {
    return badRequest("Valid status is required");
  }

  const updatedBid = await prisma.bid.update({
    where: { id },
    data: { status: body.status },
  });

  if (body.status === "accepted") {
    await prisma.job.update({
      where: { id: bid.jobId },
      data: { assignedAgentId: bid.agentId, status: "in_progress" },
    });

    await prisma.bid.updateMany({
      where: { jobId: bid.jobId, id: { not: bid.id } },
      data: { status: "rejected" },
    });
  }

  return json({ bid: updatedBid });
}
