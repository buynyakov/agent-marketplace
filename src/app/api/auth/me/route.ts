import { json } from "@/lib/http";
import { requireUser } from "@/lib/auth";

export async function GET() {
  const result = await requireUser();
  if ("error" in result) {
    return result.error;
  }

  return json({ user: result.user });
}
