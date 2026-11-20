import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { Magnetic } from "@/components/experience/Magnetic";
import { cn } from "@/lib/utils";

type Variant = "primary" | "gold" | "ghost" | "ghost-light" | "ink";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-600 [--fill:var(--color-mint)] hover:text-ink",
  gold: "bg-gold text-ink [--fill:var(--color-paper)]",
  ghost: "border border-ink/20 text-ink [--fill:var(--color-ink)] hover:text-paper",
  "ghost-light": "border border-white/25 text-white [--fill:var(--color-paper)] hover:text-ink",
  ink: "bg-ink text-paper [--fill:var(--color-mint)] hover:text-ink",
};
const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm gap-2",
  md: "h-12 px-6 text-[0.95rem] gap-3",
  lg: "h-14 px-7 text-base gap-3",
};

const base =
  "group relative isolate inline-flex items-center justify-center overflow-hidden rounded-full font-medium tracking-tight transition-colors duration-500 " +
  "before:absolute before:inset-0 before:-z-10 before:translate-y-full before:rounded-full before:bg-[var(--fill)] before:transition-transform before:duration-500 before:ease-[var(--ease-out-expo)] hover:before:translate-y-0";

function Inner({ children, arrow }: { children: ReactNode; arrow: boolean }) {
  return (
    <>
      <span>{children}</span>
      {arrow && (
        <span className="relative grid h-5 w-5 place-items-center overflow-hidden">
          <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-5 group-hover:-translate-y-5" />
          <ArrowUpRight aria-hidden className="absolute h-4 w-4 -translate-x-5 translate-y-5 transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0" />
        </span>
      )}
    </>
  );
}

type Common = { variant?: Variant; size?: Size; arrow?: boolean; magnetic?: boolean; className?: string; children: ReactNode };

export function ButtonLink({ href, variant = "primary", size = "md", arrow = true, magnetic = true, className, children, ...rest }: Common & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">) {
  const el = (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </Link>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}

export function Button({ variant = "primary", size = "md", arrow = true, magnetic = false, className, children, ...rest }: Common & Omit<ComponentProps<"button">, "className" | "children">) {
  const el = (
    <button className={cn(base, variants[variant], sizes[size], "disabled:pointer-events-none disabled:opacity-60", className)} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
