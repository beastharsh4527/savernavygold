"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/** Counts 0 → value when scrolled into view. SSR renders the final value (correct with JS off / reduced motion). */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  duration = 2,
  className,
  separator = true,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  separator?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (n: number) => (separator ? Math.round(n).toLocaleString("en-US") : String(Math.round(n)));

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const obj = { v: 0 };
      el.textContent = prefix + fmt(0) + suffix;
      gsap.to(obj, {
        v: value,
        duration,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
        onUpdate: () => { el.textContent = prefix + fmt(obj.v) + suffix; },
      });
    },
    { scope: ref, dependencies: [value] },
  );

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {prefix + fmt(value) + suffix}
    </span>
  );
}
