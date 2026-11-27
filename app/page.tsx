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
import { ReactiveShell } from "@/components/ReactiveShell";
import { SpeakersSection } from "@/components/SpeakersSection";

export default function HomePage() {
  return (
    <ReactiveShell>
      <div className="flex min-h-screen flex-col bg-void">
        <Navbar />
        <main id="main-content" className="flex-1">
          <Hero />
          <AboutSection />
          <DaysSection />
          <SpeakersSection />
          <JudgingSection />
          <PrizesSection />
          <PassesSection />
          <LegacyHoneycombSection />
          <FaqSection />
          <CoordinatorsSection />
        </main>
        <Footer />
      </div>
    </ReactiveShell>
  );
}
