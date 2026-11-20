import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { About } from "@/components/sections/About";
import { Stats } from "@/components/sections/Stats";
import { Philosophy } from "@/components/sections/Philosophy";
import { about } from "@/content/home";

export const metadata: Metadata = {
  title: "About",
  description: about.p1,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={about.eyebrow}
        title={<>Bridging <em className="text-brand">talent</em> &amp; need.</>}
        sub={about.p1}
        crumbs={[{ label: "About" }]}
      />
      <About />
      <Stats />
      <Philosophy />
    </>
  );
}
