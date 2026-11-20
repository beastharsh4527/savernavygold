"use client";

import type { ReactNode } from "react";

/** Magnetic hover removed per client feedback — now a plain passthrough so call sites stay unchanged. */
export function Magnetic({ children, className }: { children: ReactNode; strength?: number; className?: string }) {
  return <span className={className ?? "inline-block"}>{children}</span>;
}
