export const SITE_CONFIG = {
  name: "MusicMind",
  tagline: "Music Technology, Studio Software & Business Strategy",
  description: "Creator software (ScreenStage, abletools, QuietPlease), studio systems, catalog administration, licensing workflows, and strategic business guidance in affiliation with Build Forward Tech.",
  email: "info@musicmind.biz",
  phone: "(619) 555-0199",
  url: "https://musicmind.biz",
} as const;

export const NAV_LINKS = [
  { href: "#products", label: "Software & Tools" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

export const PRODUCTS = [
  {
    id: "screenstage",
    name: "ScreenStage (Mac, Windows & Linux)",
    tag: "Multi-Monitor Engine · $19",
    status: "v1.1 Available",
    description:
      "Every room remembers every screen. Automatically recognizes your home desk, recording studio, or classroom when you plug in, remembers every monitor and KVM TV, hides screens you aren't using, and switches layouts in one click.",
    price: "$19 Personal / $199 Studio & Team Pack",
    href: "https://buildforwardtech.com/screenstage",
    cta: "Watch Video & Buy ScreenStage ($19) →",
  },
  {
    id: "quietplease",
    name: "QuietPlease (macOS 14+)",
    tag: "Classroom & Studio Compressor · $15",
    status: "v0.3 Available",
    description:
      "A real audio compressor detector running on your room microphone. Threshold, ratio, knee, attack, release, 4 live scopes, and 32-band sound training put a full-screen Quiet Please sign on every display when the room gets too loud.",
    price: "$15 Personal / $149 Classroom & Studio Pack",
    href: "https://buildforwardtech.com/quietplease",
    cta: "Watch Video & Buy QuietPlease ($15) →",
  },
  {
    id: "trackcascade",
    name: "TrackCascade (abletools)",
    tag: "Ableton Live 11 & 12 · $29",
    status: "v1.0 Available",
    description:
      "Pro Tools-speed session setup inside Ableton Live: batch New Tracks dialog (.ablx) and pair-aware mono/stereo cascading hardware input and output routing (.amxd + CLI).",
    price: "$29 Personal / $249 Studio & Lab Pack",
    href: "https://buildforwardtech.com/trackcascade",
    cta: "Watch Video & Buy TrackCascade ($29) →",
  },
  {
    id: "midimaze",
    name: "Midimaze Studio Ops",
    tag: "Studio & Curriculum Platform",
    status: "In Production",
    description:
      "Unified studio operations kit for recording facilities and music departments: multi-room studio booking, gear and microphone inventory, maintenance ticketing, interactive score analysis, and live curriculum publishing.",
    price: "Institutional License",
    href: "https://midimaze.com",
    cta: "Explore Midimaze →",
  },
] as const;

export const SERVICES = [
  {
    title: "Entertainment Consulting",
    description: "Strategic guidance for artists, studios, labels, and entertainment companies. From career development to technology partnerships, we help you navigate the modern music industry.",
    icon: "Lightbulb",
  },
  {
    title: "Licensing & Deal Structuring",
    description: "Business workflow support for recording agreements, sync licensing, master/publishing splits, and distribution deal modeling.",
    icon: "FileText",
  },
  {
    title: "Rights & Catalog Administration",
    description: "Intellectual property registration workflows, copyright and split-sheet organization, ISRC/UPC metadata hygiene, and catalog audit preparation.",
    icon: "Scale",
  },
  {
    title: "Business Certifications",
    description: "Operational setup for LLC/DBA filings, vendor registrations, and business compliance documentation to organize your music ventures.",
    icon: "Award",
  },
  {
    title: "Publishing & Royalties",
    description: "PRO registration, publishing administration, mechanical and performance royalty collection setup, and revenue stream optimization.",
    icon: "DollarSign",
  },
  {
    title: "Studio & Artist Systems",
    description: "Custom studio hardware/software integration, multi-monitor control room workflows, and release strategy for independent creators and educators.",
    icon: "Mic",
  },
] as const;

export const WHY_MUSICMIND = [
  "Published creator software (ScreenStage, abletools, Midimaze) in affiliation with Build Forward Tech (buildforwardtech.com)",
  "Built by active producers, studio engineers, and systems architects",
  "End-to-end support from studio workflow automation to catalog monetization",
  "Transparent pricing with one-time software licenses and clear consulting scopes",
  "Deep connections across music production, higher education, and frontier technology",
] as const;
