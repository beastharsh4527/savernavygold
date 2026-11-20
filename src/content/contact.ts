// Source: saverukbd.com (contact details, office address) and studyatanyuni.com.

export const apply = {
  eyebrow: "Apply · Get started",
  title: { line1: "Start your search", line2: "or your next placement." },
  sub: "Tell us whether you are a healthcare professional, a student or an employer. We will reply with the right next step.",
  roles: [
    { id: "doctor", n: "01", label: "I'm a healthcare professional", prompt: "Placement with reputable employers across Europe, the USA, Canada, New Zealand and Australia, after expert screening." },
    { id: "nurse", n: "02", label: "I'm a student", prompt: "Search courses at 619 universities, prepare with language courses, and apply free with expert support." },
    { id: "employer", n: "03", label: "I'm an employer", prompt: "Hire vetted, compliant healthcare staff, or partner with us to grow a healthcare staffing business." },
  ],
  button: "Start your application",
  trust: ["Free application support", "Expert screening & vetting", "Five regions"],
  visual: { since: "Based in", year: "UK", mono: "SU", stats: ["1.5k+", "95%", "5"] },
} as const;

export type RoleId = (typeof apply.roles)[number]["id"];

export const contactIntro = {
  eyebrow: "Contact us",
  title: "One office, five regions.",
  sub: "Reach our team in Manchester by phone, WhatsApp or email.",
} as const;

export const offices = [
  {
    id: "uk", code: "UK", city: "Manchester", tag: "Head office", region: "Manchester, United Kingdom", tz: "Europe/London", short: "MAN",
    address: ["First Floor, Swan Buildings", "20 Swan Street, Manchester · M4 5JW"],
    lines: [
      { label: "Phone", value: "+44 20 3105 6919" },
      { label: "WhatsApp", value: "+44 7770 485686" },
    ],
    clockLabel: "Head office",
    lat: 53.4808, lng: -2.2426,
  },
] as const;

export const contactForm = {
  eyebrow: "Direct line",
  title: "Let's start the conversation.",
  sub: "Tell us what you need. Our team will get back to you.",
  fields: { name: "Full name", email: "Email", phone: "Phone", role: "I am a…", message: "Message" },
  roles: [
    "Healthcare professional seeking placement",
    "Student seeking courses or language tests",
    "Employer, hospital or care home",
    "Franchise enquiry",
    "Other",
  ],
  submit: "Submit Enquiry",
  note: "Your details are sent directly to our team.",
} as const;

export const newsletter = {
  eyebrow: "Stay in the loop",
  title: "Ready to find the right match? Get in touch.",
  meta: "Email · info@saverukbd.com",
} as const;

export const footer = {
  liveLabel: "Manchester · Five regions",
  description: "Connecting healthcare professionals worldwide. Recruitment, expert screening, online training and franchise support.",
  columns: [
    { title: "Services", links: [
      { label: "Healthcare Recruitment", href: "/services/healthcare-recruitment" },
      { label: "Expert Screening", href: "/services/expert-screening" },
      { label: "Online Training", href: "/services/online-training" },
      { label: "Study Abroad", href: "/services/study-abroad" },
    ] },
    { title: "Company", links: [
      { label: "About", href: "/about" },
      { label: "Who we place", href: "/specialties" },
      { label: "Destinations", href: "/markets" },
      { label: "Contact", href: "/contact" },
    ] },
  ],
  getInTouch: "Get in touch",
  socials: [
    { label: "YouTube", href: "https://www.youtube.com/live/uW9LrJv-dl4" },
  ],
  wordmark: "SAVER",
  credit: "© 2026 Saver UKBD PLC. All rights reserved.",
  creditUrl: "https://saverukbd.com",
  tagline: "Legal notice · Privacy policy",
} as const;
