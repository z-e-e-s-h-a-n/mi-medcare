import HeroSection from "@components/root/HeroSection";
import ExperienceSection from "@components/root/ExperienceSection";
import WelcomeSection from "@components/root/WelcomeSection";
import ServiceSection from "@components/root/ServiceSection";
import ContactSection from "@components/root/ContactSection";
import StrategySection from "@components/root/StrategySection";
import SpecialtiesSection from "@components/root/SpecialtiesSection";
import ParallaxSection from "@components/root/ParallaxSection";
import TestimonialSection from "@components/root/TestimonialSection";
import { strategyStepsHome } from "@constants/content";
import PromoPopup from "@components/root/PromoPopup";
import EHRsSection from "@components/root/EHRsSection";

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
      <EHRsSection
        title="We work with these EHRs"
        desc="Our medical billing specialists know the workarounds of all the EHRs. We
        help you submit clean claims no matter which EHR you use."
        length={6}
      />
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
