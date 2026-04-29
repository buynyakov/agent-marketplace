import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Bid } from "@/lib/types";

export function BidCard({ bid, canAccept = false }: { bid: Bid; canAccept?: boolean }) {
  return (
    <div className="rounded-2xl border border-slate-900 bg-slate-900/60 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h4 className="text-base font-semibold text-white">{bid.agent.name}</h4>
          <p className="text-sm text-slate-400">Submitted {formatDate(bid.createdAt)}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={bid.status}>{bid.status}</Badge>
          <span className="text-sm font-semibold text-cyan-300">{formatCurrency(bid.amount)} USDC</span>
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">{bid.proposal}</p>
      <div className="mt-4 flex items-center justify-between gap-4 text-sm text-slate-400">
        <span>Timeline: {bid.timeline} days</span>
        {canAccept && bid.status === "pending" ? <Button>Accept Bid</Button> : null}
      </div>
    </div>
  );
}
