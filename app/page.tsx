import { AboutSection } from "@/components/AboutSection";
import { CoordinatorsSection } from "@/components/CoordinatorsSection";
import { DaysSection } from "@/components/DaysSection";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { JudgingSection } from "@/components/JudgingSection";
import { Navbar } from "@/components/Navbar";
import { PassesSection } from "@/components/PassesSection";
import { PrizesSection } from "@/components/PrizesSection";
import { ScheduleSection } from "@/components/ScheduleSection";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main id="main-content" className="flex-1">
        <Hero />
        <AboutSection />
        <DaysSection />
        <ScheduleSection />
        <JudgingSection />
        <PrizesSection />
        <PassesSection />
        <FaqSection />
        <CoordinatorsSection />
      </main>
      <Footer />
    </div>
  );
}
