import { prisma } from "@/lib/prisma";
import { json, notFound } from "@/lib/http";

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const agent = await prisma.agentProfile.findFirst({
    where: {
      OR: [{ id }, { userId: id }],
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          walletAddress: true,
          createdAt: true,
        },
      },
    },
  });

  if (!agent) {
    return notFound("Agent profile not found");
  }

  return json({ agent });
}
