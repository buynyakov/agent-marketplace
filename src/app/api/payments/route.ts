import { prisma } from "@/lib/prisma";
import { badRequest, json } from "@/lib/http";
import { requireUser } from "@/lib/auth";

export async function GET() {
  const result = await requireUser();
  if ("error" in result) {
    return result.error;
  }

  const payments = await prisma.payment.findMany({
    where:
      result.user.role === "admin"
        ? undefined
        : {
            OR: [
              { fromWallet: result.user.walletAddress },
              { toWallet: result.user.walletAddress },
              { job: { clientId: result.user.id } },
              { job: { assignedAgentId: result.user.id } },
            ],
          },
    include: {
      job: {
        select: {
          id: true,
          title: true,
          clientId: true,
          assignedAgentId: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return json({ payments });
}

export async function POST(request: Request) {
  const result = await requireUser();
  if ("error" in result) {
    return result.error;
  }

  const body = await request.json().catch(() => null);
  if (!body?.jobId || typeof body?.amount !== "number" || typeof body?.platformFee !== "number") {
    return badRequest("jobId, amount, and platformFee are required");
  }

  const job = await prisma.job.findUnique({
    where: { id: body.jobId },
    include: { client: true, assignedAgent: true },
  });
  if (!job) {
    return badRequest("Job not found");
  }

  const payment = await prisma.payment.upsert({
    where: { jobId: body.jobId },
    update: {
      txHash: body.txHash || null,
      amount: body.amount,
      platformFee: body.platformFee,
      fromWallet: body.fromWallet || job.client.walletAddress,
      toWallet: body.toWallet || job.assignedAgent?.walletAddress || "",
      status: body.status || "completed",
    },
    create: {
      jobId: body.jobId,
      txHash: body.txHash || null,
      amount: body.amount,
      platformFee: body.platformFee,
      fromWallet: body.fromWallet || job.client.walletAddress,
      toWallet: body.toWallet || job.assignedAgent?.walletAddress || "",
      status: body.status || "completed",
    },
  });

  return json({ payment }, 201);
}
