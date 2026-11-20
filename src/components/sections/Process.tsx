"use client";

import Image from "next/image";
import { useRef } from "react";
import { processIntro, processSteps } from "@/content/clinical";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { img } from "@/lib/utils";

/** Vertical timeline: the SVG spine draws with scroll; steps light up in sequence. */
export function Process() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const path = root.current?.querySelector<SVGPathElement>(".proc-line");
      if (path) {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: { trigger: ".proc-list", start: "top 70%", end: "bottom 60%", scrub: true },
        });
      }
      gsap.utils.toArray<HTMLElement>(".proc-step").forEach((el) => {
        gsap.from(el, {
          y: 60,
          autoAlpha: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        });
        gsap.fromTo(el.querySelector(".proc-dot"), { scale: 0.4, backgroundColor: "#4b5f53" }, {
          scale: 1,
          backgroundColor: "#1f7a3a",
          duration: 0.5,
          scrollTrigger: { trigger: el, start: "top 65%", toggleActions: "play none none reverse" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-paper py-24 md:py-32">
      <div className="container-x grid gap-16">
        <SectionHeading
          eyebrow={processIntro.eyebrow}
          title={processIntro.title}
          sub={processIntro.sub}
          aside={
            <div className="flex gap-10">
              <div>
                <p className="font-mono text-[0.62rem] tracking-[0.2em] text-moss uppercase">{processIntro.journeyLabel}</p>
                <p className="font-display text-5xl">{processIntro.journeyValue}<span className="ml-1 text-xl text-moss">{processIntro.journeyUnit}</span></p>
              </div>
              <div>
                <p className="font-mono text-[0.62rem] tracking-[0.2em] text-moss uppercase">{processIntro.costLabel}</p>
                <p className="font-display text-5xl text-brand">{processIntro.costValue}<span className="ml-1 text-xl text-moss">{processIntro.costUnit}</span></p>
              </div>
            </div>
          }
        />

        <div className="relative">
          {/* Spine */}
          <svg aria-hidden className="absolute top-0 left-5 hidden h-full w-px md:left-1/2 md:block" viewBox="0 0 2 1000" preserveAspectRatio="none">
            <path className="proc-line" d="M1 0 V1000" stroke="var(--color-brand)" strokeWidth="2" fill="none" />
          </svg>

          <ol className="proc-list grid gap-14">
            {processSteps.map((s, i) => (
              <li key={s.n} className={`proc-step relative grid items-center gap-6 md:grid-cols-2 md:gap-16 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <span aria-hidden className="proc-dot absolute top-2 left-5 hidden h-3 w-3 -translate-x-1/2 rounded-full md:left-1/2 md:block" />
                <div className={`grid gap-4 ${i % 2 ? "md:pl-16" : "md:pr-16 md:text-right md:justify-items-end"}`}>
                  <span className="font-mono text-xs tracking-[0.2em] text-brand uppercase">{s.tag}</span>
                  <h3 className="font-display text-3xl md:text-4xl"><span className="mr-3 text-ink/25">{s.n}</span>{s.title}</h3>
                  <p className="max-w-md leading-relaxed text-moss">{s.desc}</p>
                  <p className="font-mono text-[0.7rem] tracking-[0.15em] text-brand uppercase">{s.meta}</p>
                </div>
                <div className={`relative aspect-[16/10] overflow-hidden rounded-3xl ${i % 2 ? "md:pr-16" : "md:pl-16"}`}>
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    <Image src={img(s.photo, 900)} alt="" fill sizes="(min-width:768px) 42vw, 90vw" className="object-cover" />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="justify-self-center">
          <ButtonLink href={processIntro.cta.href} size="lg">{processIntro.cta.label}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
