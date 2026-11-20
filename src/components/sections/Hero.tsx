"use client";

import { ArrowRight, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { hero } from "@/content/home";
import { site, tel } from "@/content/site";
import { Globe } from "@/components/globe/Globe";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/** Navy hero with gold accents. One short entrance timeline, no cursor effects. */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.timeline({ delay: 0.1 })
        .from(".hero-stagger", { y: 20, autoAlpha: 0, duration: 0.7, stagger: 0.08, ease: "power2.out" }, 0)
        .from(".hero-visual", { y: 24, autoAlpha: 0, duration: 0.9, ease: "power2.out" }, 0.2);
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-ink text-paper">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)]" />

      <div className="container-x relative z-[2] grid gap-12 pt-16 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-24 lg:pb-28">
        <div className="grid max-w-2xl content-center gap-6">
          <span className="hero-stagger font-mono text-[0.72rem] tracking-[0.24em] text-gold uppercase">{site.name}</span>

          <h1 className="hero-stagger text-[clamp(2.6rem,5vw,4.6rem)] leading-[1.06] text-paper">
            {hero.title.before} <em className="font-display text-gold italic">{hero.title.em}</em>
            {hero.title.after}
          </h1>

          <p className="hero-stagger max-w-xl text-lg leading-relaxed text-paper/80">{hero.lede}</p>

          <div className="hero-stagger flex flex-wrap items-center gap-4 pt-2">
            <Link
              href={hero.primary.href}
              className="inline-flex items-center gap-2 rounded-md bg-gold px-7 py-4 font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5 hover:bg-gold-soft"
            >
              {hero.primary.label} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href={hero.secondary.href}
              className="inline-flex items-center gap-2 rounded-md border border-paper/40 px-7 py-4 font-semibold text-paper transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              {hero.secondary.label}
            </Link>
          </div>
        </div>

        <div className="hero-visual relative">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gold/30 bg-ink-2 shadow-2xl">
            <Globe />
            <span className="absolute top-4 left-4 rounded-md bg-ink/80 px-3 py-1.5 font-mono text-[0.68rem] tracking-[0.18em] text-gold uppercase">
              {hero.sticker.top} · {hero.sticker.bottom}
            </span>
          </div>

          <div className="absolute right-4 -bottom-8 left-4 grid gap-3 rounded-xl bg-paper p-5 text-ink shadow-xl md:left-auto md:w-[21rem]">
            <span className="font-mono text-[0.65rem] tracking-[0.22em] text-brand uppercase">{hero.card.tag}</span>
            <p className="font-display text-xl leading-snug">{hero.card.title}</p>
            <div className="grid gap-2 text-sm">
              <a href={tel(site.phoneUk)} className="flex items-center justify-between gap-2 hover:text-brand">
                <span className="flex items-center gap-2 text-moss"><Phone className="h-3.5 w-3.5" aria-hidden />{hero.card.ukLabel}</span>
                {site.phoneUk}
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center justify-between gap-2 hover:text-brand">
                <span className="flex items-center gap-2 text-moss"><Mail className="h-3.5 w-3.5" aria-hidden />{hero.card.emailLabel}</span>
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
