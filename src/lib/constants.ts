export const SITE_CONFIG = {
  name: "MusicMind",
  tagline: "Music Business Agency",
  description: "Entertainment consulting, legal services, business certifications, and strategic guidance for artists and music industry professionals.",
  email: "info@musicmind.biz",
  phone: "(619) 555-0199",
  url: "https://musicmind.biz",
} as const;

export const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

export const SERVICES = [
  {
    title: "Entertainment Consulting",
    description: "Strategic guidance for artists, labels, and entertainment companies. From career development to brand partnerships, we help you navigate the industry with confidence.",
    icon: "Lightbulb",
  },
  {
    title: "Contracts & Licensing",
    description: "Review, negotiation, and drafting support for recording contracts, sync licenses, publishing deals, and distribution agreements.",
    icon: "FileText",
  },
  {
    title: "Entertainment Law",
    description: "Legal guidance on intellectual property, copyright protection, trademark registration, royalty disputes, and entertainment litigation support.",
    icon: "Scale",
  },
  {
    title: "Business Certifications",
    description: "Help securing business certifications, LLC formation, DBA registration, and compliance documentation to legitimize and protect your music business.",
    icon: "Award",
  },
  {
    title: "Publishing & Royalties",
    description: "PRO registration, publishing administration, mechanical and performance royalty collection setup, and revenue stream optimization.",
    icon: "DollarSign",
  },
  {
    title: "Artist Development",
    description: "Comprehensive artist development strategy including branding, marketing plans, digital presence, and release strategy for independent and emerging artists.",
    icon: "Mic",
  },
] as const;

export const WHY_MUSICMIND = [
  "Industry veterans with decades of combined experience",
  "Personalized approach — not a one-size-fits-all agency",
  "End-to-end support from formation to monetization",
  "Transparent pricing with no hidden retainers",
  "Deep connections across music, tech, and legal sectors",
] as const;
