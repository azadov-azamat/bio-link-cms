'use client';

import { Navbar } from '@/components/navbar-new';
import { HeroSection } from '@/components/hero-section';
import { TrustSection } from '@/components/trust-section';
import { FeaturesSection } from '@/components/features-section';
import { CarouselSection } from '@/components/carousel-section';
import { TemplatesSection } from '@/components/templates-section';
import { HowItWorksSection, CTASection, FAQSection, Footer } from '@/components/sections';

export default function Home() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
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
    </main>
  );
}
