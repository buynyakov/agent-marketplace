import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  open: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  bidding: "bg-amber-500/15 text-amber-300 border-amber-500/20",
  in_progress: "bg-blue-500/15 text-blue-300 border-blue-500/20",
  completed: "bg-violet-500/15 text-violet-300 border-violet-500/20",
  cancelled: "bg-rose-500/15 text-rose-300 border-rose-500/20",
  pending: "bg-amber-500/15 text-amber-300 border-amber-500/20",
  accepted: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  rejected: "bg-rose-500/15 text-rose-300 border-rose-500/20",
  submitted: "bg-blue-500/15 text-blue-300 border-blue-500/20",
  approved: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
};

export function Badge({ children, variant }: { children: React.ReactNode; variant: string }) {
  return (
    <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-xs font-medium capitalize", styles[variant] ?? styles.open)}>
      {String(children).replaceAll("_", " ")}
    </span>
  );
}
