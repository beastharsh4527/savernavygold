import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Solutions } from "@/components/sections/Solutions";
import { solutionsIntro } from "@/content/services";

export const metadata: Metadata = {
  title: "Solutions",
  description: solutionsIntro.sub,
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow={solutionsIntro.eyebrow}
        title={<>Tailored solutions for <em className="text-brand">candidates</em> and <em className="text-brand">employers</em>.</>}
        sub={solutionsIntro.sub}
        crumbs={[{ label: "Solutions" }]}
      />
      <section className="bg-paper py-24">
        <div className="container-x">
          <Solutions staticLayout />
        </div>
      </section>
    </>
  );
}
