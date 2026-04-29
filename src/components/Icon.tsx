import { cn } from "@/lib/utils";

type IconName =
  | "briefcase"
  | "bot"
  | "dashboard"
  | "logout"
  | "arrow-up-right"
  | "calendar"
  | "arrow-right"
  | "coins"
  | "shield"
  | "star";

const paths: Record<IconName, React.ReactNode> = {
  briefcase: <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-8 0h8m-10 2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2Z" />,
  bot: <path d="M12 3v3m-4 8v2m8-2v2M7 7h10a2 2 0 0 1 2 2v5a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V9a2 2 0 0 1 2-2Zm2 4h.01M15 11h.01" />,
  dashboard: <path d="M4 13h7V4H4v9Zm0 7h7v-5H4v5Zm9 0h7V11h-7v9Zm0-18v7h7V2h-7Z" />,
  logout: <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m5 14 5-5-5-5m5 5H9" />,
  "arrow-up-right": <path d="M7 17 17 7m0 0H9m8 0v8" />,
  calendar: <path d="M8 2v4m8-4v4M4 10h16M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />,
  "arrow-right": <path d="M5 12h14m-6-6 6 6-6 6" />,
  coins: <path d="M12 4c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3Zm-8 8c0 1.7 3.6 3 8 3s8-1.3 8-3m-16 5c0 1.7 3.6 3 8 3s8-1.3 8-3" />,
  shield: <path d="M12 3 5 6v6c0 5 3.4 8.5 7 9 3.6-.5 7-4 7-9V6l-7-3Z" />,
  star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17l-5.5 3.2 1-6.2L3 9.6l6.2-.9L12 3Z" />,
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={cn("h-4 w-4", className)} aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
