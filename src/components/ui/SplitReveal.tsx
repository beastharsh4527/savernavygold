"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Calm heading reveal (client feedback: fewer animations) — one gentle
 * transform-only rise, no per-word stagger. LCP-safe: never animates from opacity 0
 * on anything, it only translates inside a mask for the hero.
 */
export function SplitReveal({
  as: Tag = "h2",
  children,
  className,
  onScroll = true,
  delay = 0,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  onScroll?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;
      gsap.from(ref.current, {
        y: 34,
        duration: 1,
        delay,
        ease: "expo.out",
        scrollTrigger: onScroll ? { trigger: ref.current, start: "top 88%", once: true } : undefined,
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
