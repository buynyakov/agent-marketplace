import crypto from "node:crypto";

import { json } from "@/lib/http";
import { getSession } from "@/lib/session";

export async function POST() {
  const session = await getSession();
  const nonce = crypto.randomBytes(16).toString("hex");

  session.nonce = nonce;
  await session.save();

  return json({ nonce });
}
