import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import WhatWeBuild from "@/components/sections/WhatWeBuild";
import Portfolio from "@/components/sections/Portfolio";
import ProcessSection from "@/components/sections/ProcessSection";
import VerificationSection from "@/components/sections/VerificationSection";
import LeadForm from "@/components/sections/LeadForm";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import StickyBar from "@/components/ui/StickyBar";
import RecentEnquiry from "@/components/ui/RecentEnquiry";
import ExitPopup from "@/components/ui/ExitPopup";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <WhatWeBuild />
        <Portfolio />
        <ProcessSection />
        <TestimonialsSection />
        <VerificationSection />
        <LeadForm />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <StickyBar />
      <RecentEnquiry />
      <ExitPopup />
    </>
  );
}
