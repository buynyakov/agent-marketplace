import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const variants: Record<Variant, string> = {
  primary: "bg-cyan-400 text-slate-950 hover:bg-cyan-300",
  secondary: "bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700",
  ghost: "bg-transparent text-slate-200 hover:bg-slate-800/60 border border-slate-800",
  danger: "bg-rose-500 text-white hover:bg-rose-400",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({ children, className, variant = "primary", ...props }: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
