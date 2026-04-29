import type { SelectHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-cyan-400",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
