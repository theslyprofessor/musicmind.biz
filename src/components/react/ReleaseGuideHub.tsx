import { useState, useEffect, useMemo } from "react";
import {
  CheckCircle2,
  Circle,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  RotateCcw,
} from "lucide-react";

type ReleaseScenario = "unpublished" | "same_album" | "different_years";
type AuthorshipMode = "sole" | "cowriters";
type DiagramTab = "ecosystem" | "copyright" | "pro" | "pipeline";

interface ChecklistStep {
  id: string;
  stepNumber: number;
  title: string;
  timing: string;
  organization: string;
  url: string;
  cost: string;
  copyrightSide: "Both © & ℗" | "Master ℗" | "Composition ©";
  codeMinted: string;
  summary: string;
  whatHappensIfSkipped: string;
}

const CHECKLIST_STEPS: ChecklistStep[] = [
  {
    id: "step-1-fixation",
    stepNumber: 1,
    title: "Bounce Master Audio & Sign a Split Sheet (Copyright Fixation)",
    timing: "Immediately after finishing the mix/master",
    organization: "Your Studio / Co-Writers",
    url: "https://midimaze.com/articles/the-two-copyrights-in-every-song",
    cost: "$0",
    copyrightSide: "Both © & ℗",
    codeMinted: "Writers' IPI Numbers + Signed Split Percentages",
    summary:
      "Export your 24-bit WAV master, instrumental, and stems. Saving the audio to a hard drive, USB drive, or CD legally 'fixes' the song in a tangible medium (17 U.S.C. § 102), creating automatic copyright. Have all co-writers and producers sign a written Split Sheet listing legal names, PRO (ASCAP or BMI), IPI numbers, Composition (©) %, and Master (℗) %.",
    whatHappensIfSkipped:
      "Without a signed split sheet before release, any collaborator can dispute ownership percentages later or block sync licensing deals.",
  },
  {
    id: "step-2-copyright-office",
    stepNumber: 2,
    title: "Register with the U.S. Copyright Office (Library of Congress)",
    timing: "Before release date (or within 3 months of first release)",
    organization: "U.S. Copyright Office (eCO)",
    url: "https://copyright.gov",
    cost: "$45 (1 song sole) · $85 (2-10 unpublished) · $65 (Standard / GRAM)",
    copyrightSide: "Both © & ℗",
    codeMinted: "Federal Registration Number (PA / SR / PAu / SRu)",
    summary:
      "File online at copyright.gov. If you have 2 to 10 finished, unreleased songs, file a Group of Unpublished Works (GRUW, $85 total) BEFORE uploading to DistroKid. If releasing 1 song you wrote and recorded alone, file a Single Application ($45 covering both © and ℗).",
    whatHappensIfSkipped:
      "An unregistered MP3 on your hard drive cannot be used to file a federal infringement lawsuit (17 U.S.C. § 411(a)), and you forfeit statutory damages ($750 to $150,000 per song) and recovery of attorney's fees (17 U.S.C. § 412).",
  },
  {
    id: "step-3-distributor",
    stepNumber: 3,
    title: "Upload Master to Your Digital Distributor",
    timing: "3 to 4 weeks before release date",
    organization: "DistroKid / TuneCore / CD Baby",
    url: "https://midimaze.com/articles/distributors-the-mlc-and-soundexchange",
    cost: "~$23/yr (DistroKid) or per-release fee",
    copyrightSide: "Master ℗",
    codeMinted: "ISRC (12-char recording code) + UPC (release barcode)",
    summary:
      "Upload your 24-bit WAV, 3000x3000 cover art, songwriter legal names, and release date. Once processed, copy the 12-character ISRC assigned to each recording (for example, US-S1Z-26-00001). You need this ISRC for Steps 4, 5, and 6.",
    whatHappensIfSkipped:
      "Notice: Your distributor ONLY delivers audio to DSPs (Spotify, Apple Music) and collects the Master (℗) streaming share. It does NOT register your copyright with Congress and does NOT collect ASCAP/BMI, MLC, or SoundExchange royalties.",
  },
  {
    id: "step-4-pro",
    stepNumber: 4,
    title: "Register the Work with Your PRO (Claim Writer + Publisher Shares)",
    timing: "1 to 2 weeks before release date",
    organization: "ASCAP or BMI",
    url: "https://midimaze.com/articles/performing-rights-organizations-ascap-vs-bmi",
    cost: "$0 (BMI Writer & ASCAP) · $175 one-time (BMI Publisher entity)",
    copyrightSide: "Composition ©",
    codeMinted: "ISWC (T-XXX.XXX.XXX-C)",
    summary:
      "Register the song title, co-writers' IPI numbers, and paste the ISRC from Step 3. Every public performance royalty is split 50% Writer's Share + 50% Publisher's Share. If you are self-published, claim BOTH shares (200% on BMI's scale, or 100% Writer + 100% Publisher on ASCAP).",
    whatHappensIfSkipped:
      "If you skip PRO registration, you collect $0 from radio, TV, bars, venues, and the performance half of streaming. If you register on ASCAP as a Writer only without a Publisher entity, the 50% Publisher's Share sits uncollected.",
  },
  {
    id: "step-5-mlc",
    stepNumber: 5,
    title: "Link Your ISRC to Your ISWC in The MLC",
    timing: "Release week (once your PRO issues the ISWC)",
    organization: "The Mechanical Licensing Collective (themlc.com)",
    url: "https://www.themlc.com",
    cost: "$0 (100% Free by federal law, 0% commission)",
    copyrightSide: "Composition ©",
    codeMinted: "Matched ISWC © <-> ISRC ℗ Mechanical Link",
    summary:
      "Log in to your free Member account at themlc.com as a Self-Administered Songwriter. Find your composition by its ISWC and attach the distributor ISRC from Step 3 so Spotify and Apple Music streams match your songwriting catalog.",
    whatHappensIfSkipped:
      "Every U.S. interactive stream generates a statutory Mechanical Royalty (17 U.S.C. § 115) that neither DistroKid nor ASCAP/BMI can collect. Unlinked songs sit in The MLC's 'Unmatched Royalties' black box.",
  },
  {
    id: "step-6-soundexchange",
    stepNumber: 6,
    title: "Register Your ISRC with SoundExchange as Artist + Rights Owner",
    timing: "Release week",
    organization: "SoundExchange (soundexchange.com)",
    url: "https://www.soundexchange.com",
    cost: "$0 (100% Free to join)",
    copyrightSide: "Master ℗",
    codeMinted: "Digital Radio Master Mandate (45% Artist + 50% Owner)",
    summary:
      "Create a free account at soundexchange.com, select 'Both' (Featured Artist AND Sound Recording Copyright Owner), and submit your track metadata and ISRC from Step 3.",
    whatHappensIfSkipped:
      "Collects non-interactive digital radio royalties (SiriusXM Satellite Radio, Pandora, iHeartRadio stations, cable TV music channels). Registering only as 'Featured Artist' collects 45% and leaves your 50% Master Owner share behind.",
  },
];

const STORAGE_KEY = "musicmind_release_checklist_v1";

export function ReleaseGuideHub() {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});
  const [songCount, setSongCount] = useState<number>(10);
  const [scenario, setScenario] = useState<ReleaseScenario>("unpublished");
  const [authorship, setAuthorship] = useState<AuthorshipMode>("sole");
  const [diagramTab, setDiagramTab] = useState<DiagramTab>("ecosystem");

  // Royalty simulator toggles
  const [simDistro, setSimDistro] = useState<boolean>(true);
  const [simProWriter, setSimProWriter] = useState<boolean>(true);
  const [simProPublisher, setSimProPublisher] = useState<boolean>(false);
  const [simMlc, setSimMlc] = useState<boolean>(false);
  const [simSxArtist, setSimSxArtist] = useState<boolean>(false);
  const [simSxOwner, setSimSxOwner] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setCheckedIds(JSON.parse(saved));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const toggleStep = (id: string) => {
    setCheckedIds((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  };

  const resetChecklist = () => {
    setCheckedIds({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const completedCount = CHECKLIST_STEPS.filter((s) => checkedIds[s.id]).length;
  const progressPct = Math.round((completedCount / CHECKLIST_STEPS.length) * 100);

  // Copyright Fee Calculation
  const copyrightCalculation = useMemo(() => {
    const unpublishedBatches = Math.ceil(songCount / 10);
    const preReleaseCost =
      songCount === 1
        ? authorship === "sole"
          ? 45
          : 65
        : unpublishedBatches * 85;

    if (scenario === "unpublished") {
      if (songCount === 1) {
        const fee = authorship === "sole" ? 45 : 65;
        return {
          formName:
            authorship === "sole"
              ? "Single Application (1 Song, Sole Author & Owner)"
              : "Standard Application (1 Song with Co-Writers)",
          filingsCount: 1,
          totalFee: fee,
          perSongFee: fee,
          preReleaseCost,
          savingsVsSeparateSingles:
            (authorship === "sole" ? 45 : 65) * songCount - fee,
          explanation:
            authorship === "sole"
              ? "Covers both the Musical Composition (©) and Sound Recording (℗) in one $45 filing because you are the sole writer, performer, and owner."
              : "Because there are 2 or more co-writers or contributors, you use the $65 Standard Application. It covers both © and ℗ in one filing as long as the exact same co-authors own both.",
          legalRule: "37 C.F.R. § 202.3 · Circular 4 (2026 Fees)",
          warning: null,
        };
      }
      const totalFee = unpublishedBatches * 85;
      const singleEquiv = (authorship === "sole" ? 45 : 65) * songCount;
      return {
        formName: `Group of Unpublished Works (GRUW · Circular 55)`,
        filingsCount: unpublishedBatches,
        totalFee,
        perSongFee: totalFee / songCount,
        preReleaseCost,
        savingsVsSeparateSingles: singleEquiv - totalFee,
        explanation: `Up to 10 unreleased songs can be bundled on one $85 GRUW application (${unpublishedBatches} filing${unpublishedBatches > 1 ? "s" : ""} for ${songCount} songs), even if the songs were written in different years, as long as none of them have been published on Spotify, Apple Music, or YouTube yet and all share the same author(s).`,
        legalRule: "37 C.F.R. § 202.4(c) · Circular 55",
        warning:
          "Must be submitted at copyright.gov BEFORE your distributor release goes live to the public.",
      };
    }

    if (scenario === "same_album") {
      if (songCount === 1) {
        const fee = authorship === "sole" ? 45 : 65;
        return {
          formName:
            authorship === "sole"
              ? "Single Application ($45)"
              : "Standard Application ($65)",
          filingsCount: 1,
          totalFee: fee,
          perSongFee: fee,
          preReleaseCost,
          savingsVsSeparateSingles: 0,
          explanation:
            "For a single published track, use the Single Application ($45 if sole author/performer/owner) or Standard Application ($65 if co-written).",
          legalRule: "Circular 4",
          warning: "File within 3 months of release to preserve statutory damages.",
        };
      }
      const albumBatches = Math.ceil(songCount / 20);
      // GRAM requires separate $65 application for Sound Recordings (℗) and $65 for Musical Works (©)
      const totalFee = albumBatches * 130;
      const singleEquiv = (authorship === "sole" ? 45 : 65) * songCount;
      return {
        formName:
          "Group of Works on an Album of Music (GRAM · Circular 58: $65 ℗ + $65 ©)",
        filingsCount: albumBatches * 2,
        totalFee,
        perSongFee: totalFee / songCount,
        preReleaseCost,
        savingsVsSeparateSingles: singleEquiv - totalFee,
        explanation: `Up to 20 tracks first published on the SAME album on the SAME date can be grouped under GRAM: one $65 application for the Sound Recordings (℗) plus one $65 application for the Musical Compositions (©) = $130 total. (If you had registered before release via GRUW, it would have been $${preReleaseCost}.)`,
        legalRule: "37 C.F.R. § 202.4(k) · Circular 58",
        warning:
          "Every track in a GRAM filing must share the exact same Date of First Publication on the same album unit.",
      };
    }

    // different_years (published singles across different release dates or calendar years)
    const unitFee = authorship === "sole" ? 45 : 65;
    const totalFee = songCount * unitFee;
    return {
      formName:
        authorship === "sole"
          ? `${songCount} Separate Single Applications ($45 each)`
          : `${songCount} Separate Standard Applications ($65 each)`,
      filingsCount: songCount,
      totalFee,
      perSongFee: unitFee,
      preReleaseCost,
      savingsVsSeparateSingles: 0,
      explanation: `Because these ${songCount} songs were already published on Spotify/Apple Music on different dates or across different calendar years, federal rules strictly prohibit bundling them into an Unpublished Group ($85) or a single Album GRAM ($65) application. Each published single must be registered individually (${songCount} x $${unitFee} = $${totalFee}).`,
      legalRule: "37 C.F.R. § 202.4(k)(1)(v) & 17 U.S.C. § 411(b)",
      warning: `Never falsify publication years or mark already-released Spotify tracks as 'Unpublished' to save $${totalFee - preReleaseCost}. Under 17 U.S.C. § 411(b) (Unicolors v. H&M), knowingly entering false publication dates invalidates your registration certificate in court.`,
    };
  }, [songCount, scenario, authorship]);

  // Royalty Accounting Simulator (per $10,000 of total gross catalog royalties)
  // Breakdown of $10,000 across a typical independent catalog:
  // - $5,200 Interactive Master Streaming (DistroKid / TuneCore)
  // - $1,200 PRO Writer's Share (ASCAP / BMI 50% Writer half)
  // - $1,200 PRO Publisher's Share (ASCAP / BMI 50% Publisher half)
  // - $1,400 U.S. Digital Audio Mechanicals (The MLC)
  // - $450 SoundExchange Featured Artist Share (45% of $1,000 digital radio)
  // - $500 SoundExchange Master Rights Owner Share (50% of $1,000 digital radio)
  // (Remaining $50 is the mandatory 5% AFM/SAG-AFTRA session musician fund on SoundExchange)
  const royaltyBuckets = [
    {
      id: "distro",
      label: "Interactive Master Streaming (℗)",
      org: "DistroKid / TuneCore / CD Baby",
      amount: 5200,
      active: simDistro,
      toggle: () => setSimDistro(!simDistro),
      note: "Spotify, Apple Music, Tidal, Amazon master share",
    },
    {
      id: "pro-writer",
      label: "PRO Writer's Share (© 50% Half)",
      org: "ASCAP or BMI (Writer Account)",
      amount: 1200,
      active: simProWriter,
      toggle: () => setSimProWriter(!simProWriter),
      note: "Paid directly to the songwriter's IPI number",
    },
    {
      id: "pro-pub",
      label: "PRO Publisher's Share (© 50% Half)",
      org: "ASCAP Publisher Account or BMI 200% Claim",
      amount: 1200,
      active: simProPublisher,
      toggle: () => setSimProPublisher(!simProPublisher),
      note: "Left behind if you only open an ASCAP Writer account or leave Publisher blank",
    },
    {
      id: "mlc",
      label: "U.S. Streaming Mechanicals (©)",
      org: "The MLC (themlc.com · Free)",
      amount: 1400,
      active: simMlc,
      toggle: () => setSimMlc(!simMlc),
      note: "Requires linking your DistroKid ISRC to your ASCAP/BMI ISWC",
    },
    {
      id: "sx-artist",
      label: "Digital Radio Featured Artist Share (℗ 45%)",
      org: "SoundExchange (Featured Artist)",
      amount: 450,
      active: simSxArtist,
      toggle: () => setSimSxArtist(!simSxArtist),
      note: "SiriusXM, Pandora, iHeartRadio non-interactive digital radio",
    },
    {
      id: "sx-owner",
      label: "Digital Radio Rights Owner Share (℗ 50%)",
      org: "SoundExchange (Rights Owner)",
      amount: 500,
      active: simSxOwner,
      toggle: () => setSimSxOwner(!simSxOwner),
      note: "Missed if you register at SoundExchange only as 'Artist' and not 'Rights Owner'",
    },
  ];

  const totalAvailable = royaltyBuckets.reduce((sum, b) => sum + b.amount, 0);
  const totalCollected = royaltyBuckets.reduce(
    (sum, b) => sum + (b.active ? b.amount : 0),
    0
  );
  const totalMissed = totalAvailable - totalCollected;

  return (
    <div className="space-y-16">
      {/* 1. FIXED VS REGISTERED COPYRIGHT EXPLAINER */}
      <div
        id="fixed-vs-registered"
        className="rounded-2xl bg-card border border-border p-6 sm:p-8 shadow-lg"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
              17 U.S.C. § 102 vs. 17 U.S.C. §§ 410-412
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold mt-1">
              "Fixed on a Hard Drive" vs. Registered with the U.S. Congress
            </h3>
          </div>
          <a
            href="https://midimaze.com/articles/us-copyright-office-registration-rules"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
          >
            Read Full Legal Guide on Midimaze
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-4xl">
          Legally, your song is <strong>copyrighted</strong> the second it is{" "}
          <strong>fixed in a tangible medium</strong>: bounced as an MP3 or WAV
          on your computer hard drive, saved to a USB stick or CD, or recorded
          into a voice memo. But an <em>unregistered</em> copyright has severe
          blind spots if someone steals your song or disputes ownership.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Unregistered Box */}
          <div className="rounded-xl bg-background border border-amber-500/40 p-6">
            <div className="flex items-center gap-2.5 mb-3">
              <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0" />
              <h4 className="text-lg font-bold text-amber-300">
                1. Automatic Copyright (Unregistered Fixed Media)
              </h4>
            </div>
            <p className="text-xs font-mono text-muted-foreground mb-4">
              How you get it: Bounce an MP3/WAV to your hard drive, USB, or CD
              ($0 · Automatic under 17 U.S.C. § 102)
            </p>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>
                  <strong>What proof you have:</strong> Your own hard drive
                  files, DAW session timestamps, lyric notebooks, drafts, or
                  emails.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✕</span>
                <span>
                  <strong>Barred from Federal Court (§ 411(a)):</strong> You
                  cannot file a copyright infringement lawsuit in federal court
                  until the U.S. Copyright Office issues a registration
                  certificate.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✕</span>
                <span>
                  <strong>You could still lose a dispute:</strong> Without timely
                  registration, there is no automatic legal presumption that you
                  are the valid owner; you must prove chain of creation from
                  scratch.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✕</span>
                <span>
                  <strong>No Statutory Damages or Attorney's Fees (§ 412):</strong>{" "}
                  If infringement happens before you register, you must pay your
                  own lawyer out of pocket and can only sue for provable actual
                  damages.
                </span>
              </li>
            </ul>
          </div>

          {/* Registered Box */}
          <div className="rounded-xl bg-background border border-emerald-500/40 p-6">
            <div className="flex items-center gap-2.5 mb-3">
              <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
              <h4 className="text-lg font-bold text-emerald-300">
                2. Federally Registered Copyright (Library of Congress)
              </h4>
            </div>
            <p className="text-xs font-mono text-muted-foreground mb-4">
              How you get it: File online at copyright.gov ($45 to $85) before
              release or within 3 months of publication
            </p>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>
                  <strong>Public Federal Record:</strong> Official Certificate of
                  Registration (PA, SR, PAu, or SRu) on file with the U.S.
                  Copyright Office (Library of Congress).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>
                  <strong>Prima Facie Presumption (§ 410(c)):</strong> In court,
                  your registration certificate is legally presumed valid,
                  shifting the burden of proof onto the other party.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>
                  <strong>Statutory Damages (§ 504(c)):</strong> Eligible for{" "}
                  <strong>$750 to $30,000 per song</strong> (and up to{" "}
                  <strong>$150,000 per song</strong> for willful infringement)
                  without having to prove the infringer's profits.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>
                  <strong>Recovery of Attorney's Fees (§ 412):</strong> Forces a
                  losing infringer to pay your legal fees, giving entertainment
                  attorneys real leverage to enforce your rights.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 2. INTERACTIVE U.S. COPYRIGHT OFFICE FEE & STRATEGY CALCULATOR */}
      <div
        id="copyright-calculator"
        className="rounded-2xl bg-card border border-border p-6 sm:p-8 shadow-lg"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
              Interactive Filing Calculator · 2026 eCO Fee Schedule
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold mt-1">
              U.S. Copyright Office Strategy: Package Deal vs. Per-Song Filing
            </h3>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/15 text-primary">
            37 C.F.R. § 202.4 · Circulars 4, 55 &amp; 58
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold">
                  How many songs are you registering?
                </label>
                <span className="text-lg font-mono font-bold text-primary">
                  {songCount} {songCount === 1 ? "song" : "songs"}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                value={songCount}
                onChange={(e) => setSongCount(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground font-mono mt-1">
                <span>1 single</span>
                <span>10 songs (GRUW max)</span>
                <span>20 songs (GRAM max)</span>
                <span>30 songs</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Release / Publication Status
              </label>
              <div className="space-y-2">
                {[
                  {
                    id: "unpublished" as const,
                    title: "Unpublished (Not on Spotify / Apple Music yet)",
                    sub: "Even if written in different years, none have been publicly released yet",
                  },
                  {
                    id: "same_album" as const,
                    title: "Published Together on the SAME Album on the SAME Date",
                    sub: "All tracks dropped for the first time on the same album in the same calendar year",
                  },
                  {
                    id: "different_years" as const,
                    title:
                      "Published as Separate Singles Across Different Dates or Years",
                    sub: "Already live on Spotify/Apple Music across different release dates or calendar years",
                  },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setScenario(opt.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                      scenario === opt.id
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-background text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    <div className="font-semibold text-sm text-foreground">
                      {opt.title}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {opt.sub}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Who Wrote, Performed &amp; Owns the Songs?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAuthorship("sole")}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    authorship === "sole"
                      ? "border-primary bg-primary/10"
                      : "border-border bg-background hover:border-primary/40"
                  }`}
                >
                  <div className="font-semibold text-sm">
                    100% Sole Creator &amp; Owner
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    1 individual wrote, performed &amp; owns everything
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setAuthorship("cowriters")}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    authorship === "cowriters"
                      ? "border-primary bg-primary/10"
                      : "border-border bg-background hover:border-primary/40"
                  }`}
                >
                  <div className="font-semibold text-sm">
                    2+ Co-Writers / Producer / LLC
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Multiple writers, featured guests, or label entity
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Live Output Card */}
          <div className="lg:col-span-6 flex flex-col justify-between rounded-xl bg-background border border-border p-6">
            <div>
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-border">
                <div>
                  <div className="text-xs font-mono uppercase text-muted-foreground">
                    Recommended U.S. Copyright Office Filing
                  </div>
                  <div className="text-lg font-bold text-primary mt-0.5">
                    {copyrightCalculation.formName}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-mono font-bold text-foreground">
                    ${copyrightCalculation.totalFee}
                  </div>
                  <div className="text-xs font-mono text-muted-foreground">
                    ${copyrightCalculation.perSongFee.toFixed(2)} / song
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 my-4">
                <div className="p-3 rounded-lg bg-card border border-border">
                  <div className="text-xs text-muted-foreground">
                    Number of eCO Applications
                  </div>
                  <div className="text-base font-mono font-bold mt-0.5">
                    {copyrightCalculation.filingsCount}{" "}
                    {copyrightCalculation.filingsCount === 1
                      ? "filing"
                      : "filings"}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-card border border-border">
                  <div className="text-xs text-muted-foreground">
                    Cost If Filed BEFORE Release
                  </div>
                  <div className="text-base font-mono font-bold text-emerald-400 mt-0.5">
                    ${copyrightCalculation.preReleaseCost} total
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {copyrightCalculation.explanation}
              </p>

              {copyrightCalculation.savingsVsSeparateSingles > 0 && (
                <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 mb-4">
                  <strong>Group Filing Advantage:</strong> Bundling saves you{" "}
                  <strong>${copyrightCalculation.savingsVsSeparateSingles}</strong>{" "}
                  compared to filing {songCount} separate single applications after
                  release.
                </div>
              )}

              {copyrightCalculation.warning && (
                <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                  <strong>Legal Rule ({copyrightCalculation.legalRule}):</strong>{" "}
                  {copyrightCalculation.warning}
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
              <span>Authority: {copyrightCalculation.legalRule}</span>
              <a
                href="https://eco.copyright.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:underline inline-flex items-center gap-1"
              >
                Open eCO Portal (copyright.gov)
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. A-TO-Z INTERACTIVE 6-STEP SONG RELEASE CHECKLIST */}
      <div
        id="release-checklist"
        className="rounded-2xl bg-card border border-border p-6 sm:p-8 shadow-lg"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
              Interactive Release SOP · Saved in Your Browser
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold mt-1">
              The 6-Step A-to-Z Song Release &amp; Royalty Checklist
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-mono font-bold text-primary">
                {completedCount} / {CHECKLIST_STEPS.length} Completed ({progressPct}%)
              </div>
              <div className="w-36 h-2 bg-background rounded-full overflow-hidden border border-border mt-1">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={resetChecklist}
              className="inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border border-border bg-background hover:bg-secondary text-muted-foreground hover:text-foreground transition"
              title="Reset checklist progress"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {CHECKLIST_STEPS.map((step) => {
            const isDone = !!checkedIds[step.id];
            return (
              <div
                key={step.id}
                onClick={() => toggleStep(step.id)}
                className={`p-5 rounded-xl border transition-all cursor-pointer ${
                  isDone
                    ? "bg-emerald-950/20 border-emerald-500/40"
                    : "bg-background border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    type="button"
                    aria-label={`Mark Step ${step.stepNumber} complete`}
                    className="mt-0.5 text-primary shrink-0"
                  >
                    {isDone ? (
                      <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                    ) : (
                      <Circle className="h-6 w-6 text-muted-foreground" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-primary/15 text-primary">
                          STEP {step.stepNumber}
                        </span>
                        <h4
                          className={`text-base sm:text-lg font-bold ${
                            isDone ? "line-through text-muted-foreground" : ""
                          }`}
                        >
                          {step.title}
                        </h4>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                        <span className="px-2 py-0.5 rounded bg-secondary text-secondary-foreground">
                          {step.copyrightSide}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-card border border-border text-muted-foreground">
                          {step.cost}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs font-mono text-muted-foreground mb-2">
                      Timing: <strong className="text-foreground">{step.timing}</strong>{" "}
                      · Where:{" "}
                      <a
                        href={step.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-primary hover:underline"
                      >
                        {step.organization} ↗
                      </a>{" "}
                      · Code: <strong className="text-foreground">{step.codeMinted}</strong>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                      {step.summary}
                    </p>

                    <div className="text-xs p-2.5 rounded-lg bg-card border border-border text-amber-200/90">
                      <strong>If you skip this step:</strong> {step.whatHappensIfSkipped}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. ROYALTY ACCOUNTING SIMULATOR (MONEY COLLECTED VS LEFT ON THE TABLE) */}
      <div
        id="royalty-simulator"
        className="rounded-2xl bg-card border border-border p-6 sm:p-8 shadow-lg"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
              A-to-Z Royalty Accounting Simulator
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold mt-1">
              Why DistroKid Alone Leaves Nearly Half Your Money Behind
            </h3>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setSimDistro(true);
                setSimProWriter(false);
                setSimProPublisher(false);
                setSimMlc(false);
                setSimSxArtist(false);
                setSimSxOwner(false);
              }}
              className="text-xs px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-secondary transition"
            >
              Preset: DistroKid Only
            </button>
            <button
              type="button"
              onClick={() => {
                setSimDistro(true);
                setSimProWriter(true);
                setSimProPublisher(true);
                setSimMlc(true);
                setSimSxArtist(true);
                setSimSxOwner(true);
              }}
              className="text-xs px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition"
            >
              Preset: Full 6-Step Setup (100%)
            </button>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-5 max-w-3xl">
          Simulate <strong>$9,950</strong> of independent song revenue across
          interactive streaming, public performance, mechanicals, and digital
          radio. Click any pipe valve on the animated money funnel or toggle
          each card below to see what routes to your bank account versus what
          leaks into the unclaimed &quot;Black Box&quot; pool.
        </p>

        {/* Animated SVG Money Funnel */}
        <div className="mb-6">
          <svg
            viewBox="0 0 960 340"
            className="w-full h-auto rounded-xl border border-border bg-[#06070a]"
            role="img"
            aria-label="Interactive animated money funnel showing 6 royalty pipes routing either to your bank account or the unclaimed black box"
          >
            <rect
              x="16"
              y="30"
              width="175"
              height="280"
              rx="12"
              fill="#0f172a"
              stroke="#38bdf8"
              strokeWidth="1.5"
            />
            <text x="30" y="60" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">
              LISTENER &amp; RADIO POOL
            </text>
            <text x="30" y="84" fill="#f8fafc" fontSize="15" fontWeight="bold">
              Total Earned:
            </text>
            <text x="30" y="112" fill="#38bdf8" fontSize="22" fontFamily="monospace" fontWeight="bold">
              ${totalAvailable.toLocaleString()}
            </text>
            <text x="30" y="142" fill="#94a3b8" fontSize="11">
              • Spotify / Apple Music
            </text>
            <text x="30" y="160" fill="#94a3b8" fontSize="11">
              • YouTube / Tidal / Amazon
            </text>
            <text x="30" y="178" fill="#94a3b8" fontSize="11">
              • AM/FM Radio &amp; TV
            </text>
            <text x="30" y="196" fill="#94a3b8" fontSize="11">
              • SiriusXM &amp; Pandora
            </text>
            <text x="30" y="214" fill="#94a3b8" fontSize="11">
              • Live Venues &amp; Bars
            </text>
            <text x="30" y="255" fill="#cbd5e1" fontSize="10" fontFamily="monospace">
              Click any pipe valve -&gt;
            </text>
            <text x="30" y="270" fill="#cbd5e1" fontSize="10" fontFamily="monospace">
              to open or close it!
            </text>

            <rect
              x="725"
              y="24"
              width="218"
              height="142"
              rx="12"
              fill="#052e16"
              stroke="#10b981"
              strokeWidth="2"
            />
            <text x="742" y="50" fill="#6ee7b7" fontSize="11" fontFamily="monospace" fontWeight="bold">
              YOUR BANK ACCOUNT ({Math.round((totalCollected / totalAvailable) * 100)}%)
            </text>
            <text x="742" y="84" fill="#34d399" fontSize="26" fontFamily="monospace" fontWeight="bold">
              ${totalCollected.toLocaleString()}
            </text>
            <text x="742" y="108" fill="#a7f3d0" fontSize="11">
              Successfully routed &amp; paid out
            </text>
            <rect x="742" y="122" width="184" height="10" rx="5" fill="#064e3b" />
            <rect
              x="742"
              y="122"
              width={Math.max(4, Math.round((184 * totalCollected) / totalAvailable))}
              height="10"
              rx="5"
              fill="#10b981"
            />

            <rect
              x="725"
              y="182"
              width="218"
              height="134"
              rx="12"
              fill="#3b0808"
              stroke="#ef4444"
              strokeWidth="2"
            />
            <text x="742" y="208" fill="#fca5a5" fontSize="11" fontFamily="monospace" fontWeight="bold">
              UNCLAIMED &quot;BLACK BOX&quot; ({Math.round((totalMissed / totalAvailable) * 100)}%)
            </text>
            <text x="742" y="242" fill="#f87171" fontSize="26" fontFamily="monospace" fontWeight="bold">
              ${totalMissed.toLocaleString()}
            </text>
            <text x="742" y="266" fill="#fecaca" fontSize="11">
              Frozen at MLC / PRO / SoundEx
            </text>
            <text x="742" y="284" fill="#fca5a5" fontSize="10" fontFamily="monospace">
              {totalMissed > 0
                ? "WARNING: Leaking unclaimed money!"
                : "ZERO LEAKS: 100% captured!"}
            </text>

            {royaltyBuckets.map((b, idx) => {
              const y = 44 + idx * 50;
              const colors = ["#38bdf8", "#fbbf24", "#f59e0b", "#a78bfa", "#2dd4bf", "#34d399"];
              const pipeColor = colors[idx] || "#38bdf8";
              const inPath = `M 191 ${y} C 245 ${y}, 265 ${y}, 315 ${y}`;
              const outTargetY = b.active ? 95 : 248;
              const outPath = `M 585 ${y} C 645 ${y}, 665 ${outTargetY}, 725 ${outTargetY}`;
              const strokeColor = b.active ? pipeColor : "#ef4444";

              return (
                <g
                  key={b.id}
                  onClick={b.toggle}
                  className="cursor-pointer"
                  role="button"
                  tabIndex={0}
                >
                  <path
                    d={inPath}
                    fill="none"
                    stroke={pipeColor}
                    strokeWidth="3"
                    strokeOpacity="0.65"
                  />
                  <path
                    d={outPath}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={b.active ? "3.5" : "2.5"}
                    strokeDasharray={b.active ? undefined : "6 5"}
                    strokeOpacity="0.9"
                  />
                  <circle r="4.5" fill={b.active ? pipeColor : "#f87171"}>
                    <animateMotion
                      dur={`${1.5 + idx * 0.18}s`}
                      repeatCount="indefinite"
                      path={outPath}
                    />
                  </circle>
                  <circle r="3.5" fill={pipeColor}>
                    <animateMotion
                      dur={`${1.3 + idx * 0.15}s`}
                      repeatCount="indefinite"
                      path={inPath}
                    />
                  </circle>
                  <rect
                    x="315"
                    y={y - 19}
                    width="270"
                    height="38"
                    rx="8"
                    fill={b.active ? "#0f172a" : "#2a0a0a"}
                    stroke={strokeColor}
                    strokeWidth="1.8"
                  />
                  <text
                    x="327"
                    y={y - 3}
                    fill="#f8fafc"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    {idx + 1}. {b.label}
                  </text>
                  <text
                    x="327"
                    y={y + 12}
                    fill="#94a3b8"
                    fontSize="9.5"
                    fontFamily="monospace"
                  >
                    {b.org}
                  </text>
                  <text
                    x="573"
                    y={y - 2}
                    textAnchor="end"
                    fill={b.active ? "#34d399" : "#f87171"}
                    fontSize="12"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    ${b.amount.toLocaleString()}
                  </text>
                  <text
                    x="573"
                    y={y + 12}
                    textAnchor="end"
                    fill={b.active ? "#6ee7b7" : "#fca5a5"}
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    {b.active ? "OPEN -> BANK" : "CLOSED -> LEAK"}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {royaltyBuckets.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={b.toggle}
              className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                b.active
                  ? "border-emerald-500/50 bg-emerald-950/20"
                  : "border-red-500/40 bg-red-950/10 opacity-85"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-mono uppercase text-muted-foreground">
                    {b.org}
                  </span>
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      b.active
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {b.active ? "COLLECTED" : "UNCOLLECTED"}
                  </span>
                </div>
                <div className="font-bold text-sm text-foreground mb-1">
                  {b.label}
                </div>
                <p className="text-xs text-muted-foreground mb-3">{b.note}</p>
              </div>
              <div className="text-2xl font-mono font-bold text-foreground">
                ${b.amount.toLocaleString()}
              </div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-background border border-border">
          <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            <div>
              <div className="text-xs font-mono uppercase text-emerald-300">
                Royalties Paid to You
              </div>
              <div className="text-xs text-muted-foreground">
                Active pipelines Depositing to Your Bank
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400">
              ${totalCollected.toLocaleString()}
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/30">
            <div>
              <div className="text-xs font-mono uppercase text-red-300">
                Royalties Left on the Table
              </div>
              <div className="text-xs text-muted-foreground">
                Sitting in Unmatched Pools (MLC / PRO / SoundExchange)
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-red-400">
              ${totalMissed.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* 5. ANIMATED ARCHITECTURE DIAGRAMS */}
      <div
        id="architecture-diagrams"
        className="rounded-2xl bg-card border border-border p-6 sm:p-8 shadow-lg"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
              Visual Reference Maps
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold mt-1">
              Animated Royalty &amp; Copyright Flowcharts
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { id: "ecosystem" as const, label: "1. Two Copyrights & 4 Pipelines" },
              { id: "copyright" as const, label: "2. U.S. Copyright Decision Tree" },
              { id: "pro" as const, label: "3. ASCAP vs. BMI Splits" },
              { id: "pipeline" as const, label: "4. 6-Step Release Sequence" },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setDiagramTab(t.id)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition ${
                  diagramTab === t.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-background border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl overflow-hidden border border-border bg-black">
          {diagramTab === "ecosystem" && (
            <img
              src="/diagrams/royalty-ecosystem.svg"
              alt="The Two Copyrights in Every Song and the 4 Royalty Pipelines"
              className="w-full h-auto block"
            />
          )}
          {diagramTab === "copyright" && (
            <img
              src="/diagrams/copyright-decision-tree.svg"
              alt="U.S. Copyright Office Registration Decision Tree and 2026 Fees"
              className="w-full h-auto block"
            />
          )}
          {diagramTab === "pro" && (
            <img
              src="/diagrams/pro-writer-publisher-split.svg"
              alt="ASCAP vs BMI and the 50% Writer / 50% Publisher Split"
              className="w-full h-auto block"
            />
          )}
          {diagramTab === "pipeline" && (
            <img
              src="/diagrams/release-checklist-pipeline.svg"
              alt="Complete 6-Step Song Release Pipeline: IPI, ISRC, UPC, and ISWC"
              className="w-full h-auto block"
            />
          )}
        </div>
      </div>
    </div>
  );
}
