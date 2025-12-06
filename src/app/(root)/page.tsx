import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import WelcomeSection from "@/components/WelcomeSection";
import ServiceSection from "@/components/ServiceSection";
import ContactSection from "@/components/ContactSection";
import StrategySection from "@/components/StrategySection";
import SpecialtiesSection from "@/components/SpecialtiesSection";
import ParallaxSection from "@/components/ParallaxSection";
import TestimonialSection from "@/components/TestimonialSection";
import { strategyStepsHome } from "@/lib/constants";
import PromoPopup from "@/components/PromoPopup";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Medical Billing Services in USA - MI MedCare",
  description:
    "MI MedCare LLC offers expert medical billing and revenue cycle management services, helping healthcare providers maximize reimbursements and streamline operations.",
};

const Home = () => {
  return (
    <>
      <PromoPopup />
      <HeroSection />
      <ExperienceSection />
      <WelcomeSection />
      <ServiceSection />
      <ContactSection />
      <StrategySection
        title="How It Works"
        desc="Smart Processes. Real Results. Reliable Payments"
        steps={strategyStepsHome}
      />
      <SpecialtiesSection />
      <ParallaxSection
        title="Take the First Step Toward Smarter Billing Today"
        desc=" Let’s streamline your revenue cycle, reduce denials, and improve cash
          flow — starting now."
        cta="Contact Us Now"
        bgImage="toward-home"
        href="#-contact-section"
      />
      <TestimonialSection />
    </>
  );
};

export default Home;
