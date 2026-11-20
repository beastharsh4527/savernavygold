import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Specialties } from "@/components/sections/Specialties";
import { Markets } from "@/components/sections/Markets";
import { specialtiesIntro } from "@/content/clinical";

export const metadata: Metadata = {
  title: "Specialties",
  description: specialtiesIntro.sub,
  alternates: { canonical: "/specialties" },
};

export default function SpecialtiesPage() {
  return (
    <>
      <PageHero
        eyebrow={specialtiesIntro.eyebrow}
        title={<>Specialties we recruit &amp; <em className="text-brand">deploy</em> across.</>}
        sub={specialtiesIntro.sub}
        crumbs={[{ label: "Specialties" }]}
      />
      <Specialties />
      <Markets />
    </>
  );
}
