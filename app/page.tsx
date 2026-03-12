import dynamic from "next/dynamic";

import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { TrustSection } from "@/components/trust-section";
import { FeaturesSection } from "@/components/features-section";

const CarouselSection = dynamic(
  () => import("@/components/carousel-section").then((mod) => mod.CarouselSection),
  {
    loading: () => <div className="h-96 bg-[#FAFAF9]" />,
  },
);

const TemplatesSection = dynamic(
  () => import("@/components/templates-section").then((mod) => mod.TemplatesSection),
  {
    loading: () => <div className="h-96 bg-white" />,
  },
);

const HowItWorksSection = dynamic(
  () => import("@/components/sections").then((mod) => mod.HowItWorksSection),
);
const CTASection = dynamic(
  () => import("@/components/sections").then((mod) => mod.CTASection),
);
const FAQSection = dynamic(
  () => import("@/components/sections").then((mod) => mod.FAQSection),
);
const Footer = dynamic(() => import("@/components/sections").then((mod) => mod.Footer));

export default function Home() {
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
