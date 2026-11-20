import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Apply } from "@/components/sections/Apply";
import { apply, type RoleId } from "@/content/contact";

export const metadata: Metadata = {
  title: "Apply",
  description: apply.sub,
  alternates: { canonical: "/apply" },
};

export default async function ApplyPage({ searchParams }: { searchParams: Promise<{ role?: string }> }) {
  const { role } = await searchParams;
  const initial: RoleId = role === "nurse" || role === "employer" ? role : "doctor";
  return (
    <>
      <PageHero
        eyebrow={apply.eyebrow}
        title={<>{apply.title.line1} <em className="text-brand">{apply.title.line2}</em></>}
        sub={apply.sub}
        crumbs={[{ label: "Apply" }]}
      />
      <Apply initialRole={initial} />
    </>
  );
}
