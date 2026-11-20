import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Process } from "@/components/sections/Process";
import { Apply } from "@/components/sections/Apply";
import { processIntro } from "@/content/clinical";

export const metadata: Metadata = {
  title: "Process",
  description: processIntro.sub,
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow={processIntro.eyebrow}
        title={<>One source, from first conversation to <em className="text-brand">first shift</em>.</>}
        sub={processIntro.sub}
        crumbs={[{ label: "Process" }]}
      />
      <Process />
      <Apply />
    </>
  );
}
