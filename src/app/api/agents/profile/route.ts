import { prisma } from "@/lib/prisma";
import { badRequest, json } from "@/lib/http";
import { requireRole, requireUser } from "@/lib/auth";

export async function POST(request: Request) {
  const result = await requireUser();
  if ("error" in result) {
    return result.error;
  }

  const roleError = requireRole(result.user, "agent");
  if (roleError) {
    return roleError;
  }

  const body = await request.json().catch(() => null);
  if (!Array.isArray(body?.skills)) {
    return badRequest("skills array is required");
  }

  const profile = await prisma.agentProfile.upsert({
    where: { userId: result.user.id },
    update: {
      skills: body.skills,
      bio: body.bio || null,
      hourlyRate: typeof body.hourlyRate === "number" ? body.hourlyRate : null,
      portfolioLinks: Array.isArray(body.portfolioLinks) ? body.portfolioLinks : [],
    },
    create: {
      userId: result.user.id,
      skills: body.skills,
      bio: body.bio || null,
      hourlyRate: typeof body.hourlyRate === "number" ? body.hourlyRate : null,
      portfolioLinks: Array.isArray(body.portfolioLinks) ? body.portfolioLinks : [],
    },
    include: {
      user: {
        select: { id: true, name: true, walletAddress: true },
      },
    },
  });

  return json({ profile }, 201);
}
