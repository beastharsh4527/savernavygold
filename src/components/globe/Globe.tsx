"use client";

import dynamic from "next/dynamic";
import { useMediaQuery, useReducedMotion } from "@/hooks/useReducedMotion";

const GlobeScene = dynamic(() => import("./GlobeScene"), {
  ssr: false,
  loading: () => <Fallback />,
});

function Fallback() {
  // Static vector globe for mobile / reduced-motion / while loading.
  return (
    <div className="grid h-full w-full place-items-center" aria-hidden>
      <svg viewBox="0 0 400 400" className="h-full max-h-[460px] w-full max-w-[460px] opacity-90">
        <defs>
          <radialGradient id="gb" cx="38%" cy="32%">
            <stop offset="0%" stopColor="#183126" />
            <stop offset="100%" stopColor="#0b1811" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="150" fill="url(#gb)" stroke="#5fd69a" strokeOpacity=".25" />
        {[...Array(5)].map((_, i) => (
          <ellipse key={i} cx="200" cy="200" rx={150} ry={150 - i * 34} fill="none" stroke="#5fd69a" strokeOpacity=".14" />
        ))}
        {[...Array(5)].map((_, i) => (
          <ellipse key={`v${i}`} cx="200" cy="200" rx={150 - i * 34} ry={150} fill="none" stroke="#5fd69a" strokeOpacity=".14" />
        ))}
        <path d="M290 235 Q 200 60 112 140" fill="none" stroke="#c9a46a" strokeWidth="1.6" strokeDasharray="6 5" />
        <path d="M290 235 Q 170 40 84 185" fill="none" stroke="#c9a46a" strokeWidth="1.6" strokeDasharray="6 5" />
        <circle cx="290" cy="235" r="7" fill="#ffd27f" />
        <circle cx="112" cy="140" r="5" fill="#a8ebc6" />
        <circle cx="84" cy="185" r="5" fill="#a8ebc6" />
      </svg>
    </div>
  );
}

export function Globe() {
  const reduce = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 768px)", false);
  if (reduce || !desktop) return <Fallback />;
  return <GlobeScene />;
}
