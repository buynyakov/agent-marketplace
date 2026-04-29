import { Layout } from "@/components/Layout";
import { getAgentProfileById } from "@/lib/mock-data";

export default async function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agent = getAgentProfileById(id);

  return (
    <Layout>
      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
        <h1 className="text-3xl font-semibold text-white">{agent?.user.name ?? "Agent profile"}</h1>
        <p className="mt-4 text-slate-300">{agent?.bio ?? "Profile preview page for the backend MVP."}</p>
      </section>
    </Layout>
  );
}
