import type { Metadata } from "next";
import { Unbounded, Manrope } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/MotionProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { EVENT, getDisplayVenue } from "@/data/event";

const unbounded = Unbounded({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
      className={`${unbounded.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-void text-mist font-sans selection:bg-violet selection:text-mist">
        <ThemeProvider>
          <MotionProvider>{children}</MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
