"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { specialties, specialtiesIntro } from "@/content/clinical";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { img } from "@/lib/utils";

/** Light bento grid; the spotlight card swaps to whichever specialty is selected. */
export function Specialties() {
  const [idx, setIdx] = useState(0);
  const spot = specialties[idx];

  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="container-x grid gap-12">
        <SectionHeading eyebrow={specialtiesIntro.eyebrow} title={specialtiesIntro.title} sub={specialtiesIntro.sub} />

        <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
          {/* Spotlight card */}
          <div className="relative min-h-[26rem] overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={spot.name}
                className="absolute inset-x-0 top-0 h-56"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
              >
                <Image src={img(spot.photo, 1100)} alt="" fill sizes="(min-width:1024px) 46vw, 92vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white" />
              </motion.div>
            </AnimatePresence>
            <div className="relative z-[2] flex h-full flex-col justify-end gap-10 p-8 pt-44 md:p-10 md:pt-48">
              <span className="eyebrow text-brand">{specialtiesIntro.spotlightLabel}</span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={spot.name}
                  className="grid gap-5"
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h3 className="font-display text-4xl md:text-5xl">{spot.name}</h3>
                  <p className="max-w-md leading-relaxed text-moss">{spot.bio}</p>
                  <div className="flex flex-wrap gap-x-12 gap-y-4 pt-2">
                    
                    <div>
                      <span className="font-display text-2xl">{spot.markets}</span>
                      <p className="font-mono text-[0.62rem] tracking-[0.2em] text-moss uppercase">{specialtiesIntro.marketsLabel}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Tile grid */}
          <Reveal as="ul" selector="li" stagger={0.04} className="grid grid-cols-2 gap-3" y={20}>
            {specialties.map((s, i) => (
              <li key={s.label}>
                <button
                  type="button"
                  onClick={() => setIdx(i)}
                  onMouseEnter={() => setIdx(i)}
                  aria-pressed={idx === i}
                  className={`w-full rounded-2xl border p-5 text-left transition-colors duration-300 ${
                    idx === i ? "border-brand bg-brand/8 shadow-sm" : "border-ink/10 bg-white hover:border-brand/40"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-sm font-medium md:text-[0.95rem]">{s.label}</span>
                  </span>
                </button>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
