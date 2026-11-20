"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { RoleId } from "@/content/contact";
import { applySchema, type ApplyInput } from "@/lib/schemas";
import { Button } from "@/components/ui/Button";
import { Field, Honeypots, SuccessCheck, inputCls, submitForm } from "./fields";

const MARKETS = ["United Kingdom", "United States", "Canada", "Flexible / advise me"];
const EXPERIENCE = ["0–2 years", "3–5 years", "6–10 years", "10+ years"];

export function ApplyForm({ role }: { role: RoleId }) {
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState("");
  const employer = role === "employer";
  const { register, handleSubmit, formState: { errors, isSubmitting }, setFocus } = useForm<ApplyInput>({
    resolver: zodResolver(applySchema),
    defaultValues: { kind: "apply", role },
  });

  const onSubmit = handleSubmit(
    async (data) => {
      setServerError("");
      const res = await submitForm({ ...data, role });
      if (res.ok) setDone(true);
      else setServerError(res.error ?? "Something went wrong.");
    },
    (errs) => {
      const first = Object.keys(errs)[0] as keyof ApplyInput | undefined;
      if (first) setFocus(first);
    },
  );

  if (done) return <SuccessCheck title="Application received." note="Thank you. Our team will be in touch." />;

  const id = (f: string) => `a-${role}-${f}`;

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-5">
      <Honeypots register={(n) => register(n)} />
      <input type="hidden" value={role} {...register("role")} />

      {employer && (
        <Field id={id("org")} label="Organisation name" error={errors.organisation?.message}>
          <input id={id("org")} className={inputCls} autoComplete="organization" {...register("organisation")} />
        </Field>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={id("name")} label={employer ? "Contact name" : "Full name"} error={errors.name?.message}>
          <input id={id("name")} className={inputCls} autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? id("name") + "-error" : undefined} {...register("name")} />
        </Field>
        <Field id={id("email")} label="Email" error={errors.email?.message}>
          <input id={id("email")} type="email" className={inputCls} autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? id("email") + "-error" : undefined} {...register("email")} />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={id("phone")} label="Phone" error={errors.phone?.message}>
          <input id={id("phone")} type="tel" className={inputCls} autoComplete="tel" {...register("phone")} />
        </Field>
        {!employer ? (
          <Field id={id("market")} label="Destination market" error={errors.market?.message}>
            <select id={id("market")} className={inputCls + " appearance-none"} defaultValue="" {...register("market")}>
              <option value="" disabled>Select…</option>
              {MARKETS.map((m) => <option key={m} value={m} className="text-ink">{m}</option>)}
            </select>
          </Field>
        ) : (
          <Field id={id("market")} label="Country" error={errors.market?.message}>
            <select id={id("market")} className={inputCls + " appearance-none"} defaultValue="" {...register("market")}>
              <option value="" disabled>Select…</option>
              {MARKETS.slice(0, 3).map((m) => <option key={m} value={m} className="text-ink">{m}</option>)}
            </select>
          </Field>
        )}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {!employer ? (
          <>
            <Field id={id("spec")} label={role === "nurse" ? "Nursing specialty" : "Specialty"} error={errors.specialty?.message}>
              <input id={id("spec")} className={inputCls} {...register("specialty")} />
            </Field>
            <Field id={id("exp")} label="Years of experience" error={errors.experience?.message}>
              <select id={id("exp")} className={inputCls + " appearance-none"} defaultValue="" {...register("experience")}>
                <option value="" disabled>Select…</option>
                {EXPERIENCE.map((e) => <option key={e} value={e} className="text-ink">{e}</option>)}
              </select>
            </Field>
          </>
        ) : (
          <Field id={id("spec")} label="Positions needed" className="sm:col-span-2" error={errors.specialty?.message}>
            <input id={id("spec")} className={inputCls} placeholder="e.g. 12 ICU nurses, 2 cardiologists" {...register("specialty")} />
          </Field>
        )}
      </div>
      <Field id={id("msg")} label="Message" error={errors.message?.message}>
        <textarea id={id("msg")} rows={4} className={inputCls + " h-auto py-3"} {...register("message")} />
      </Field>
      {serverError && <p role="alert" className="text-sm text-red-400">{serverError}</p>}
      <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} className="justify-self-start">
        {isSubmitting ? "Sending…" : "Start your application"}
      </Button>
    </form>
  );
}
