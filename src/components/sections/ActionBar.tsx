import Link from "next/link";
import { Briefcase, Building2, FileText, GraduationCap, Mail } from "lucide-react";

const actions = [
  { icon: Briefcase, title: "Find a placement", sub: "For healthcare professionals", href: "/contact" },
  { icon: FileText, title: "Hire healthcare staff", sub: "Vetted, compliant candidates", href: "/contact" },
  { icon: Building2, title: "Franchise partner", sub: "Franchise to partner only", href: "/contact" },
  { icon: GraduationCap, title: "Study abroad", sub: "Search 619 universities", href: "/services/study-abroad" },
] as const;

/** Bottom action bar: four routes plus one gold enquiry button. */
export function ActionBar() {
  return (
    <section className="bg-ink text-paper">
      <div className="container-x grid gap-6 py-10 lg:grid-cols-[1fr_auto] lg:items-center">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map(({ icon: Icon, title, sub, href }) => (
            <li key={title}>
              <Link href={href} className="group flex items-center gap-4">
                <Icon className="h-7 w-7 shrink-0 text-gold" aria-hidden />
                <span>
                  <span className="block font-semibold group-hover:text-gold">{title}</span>
                  <span className="block text-sm text-fog">{sub}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-md bg-gold px-7 py-4 font-semibold text-ink transition-colors hover:bg-gold-soft">
          <Mail className="h-4 w-4" aria-hidden /> Enquire now
        </Link>
      </div>
    </section>
  );
}
