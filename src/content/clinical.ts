// Source: saverukbd.com ("Who we place", "Franchise", process) and studyatanyuni.com (destinations, costs, post-study work).

const u = (id: string) => `https://images.unsplash.com/${id}`;

export const specialtiesIntro = {
  eyebrow: "Who we place",
  title: "Skilled people for every part of health care.",
  sub: "Healthcare assistants, nurses, doctors and pharmacists are matched with employers worldwide.",
  spotlightLabel: "Spotlight",
  openingsLabel: "",
  marketsLabel: "Regions",
} as const;

const REGIONS = "Europe · USA · Canada · New Zealand · Australia";

// `label` = tile text; `name` = spotlight title; `bio` written from the roles list on saverukbd.com.
export const specialties = [
  { label: "Specialized Doctors", name: "Specialized Doctors", markets: REGIONS, bio: "Specialist physicians matched with reputable employers across five regions.", photo: u("photo-1559757175-5700dde675bc") },
  { label: "Specialized Nurses", name: "Specialized Nurses", markets: REGIONS, bio: "Specialist nurses placed with employers that need advanced clinical skills.", photo: u("photo-1576091160399-112ba8d25d1d") },
  { label: "General Doctors", name: "General Doctors", markets: REGIONS, bio: "General doctors placed with reputable employers, from primary care to hospital teams.", photo: u("photo-1631815587646-b85a1bb027e1") },
  { label: "General Nurses", name: "General Nurses", markets: REGIONS, bio: "General nurses matched with employers across hospitals, care homes and clinics.", photo: u("photo-1551601651-2a8555f1a136") },
  { label: "Junior Doctors", name: "Junior Doctors", markets: REGIONS, bio: "Junior doctors placed with employers that need early-career clinical staff.", photo: u("photo-1579165466741-7f35e4755660") },
  { label: "Registered Nurses", name: "Registered Nurses", markets: REGIONS, bio: "Registered nurses placed with reputable employers in five regions.", photo: u("photo-1587351177026-1ef39ef13447") },
  { label: "Pharmacists", name: "Pharmacists", markets: REGIONS, bio: "Pharmacists placed with hospitals, pharmacies and other employers.", photo: u("photo-1582750433449-648ed127bb54") },
  { label: "Healthcare Professionals", name: "Healthcare Professionals", markets: REGIONS, bio: "Qualified healthcare professionals matched with reputable employers worldwide.", photo: u("photo-1530026405186-ed1f139313f8") },
  { label: "Healthcare Assistants", name: "Healthcare Assistants", markets: REGIONS, bio: "Healthcare assistants placed to support frontline patient care.", photo: u("photo-1576091160550-2173dba999ef") },
  { label: "Nursing Assistants", name: "Nursing Assistants", markets: REGIONS, bio: "Nursing assistants placed in care homes, hospitals and community settings.", photo: u("photo-1583912267550-d6c2ac3196c0") },
  { label: "Pharmacy Technicians", name: "Pharmacy Technicians", markets: REGIONS, bio: "Pharmacy technicians placed with pharmacies and hospital pharmacy teams.", photo: u("photo-1573497019940-1c28c88b4f3e") },
] as const;

export const marketsIntro = {
  eyebrow: "Destinations",
  title: "Compare study destinations by cost and work rights.",
  sub: "Estimated annual costs and post-study work rights for the countries we support.",
} as const;

export const markets = [
  {
    slug: "us", code: "US", country: "United States", n: "01", badge: "Largest system",
    title: "The world's largest higher-education system",
    desc: "Estimated tuition of $25,000–$55,000 a year. OPT allows up to 3 years of work for STEM graduates.",
    stats: [
      { value: 279, prefix: "", suffix: "", label: "Universities" },
      { value: 25643, prefix: "", suffix: "", label: "Courses" },
    ],
    tags: ["OPT up to 3 yrs", "$25k–$55k / yr"],
    cta: "Explore US courses",
    office: null,
    photo: u("photo-1587351177026-1ef39ef13447"),
  },
  {
    slug: "uk", code: "UK", country: "United Kingdom", n: "02", badge: "Historic campuses",
    title: "Historic campuses, one-year masters",
    desc: "Estimated £15,000–£30,000 a year. The Graduate Route allows 2 years of work after study.",
    stats: [
      { value: 104, prefix: "", suffix: "", label: "Universities" },
      { value: 12732, prefix: "", suffix: "", label: "Courses" },
    ],
    tags: ["Graduate Route 2 yrs", "£15k–£30k / yr"],
    cta: "Explore UK courses",
    office: null,
    photo: u("photo-1551076805-e1869033e561"),
  },
  {
    slug: "canada", code: "CA", country: "Canada", n: "03", badge: "Welcoming & affordable",
    title: "Welcoming, affordable and multicultural",
    desc: "Estimated C$20,000–C$40,000 a year. A Post-Graduation Work Permit (PGWP) allows up to 3 years of work.",
    stats: [
      { value: 44, prefix: "", suffix: "", label: "Universities" },
      { value: 3858, prefix: "", suffix: "", label: "Courses" },
    ],
    tags: ["PGWP up to 3 yrs", "C$20k–C$40k / yr"],
    cta: "Explore Canada courses",
    office: null,
    photo: u("photo-1576091160399-112ba8d25d1d"),
  },
  {
    slug: "australia", code: "AU", country: "Australia", n: "04", badge: "Top-ranked unis",
    title: "Sunshine, beaches and top-ranked universities",
    desc: "Estimated A$25,000–A$45,000 a year. Post-study work rights of 2 to 4 years.",
    stats: [
      { value: 31, prefix: "", suffix: "", label: "Universities" },
      { value: 1979, prefix: "", suffix: "", label: "Courses" },
    ],
    tags: ["2–4 yrs work", "A$25k–A$45k / yr"],
    cta: "Explore Australia courses",
    office: null,
    photo: u("photo-1523482580672-f109ba8cb9be"),
  },
] as const;

export const processIntro = {
  eyebrow: "How it works",
  title: "Four steps from search to offer.",
  sub: "Search courses, shortlist universities, apply free with expert help, and receive your offer.",
  journeyLabel: "Application support",
  journeyValue: "Free",
  journeyUnit: "for candidates",
  costLabel: "Support from",
  costValue: "A local advisor",
  costUnit: "from your own country",
  cta: { label: "Start your search", href: "/contact" },
} as const;

export const processSteps = [
  { n: "01", tag: "Step one", title: "Search", desc: "Search courses at top universities worldwide, filtered by level, country, subject and budget.", meta: "Level · Country · Subject · Budget", photo: u("photo-1573497019940-1c28c88b4f3e") },
  { n: "02", tag: "Step two", title: "Shortlist", desc: "Compare fees, intakes and student reviews side by side before you choose.", meta: "Fees · Intakes · Reviews", photo: u("photo-1576091160550-2173dba999ef") },
  { n: "03", tag: "Step three", title: "Apply free", desc: "Apply with expert support from a local advisor from your own country, at no cost.", meta: "100% free application support", photo: u("photo-1450101499163-c8848c66ca85") },
  { n: "04", tag: "Step four", title: "Get your offer", desc: "Receive guidance on your offer, visa and first day on campus.", meta: "Offer · Visa · Arrival", photo: u("photo-1551076805-e1869033e561") },
] as const;
