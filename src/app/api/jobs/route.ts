import { prisma } from "@/lib/prisma";
import { badRequest, json } from "@/lib/http";
import { requireRole, requireUser } from "@/lib/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || undefined;
  const category = searchParams.get("category") || undefined;

  const jobs = await prisma.job.findMany({
    where: {
      ...(status ? { status } : {}),
      ...(category ? { category } : {}),
    },
    include: {
      client: { select: { id: true, name: true, walletAddress: true } },
      assignedAgent: { select: { id: true, name: true, walletAddress: true } },
      _count: { select: { bids: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return json({ jobs });
}

export async function POST(request: Request) {
  const result = await requireUser();
  if ("error" in result) {
    return result.error;
  }

  const roleError = requireRole(result.user, "client");
  if (roleError) {
    return roleError;
  }

  const body = await request.json().catch(() => null);
  if (!body?.title || !body?.description || !body?.category || typeof body?.budget !== "number") {
    return badRequest("title, description, category, and numeric budget are required");
  }

  const job = await prisma.job.create({
    data: {
      title: body.title,
      description: body.description,
      category: body.category,
      budget: body.budget,
      status: body.status || "open",
      clientId: result.user.id,
    },
  });

  return json({ job }, 201);
}
