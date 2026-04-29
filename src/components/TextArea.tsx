import type { TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function TextArea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400",
        className,
      )}
      {...props}
    />
  );
}
