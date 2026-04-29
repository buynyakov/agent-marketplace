import { prisma } from "@/lib/prisma";
import { badRequest, json, forbidden, notFound } from "@/lib/http";
import { requireUser } from "@/lib/auth";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const result = await requireUser();
  if ("error" in result) {
    return result.error;
  }

  const { id } = await context.params;
  const job = await prisma.job.findUnique({ where: { id }, include: { delivery: true } });
  if (!job) {
    return notFound("Job not found");
  }

  if (job.assignedAgentId !== result.user.id && result.user.role !== "admin") {
    return forbidden("Only the assigned agent or admin can submit delivery");
  }

  if (job.delivery) {
    return badRequest("Delivery already exists for this job");
  }

  const body = await request.json().catch(() => null);
  if (!body?.deliverables) {
    return badRequest("deliverables are required");
  }

  const delivery = await prisma.delivery.create({
    data: {
      jobId: id,
      agentId: result.user.id,
      deliverables: body.deliverables,
      status: "submitted",
    },
  });

  return json({ delivery }, 201);
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const result = await requireUser();
  if ("error" in result) {
    return result.error;
  }

  const { id } = await context.params;
  const job = await prisma.job.findUnique({ where: { id }, include: { delivery: true } });
  if (!job || !job.delivery) {
    return notFound("Delivery not found");
  }

  if (job.clientId !== result.user.id && result.user.role !== "admin") {
    return forbidden("Only the client or admin can review delivery");
  }

  const body = await request.json().catch(() => null);
  if (!body?.status || !["approved", "rejected"].includes(body.status)) {
    return badRequest("status must be approved or rejected");
  }

  const delivery = await prisma.delivery.update({
    where: { jobId: id },
    data: {
      status: body.status,
      reviewedAt: new Date(),
    },
  });

  if (body.status === "approved") {
    await prisma.job.update({ where: { id }, data: { status: "completed" } });
    await prisma.agentProfile.updateMany({
      where: { userId: job.delivery.agentId },
      data: { completedJobs: { increment: 1 } },
    });
  }

  return json({ delivery });
}
