import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { CredentialsStrip } from "@/components/CredentialsStrip";
import { TriageWizard } from "@/components/TriageWizard";
import { SpecialtiesBento } from "@/components/SpecialtiesBento";
import { PhilosophyBand } from "@/components/PhilosophyBand";
import { KnowledgeHub } from "@/components/KnowledgeHub";
import { TrainingPortal } from "@/components/TrainingPortal";
import { CommunitySection } from "@/components/CommunitySection";
import { BranchesBookingHub } from "@/components/BranchesBookingHub";
import { FooterAndMobileDock } from "@/components/FooterAndMobileDock";

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)]">
        <Navbar />
        <main>
          <HeroSection />
          <CredentialsStrip />
          <TriageWizard />
          <SpecialtiesBento />
          <PhilosophyBand />
          <KnowledgeHub />
          <TrainingPortal />
          <CommunitySection />
          <BranchesBookingHub />
        </main>
        <FooterAndMobileDock />
      </div>
    </SmoothScrollProvider>
  );
}
