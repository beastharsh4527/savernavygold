"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { apply, type RoleId } from "@/content/contact";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { Reveal } from "@/components/ui/Reveal";
import { ApplyForm } from "@/components/forms/ApplyForm";
import { cn } from "@/lib/utils";

export function Apply({ initialRole = "doctor", showForm = true }: { initialRole?: RoleId; showForm?: boolean }) {
  const [role, setRole] = useState<RoleId>(initialRole);
  const current = apply.roles.find((r) => r.id === role)!;

  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="container-x grid gap-14">
        <div className="grid gap-6">
          <span className="eyebrow text-brand">{apply.eyebrow}</span>
          <SplitReveal className="display-lg max-w-[18ch]">
            {apply.title.line1} <em className="text-brand">{apply.title.line2}</em>
          </SplitReveal>
          <Reveal><p className="max-w-2xl text-lg text-moss">{apply.sub}</p></Reveal>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4">
            <div role="tablist" aria-label="I am a…" className="grid gap-3">
              {apply.roles.map((r) => (
                <button
                  key={r.id}
                  role="tab"
                  id={`apply-tab-${r.id}`}
                  aria-selected={role === r.id}
                  aria-controls="apply-panel"
                  onClick={() => setRole(r.id)}
                  className={cn(
                    "group flex items-center justify-between rounded-2xl border px-6 py-5 text-left transition-colors duration-300",
                    role === r.id ? "border-brand bg-brand/8 shadow-sm" : "border-ink/12 bg-white hover:border-brand/50",
                  )}
                >
                  <span className="flex items-baseline gap-4">
                    <span className={cn("font-mono text-xs", "text-brand")}>{r.n}</span>
                    <span className="font-display text-2xl">{r.label}</span>
                  </span>
                  <span className={cn("grid h-6 w-6 place-items-center rounded-full border transition-colors", role === r.id ? "border-brand bg-brand text-white" : "border-ink/20")}>
                    {role === r.id && <Check className="h-3.5 w-3.5" aria-hidden />}
                  </span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={role}
                className="rounded-2xl bg-white p-6 leading-relaxed text-moss shadow-sm"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {current.prompt}
              </motion.p>
            </AnimatePresence>

            <ul className="grid gap-2.5 pt-2">
              {apply.trust.map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm text-moss">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-brand/15 text-brand"><Check className="h-3 w-3" aria-hidden /></span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div id="apply-panel" role="tabpanel" aria-labelledby={`apply-tab-${role}`} className="rounded-3xl border border-ink/10 bg-white p-7 shadow-sm md:p-9">
            {showForm ? (
              <AnimatePresence mode="wait">
                <motion.div key={role} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <ApplyForm role={role} />
                </motion.div>
              </AnimatePresence>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
