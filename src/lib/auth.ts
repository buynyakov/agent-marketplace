import { User } from "@prisma/client";
import { SiweMessage } from "siwe";

import { prisma } from "@/lib/prisma";
import { forbidden, unauthorized } from "@/lib/http";
import { getSession } from "@/lib/session";

export async function requireUser() {
  const session = await getSession();
  if (!session.user) {
    return { error: unauthorized(), session } as const;
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) {
    session.destroy();
    return { error: unauthorized("Session expired"), session } as const;
  }

  return { user, session } as const;
}

export function requireRole(user: User, role: string) {
  if (user.role !== role) {
    return forbidden(`${role} role required`);
  }

  return null;
}

export async function verifySiweMessage(input: { message: string; signature: string; nonce: string }) {
  const siwe = new SiweMessage(input.message);

  return siwe.verify({
    signature: input.signature,
    nonce: input.nonce,
    domain: process.env.SIWE_DOMAIN,
    scheme: process.env.NODE_ENV === "production" ? "https" : "http",
  });
}
