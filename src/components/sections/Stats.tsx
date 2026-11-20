import { stats } from "@/content/home";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Stats() {
  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="container-x grid gap-16">
        <SectionHeading eyebrow={stats.eyebrow} title={stats.title} />
        <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" stagger={0.12}>
          {stats.items.map((s, i) => (
            <div key={s.n} className={`grid gap-3 py-8 sm:px-8 ${i > 0 ? "border-ink/10 sm:border-l" : ""} border-t border-ink/10 sm:border-t-0`}>
              <span className="font-mono text-xs text-brand">{s.n}</span>
              <span className="font-display text-6xl font-light tracking-tight md:text-7xl">
                <Counter value={s.value} suffix={s.suffix} />
              </span>
              <div>
                <p className="font-medium">{s.label}</p>
                <p className="text-sm text-moss">{s.sub}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
