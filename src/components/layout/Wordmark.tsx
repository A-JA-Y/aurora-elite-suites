import Link from "next/link";
import { cn } from "@/lib/utils";

interface WordmarkProps {
  className?: string;
  tone?: "light" | "dark" | "inherit";
  onClick?: () => void;
  compact?: boolean;
}

export function Wordmark({ className, tone = "inherit", onClick, compact = false }: WordmarkProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Aurora Elite Suites, home"
      className={cn(
        "group/wm inline-flex items-center gap-3",
        tone === "light" && "text-ivory",
        tone === "dark" && "text-charcoal",
        className,
      )}
      data-cursor="link"
    >
      <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full ring-1 ring-current/40 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/wm:rotate-[360deg]">
        <span className="font-display text-[0.95rem] font-semibold tracking-[0.06em]">AES</span>
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.05rem] font-semibold tracking-[0.22em]">AURORA</span>
          <span className="mt-1 font-sans text-[0.55rem] font-semibold uppercase tracking-[0.34em] opacity-80">Elite Suites</span>
        </span>
      )}
    </Link>
  );
}
