import { json } from "@/lib/http";
import { getSession } from "@/lib/session";

export async function POST() {
  const session = await getSession();
  await session.destroy();

  return json({ success: true });
}
