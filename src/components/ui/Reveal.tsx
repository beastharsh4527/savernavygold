"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/** Fades/lifts direct children (or [data-reveal] descendants) in on scroll, staggered. */
export function Reveal({
  as: Tag = "div",
  children,
  className,
  stagger = 0.08,
  y = 40,
  selector,
  start = "top 85%",
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
  selector?: string;
  start?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const targets = selector ? el.querySelectorAll(selector) : el.children;
      if (!targets.length) return;
      gsap.from(targets, {
        y,
        autoAlpha: 0,
        duration: 1.1,
        stagger,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start, once: true },
      });
    },
    { scope: ref },
  );
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
