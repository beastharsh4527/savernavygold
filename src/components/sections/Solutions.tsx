"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { solutions, solutionsIntro } from "@/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { img } from "@/lib/utils";

export function Solutions({ staticLayout = false }: { staticLayout?: boolean }) {
  const [active, setActive] = useState<(typeof solutions)[number]["id"]>("candidates");
  const current = solutions.find((s) => s.id === active)!;

  if (staticLayout) {
    // /solutions page: both tracks in full, deep-linkable.
    return (
      <div className="grid gap-16">
        {solutions.map((s) => <Panel key={s.id} s={s} id={s.id} />)}
      </div>
    );
  }

  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="container-x grid gap-12">
        <SectionHeading eyebrow={solutionsIntro.eyebrow} title={solutionsIntro.title} sub={solutionsIntro.sub} />

        <div className="flex justify-center">
          <div role="tablist" aria-label="Solutions" className="relative flex rounded-full border border-ink/15 bg-cream p-1.5">
            {solutions.map((s) => (
              <button
                key={s.id}
                role="tab"
                id={`sol-tab-${s.id}`}
                aria-selected={active === s.id}
                aria-controls={`sol-panel-${s.id}`}
                onClick={() => setActive(s.id)}
                className={`relative rounded-full px-6 py-3 text-sm font-medium transition-colors md:px-9 ${active === s.id ? "text-white" : "text-ink/60 hover:text-ink"}`}
              >
                {active === s.id && (
                  <motion.span layoutId="sol-pill" className="absolute inset-0 rounded-full bg-brand" transition={{ type: "spring", stiffness: 360, damping: 32 }} />
                )}
                <span className="relative">{s.tab}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            role="tabpanel"
            id={`sol-panel-${current.id}`}
            aria-labelledby={`sol-tab-${current.id}`}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <Panel s={current} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function Panel({ s, id }: { s: (typeof solutions)[number]; id?: string }) {
  return (
    <div id={id} className="grid scroll-mt-28 items-stretch gap-6 lg:grid-cols-[1fr_0.85fr]">
      <div className="grid content-between gap-10 rounded-3xl border border-ink/10 bg-white p-8 shadow-sm md:p-12">
        <div className="grid gap-5">
          <span className="font-mono text-sm text-brand">{s.n}</span>
          <h3 className="font-display text-3xl leading-tight md:text-4xl">{s.title}</h3>
          <p className="max-w-xl leading-relaxed text-moss">{s.text}</p>
          <ul className="grid gap-3 pt-2 sm:grid-cols-2">
            {s.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-ink/80">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand/12 text-brand"><Check className="h-3 w-3" aria-hidden /></span>
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex gap-10">
            {s.stats.map((st) => (
              <div key={st.label}>
                <span className="font-display text-4xl text-brand md:text-5xl">{st.value}</span>
                <p className="font-mono text-[0.62rem] tracking-[0.18em] text-moss uppercase">{st.label}</p>
              </div>
            ))}
          </div>
          <ButtonLink href={s.cta.href} variant="primary">{s.cta.label}</ButtonLink>
        </div>
      </div>
      <div className="relative min-h-[18rem] overflow-hidden rounded-3xl">
        <Image src={img(s.photo, 1000)} alt="" fill sizes="(min-width:1024px) 40vw, 90vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/35 to-transparent" />
        <span className="absolute bottom-5 left-5 chip border-white/40 bg-ink/40 text-paper backdrop-blur">{s.tab}</span>
      </div>
    </div>
  );
}
