import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { markets, processSteps } from "@/content/clinical";
import { offices } from "@/content/contact";
import { img } from "@/lib/utils";

export function generateStaticParams() {
  return markets.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const m = markets.find((x) => x.slug === slug);
  if (!m) return {};
  return { title: `${m.country} route`, description: m.desc, alternates: { canonical: `/markets/${m.slug}` } };
}

export default async function MarketPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const m = markets.find((x) => x.slug === slug);
  if (!m) notFound();
  const office = offices.find((o) => o.city === m.office);

  return (
    <>
      <PageHero
        eyebrow={`${m.n} · ${m.badge}`}
        title={<>{m.country}: <em className="text-brand">{m.title.toLowerCase()}</em></>}
        sub={m.desc}
        crumbs={[{ label: "Markets", href: "/markets" }, { label: m.country }]}
      >
        <ul className="flex flex-wrap gap-2">
          {m.tags.map((t) => <li key={t} className="chip border-mint/40 text-brand">{t}</li>)}
        </ul>
      </PageHero>

      <section className="bg-paper py-24">
        <div className="container-x grid gap-14">
          <Reveal className="grid gap-6 sm:grid-cols-3">
            {m.stats.map((s) => (
              <div key={s.label} className="rounded-3xl bg-cream p-8">
                <span className="font-display text-6xl text-brand"><Counter value={s.value} prefix={s.prefix} suffix={s.suffix} /></span>
                <p className="mt-2 font-mono text-[0.65rem] tracking-[0.2em] text-moss uppercase">{s.label}</p>
              </div>
            ))}
          </Reveal>

          <div className="grid items-start gap-10 lg:grid-cols-[1fr_0.8fr]">
            <Reveal className="grid gap-6">
              <h2 className="display-md">The route, step by step.</h2>
              <ol className="grid gap-4">
                {processSteps.map((p) => (
                  <li key={p.n} className="flex gap-5 rounded-2xl border border-ink/10 p-6">
                    <span className="font-mono text-sm text-brand">{p.n}</span>
                    <div>
                      <p className="font-display text-xl">{p.title}</p>
                      <p className="mt-1 text-sm text-moss">{p.desc}</p>
                      <p className="mt-2 font-mono text-[0.65rem] tracking-[0.15em] text-brand uppercase">{p.meta}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <ButtonLink href="/apply" size="lg" className="justify-self-start">Begin Your Journey</ButtonLink>
            </Reveal>
            <div className="grid gap-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image src={img(m.photo, 1000)} alt={m.country} fill sizes="(min-width:1024px) 36vw, 90vw" className="object-cover" />
              </div>
              {office && (
                <div className="grid gap-2 rounded-3xl bg-ink p-7 text-paper">
                  <span className="font-mono text-[0.65rem] tracking-[0.2em] text-brand uppercase">{office.tag} office</span>
                  <p className="font-display text-2xl">{office.region}</p>
                  <address className="text-sm text-fog not-italic">{office.address[0]}, {office.address[1]}</address>
                  <p className="text-sm">{office.lines[0].label}: <span className="text-brand">{office.lines[0].value}</span></p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
