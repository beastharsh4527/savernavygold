import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { servicesIntro } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description: servicesIntro.sub,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow={servicesIntro.eyebrow}
        title={<>End-to-end workforce <em className="text-brand">mobility</em> for global healthcare.</>}
        sub={servicesIntro.sub}
        crumbs={[{ label: "Services" }]}
      />
      <Services />
      <Process />
    </>
  );
}
