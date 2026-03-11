import type { LucideIcon } from "lucide-react";
import { IconCpu, IconChartLine, IconPlug } from "@tabler/icons-react";

export type TechnologyPillar = {
  id: "ai-automation" | "analytics" | "integrations";
  title: string;
  slug: string;
  description: string;
  hero: string;
  highlights: string[];
  icon: LucideIcon;
};

export const TECHNOLOGY_PILLARS: TechnologyPillar[] = [
  {
    id: "ai-automation",
    title: "AI Automation",
    slug: "ai-automation",
    description:
      "Robots and AI guard every claim, running error checks, prioritizing denials, and routing work to specialists before submission.",
    hero:
      "Intelligent automation reduces manual work by orchestrating claim scrubbing, denial prediction, and payer follow-up while human coders focus on complex cases.",
    highlights: [
      "Claim validation and payer-rule scraping before transmission.",
      "Denial prediction and RPA-driven appeals that recover revenue faster.",
      "Smart workload balancing that shifts routine tasks from billers to automation bots.",
    ],
    icon: IconCpu,
  },
  {
    id: "analytics",
    title: "Analytics & Reporting",
    slug: "analytics",
    description:
      "Role-based dashboards translate granular billing data into actionable KPIs, financial snapshots, and audit-ready reports.",
    hero:
      "Realtime insights help leadership see clean claim rate, AR aging, and payer mix shifts without waiting for monthly reports.",
    highlights: [
      "Custom dashboards for administrators, clinicians, and finance teams.",
      "Clean claim, denial, and net collection KPIs that update multiple times per day.",
      "Ad-hoc exports so CFOs can dig into payer-level and provider-level performance.",
    ],
    icon: IconChartLine,
  },
  {
    id: "integrations",
    title: "EHR Integrations",
    slug: "integrations",
    description:
      "We connect with every major and niche EHR/practice management system so data flows instead of being re-keyed.",
    hero:
      "Secure APIs, HL7, and custom connectors keep scheduling, eligibility, visit details, and claims synchronized with your EMR provider.",
    highlights: [
      "Pre-built connections for Epic, Cerner, Athenahealth, and dozens more.",
      "Bi-directional data sync that keeps demographics, eligibility, and charge capture aligned.",
      "API-first tooling that lets us integrate with home-grown or legacy platforms with minimal disruption.",
    ],
    icon: IconPlug,
  },
];
