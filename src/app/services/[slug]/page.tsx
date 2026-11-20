import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { ServiceIcon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { services, servicesCta } from "@/content/services";
import { processSteps, markets } from "@/content/clinical";
import { site, tel } from "@/content/site";
import { img } from "@/lib/utils";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  return { title: s.title, description: s.desc, alternates: { canonical: `/services/${s.slug}` } };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = services.findIndex((x) => x.slug === slug);
  if (idx === -1) notFound();
  const s = services[idx];
  const prev = services[(idx - 1 + services.length) % services.length];
  const next = services[(idx + 1) % services.length];

  return (
    <>
      <PageHero
        eyebrow={`Service ${s.n} / 07`}
        title={s.title}
        sub={s.desc}
        crumbs={[{ label: "Services", href: "/services" }, { label: s.title }]}
      >
        <ul className="flex flex-wrap gap-2">
          {s.tags.map((t) => <li key={t} className="chip border-mint/40 text-brand">{t}</li>)}
        </ul>
      </PageHero>

      <section className="bg-paper py-24">
        <div className="container-x grid gap-16 lg:grid-cols-[1fr_0.9fr]">
          <Reveal className="grid content-start gap-8">
            <ServiceIcon name={s.icon} className="h-12 w-12 text-brand" />
            <h2 className="display-md">How Saver delivers {s.title.toLowerCase()}.</h2>
            <p className="text-lg leading-relaxed text-moss">{s.desc}</p>
            <ul className="grid gap-3">
              {processSteps.map((p) => (
                <li key={p.n} className="flex items-start gap-4 rounded-2xl bg-cream p-5">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand/15 text-brand"><Check className="h-3.5 w-3.5" aria-hidden /></span>
                  <div>
                    <p className="font-medium">{p.title}</p>
                    <p className="text-sm text-moss">{p.meta}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <ButtonLink href="/apply" size="lg">{servicesCta.button.label}</ButtonLink>
              <span className="text-sm text-moss">{servicesCta.call} <a className="link-underline text-ink" href={tel(site.phoneUk)}>{site.phoneUk}</a></span>
            </div>
          </Reveal>
          <div className="grid content-start gap-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Image src={img(s.photo, 1000)} alt={s.title} fill sizes="(min-width:1024px) 40vw, 90vw" className="object-cover" />
            </div>
            <div className="grid gap-3 rounded-3xl bg-ink p-7 text-paper">
              <span className="font-mono text-[0.65rem] tracking-[0.2em] text-brand uppercase">Where we place</span>
              <ul className="grid gap-2">
                {markets.map((m) => (
                  <li key={m.slug}>
                    <Link href={`/markets/${m.slug}`} className="link-underline flex justify-between text-paper/85 hover:text-brand">
                      <span>{m.country}</span><span className="text-fog">{m.cta}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <nav aria-label="More services" className="border-t border-ink/10 bg-paper pb-20">
        <div className="container-x grid gap-4 pt-10 sm:grid-cols-2">
          <Link href={`/services/${prev.slug}`} className="group flex items-center gap-4 rounded-2xl border border-ink/10 p-6 transition-colors hover:border-brand">
            <ArrowLeft className="h-5 w-5 text-brand transition-transform group-hover:-translate-x-1" aria-hidden />
            <div><p className="font-mono text-[0.62rem] tracking-[0.18em] text-moss uppercase">Previous</p><p className="font-display text-xl">{prev.title}</p></div>
          </Link>
          <Link href={`/services/${next.slug}`} className="group flex items-center justify-end gap-4 rounded-2xl border border-ink/10 p-6 text-right transition-colors hover:border-brand">
            <div><p className="font-mono text-[0.62rem] tracking-[0.18em] text-moss uppercase">Next</p><p className="font-display text-xl">{next.title}</p></div>
            <ArrowRight className="h-5 w-5 text-brand transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </nav>
    </>
  );
}
