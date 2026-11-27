import type { Metadata } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/MotionProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { EVENT, getDisplayVenue } from "@/data/event";
import { cn } from "@/lib/utils";

/* Limegreen.studio pairing: Instrument Sans + Newsreader italic */
const instrumentSans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "MONOLITH — 21-22 December 2026 | IEEE TEMS",
  description: `A two-day student technology festival organised by ${EVENT.ORGANISER}. Lead on Day 1 at the Management Summit, build on Day 2 at the Sprintathon. ${EVENT.EVENT_DATES.shortRange}, ${getDisplayVenue()}.`,
  keywords: [
    "MONOLITH",
    "IEEE TEMS",
    "technology festival",
    "management summit",
    "sprintathon",
    "student hackathon",
  ],
  openGraph: {
    title: "MONOLITH — Two-Day Student Technology Festival",
    description:
      "Lead on Day 1, build on Day 2. Management Summit and Sprintathon on 21-22 December 2026, organised by IEEE TEMS.",
    type: "website",
    locale: "en_IN",
    siteName: "MONOLITH",
  },
  twitter: {
    card: "summary_large_image",
    title: "MONOLITH — 21-22 December 2026",
    description:
      "A two-day student technology festival by IEEE TEMS. Lead on Day 1, build on Day 2.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={cn(
        "h-full antialiased font-sans",
        instrumentSans.variable,
        newsreader.variable,
      )}
    >
      <body className="min-h-full bg-void font-sans text-mist">
        <ThemeProvider>
          <MotionProvider>{children}</MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
