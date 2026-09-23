import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SplitHeading } from "./SplitHeading";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  size?: "md" | "lg" | "xl";
  className?: string;
  titleAs?: "h1" | "h2" | "h3";
  children?: React.ReactNode;
}

export function SectionHeader({
  eyebrow,
  title,
  lede,
  align = "left",
  tone = "light",
  size = "lg",
  className,
  titleAs = "h2",
  children,
}: SectionHeaderProps) {
  const dark = tone === "dark";
  return (
    <div className={cn("flex flex-col gap-5", align === "center" && "items-center text-center", className)}>
      {eyebrow && (
        <Reveal variant="fade" duration={0.8}>
          <p className={cn("eyebrow", dark && "text-brass")}>{eyebrow}</p>
        </Reveal>
      )}
      <SplitHeading
        as={titleAs}
        className={cn(
          size === "xl" ? "display-xl" : size === "lg" ? "display-lg" : "display-md",
          dark ? "text-ivory" : "text-charcoal",
          "max-w-[18ch]",
          align === "center" && "mx-auto",
        )}
      >
        {title}
      </SplitHeading>
      {lede && (
        <Reveal delay={0.15}>
          <p className={cn("lede max-w-[58ch]", dark && "text-ivory/70")}>{lede}</p>
        </Reveal>
      )}
      {children}
    </div>
  );
}

export function Eyebrow({ children, className, tone = "light" }: { children: React.ReactNode; className?: string; tone?: "light" | "dark" }) {
  return <p className={cn("eyebrow", tone === "dark" && "text-brass", className)}>{children}</p>;
}
