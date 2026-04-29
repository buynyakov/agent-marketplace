import { getIronSession, IronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export type SessionUser = {
  id: string;
  role: string;
  walletAddress: string;
};

export type AppSession = {
  nonce?: string;
  user?: SessionUser;
};

const sessionOptions: SessionOptions = {
  password: process.env.SESSION_PASSWORD || "complex-password-at-least-32-characters",
  cookieName: "agent-marketplace-session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  },
};

export async function getSession(): Promise<IronSession<AppSession>> {
  const cookieStore = await cookies();
  return getIronSession<AppSession>(cookieStore, sessionOptions);
}
