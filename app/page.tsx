"use client";

import { Navbar } from "@/components/navbar-new";
import { HeroSection } from "@/components/hero-section";
import { TrustSection } from "@/components/trust-section";
import { FeaturesSection } from "@/components/features-section";
import { CarouselSection } from "@/components/carousel-section";
import { TemplatesSection } from "@/components/templates-section";
import {
  HowItWorksSection,
  CTASection,
  FAQSection,
  Footer,
} from "@/components/sections";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    document.body.style.fontFamily =
      "'system-ui', '-apple-system', 'sans-serif'";
  }, []);
  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <Navbar />
      <HeroSection />
      <TrustSection />
      <FeaturesSection />
      <CarouselSection />
      <TemplatesSection />
      <HowItWorksSection />
      <CTASection />
      <FAQSection />
      <Footer />
    </div>
  );
}
