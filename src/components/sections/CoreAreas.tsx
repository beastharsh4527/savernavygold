import Image from "next/image";
import Link from "next/link";
import { ServiceIcon } from "@/components/ui/Icon";
import { services, servicesIntro } from "@/content/services";
import { img } from "@/lib/utils";

/** Core areas tile grid: photo tiles with a navy overlay and a label (static, hover only). */
export function CoreAreas() {
  const tiles = services.slice(0, 6);
  return (
    <section className="bg-paper py-20 md:py-24">
      <div className="container-x grid gap-12">
        <div className="grid justify-items-center gap-4 text-center">
          <span className="eyebrow text-brand">{servicesIntro.eyebrow}</span>
          <h2 className="text-4xl md:text-5xl">{servicesIntro.title}</h2>
          <span className="h-px w-24 bg-gold" aria-hidden />
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tiles.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="group relative block h-64 overflow-hidden rounded-xl bg-ink">
                <Image src={img(s.photo, 800)} alt="" fill sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 92vw" className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-4 p-5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-gold bg-ink/70 text-gold">
                    <ServiceIcon name={s.icon} className="h-5 w-5" />
                  </span>
                  <span className="text-lg font-semibold leading-tight text-paper">{s.title}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
