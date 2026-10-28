export const SITE_CONFIG = {
  name: "MusicMind",
  tagline: "A-to-Z Music Release Systems, Royalty Accounting & Studio Software",
  description:
    "Interactive song release checklists, U.S. Copyright Office filing calculators, ASCAP/BMI/MLC/SoundExchange royalty accounting workflows, and commercial studio software (ScreenStage, QuietPlease, TrackCascade, Midimaze).",
  email: "info@musicmind.biz",
  url: "https://musicmind.biz",
} as const;

export const NAV_LINKS = [
  { href: "#release-guide", label: "Release & Copyright Checklist" },
  { href: "#copyright-calculator", label: "Copyright Fee Calculator" },
  { href: "#royalty-simulator", label: "Royalty Accounting" },
  { href: "#products", label: "Studio Software" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
] as const;

export const PRODUCTS = [
  {
    id: "midimaze",
    name: "Midimaze Studio Ops & Curriculum",
    tag: "Studio & Music Business Platform",
    status: "Live on Midimaze.com",
    description:
      "Interactive music business and recording arts curriculum, multi-room studio booking, gear inventory, score analysis, and animated explainers covering U.S. copyright, PROs, The MLC, and SoundExchange.",
    price: "Open Curriculum + Institutional Studio Kit",
    href: "https://midimaze.com/articles/releasing-a-song-and-collecting-every-royalty",
    cta: "Read the Music Business Curriculum →",
  },
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
] as const;

export const SERVICES = [
  {
    title: "A-to-Z Song Release & Metadata Setup",
    description:
      "Complete release pipeline setup connecting your distributor (DistroKid, TuneCore, CD Baby) ISRC and UPC codes to ASCAP/BMI, The MLC, and SoundExchange so no royalty stream sits unmatched.",
    icon: "CheckCircle",
  },
  {
    title: "Copyright Registration Strategy",
    description:
      "Administrative workflow planning for U.S. Copyright Office eCO filings: choosing between Single ($45), Standard ($65), Group of Unpublished Works ($85 GRUW), and Album (GRAM $65) applications before and after release.",
    icon: "Scale",
  },
  {
    title: "PRO Writer & Publisher Share Recovery",
    description:
      "Self-published songwriter setup on ASCAP and BMI so independent writers collect both the 50% Writer's Share and the 50% Publisher's Share (200% BMI scale / 100%+100% ASCAP scale) alongside IPI and ISWC tracking.",
    icon: "DollarSign",
  },
  {
    title: "The MLC & SoundExchange Audits",
    description:
      "Catalog auditing to link every recording's ISRC to its composition ISWC inside The Mechanical Licensing Collective (themlc.com) and claim both the 45% Featured Artist and 50% Rights Owner shares at SoundExchange.",
    icon: "FileText",
  },
  {
    title: "Split Sheets & Catalog Accounting",
    description:
      "Clear co-writer and producer split sheet documentation separating Musical Composition (©) percentages from Sound Recording / Master (℗) percentages from Day 1.",
    icon: "Award",
  },
  {
    title: "Studio & Workstation Engineering",
    description:
      "Custom studio hardware/software integration, multi-monitor control room workflows, and institutional studio operations powered by Midimaze and Build Forward Tech.",
    icon: "Mic",
  },
] as const;

export const WHY_MUSICMIND = [
  "Clear, step-by-step release accounting from studio bounce to all 4 royalty pipelines",
  "Separates automatic 'fixed' copyright (17 U.S.C. § 102) from federal registration with the Library of Congress (copyright.gov)",
  "Closes the hidden royalty gaps DistroKid and PROs leave behind (The MLC mechanicals + SoundExchange digital radio)",
  "Published creator software (Midimaze, ScreenStage, QuietPlease, TrackCascade) built in affiliation with Build Forward Tech",
  "Built by active producers, recording arts educators, and systems architects",
] as const;
