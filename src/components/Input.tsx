import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-400",
        className,
      )}
      {...props}
    />
  );
}
