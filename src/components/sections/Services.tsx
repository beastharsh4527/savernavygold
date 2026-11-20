"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { services, servicesCta, servicesIntro } from "@/content/services";
import { site, tel } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { img } from "@/lib/utils";

function Card({ s }: { s: (typeof services)[number] }) {
  return (
    <Link
      href={`/services/${s.slug}`}
      className="svc-card group relative flex h-[25rem] w-[min(84vw,23rem)] shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-ink/10 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg md:h-[28rem]"
    >
      <div aria-hidden className="absolute inset-x-0 top-0 h-36 opacity-20 transition-opacity duration-500 group-hover:opacity-30">
        <Image src={img(s.photo, 700)} alt="" fill sizes="23rem" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
      </div>
      <div className="relative flex items-start justify-between">
        <span className="font-mono text-sm text-brand">{s.n}</span>
        <span className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink/70 transition-colors duration-500 group-hover:border-brand group-hover:text-brand">
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </span>
      </div>
      <div className="relative grid gap-4">
        <ServiceIcon name={s.icon} className="h-9 w-9 text-brand" />
        <h3 className="font-display text-3xl leading-tight">{s.title}</h3>
        <p className="text-sm leading-relaxed text-moss">{s.desc}</p>
        <ul className="flex flex-wrap gap-2 pt-1">
          {s.tags.map((t) => <li key={t} className="chip text-ink/70">{t}</li>)}
        </ul>
      </div>
    </Link>
  );
}

export function Services() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      // Pinned horizontal scroll ≥768px only; below it the cards swipe natively.
      mm.add("(min-width: 768px)", () => {
        const el = track.current!;
        const tween = gsap.to(el, {
          x: () => -(el.scrollWidth - el.clientWidth),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${el.scrollWidth - el.clientWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        const prog = gsap.to(".svc-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${el.scrollWidth - el.clientWidth}`, scrub: true },
        });
        return () => { tween.scrollTrigger?.kill(); tween.kill(); prog.scrollTrigger?.kill(); prog.kill(); };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <>
      <section ref={root} className="relative overflow-hidden bg-cream py-20 md:flex md:min-h-screen md:flex-col md:justify-center md:py-0">
        <div className="container-x relative z-[2] mb-10 md:mb-14">
          <SectionHeading eyebrow={servicesIntro.eyebrow} title={servicesIntro.title} sub={servicesIntro.sub} />
        </div>
        <div className="relative z-[2] overflow-x-auto pb-4 md:overflow-visible md:pb-0">
          <div ref={track} className="flex gap-5 px-[max(1.25rem,calc((100vw-1360px)/2+1.25rem))] will-change-transform md:pr-[40vw]">
            {services.map((s) => <Card key={s.slug} s={s} />)}
          </div>
        </div>
        <div className="container-x relative z-[2] mt-10 hidden md:block">
          <div className="h-px w-full bg-ink/10">
            <div className="svc-progress h-px origin-left scale-x-0 bg-brand" />
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-cream pb-24">
        <Reveal className="container-x grid gap-8 rounded-3xl py-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="grid gap-4">
            <span className="eyebrow text-brand">{servicesCta.eyebrow}</span>
            <p className="display-md max-w-[20ch]">{servicesCta.title}</p>
            <p className="max-w-xl text-moss">{servicesCta.text}</p>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <ButtonLink href={servicesCta.button.href} variant="primary" size="lg">{servicesCta.button.label}</ButtonLink>
            <span className="text-sm text-moss">{servicesCta.call} <a className="link-underline text-ink" href={tel(site.phoneUk)}>{site.phoneUk}</a></span>
          </div>
        </Reveal>
      </section>
    </>
  );
}
