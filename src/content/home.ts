// Source: saverukbd.com homepage. Stats and copy are as stated on the site.

export const hero = {
  pill: { label: "Now placing", value: "1.5k+", text: "worldwide placements" },
  eyebrow: "Vetted · Compliant · Worldwide",
  title: { before: "Connecting healthcare professionals", em: "worldwide", after: "." },
  lede:
    "Saver UKBD PLC places qualified healthcare professionals with reputable employers and supports franchise growth globally.",
  primary: { label: "Get started", href: "/contact" },
  secondary: { label: "Explore Our Services", href: "/services" },
  points: [
    "Expert candidate screening and vetting",
    "Online training in five regions",
    "Franchise support across the UK",
  ],
  sticker: { top: "5 regions", bottom: "Healthcare recruitment" },
  card: {
    tag: "Speak with a specialist",
    title: "Find your next placement or hire healthcare staff.",
    ukLabel: "UK Office",
    emailLabel: "Email",
  },
} as const;

export const marquee = [
  "Healthcare Recruitment",
  "Expert Screening",
  "Online Training",
  "Franchise Support",
  "Study Abroad",
  "Language Courses",
] as const;

export const stats = {
  eyebrow: "At a glance",
  title: "Connecting professionals and employers across five regions.",
  items: [
    { n: "01", value: 1500, suffix: "+", prefix: "", label: "Worldwide placements", sub: "vetted, compliant candidates" },
    { n: "02", value: 95, suffix: "%", prefix: "", label: "Satisfied clients", sub: "as stated on our website" },
    { n: "03", value: 30, suffix: "+", prefix: "", label: "Franchise locations", sub: "across the United Kingdom" },
    { n: "04", value: 11, suffix: "", prefix: "", label: "Healthcare roles placed", sub: "from specialist doctors to healthcare assistants" },
  ],
} as const;

export const about = {
  badges: {
    est: "Based in",
    year: "UK",
    trust: "Vetted & compliant",
    bridge: "Talent & employers",
    continents: "5",
    continentsLabel: "Regions served",
  },
  eyebrow: "About Saver UKBD",
  title: "Qualified professionals. Reputable employers. Global reach.",
  p1: "Saver UKBD PLC places qualified healthcare professionals with reputable employers in Europe, the USA, Canada, New Zealand and Australia. It also supports franchise growth worldwide.",
  quote: "Skilled people for every part of health care.",
  p2: "Every candidate goes through expert screening and vetting before placement. The company also runs online training in each region and works with care homes, hospitals, pharmacies, general practitioners and dental practices.",
  stats: [
    { value: 1500, suffix: "+", label: "Placements" },
    { value: 30, suffix: "+", label: "Franchise locations" },
    { value: 95, suffix: "%", label: "Satisfaction" },
  ],
  pillars: [
    { title: "Expert screening", text: "Thorough candidate vetting for qualified, compliant professionals." },
    { title: "Reliable partnerships", text: "Care homes, hospitals, pharmacies, GP practices and dental practices." },
  ],
  link: { label: "See our services", href: "/services" },
  photos: [
    "https://images.unsplash.com/photo-1612531386530-97286d97c2d2",
    "https://images.unsplash.com/photo-1582750433449-648ed127bb54",
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
  ],
} as const;

export const philosophy = {
  eyebrow: "Our philosophy",
  quote:
    "Saver UKBD places qualified healthcare professionals with reputable employers and supports franchise growth globally.",
  name: "Saver UKBD PLC",
  meta: "Manchester · Europe · USA · Canada · New Zealand · Australia",
} as const;
