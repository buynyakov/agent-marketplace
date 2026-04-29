import { prisma } from "@/lib/prisma";
import { json } from "@/lib/http";

export async function GET() {
  const agents = await prisma.agentProfile.findMany({
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
    orderBy: [{ rating: "desc" }, { completedJobs: "desc" }],
  });

  return json({ agents });
}
