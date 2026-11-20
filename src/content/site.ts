// Source: saverukbd.com (homepage), saverukbd.org and studyatanyuni.com. Update here, not in components.

export const site = {
  name: "Saver UKBD PLC",
  shortName: "Saver UKBD",
  logoAlt: "Saver UKBD PLC — Healthcare Recruitment",
  logo: "/logo.svg",
  logoLight: "/logo-light.svg",
  logoFooter: "/logo.svg",
  url: "https://saverukbd.com",
  title: "Saver UKBD PLC — Healthcare Recruitment & Franchise Support",
  description:
    "Saver UKBD PLC places qualified healthcare professionals with reputable employers in Europe, the USA, Canada, New Zealand and Australia, and supports franchise growth worldwide.",
  email: "info@saverukbd.com",
  phoneUk: "+44 20 3105 6919",
  phoneUs: "+44 7770 485686",
  whatsapp: "+44 7770 485686",
  twitter: "",
  locations: "Manchester · United Kingdom",
  support: "Healthcare recruitment · Franchise support",
} as const;

export const nav = [
  { label: "About", href: "/about" },
  { label: "Who we place", href: "/specialties" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Destinations", href: "/markets" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/contact" },
] as const;

export const applyCta = { label: "Enquire Now", href: "/apply" } as const;

/** tel: href from a display number — keeps the display string verbatim. */
export const tel = (display: string) => "tel:" + display.replace(/\(0\)/g, "").replace(/[^\d+]/g, "");
