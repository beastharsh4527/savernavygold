"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { contactForm } from "@/content/contact";
import { contactSchema, type ContactInput } from "@/lib/schemas";
import { Button } from "@/components/ui/Button";
import { Field, Honeypots, SuccessCheck, inputCls, submitForm } from "./fields";

export function ContactForm() {
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting }, setFocus } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { kind: "contact", role: "" },
  });

  const onSubmit = handleSubmit(
    async (data) => {
      setServerError("");
      const res = await submitForm(data);
      if (res.ok) setDone(true);
      else setServerError(res.error ?? "Something went wrong.");
    },
    (errs) => {
      const first = Object.keys(errs)[0] as keyof ContactInput | undefined;
      if (first) setFocus(first);
    },
  );

  if (done) return <SuccessCheck title="Enquiry sent." note="Our team will get back to you." />;

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-5">
      <Honeypots register={(n) => register(n)} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="c-name" label={contactForm.fields.name} error={errors.name?.message}>
          <input id="c-name" className={inputCls} autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "c-name-error" : undefined} {...register("name")} />
        </Field>
        <Field id="c-email" label={contactForm.fields.email} error={errors.email?.message}>
          <input id="c-email" type="email" className={inputCls} autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "c-email-error" : undefined} {...register("email")} />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="c-phone" label={contactForm.fields.phone} error={errors.phone?.message}>
          <input id="c-phone" type="tel" className={inputCls} autoComplete="tel" {...register("phone")} />
        </Field>
        <Field id="c-role" label={contactForm.fields.role} error={errors.role?.message}>
          <select id="c-role" className={inputCls + " appearance-none"} aria-invalid={!!errors.role} aria-describedby={errors.role ? "c-role-error" : undefined} defaultValue="" {...register("role")}>
            <option value="" disabled>Select…</option>
            {contactForm.roles.map((r) => <option key={r} value={r} className="text-ink">{r}</option>)}
          </select>
        </Field>
      </div>
      <Field id="c-message" label={contactForm.fields.message} error={errors.message?.message}>
        <textarea id="c-message" rows={4} className={inputCls + " h-auto py-3"} {...register("message")} />
      </Field>
      {serverError && <p role="alert" className="text-sm text-red-400">{serverError}</p>}
      <div className="flex flex-wrap items-center gap-5">
        <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : contactForm.submit}
        </Button>
        <p className="text-xs opacity-60">{contactForm.note}</p>
      </div>
    </form>
  );
}
