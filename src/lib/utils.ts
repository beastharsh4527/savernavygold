export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Unsplash URL with sizing params (originals are stored without query strings). */
export function img(src: string, w = 1200) {
  if (!src.includes("images.unsplash.com")) return src;
  return `${src}?auto=format&fit=crop&q=80&w=${w}`;
}

export const isDemo = process.env.NEXT_PUBLIC_DEMO !== "false";
