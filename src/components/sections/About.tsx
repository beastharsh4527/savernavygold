"use client";

import Image from "next/image";
import { ArrowUpRight, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { about } from "@/content/home";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { img } from "@/lib/utils";

export function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // Parallax drift on the photo mosaic.
      gsap.utils.toArray<HTMLElement>(".about-ph").forEach((el, i) => {
        gsap.fromTo(el, { yPercent: i % 2 ? 6 : -4 }, {
          yPercent: i % 2 ? -8 : 6,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1.2 },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="about-section" className="overflow-hidden bg-cream py-24 md:py-36">
      <div className="container-x grid items-center gap-16 lg:grid-cols-[0.95fr_1.05fr]">
        {/* Mosaic */}
        <div className="relative grid grid-cols-[1.2fr_1fr] gap-4">
          <div className="about-ph relative aspect-[3/4] overflow-hidden rounded-3xl">
            <Image src={img(about.photos[0], 900)} alt="Clinicians at work in a hospital setting" fill sizes="(min-width:1024px) 28vw, 60vw" className="object-cover" />
          </div>
          <div className="grid gap-4">
            <div className="about-ph relative aspect-square overflow-hidden rounded-3xl">
              <Image src={img(about.photos[1], 600)} alt="A nurse preparing for a shift" fill sizes="(min-width:1024px) 20vw, 40vw" className="object-cover" />
            </div>
            <div className="about-ph relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Image src={img(about.photos[2], 600)} alt="A doctor consulting with colleagues" fill sizes="(min-width:1024px) 20vw, 40vw" className="object-cover" />
            </div>
          </div>

          <div className="absolute top-6 -left-3 grid h-24 w-24 place-items-center md:-left-6">
            <svg viewBox="0 0 100 100" className="h-full w-full text-brand" aria-hidden>
              <defs><path id="circ2" d="M 50 50 m -36 0 a 36 36 0 1 1 72 0 a 36 36 0 1 1 -72 0" /></defs>
              <circle cx="50" cy="50" r="49" className="fill-paper" />
              <text className="font-mono fill-current text-[10px] tracking-[0.2em] uppercase">
                <textPath href="#circ2">{about.badges.trust} · {about.badges.bridge} · </textPath>
              </text>
              <text x="50" y="47" textAnchor="middle" className="font-mono fill-current text-[11px]">{about.badges.est}</text>
              <text x="50" y="62" textAnchor="middle" className="font-display fill-current text-[16px]">{about.badges.year}</text>
            </svg>
          </div>

          <Reveal className="absolute -bottom-5 left-8">
            <div className="flex items-center gap-4 rounded-2xl bg-ink px-6 py-4 text-paper shadow-2xl">
              <span className="font-display text-4xl text-mint">{about.badges.continents}</span>
              <span className="font-mono text-[0.62rem] leading-tight tracking-[0.18em] uppercase">{about.badges.continentsLabel}</span>
            </div>
          </Reveal>
        </div>

        {/* Copy */}
        <div className="grid gap-8">
          <span className="eyebrow text-brand">{about.eyebrow}</span>
          <SplitReveal className="display-lg">{about.title}</SplitReveal>
          <Reveal className="grid gap-6">
            <p className="text-lg leading-relaxed text-moss">{about.p1}</p>
            <blockquote className="border-l-2 border-gold pl-6 font-display text-2xl leading-snug italic">&ldquo;{about.quote}&rdquo;</blockquote>
            <p className="leading-relaxed text-moss">{about.p2}</p>

            <div className="flex flex-wrap gap-x-10 gap-y-4 border-y border-ink/10 py-6">
              {about.stats.map((s) => (
                <div key={s.label}>
                  <span className="font-display text-4xl"><Counter value={s.value} suffix={s.suffix} /></span>
                  <p className="font-mono text-[0.65rem] tracking-[0.18em] text-moss uppercase">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {about.pillars.map((p, i) => (
                <div key={p.title} className="grid content-start gap-3 rounded-2xl bg-paper-2/70 p-6">
                  {i === 0 ? <ShieldCheck className="h-6 w-6 text-brand" aria-hidden /> : <Users className="h-6 w-6 text-brand" aria-hidden />}
                  <h3 className="font-sans text-base font-semibold">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-moss">{p.text}</p>
                </div>
              ))}
            </div>

            <Link href={about.link.href} className="group flex items-center gap-2 font-medium text-brand">
              <span className="link-underline">{about.link.label}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
