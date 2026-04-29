import { prisma } from "@/lib/prisma";
import { badRequest, json, unauthorized } from "@/lib/http";
import { getSession } from "@/lib/session";
import { verifySiweMessage } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await getSession();
  const body = await request.json().catch(() => null);

  if (!body?.message || !body?.signature) {
    return badRequest("message and signature are required");
  }

  if (!session.nonce) {
    return unauthorized("Missing SIWE nonce");
  }

  try {
    const result = await verifySiweMessage({
      message: body.message,
      signature: body.signature,
      nonce: session.nonce,
    });

    if (!result.success) {
      return unauthorized("Invalid SIWE signature");
    }

    const address = result.data.address.toLowerCase();
    const role = body.role === "agent" ? "agent" : body.role === "admin" ? "admin" : "client";
    const email = body.email || `${address}@siwe.local`;
    const name = body.name || `User ${address.slice(0, 6)}`;

    const user = await prisma.user.upsert({
      where: { walletAddress: address },
      update: { email, name, role },
      create: { walletAddress: address, email, name, role },
    });

    session.user = { id: user.id, role: user.role, walletAddress: user.walletAddress };
    delete session.nonce;
    await session.save();

    return json({ user });
  } catch (error) {
    return unauthorized(error instanceof Error ? error.message : "SIWE verification failed");
  }
}
