import OverlayCard from "@/components/OverlayCard";
import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Globe,
  Goal,
  Hospital,
  Lightbulb,
  NotebookPen,
  Send,
} from "lucide-react";
import ParallaxSection from "@/components/ParallaxSection";
import StrategySection from "@/components/StrategySection";
import { strategyStepsAbout } from "@/lib/constants";

const AboutPage = () => {
  return (
    <>
      <PageHeader title="About Us" bgImage="about" />
      <section className="text-center space-y-6">
        <span className="subtitle">Welcome To MimedcareLLC</span>
        <h3>
          Dedicated to Delivering Reliable Billing Solutions for Every Practice
        </h3>
        <div className="flex flex-col md:flex-row md:items-center text-left space-y-16">
          <div className="relative basis-full md:basis-1/2 p-8">
            <Image
              src="/images/growth.webp"
              alt="Revenue Growth"
              width={500}
              height={500}
            />
            <OverlayCard
              title="+200"
              desc="Successful Claims Processed Monthly"
            />
          </div>
          <div className="basis-full md:basis-1/2 space-y-6">
            <h4 className="text-2xl font-medium">
              We Always Ensure Accuracy, Compliance, and Revenue Growth for Your
              Practice
            </h4>
            <div className="space-y-4">
              <p>
                <strong> Mi MedCare LLC</strong>, we simplify healthcare billing
                by handling every step of your revenue cycle — from patient
                registration and coding to claim submission, denial management,
                and payment posting. Our experienced team ensures that every
                claim is accurate, compliant, and paid faster.
              </p>

              <p>
                We also support providers with credentialing, prior
                authorizations, and reporting, helping your practice stay
                financially healthy while maintaining complete transparency.
              </p>

              <ul className="dot-list text-sm">
                <li>
                  Precise Medical Billing & Coding for faster reimbursements
                </li>
                <li> Complete Credentialing & Provider Enrollment</li>
                <li> Proactive A/R & Denial Management</li>
                <li> Full Revenue Cycle Management (RCM) support</li>
                <li> Secure Patient Billing & Support Services</li>
                <li> Insightful Reporting & Analytics Dashboards</li>
                <li> Efficient Front Desk & Prior Authorization Solutions</li>
                <li> Free Billing Audit & IT / EHR Integration Assistance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section>
        <Tabs defaultValue="philosophy">
          <TabsList className="w-full mb-4 bg-transparent gap-8">
            <TabsTrigger
              value="philosophy"
              className="bg-secondary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground p-5 rounded-2xl text-lg gap-3"
            >
              <Globe /> Philosophy
            </TabsTrigger>
            <TabsTrigger
              value="vision"
              className="bg-secondary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground p-5 rounded-2xl text-lg gap-3"
            >
              <Goal /> Our Vision
            </TabsTrigger>
            <TabsTrigger
              value="mission"
              className="bg-secondary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground p-5 rounded-2xl text-lg gap-3"
            >
              <Send /> Our Mission
            </TabsTrigger>
          </TabsList>
          <TabsContent value="philosophy">
            <strong>Mi MedCare LLC</strong>, our philosophy is simple accuracy,
            transparency, and trust. We believe every healthcare provider
            deserves a smooth and reliable revenue cycle that lets them focus on
            what truly matters: patient care. Our team works as an extension of
            your practice, following a detail oriented approach that ensures
            each claim is coded, submitted, and paid correctly the first time.
          </TabsContent>
          <TabsContent value="vision">
            To be a nationwide leader in
            <strong>medical billing and revenue cycle management</strong>,
            empowering healthcare practices with efficient, data driven, and
            compliant billing solutions. We envision a healthcare system where
            providers are free from administrative burdens, and every dollar
            earned through quality patient care is reimbursed promptly and
            fairly.
          </TabsContent>
          <TabsContent value="mission">
            Our mission is to deliver{" "}
            <strong>seamless billing operations</strong> that help clinics,
            hospitals, and telehealth providers maximize reimbursements while
            minimizing denials. We achieve this through cutting edge technology,
            expert teams, and a customer-first mindset ensuring compliance,
            accuracy, and financial growth for every partner we serve.
          </TabsContent>
        </Tabs>
      </section>
      <ParallaxSection
        title="Take the First Step Toward Simplified Medical Billing"
        desc={
          <p>
            Partner with <strong>Mi MedCare LLC</strong> to streamline your
            revenue cycle, reduce denials, and ensure faster reimbursements.{" "}
            <br />
            Our experts are ready to handle your billing while you focus on
            quality patient care.
          </p>
        }
        cta="Contact Us Now"
        bgImage="toward-about"
        position="right"
      />
      <StrategySection
        title="How It Works"
        desc="How MimedCare LLC Simplifies Your Billing Process"
        steps={strategyStepsAbout}
      />
      <section className="flex flex-col md:flex-row md:justify-between [&>div]:basis-1/2 bg-primary/10 py-24">
        <div className="space-y-4 pr-16">
          <span className="subtitle">Why Choose Us</span>
          <h2 className="text-4xl">
            Your Practice, Our Commitment to Excellence
          </h2>
          <ul className="space-y-2">
            <li className="relative flex py-5 border-b ">
              <div className="w-10/12">
                <h3 className="text-2xl font-medium">
                  Certified and Experienced Billing Professionals
                </h3>
                <p>
                  Our team of certified medical billers and coders brings deep
                  industry expertise to every specialty. We follow strict
                  compliance standards to ensure every claim is accurate,
                  timely, and fully reimbursed.
                </p>
              </div>
              <NotebookPen className="text-primary size-10 absolute right-0" />
            </li>
            <li className="relative flex py-5 border-b ">
              <div className="w-10/12">
                <h3 className="text-2xl font-medium">
                  Comprehensive Revenue Cycle Services Under One Roof
                </h3>
                <p>
                  From credentialing and charge entry to A/R management and
                  reporting, Mi MedCare LLC offers end-to-end billing solutions
                  that simplify your workflow and improve cash flow.
                </p>
              </div>
              <Hospital className="text-primary size-10 absolute right-0" />
            </li>
            <li className="relative flex py-5 border-b ">
              <div className="w-10/12">
                <h3 className="text-2xl font-medium">
                  Commitment to Accuracy, Quality, and Innovation
                </h3>
                <p>
                  Our proactive approach minimizes denials and maximizes your
                  revenue every single day.
                </p>
              </div>
              <Lightbulb className="text-primary size-10 absolute right-0" />
            </li>
          </ul>
        </div>
        <div className="relative flex flex-col gap-5">
          <Image
            src="/images/why-choose-right-top.webp"
            alt="Why Choose Us"
            width={600}
            height={400}
            className="rounded-2xl"
          />
          <div className="flex flex-col p-8 rounded-2xl bg-black text-white max-w-[300px]">
            <span className="text-[44px] font-semibold">99 %</span>
            <span className="text-xl font-medium">Satisfied Clients</span>
            <p>
              With consistent performance, clear communication, and real
              results, <br /> <strong>Mi MedCare LLC</strong> proudly maintains
              a 99% client-retention rate across practices nationwide.
            </p>
          </div>
          <Image
            src="/images/why-choose-right-bottom.webp"
            alt="Why Choose Us"
            width={280}
            height={420}
            className="rounded-2xl absolute right-0 bottom-0"
          />
        </div>
      </section>
    </>
  );
};

export default AboutPage;
