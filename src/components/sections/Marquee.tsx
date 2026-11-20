import { Plus } from "lucide-react";
import { marquee } from "@/content/home";

/** Single calm marquee row on light ground (client feedback: fewer, quieter animations). */
export function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div aria-hidden className="relative z-[3] overflow-hidden border-y border-ink/10 bg-paper-2 py-6 text-ink/70">
      <div className="flex">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center gap-10 pr-10 motion-reduce:animate-none"
            style={{ animation: "marquee-l 44s linear infinite" }}
          >
            {items.map((m, i) => (
              <span key={i} className="flex items-center gap-10 font-display text-2xl font-light tracking-tight whitespace-nowrap md:text-4xl">
                {m}
                <Plus className="h-4 w-4 text-brand" aria-hidden />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
