import type { ReactNode } from "react";
import { SplitReveal } from "./SplitReveal";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "left",
  tone = "light",
  className,
  aside,
  as = "h2",
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  aside?: ReactNode;
  as?: "h1" | "h2";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "grid gap-8",
        aside ? "lg:grid-cols-[1.4fr_1fr] lg:items-end" : "",
        align === "center" && "mx-auto max-w-4xl text-center justify-items-center",
        className,
      )}
    >
      <div className={cn("grid gap-6", align === "center" && "justify-items-center")}>
        <span className={cn("eyebrow", dark ? "text-mint" : "text-brand")}>{eyebrow}</span>
        <SplitReveal as={as} className={cn("display-lg max-w-[18ch]", align === "center" && "mx-auto", dark ? "text-paper" : "text-ink")}>
          {title}
        </SplitReveal>
      </div>
      {(sub || aside) && (
        <Reveal className={cn("grid gap-6", align === "center" && "justify-items-center")}>
          {sub && <p className={cn("max-w-xl text-lg leading-relaxed", dark ? "text-fog" : "text-moss")}>{sub}</p>}
          {aside}
        </Reveal>
      )}
    </div>
  );
}
