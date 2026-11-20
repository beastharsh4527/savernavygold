import { Building2, Globe, GraduationCap, Handshake, ShieldCheck } from "lucide-react";

const items = [
  { icon: Globe, title: "Global presence", sub: "5 regions · Europe, USA, Canada, NZ, Australia" },
  { icon: ShieldCheck, title: "Expert screening", sub: "Vetted & compliant candidates" },
  { icon: GraduationCap, title: "Online training", sub: "Courses in every region we serve" },
  { icon: Building2, title: "Franchise support", sub: "30+ locations across the UK" },
  { icon: Handshake, title: "Partnerships", sub: "Care homes, hospitals & practices" },
] as const;

/** Static strip of five value points (no animation). */
export function Highlights() {
  return (
    <section className="border-b border-ink/10 bg-cream">
      <div className="container-x grid gap-px sm:grid-cols-2 lg:grid-cols-5">
        {items.map(({ icon: Icon, title, sub }) => (
          <div key={title} className="flex items-center gap-4 py-7 sm:px-6 lg:border-r lg:border-ink/10 lg:last:border-r-0">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="font-semibold text-ink">{title}</p>
              <p className="text-sm text-moss">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
