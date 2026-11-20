// Source: saverukbd.com (services, franchise, Who we place) and studyatanyuni.com (study abroad, language courses, licences).

const u = (id: string) => `https://images.unsplash.com/${id}`;

export const servicesIntro = {
  eyebrow: "What we do",
  title: "Recruitment, screening, training and franchise growth.",
  sub: "One team covers each step, from first contact through placement and beyond.",
} as const;

export type Service = {
  n: string;
  slug: string;
  title: string;
  desc: string;
  tags: readonly string[];
  photo: string;
  icon: "stethoscope" | "heart-pulse" | "building" | "graduation" | "plane" | "user-check" | "users";
  audience: "candidates" | "employers" | "both";
};

export const services: readonly Service[] = [
  { n: "01", slug: "healthcare-recruitment", title: "Healthcare Recruitment", desc: "We place qualified doctors, nurses and pharmacists with reputable employers in Europe, the USA, Canada, New Zealand and Australia.", tags: ["Doctors", "Nurses", "Pharmacists"], photo: u("photo-1612531386530-97286d97c2d2"), icon: "stethoscope", audience: "employers" },
  { n: "02", slug: "expert-screening", title: "Expert Screening", desc: "Thorough candidate vetting, so every professional we present is qualified and compliant for the role.", tags: ["Vetting", "Compliance"], photo: u("photo-1582750433449-648ed127bb54"), icon: "user-check", audience: "both" },
  { n: "03", slug: "online-training", title: "Online Training", desc: "Online training and courses for candidates in Europe, the USA, Canada, New Zealand and Australia.", tags: ["Five regions", "Online"], photo: u("photo-1576091160550-2173dba999ef"), icon: "graduation", audience: "candidates" },
  { n: "04", slug: "franchise-support", title: "Franchise Support", desc: "Support for franchise growth, with locations across Scotland, Ireland, England and Wales. Franchising is for partners only.", tags: ["UK", "30+ locations"], photo: u("photo-1551076805-e1869033e561"), icon: "building", audience: "employers" },
  { n: "05", slug: "care-hospital-partnerships", title: "Care & Hospital Partnerships", desc: "Long-term partnerships with care homes, residential homes, domiciliary care providers, private and public hospitals, pharmacies, GPs and dental practices.", tags: ["Care homes", "Hospitals", "Pharmacies"], photo: u("photo-1530026405186-ed1f139313f8"), icon: "users", audience: "employers" },
  { n: "06", slug: "study-abroad", title: "Study Abroad", desc: "Search courses at top universities worldwide and apply free, with support from a local advisor from your own country.", tags: ["619 universities", "39 countries"], photo: u("photo-1551601651-2a8555f1a136"), icon: "plane", audience: "candidates" },
  { n: "07", slug: "language-and-licences", title: "Language Courses & Driving Licences", desc: "Preparation for IELTS, TOEFL, PTE, OET and other language tests, plus driving licence programmes in the Gulf, UK, Canada, USA, Australia and Germany.", tags: ["IELTS", "OET", "Driving licences"], photo: u("photo-1594824476967-48c8b964273f"), icon: "heart-pulse", audience: "candidates" },
];

export const servicesCta = {
  eyebrow: "Talk to us",
  title: "Looking for talent, or a placement abroad?",
  text: "Tell us what you need. We will map the right route in your first conversation.",
  button: { label: "Start a conversation", href: "/contact" },
  call: "or call",
} as const;

export const solutionsIntro = {
  eyebrow: "Solutions",
  title: "Tailored routes for candidates and employers.",
  sub: "Whether you are a professional looking for a placement or an employer building a workforce, we run the process end to end.",
} as const;

export const solutions = [
  {
    id: "candidates",
    tab: "For candidates",
    n: "01",
    title: "Healthcare professionals & students",
    text: "Apply for a placement abroad, prepare with online training and language courses, and search study options at partner universities.",
    bullets: [
      "Placement with reputable employers",
      "Online training and courses",
      "IELTS, TOEFL, PTE and other language tests",
      "Course search across 619 universities",
    ],
    stats: [
      { value: "48,545+", label: "Courses listed" },
      { value: "619", label: "Universities" },
    ],
    cta: { label: "Find a placement", href: "/contact" },
    photo: u("photo-1594824476967-48c8b964273f"),
  },
  {
    id: "employers",
    tab: "For employers",
    n: "02",
    title: "Hospitals, care homes & practices",
    text: "Hire vetted, compliant healthcare staff across five regions, or partner with us to grow a healthcare staffing business.",
    bullets: [
      "Vetted doctors, nurses and allied staff",
      "Care home and hospital partnerships",
      "Franchise partnerships across the UK",
    ],
    stats: [
      { value: "1.5k+", label: "Worldwide placements" },
      { value: "95%", label: "Satisfied clients" },
    ],
    cta: { label: "Hire healthcare staff", href: "/contact" },
    photo: u("photo-1551076805-e1869033e561"),
  },
] as const;
