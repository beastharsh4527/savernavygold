"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowUp } from "lucide-react";
import { footer, offices } from "@/content/contact";
import { site, tel } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { useLiveClock } from "@/hooks/useLiveClock";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useLenis } from "@/components/providers/SmoothScroll";

function Clock({ city, tz, label }: { city: string; tz: string; label: string }) {
  const c = useLiveClock(tz);
  return (
    <div className="grid gap-1">
      <span className="font-mono text-[0.68rem] tracking-[0.2em] text-fog uppercase">{city}</span>
      <span className="font-display text-4xl font-light tabular-nums text-paper" suppressHydrationWarning>{c?.time ?? "--:--"}</span>
      <span className="text-xs text-fog">{c ? `${c.zone} · ${label}` : label}</span>
    </div>
  );
}

export function Footer() {
  const root = useRef<HTMLElement>(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".wm-letter", {
        yPercent: 105,
        stagger: 0.06,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: ".wm", start: "top 95%", once: true },
      });
    },
    { scope: root },
  );

  const toTop = () => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" }));

  return (
    <footer ref={root} className="grain relative overflow-hidden bg-ink text-paper">
      {/* Clocks */}
      <div className="container-x relative z-[2] border-b border-white/10 py-12">
        <div className="mb-8 flex items-center gap-3 font-mono text-[0.68rem] tracking-[0.2em] text-mint uppercase">
          <span className="pulse-dot h-2 w-2 rounded-full bg-mint" />
          {footer.liveLabel}
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {offices.map((o) => <Clock key={o.id} city={o.city} tz={o.tz} label={o.clockLabel} />)}
        </div>
      </div>

      {/* Columns */}
      <div className="container-x relative z-[2] grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div className="grid content-start gap-6">
          <Logo light size={64} />
          <p className="max-w-sm text-fog">{footer.description}</p>
          <ul className="flex flex-wrap gap-2">
            {footer.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} aria-label={s.label} className="chip text-paper/80 hover:border-mint hover:text-mint">{s.label}</a>
              </li>
            ))}
          </ul>
        </div>
        {footer.columns.map((col) => (
          <div key={col.title} className="grid content-start gap-4">
            <span className="font-mono text-[0.68rem] tracking-[0.2em] text-fog uppercase">{col.title}</span>
            <ul className="grid gap-2.5">
              {col.links.map((l) => (
                <li key={l.label}><Link href={l.href} className="link-underline text-paper/85 hover:text-paper">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
        <div className="grid content-start gap-4">
          <span className="font-mono text-[0.68rem] tracking-[0.2em] text-fog uppercase">{footer.getInTouch}</span>
          <ul className="grid gap-2.5">
            <li><a className="link-underline" href={tel(site.phoneUk)}>{site.phoneUk}</a></li>
            <li><a className="link-underline" href={tel(site.whatsapp)}>WhatsApp {site.whatsapp}</a></li>
            <li><a className="link-underline text-mint" href={`mailto:${site.email}`}>{site.email}</a></li>
          </ul>
        </div>
      </div>

      {/* Wordmark */}
      <div className="wm relative z-[2] overflow-hidden px-2" aria-hidden>
        <div className="flex justify-center font-display leading-[0.78] font-light tracking-[-0.04em] text-[clamp(6rem,27vw,26rem)]">
          {footer.wordmark.split("").map((ch, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <span className="wm-letter inline-block bg-gradient-to-b from-paper to-paper/10 bg-clip-text text-transparent">{ch}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="container-x relative z-[2] flex flex-col gap-4 border-t border-white/10 py-6 text-xs text-fog md:flex-row md:items-center md:justify-between">
        <p>
          {footer.credit}
        </p>
        <p className="font-mono tracking-[0.12em] uppercase">{footer.tagline}</p>
        <button onClick={toTop} className="flex items-center gap-2 self-start text-paper hover:text-mint md:self-auto" aria-label="Back to top">
          <ArrowUp className="h-4 w-4" aria-hidden /> Top
        </button>
      </div>
    </footer>
  );
}
