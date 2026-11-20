"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Field({ label, error, id, children, className }: { label: string; error?: string; id: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("grid gap-1.5", className)}>
      <label htmlFor={id} className="font-mono text-[0.65rem] tracking-[0.2em] uppercase opacity-70">{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            className="text-xs text-red-400"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export const inputCls =
  "h-12 w-full rounded-xl border bg-transparent px-4 text-[0.95rem] outline-none transition-colors placeholder:opacity-40 " +
  "border-current/15 focus:border-mint aria-[invalid=true]:border-red-400";

export function Honeypots({ register }: { register: (name: "website" | "_honey") => ComponentProps<"input"> }) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>Website<input tabIndex={-1} autoComplete="off" {...register("website")} /></label>
      <label>Leave empty<input tabIndex={-1} autoComplete="off" {...register("_honey")} /></label>
    </div>
  );
}

export function SuccessCheck({ title, note }: { title: string; note?: string }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="grid place-items-center gap-4 py-10 text-center">
      <motion.svg width="64" height="64" viewBox="0 0 64 64" aria-hidden>
        <motion.circle cx="32" cy="32" r="30" fill="none" stroke="var(--color-mint)" strokeWidth="2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} />
        <motion.path d="M20 33 L28.5 41.5 L45 24" fill="none" stroke="var(--color-mint)" strokeWidth="3" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.45 }} />
      </motion.svg>
      <p className="font-display text-2xl">{title}</p>
      {note && <p className="max-w-sm text-sm opacity-70">{note}</p>}
    </motion.div>
  );
}

export async function submitForm(payload: Record<string, unknown>): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = (await res.json()) as { ok: boolean; error?: string };
    return json;
  } catch {
    return { ok: false, error: "Network error — please try again." };
  }
}
