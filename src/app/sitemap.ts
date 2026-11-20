import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { markets } from "@/content/clinical";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const statics = ["", "/about", "/services", "/solutions", "/specialties", "/markets", "/process", "/contact", "/apply"];
  return [
    ...statics.map((p) => ({ url: `${site.url}${p}`, lastModified: now, priority: p === "" ? 1 : 0.7 })),
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}`, lastModified: now, priority: 0.6 })),
    ...markets.map((m) => ({ url: `${site.url}/markets/${m.slug}`, lastModified: now, priority: 0.6 })),
  ];
}
