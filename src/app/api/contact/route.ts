import { NextRequest, NextResponse } from "next/server";
import { applySchema, contactSchema, newsletterSchema } from "@/lib/schemas";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const schemas = { contact: contactSchema, apply: applySchema, newsletter: newsletterSchema } as const;

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  if (!checkRateLimit(`contact:${ip}`)) {
    return NextResponse.json({ ok: false, error: "Too many requests — please try again in a minute." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const kind = (body as { kind?: string })?.kind ?? "contact";
  const schema = schemas[kind as keyof typeof schemas] ?? contactSchema;
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Please check the highlighted fields." }, { status: 400 });
  }

  // Honeypot filled → pretend success, send nothing.
  const d = parsed.data as Record<string, string | undefined>;
  if (d.website || d._honey) return NextResponse.json({ ok: true, mode: "demo" });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (apiKey && to) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      const rows = Object.entries(d)
        .filter(([k, v]) => v && !["website", "_honey", "kind"].includes(k))
        .map(([k, v]) => `<tr><td style="padding:6px 12px;color:#4b5f53;text-transform:capitalize">${k}</td><td style="padding:6px 12px"><strong>${String(v).replace(/</g, "&lt;")}</strong></td></tr>`)
        .join("");
      await resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL || "Saver UKBD PLC <onboarding@resend.dev>",
        to,
        replyTo: d.email,
        subject: `[saverukbd.com] New ${kind} submission${d.name ? ` — ${d.name}` : ""}`,
        html: `<table style="font-family:sans-serif;border-collapse:collapse">${rows}</table>`,
      });
      return NextResponse.json({ ok: true, mode: "resend" });
    } catch (err) {
      console.error("[contact] Resend failed:", err);
      return NextResponse.json({ ok: false, error: "Could not send right now — please email info@saverukbd.com." }, { status: 502 });
    }
  }

  // DEMO MODE — keep this console.log; it is the delivery mechanism when no email key is configured.
  console.log(`[DEMO MODE] ${kind} submission:`, JSON.stringify(d, null, 2));
  return NextResponse.json({ ok: true, mode: "demo" });
}
