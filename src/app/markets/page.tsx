import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Markets } from "@/components/sections/Markets";
import { Process } from "@/components/sections/Process";
import { marketsIntro } from "@/content/clinical";

export const metadata: Metadata = {
  title: "Markets",
  description: marketsIntro.sub,
  alternates: { canonical: "/markets" },
};

export default function MarketsPage() {
  return (
    <>
      <PageHero
        eyebrow={marketsIntro.eyebrow}
        title={<>Trusted routes into three leading <em className="text-brand">healthcare systems</em>.</>}
        sub={marketsIntro.sub}
        crumbs={[{ label: "Markets" }]}
      />
      <Markets />
      <Process />
    </>
  );
}
