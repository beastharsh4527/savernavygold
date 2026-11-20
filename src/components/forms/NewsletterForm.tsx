"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { newsletterSchema, type NewsletterInput } from "@/lib/schemas";
import { Honeypots, submitForm } from "./fields";

export function NewsletterForm() {
  const [done, setDone] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { kind: "newsletter" },
  });

  const onSubmit = handleSubmit(async (data) => {
    const res = await submitForm(data);
    if (res.ok) setDone(true);
  });

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {done ? (
          <motion.p
            key="ok"
            role="status"
            className="flex h-14 items-center gap-3 text-mint"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <Check className="h-5 w-5" aria-hidden /> You&rsquo;re on the list.
          </motion.p>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} noValidate className="relative" exit={{ y: -14, opacity: 0 }}>
            <Honeypots register={(n) => register(n)} />
            <label htmlFor="nl-email" className="sr-only">Email address</label>
            <input
              id="nl-email"
              type="email"
              placeholder="Your email address"
              autoComplete="email"
              aria-invalid={!!errors.email}
              className="h-14 w-full rounded-full border border-white/15 bg-white/[0.04] pr-16 pl-6 text-paper outline-none transition-colors placeholder:text-fog/60 focus:border-mint"
              {...register("email")}
            />
            <button
              type="submit"
              aria-label="Subscribe"
              disabled={isSubmitting}
              className="absolute top-2 right-2 grid h-10 w-10 place-items-center rounded-full bg-mint text-ink transition-transform hover:scale-105 disabled:opacity-60"
            >
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
            {errors.email && <p role="alert" className="mt-2 pl-4 text-xs text-red-400">{errors.email.message}</p>}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
