import { AboutSection } from "@/components/AboutSection";
import { CoordinatorsSection } from "@/components/CoordinatorsSection";
import { DaysSection } from "@/components/DaysSection";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { JudgingSection } from "@/components/JudgingSection";
import { LegacyHoneycombSection } from "@/components/LegacyHoneycombSection";
import { Navbar } from "@/components/Navbar";
import { PassesSection } from "@/components/PassesSection";
import { PrizesSection } from "@/components/PrizesSection";
import { PullSection } from "@/components/PullSection";
import { ReactiveShell } from "@/components/ReactiveShell";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SpeakersSection } from "@/components/SpeakersSection";
import { SponsorsPartnersSection } from "@/components/SponsorsPartnersSection";

export default function HomePage() {
  return (
    <ReactiveShell>
      <div className="flex min-h-screen flex-col bg-void">
        <Navbar />
        <ScrollToTop />
        <main id="main-content" className="relative flex-1">
          {/* Hero cover (z-30) — scrolls away to reveal fixed About beneath */}
          <div className="relative z-30 bg-void">
            <Hero />
          </div>

          {/* Runway while fixed About is in view; targets #about nav / Explore */}
          <div
            id="about"
            className="pointer-events-none relative z-[1] h-[110svh] w-full scroll-mt-24 md:h-[100svh]"
            aria-hidden="true"
          />

          {/*
            Pechacks pattern: About is fixed under the hero. As the hero lifts
            away, About is revealed. Later PullSections (higher z) slide over it.
          */}
          <div className="fixed inset-0 z-0 overflow-y-auto bg-void">
            <div className="min-h-full pt-24 pb-16 sm:pt-28 sm:pb-20">
              <AboutSection />
            </div>
          </div>

          <PullSection zIndex={40} tone="deep">
            <DaysSection />
          </PullSection>

          <PullSection zIndex={50} tone="void">
            <SpeakersSection />
          </PullSection>

          <PullSection zIndex={60} tone="deep">
            <JudgingSection />
          </PullSection>

          <PullSection zIndex={70} tone="void">
            <PrizesSection />
          </PullSection>

          <PullSection zIndex={80} tone="deep">
            <PassesSection />
          </PullSection>

          <PullSection zIndex={90} tone="void">
            <LegacyHoneycombSection />
          </PullSection>

          <PullSection zIndex={100} tone="deep">
            <SponsorsPartnersSection />
          </PullSection>

          <PullSection zIndex={110} tone="void">
            <FaqSection />
          </PullSection>

          <PullSection zIndex={120} tone="deep">
            <CoordinatorsSection />
          </PullSection>

          <PullSection zIndex={130} tone="void">
            <Footer />
          </PullSection>
        </main>
      </div>
    </ReactiveShell>
  );
}
