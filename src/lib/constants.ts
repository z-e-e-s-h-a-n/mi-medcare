import {
  Bandage,
  Bed,
  Bone,
  BookPlus,
  Brain,
  Droplet,
  Eye,
  Flower,
  Hammer,
  Hand,
  Heart,
  HeartHandshake,
  HeartPulse,
  Home,
  PersonStanding,
  Pill,
  Speech,
  SquarePercent,
  Stethoscope,
  Sun,
  Syringe,
  TestTubeDiagonal,
  Trophy,
  User,
  Utensils,
  Video,
} from "lucide-react";

export const strategyStepsHome = [
  {
    title: "Request a Demo",
    desc: "Tell us about your practice and revenue goals we’ll show a customized plan.",
  },
  {
    title: "Audit, Submit & Follow-up",
    desc: "We validate claims, submit to payers, and handle denials until paid.",
  },
  {
    title: "Recover & Report",
    desc: "We maximize reimbursements, reconcile payments, and deliver monthly insights.",
  },
];

export const strategyStepsAbout = [
  {
    title: "Book a Free Consultation",
    desc: "Discuss your billing goals with our experts to identify improvement areas and streamline your workflow.",
  },
  {
    title: "Credentialing & Setup",
    desc: "We handle provider enrollment, EHR setup, and compliance so your billing process runs smoothly from day one.",
  },
  {
    title: "Billing Operations",
    desc: "Our team starts managing claims, payments, and A/R while you stay focused on patient care.",
  },
];

export const servicesMenu = [
  {
    title: "Medical Billing & Coding",
    href: "/services/medical-billing-coding",
    desc: "Mi MedCare LLC provides comprehensive billing and coding services to ensure all claims are accurate, compliant, and processed efficiently.",
    services: [
      {
        title: "Patient Info Entry",
        desc: "Accurate patient and insurance information is entered into the system to avoid claim errors.",
        icon: Trophy,
      },
      {
        title: "Eligibility Check",
        desc: "Insurance coverage is verified before claims are processed to reduce rejections.",
        icon: Syringe,
      },
      {
        title: "Coding (CPT/ICD-10)",
        desc: "Certified coders assign correct diagnosis and procedure codes.",
        icon: HeartPulse,
      },
      {
        title: "Charge Entry",
        desc: "Every charge is entered accurately to reflect all services rendered.",
        icon: Bandage,
      },
      {
        title: "Claim Submission",
        desc: "Clean claims are submitted electronically for faster reimbursement.",
        icon: Stethoscope,
      },
      {
        title: "Scrubbing",
        desc: "Claims are thoroughly checked for errors before submission.",
        icon: HeartHandshake,
      },
      {
        title: "Rejection Handling",
        desc: "Rejected claims are corrected and promptly resubmitted.",
        icon: Speech,
      },
      {
        title: "Payment Posting",
        desc: "Payments and adjustments are recorded accurately for tracking.",
        icon: Brain,
      },
      {
        title: "Denial Follow-up",
        desc: "Denied claims are reviewed and resolved to recover missed revenue.",
        icon: Brain,
      },
      {
        title: "Reporting",
        desc: "Regular billing reports are provided for full transparency and insights.",
        icon: Brain,
      },
    ],
  },
  {
    title: "Credentialing & Provider Enrolment",
    href: "/services/credentialing-provider-enrolment",
    desc: "Mi MedCare LLC handles complete credentialing and provider enrollment, allowing healthcare professionals to join payer networks and start billing smoothly",
    services: [
      {
        title: "Application Prep",
        desc: "We collect and verify provider data and required documentation.",
        icon: Trophy,
      },
      {
        title: "CAQH Setup",
        desc: "Provider CAQH profiles are created, maintained, and regularly updated.",
        icon: Syringe,
      },
      {
        title: "NPI Registration",
        desc: "NPI numbers are applied for or updated for compliance.",
        icon: HeartPulse,
      },
      {
        title: "Payer Enrollment",
        desc: "Providers are enrolled with Medicare, Medicaid, and major commercial payers.",
        icon: Bandage,
      },
      {
        title: "Recredentialing",
        desc: "Timely renewals ensure providers remain active with all payers.",
        icon: Stethoscope,
      },
      {
        title: "Provider Data Updates",
        desc: "All demographic or practice information is updated as needed.",
        icon: HeartHandshake,
      },
      {
        title: "Contract Review",
        desc: "Payer contracts are reviewed to ensure favorable terms.",
        icon: Speech,
      },
      {
        title: "Status Tracking",
        desc: "Every enrollment application is tracked until approved.",
        icon: Brain,
      },
    ],
  },
  {
    title: "Accounts Receivable (A/R) Management",
    href: "/services/accounts-receivable-ar-management",
    desc: "Mi MedCare LLC manages the entire A/R process to minimize outstanding balances and maximize cash flow for healthcare practices.",
    services: [
      {
        title: "Aging Review",
        desc: "Unpaid claims are categorized and reviewed by age for tracking.",
        icon: Trophy,
      },
      {
        title: "Follow-ups",
        desc: "Our team contacts payers regularly to resolve pending payments.",
        icon: Syringe,
      },
      {
        title: "Denial Appeals",
        desc: "Denied or underpaid claims are analyzed, corrected, and appealed.",
        icon: HeartPulse,
      },
      {
        title: "Payment Reconciliation",
        desc: "Payments are verified and matched to claims for accuracy.",
        icon: Bandage,
      },
      {
        title: "Write-off Review",
        desc: "Adjustments are reviewed and approved before posting.",
        icon: Stethoscope,
      },
      {
        title: "Patient Collections",
        desc: "Patient balances are communicated clearly and professionally.",
        icon: HeartHandshake,
      },
      {
        title: "Re-submission",
        desc: "Corrected claims are resubmitted quickly to recover lost revenue.",
        icon: Speech,
      },
      {
        title: "A/R Reporting",
        desc: "Detailed reports provide insights into recovery and financial performance.",
        icon: Brain,
      },
    ],
  },
  {
    title: "Revenue Cycle Management (RCM)",
    href: "/services/revenue-cycle-management-rcm",
    desc: "Mi MedCare LLC provides end-to-end RCM solutions covering every stage from patient registration to payment posting, ensuring efficient revenue collection.",
    services: [
      {
        title: "Patient Registration",
        desc: "Accurate patient and insurance details are captured at intake.",
        icon: Trophy,
      },
      {
        title: "Eligibility Verification",
        desc: "Coverage is confirmed before appointments to prevent denials.",
        icon: Syringe,
      },
      {
        title: "Coding Compliance",
        desc: "Coding accuracy is ensured according to payer guidelines.",
        icon: HeartPulse,
      },
      {
        title: "Charge Capture",
        desc: "All billable services are recorded for full reimbursement.",
        icon: Bandage,
      },
      {
        title: "Claim Submission",
        desc: "Compliant claims are filed electronically without delay.",
        icon: Stethoscope,
      },
      {
        title: "Payment Reconciliation",
        desc: "Incoming payments are tracked and verified.",
        icon: HeartHandshake,
      },
      {
        title: "Denial Resolution",
        desc: "Denied claims are corrected and resubmitted promptly.",
        icon: Speech,
      },
      {
        title: "Reporting",
        desc: "Revenue cycle reports highlight performance and improvement areas.",
        icon: Brain,
      },
      {
        title: "Process Optimization",
        desc: "Workflows are regularly evaluated for better efficiency.",
        icon: Brain,
      },
    ],
  },
  {
    title: "Patient Billing Support",
    href: "/services/patient-billing-support",
    desc: "Mi MedCare LLC assists patients with transparent and supportive billing solutions to promote timelypayments and better understanding.",
    services: [
      {
        title: "Statement Creation",
        desc: "Clear, itemized bills are sent to patients for easy review.",
        icon: Trophy,
      },
      {
        title: "Payment Plans",
        desc: "Flexible payment options are offered to manage outstanding balances.",
        icon: Syringe,
      },
      {
        title: "Balance Support",
        desc: "Patients receive help understanding what they owe and why.",
        icon: HeartPulse,
      },
      {
        title: "Call Support",
        desc: "A billing support line is available to answer patient questions.",
        icon: Bandage,
      },
      {
        title: "Payment Posting",
        desc: "All patient transactions are accurately recorded.",
        icon: Stethoscope,
      },
      {
        title: "Refunds",
        desc: "Overpayments or duplicate payments are handled promptly.",
        icon: HeartHandshake,
      },
      {
        title: "Education",
        desc: "Patients are guided through insurance and billing terminology.",
        icon: Speech,
      },
      {
        title: "Feedback",
        desc: "Feedback is collected to continuously improve service quality.",
        icon: Brain,
      },
    ],
  },
  {
    title: "Report & Analysis",
    href: "/services/report-analysis",
    desc: "Mi MedCare LLC delivers detailed financial and performance reporting, helping providers make informed business decisions.",
    services: [
      {
        title: "Performance Reports",
        desc: "Track key billing and revenue performance metrics.",
        icon: Trophy,
      },
      {
        title: "Claim Reports",
        desc: "Review approval, denial, and pending claim rates.",
        icon: Syringe,
      },
      {
        title: "Posting Accuracy",
        desc: "Verify that every payment is recorded correctly.",
        icon: HeartPulse,
      },
      {
        title: "A/R Aging",
        desc: "Identify overdue balances across payer types.",
        icon: Bandage,
      },
      {
        title: "CEI Index",
        desc: "Measure collection effectiveness and efficiency.",
        icon: Stethoscope,
      },
      {
        title: "Forecasting",
        desc: "Use data-driven insights to project future revenue trends.",
        icon: HeartHandshake,
      },
      {
        title: "KPI Dashboards",
        desc: "Visual dashboards track clean claim rates and denial ratios.",
        icon: Speech,
      },
      {
        title: "Compliance Reports",
        desc: "Ensure HIPAA compliance and audit readiness.",
        icon: Brain,
      },
      {
        title: "Executive Summary",
        desc: "Provide top-level insights for management decisions.",
        icon: Brain,
      },
    ],
  },
  {
    title: "Front Desk Management",
    href: "/services/front-desk-management",
    desc: `Our medical billing company provides comprehensive <strong>front desk management services</strong> to ensure smooth daily operations and an excellent patient experience. From handling patient registration and appointment scheduling to verifying insurance details and managing inquiries, our trained front desk professionals ensure accuracy, efficiency, and professionalism at every step.`,
    services: [
      "Patient registration & data entry",
      "Appointment scheduling & reminders",
      "Insurance verification & eligibility checks",
      "Handling patient calls & inquiries",
      "Managing billing-related communication",
      "Coordinating with medical & billing teams",
    ],
  },
  {
    title: "Prior Authorization Services",
    href: "/services/prior-authorization-services",
    desc: "Our medical billing company offers reliable <strong>prior authorization services</strong> to help healthcare providers minimize claim denials and improve cash flow. We handle the entire process — from gathering patient and insurance details to obtaining approvals from payers — ensuring every request is submitted accurately and on time.",
    services: [
      "Verification of insurance coverage & requirements",
      "Preparation & submission of authorization requests",
      "Follow-up with insurance companies for approval status",
      "Management of re-authorizations & renewals",
      "Documentation & record maintenance",
      "Coordination with physicians & billing teams",
    ],
  },
  {
    title: "Billing Audit",
    href: "/services/billing-audit",
    desc: `At our medical billing company, we offer a <strong>free, comprehensive billing audit</strong> to help healthcare providers identify revenue leaks, coding errors, and compliance issues. Our expert auditors thoroughly review your billing process, claims history, and reimbursement patterns to ensure accuracy and efficiency.
  
    This no-cost audit gives you a clear picture of your current billing performance and practical recommendations to maximize revenue and reduce denials.`,
    subtitle: "Our Free Medical Billing Audit Includes:",
    services: [
      "Social media management & content creation",
      "Search engine optimization (SEO)",
      "Google Ads & paid campaign management",
      "Website design & development",
      "Email & SMS marketing campaigns",
      "Branding & graphic design",
      "Online reputation management",
    ],
  },
  {
    title: "Free Website Audit",
    href: "/services/free-website-audit",
    desc: "In today’s competitive healthcare landscape, a strong online presence is essential. Our company provides <strong> specialized digital marketing services</strong> designed to help medical practices, clinics, and healthcare professionals attract and retain patients effectively.",
    subtitle: "Our Digital Marketing Services Include:",
    services: [
      "Review of coding accuracy & documentation",
      "Analysis of claim submission & denial trends",
      "Evaluation of payment posting & reconciliation",
      "Identification of compliance gaps & revenue opportunities",
      "Detailed performance report with actionable insights",
    ],
  },
  {
    title: "IT Support & EHR System Integration Services",
    href: "/services/it-support-ehr-system-integration-services",
    desc: "Our medical billing company provides reliable <strong>IT support services</strong> to ensure seamless integration and smooth operation of <strong>Electronic Health Record (EHR)</strong> systems. We help healthcare providers implement, configure, and optimize their EHR platforms for improved workflow efficiency, data accuracy, and patient care coordination.",
    subtitle: "Our IT & EHR Integration Services Include:",
    services: [
      "EHR system setup, configuration & customization",
      "Integration with billing & practice management software",
      "Data migration & security management",
      "Troubleshooting & ongoing technical support",
      "Staff training & onboarding",
      "System updates & performance optimization",
    ],
  },
];

export const mainMenu = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Services",
    href: "#",
    subMenu: servicesMenu,
  },
  {
    title: "About Us",
    href: "/about",
  },
  {
    title: "Our Specialties",
    href: "/specialties",
  },
  {
    title: "Contact Us  ",
    href: "/contact",
  },
  {
    title: "Our IT Partner – JZ Solutions",
    href: "#",
  },
];

export const contactDetails = {
  address: "1401 21st ST #13807 Sacramento, CA, 95811, US",
  email: "info@mimedcarellc.com",
  phone: "+1 916-252-1833",
};

export const specialties = [
  {
    icon: Flower,
    title: "Acupuncture Billing Services",
  },
  {
    icon: Hand,
    title: "Allergy Immunology Billing Services",
  },
  {
    icon: Syringe,
    title: "Anesthesia Billing Services",
  },
  {
    icon: Brain,
    title: "Behavioral Health Billing Services",
  },
  {
    icon: Bed,
    title: "Cardiovascular Billing Services",
  },
  {
    icon: Bone,
    title: "Chiropractic Billing Services",
  },
  {
    icon: Heart,
    title: "Dentistry Billing Services",
  },
  {
    icon: Sun,
    title: "Dermatology Billing Services",
  },
  {
    icon: TestTubeDiagonal,
    title: "Endocrinology Billing Services",
  },
  {
    icon: User,
    title: "Family Medicine Billing Services",
  },
  {
    icon: Utensils,
    title: "Gastroenterology Billing Services",
  },
  {
    icon: PersonStanding,
    title: "Geriatrics Billing Services",
  },
  {
    icon: BookPlus,
    title: "Internal Medicine Billing Services",
  },
  {
    icon: Droplet,
    title: "Nephrology Billing Services",
  },
  {
    icon: Bed,
    title: "Nursing Home Billing Services",
  },
  {
    icon: Eye,
    title: "Ophthalmology Billing Services",
  },
  {
    icon: Bone,
    title: "Orthopedic Billing Services",
  },
  {
    icon: Heart,
    title: "Otolaryngology Billing Services",
  },
  {
    icon: Pill,
    title: "Pain Management Billing Services",
  },
  {
    icon: Hammer,
    title: "Pediatrics Billing Services",
  },
  {
    icon: SquarePercent,
    title: "Podiatry Billing Services",
  },
  {
    icon: Stethoscope,
    title: "Pulmonology Billing Services",
  },
  {
    icon: Bone,
    title: "Rheumatology Billing Services",
  },
  {
    icon: Video,
    title: "Telemedicine Billing Services",
  },
  {
    icon: Home,
    title: "Urgent Care Billing Services",
  },
];
