import { z } from "zod";

const base = {
  name: z.string().trim().min(2, "Please enter your full name"),
  email: z.string().trim().email("Please enter a valid email"),
  phone: z.string().trim().max(32).optional().or(z.literal("")),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
  // Honeypots — humans never fill these.
  website: z.string().max(0).optional().or(z.literal("")),
  _honey: z.string().max(0).optional().or(z.literal("")),
};

export const contactSchema = z.object({
  kind: z.literal("contact"),
  ...base,
  role: z.string().trim().min(1, "Please choose an option"),
});

export const applySchema = z.object({
  kind: z.literal("apply"),
  ...base,
  role: z.enum(["doctor", "nurse", "employer"]),
  organisation: z.string().trim().max(200).optional().or(z.literal("")),
  specialty: z.string().trim().max(120).optional().or(z.literal("")),
  market: z.string().trim().max(60).optional().or(z.literal("")),
  experience: z.string().trim().max(60).optional().or(z.literal("")),
});

export const newsletterSchema = z.object({
  kind: z.literal("newsletter"),
  email: base.email,
  website: base.website,
  _honey: base._honey,
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ApplyInput = z.infer<typeof applySchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
