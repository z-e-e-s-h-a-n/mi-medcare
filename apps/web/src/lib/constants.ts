import type { NavItem } from "@/types/global";
import {
  IconChartBar,
  IconFileText,
  IconShieldCheck,
  IconRosetteDiscountCheck,
  IconClipboardCheck,
  IconAlertTriangle,
  IconWallet,
  IconCpu,
  IconChartLine,
  IconPlug,
  IconBook,
  IconBriefcase,
  IconMessageCircle,
  IconHelpCircle,
  IconUserPlus,
  IconHeartbeat,
  IconBolt,
  IconWorld,
  IconLock,
  IconUsersGroup,
  IconShield,
  IconClock,
  IconSparkles,
} from "@tabler/icons-react";

import {
  TrendingUp,
  Clock,
  Zap,
  HeartHandshake,
  FileText,
  CheckCircle,
  ArrowUpCircle,
  BarChart,
  Brain,
  Baby,
  Footprints,
  Activity,
  Droplet,
  Smile,
  Stethoscope,
  Moon,
  Syringe,
  Hand,
  Shield,
  Eye,
  Ear,
  Wind,
  Mic,
  Scissors,
  Dumbbell,
  Network,
  HeartPulse,
  Microscope,
  Flame,
  Bug,
  Users,
  Hospital,
  Apple,
  Radio,
  ClipboardCheck,
  UserCheck,
  Send,
  Wallet,
  BarChart3,
  CheckCircle2,
} from "lucide-react";

export const business = {
  name: "MI MedCare",
  legalName: "MI MedCare LLC",
  description:
    "Nationwide medical billing backed by local expertise. Redefining what it means to be a medical billing company in the U.S.",

  logoId: "121313131234563",
  logo: {
    url: "/images/logo.svg",
    altText: "Logo",
  },

  coverImageId: "9898964434567",
  coverImage: {
    url: "/images/cover.png",
    altText: "Cover Image",
  },

  faviconId: "563728222432",
  favicon: {
    url: "/images/icon.svg",
    altText: "FavIcon",
  },

  email: "info@mimedcarellc.com",
  phone: "1 916-252-1833",
  whatsapp: "1 916-252-1833",
  website: "",

  tiktok: "https://www.facebook.com/mimedcarellc",
  facebook: "https://www.facebook.com/mimedcarellc",
  instagram: "https://www.linkedin.com/in/mm-alam-freelancer",
  twitter: "https://www.facebook.com/mimedcarellc",
  linkedin: "https://www.linkedin.com/in/mm-alam-freelancer",
  youtube: "https://www.facebook.com/mimedcarellc",

  address: "1401 21st ST #13807",
  city: "Sacramento",
  state: "CA",
  country: "US",
  postalCode: "95811",

  metaTitle: "Medical Billing Services in USA",
  metaDescription:
    "MI MedCare LLC offers professional medical billing services in the USA for family practice, internal medicine, mental health & urgent care.",
};

export const COMPANY_STATS = [
  {
    label: "Value of Claims Processed",
    value: 500,
    suffix: "M+",
    prefix: "$",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-500",
  },
  {
    label: "Accounts Receivable (AR) Days",
    value: 24,
    suffix: " Days",
    prefix: "",
    icon: Clock,
    color: "from-blue-500 to-cyan-500",
  },
  {
    label: "Turn Around Time (TAT)",
    value: 48,
    suffix: " Hours",
    prefix: "",
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
  },
  {
    label: "Customer Retention",
    value: 99,
    suffix: "%",
    prefix: "",
    icon: HeartHandshake,
    color: "from-pink-500 to-rose-500",
  },
  {
    label: "Number of Claims Processed",
    value: 2700000,
    suffix: "",
    prefix: "",
    icon: FileText,
    color: "from-purple-500 to-indigo-500",
  },
  {
    label: "First Pass Clean Claims Rate",
    value: 98,
    suffix: "%",
    prefix: "",
    icon: CheckCircle,
    color: "from-green-500 to-teal-500",
  },
  {
    label: "Revenue Improvement",
    value: 0,
    suffix: "5–10%",
    prefix: "",
    icon: ArrowUpCircle,
    color: "from-indigo-500 to-purple-500",
  },
  {
    label: "Reduction in AR",
    value: 30,
    suffix: "%",
    prefix: "",
    icon: BarChart,
    color: "from-orange-500 to-red-500",
  },
];

export const TRUST_BADGES = [
    {
      icon: IconShield,
      text: "HIPAA Compliant",
      color: "blue-500",
    },
    {
      icon: IconRosetteDiscountCheck,
      text: "Certified Coders",
      color: "green-500",
    },
    {
      icon: IconClock,
      text: "24/7 Support",
      color: "purple-500",
    },
    {
      icon: IconSparkles,
      text: "AI-Powered",
      color: "orange-500",
    },
  ];

export const TRUST_METRICS = [
  {
    subtitle: "Trusted by",
    title: "500+ Healthcare Clients",
    icon: IconUsersGroup,
    color: "from-blue-500 to-cyan-500",
  },
  {
    subtitle: "Catering to",
    title: "40+ Specialties",
    icon: IconHeartbeat,
    color: "from-pink-500 to-rose-500",
  },
  {
    subtitle: "1100+ Certified",
    title: "Medical Billers & Coders",
    icon: IconClipboardCheck,
    color: "from-green-500 to-emerald-500",
  },
  {
    subtitle: "End-to-End",
    title: "RPA Billing Solutions",
    icon: IconCpu,
    color: "from-purple-500 to-indigo-500",
  },
  {
    subtitle: "Up to 98% First Pass",
    title: "Clean Claim Rate",
    icon: CheckCircle,
    color: "from-orange-500 to-red-500",
  },
];

export const KPI_HIGHLIGHTS = [
  {
    label: "Average AR Days",
    value: "24",
    icon: Zap,
    color: "from-blue-500 to-cyan-500",
  },
  {
    label: "Clean Claim Rate",
    value: "98%",
    icon: CheckCircle2,
    color: "from-green-500 to-emerald-500",
  },
  {
    label: "Revenue Increase",
    value: "5-10%",
    icon: TrendingUp,
    color: "from-purple-500 to-pink-500",
  },
  {
    label: "Claims Processed",
    value: "2.7M+",
    icon: BarChart3,
    color: "from-orange-500 to-red-500",
  },
];

export const EHR_SYSTEMS = [
  { name: "Allscripts", logo: "/images/ehrs/Allscripts.jpg" },
  { name: "AdvancedMD", logo: "/images/ehrs/advanceMd.jpg" },
  { name: "Altera", logo: "/images/ehrs/Altera.jpg" },
  { name: "Amazing Charts", logo: "/images/ehrs/amazingCharts.jpg" },
  { name: "Athenahealth", logo: "/images/ehrs/athenahealth.jpg" },
  { name: "CareCloud", logo: "/images/ehrs/careCloud.jpg" },
  { name: "CollaborateMD", logo: "/images/ehrs/Collaborate-MD.jpg" },
  { name: "eClinicalWorks", logo: "/images/ehrs/eClinicalWorks.jpg" },
  { name: "EMDs", logo: "/images/ehrs/EMDs.jpg" },
  { name: "Epic", logo: "/images/ehrs/Epic.jpg" },
  { name: "Evident", logo: "/images/ehrs/Evident.jpg" },
  { name: "FreeMED", logo: "/images/ehrs/Free-MED.jpg" },
  { name: "GE Healthcare", logo: "/images/ehrs/GE-Healthcare.jpg" },
  { name: "Greenway Health", logo: "/images/ehrs/Greenway-Health.jpg" },
  { name: "ICANotes", logo: "/images/ehrs/ICANotes.jpg" },
  { name: "Kareo", logo: "/images/ehrs/Kareo.jpg" },
  { name: "Medgen", logo: "/images/ehrs/medgen.jpg" },
  { name: "MedHost", logo: "/images/ehrs/MedhHost.jpg" },
  { name: "Medisoft Clinical", logo: "/images/ehrs/medisoft-clinical.jpg" },
  { name: "Mitochon", logo: "/images/ehrs/Mitochon.jpg" },
  { name: "NextGen", logo: "/images/ehrs/nextgen.jpg" },
  { name: "NextGen Healthcare", logo: "/images/ehrs/Nextgen-Healthcare.jpg" },
  { name: "NueMD", logo: "/images/ehrs/Nue-MD.jpg" },
  { name: "OpenEMR", logo: "/images/ehrs/Open-Emr.jpg" },
  { name: "OpenMRS", logo: "/images/ehrs/Open-MRS.jpg" },
  { name: "Oracle Cerner", logo: "/images/ehrs/Oracle-Cerner.jpg" },
  { name: "Practice Fusion", logo: "/images/ehrs/practice-fusion.jpg" },
  { name: "PrognoCIS", logo: "/images/ehrs/progonCIS.jpg" },
  { name: "WebChart", logo: "/images/ehrs/Web-Chart.jpg" },
  { name: "ZipChart EMR", logo: "/images/ehrs/Zip-Chart-EMR.jpg" },
];

export const SPECIALTIES = [
  {
    title: "Cardiology",
    href: "/specialties/cardiology",
    icon: IconHeartbeat,
    description: "Billing expertise for cardiology practices.",
    color: "from-red-500 to-rose-500",
  },
  {
    title: "Dermatology",
    href: "/specialties/dermatology",
    icon: IconSparkles,
    description: "Specialized dermatology revenue cycle services.",
    color: "from-amber-400 to-orange-500",
  },
  {
    title: "Orthopedics",
    href: "/specialties/orthopedics",
    icon: IconBolt,
    description: "RCM solutions designed for orthopedic clinics.",
    color: "from-amber-500 to-yellow-500",
  },
  {
    title: "Psychiatry",
    href: "/specialties/psychiatry",
    icon: IconUsersGroup,
    description: "Mental health billing and coding services.",
    color: "from-indigo-500 to-blue-500",
  },
  {
    title: "Internal Medicine",
    href: "/specialties/internal-medicine",
    icon: Stethoscope,
    description: "Comprehensive billing support for internal medicine.",
    color: "from-emerald-500 to-green-500",
  },
  {
    title: "Neurology",
    href: "/specialties/neurology",
    icon: Brain,
    description: "Accurate coding and billing for neurology services.",
    color: "from-purple-500 to-violet-500",
  },
  {
    title: "OB/GYN",
    href: "/specialties/obgyn",
    icon: Baby,
    description: "Specialized billing for obstetrics and gynecology.",
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Pediatrics",
    href: "/specialties/pediatrics",
    icon: Baby,
    description: "Complete billing solutions for pediatric practices.",
    color: "from-sky-500 to-cyan-500",
  },
  {
    title: "Podiatry",
    href: "/specialties/podiatry",
    icon: Footprints,
    description: "Expert coding and billing for podiatry services.",
    color: "from-amber-500 to-orange-600",
  },
  {
    title: "Pulmonology",
    href: "/specialties/pulmonology",
    icon: Wind,
    description: "Respiratory and pulmonary care billing expertise.",
    color: "from-cyan-500 to-teal-500",
  },
  {
    title: "Nephrology",
    href: "/specialties/nephrology",
    icon: Droplet,
    description: "Kidney care and dialysis billing services.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Urgent Care",
    href: "/specialties/urgent-care",
    icon: Activity,
    description: "Fast, accurate billing for urgent care centers.",
    color: "from-amber-500 to-orange-400",
  },
  {
    title: "Sleep Medicine",
    href: "/specialties/sleep-medicine",
    icon: Moon,
    description: "Comprehensive sleep study and disorder billing.",
    color: "from-slate-500 to-blue-500",
  },
  {
    title: "Primary Care",
    href: "/specialties/primary-care",
    icon: Stethoscope,
    description: "Full-service billing for primary care physicians.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Urology",
    href: "/specialties/urology",
    icon: Droplet,
    description: "Specialized urology practice revenue management.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Endocrinology",
    href: "/specialties/endocrinology",
    icon: Activity,
    description: "Hormone and metabolic disorder billing solutions.",
    color: "from-amber-400 to-orange-500",
  },
  {
    title: "Hand Surgery",
    href: "/specialties/hand-surgery",
    icon: Hand,
    description: "Precision coding for hand and upper extremity surgery.",
    color: "from-rose-500 to-pink-500",
  },
  {
    title: "Rheumatology",
    href: "/specialties/rheumatology",
    icon: Flame,
    description: "Arthritis and autoimmune disease billing expertise.",
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Otolaryngology (ENT)",
    href: "/specialties/ent",
    icon: Ear,
    description: "Ear, nose, and throat specialty billing services.",
    color: "from-indigo-500 to-violet-500",
  },
  {
    title: "Ophthalmology",
    href: "/specialties/ophthalmology",
    icon: Eye,
    description: "Comprehensive eye care and surgery billing.",
    color: "from-teal-500 to-emerald-500",
  },
  {
    title: "Allergy & Immunology",
    href: "/specialties/allergy-immunology",
    icon: Shield,
    description: "Allergy testing and immunotherapy billing.",
    color: "from-lime-500 to-green-500",
  },
  {
    title: "Speech Therapy",
    href: "/specialties/speech-therapy",
    icon: Mic,
    description: "Speech-language pathology billing solutions.",
    color: "from-purple-500 to-fuchsia-500",
  },
  {
    title: "General Surgery",
    href: "/specialties/general-surgery",
    icon: Scissors,
    description: "Surgical procedure coding and billing expertise.",
    color: "from-rose-400 to-red-500",
  },
  {
    title: "Physical Therapy",
    href: "/specialties/physical-therapy",
    icon: Dumbbell,
    description: "Rehabilitation and physical therapy billing.",
    color: "from-indigo-500 to-blue-500",
  },
  {
    title: "Vascular Surgery",
    href: "/specialties/vascular-surgery",
    icon: Network,
    description: "Vascular procedure and surgery billing services.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Physical Medicine",
    href: "/specialties/physical-medicine",
    icon: Activity,
    description: "PM&R and rehabilitation billing expertise.",
    color: "from-orange-400 to-amber-500",
  },
  {
    title: "Oncology",
    href: "/specialties/oncology",
    icon: Microscope,
    description: "Cancer treatment and infusion billing services.",
    color: "from-purple-600 to-indigo-600",
  },
  {
    title: "Pain Management",
    href: "/specialties/pain-management",
    icon: Flame,
    description: "Interventional pain management billing solutions.",
    color: "from-orange-500 to-amber-500",
  },
  {
    title: "Infectious Disease",
    href: "/specialties/infectious-disease",
    icon: Bug,
    description: "ID and HIV/AIDS treatment billing expertise.",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Behavioral Health",
    href: "/specialties/behavioral-health",
    icon: Users,
    description: "Mental health and counseling billing services.",
    color: "from-sky-500 to-blue-500",
  },
  {
    title: "Ambulatory Surgery",
    href: "/specialties/ambulatory-surgery",
    icon: Hospital,
    description: "ASC facility and procedure billing solutions.",
    color: "from-teal-500 to-cyan-500",
  },
  {
    title: "Gastroenterology",
    href: "/specialties/gastroenterology",
    icon: Activity,
    description: "Digestive health and endoscopy billing.",
    color: "from-red-500 to-orange-500",
  },
  {
    title: "Rehabilitative Medicine",
    href: "/specialties/rehabilitative-medicine",
    icon: HeartPulse,
    description: "Comprehensive rehab therapy billing services.",
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Neurosurgery",
    href: "/specialties/neurosurgery",
    icon: Brain,
    description: "Complex neurosurgical procedure billing.",
    color: "from-indigo-600 to-blue-600",
  },
  {
    title: "Dental",
    href: "/specialties/dental",
    icon: Smile,
    description: "Dental and oral surgery billing solutions.",
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "Medical Nutrition",
    href: "/specialties/medical-nutrition",
    icon: Apple,
    description: "Nutrition counseling and therapy billing.",
    color: "from-lime-500 to-green-500",
  },
  {
    title: "Birth Center",
    href: "/specialties/birth-center",
    icon: Baby,
    description: "Midwifery and birth center billing services.",
    color: "from-rose-400 to-pink-500",
  },
  {
    title: "Family Practice",
    href: "/specialties/family-practice",
    icon: Users,
    description: "Comprehensive family medicine billing solutions.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Radiology",
    href: "/specialties/radiology",
    icon: Radio,
    description: "Diagnostic imaging and radiology billing.",
    color: "from-cyan-500 to-sky-500",
  },
  {
    title: "Anesthesia",
    href: "/specialties/anesthesia",
    icon: Syringe,
    description: "Anesthesiology coding and billing expertise.",
    color: "from-slate-500 to-blue-500",
  },
];

export const BENEFITS_OF_CHOOSING = {
  title: "Benefits of Choosing Our Medical Billing Services",
  description:
    "Partner with us for improved financial performance and reduced administrative stress. Our expert-driven approach ensures faster reimbursements, fewer claim denials, and full compliance with healthcare regulations. Whether you're a small practice or a large healthcare system, we customize solutions that support your unique workflow and revenue goals. Let us handle your billing, so you can focus on patient care.",
  keyBenefits: [
    "Faster Claim Processing",
    "Reduced Billing Errors",
    "Improved Cash Flow",
    "HIPAA-Compliant Solutions",
    "Real-Time Reporting Access",
    "Lower Operational Costs",
    "End-to-End Support",
    "Increased Revenue Collection",
  ],
};

export const BILLING_PROCESS = [
  {
    title: "Practice Assessment",
    description:
      "We analyze your workflows, specialty requirements, and revenue goals to design a customized billing strategy.",
    icon: ClipboardCheck,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Patient Intake & Verification",
    description:
      "Patient demographics and insurance details are verified before services to prevent claim denials.",
    icon: UserCheck,
    color: "from-emerald-500 to-green-500",
  },
  {
    title: "Accurate Medical Coding",
    description:
      "Certified coders assign CPT, ICD-10, and HCPCS codes to ensure compliant and clean claims.",
    icon: FileText,
    color: "from-purple-500 to-indigo-500",
  },
  {
    title: "Fast Claim Submission",
    description:
      "Claims are electronically submitted to payers to reduce delays and improve first-pass acceptance.",
    icon: Send,
    color: "from-orange-500 to-amber-500",
  },
  {
    title: "Payment Recording",
    description:
      "Payments from insurance providers and patients are posted and reconciled accurately.",
    icon: Wallet,
    color: "from-sky-500 to-blue-500",
  },
  {
    title: "Reports & Follow-Up",
    description:
      "Detailed performance reports and denial follow-ups ensure maximum reimbursements.",
    icon: BarChart3,
    color: "from-pink-500 to-rose-500",
  },
];

export const SERVICES = [
  {
    title: "Medical Billing",
    href: "/services/medical-billing",
    description:
      "End-to-end medical billing services that improve claim acceptance and accelerate reimbursements.",
    icon: IconFileText,
    stats: "98% Clean Claims",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Revenue Cycle Management",
    href: "/services/revenue-cycle-management",
    description:
      "Complete RCM solutions covering patient intake, billing, payments, and financial reporting.",
    icon: IconChartBar,
    stats: "30% Faster Payments",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Medical Coding",
    href: "/services/medical-coding",
    description:
      "Certified coders ensure accurate ICD-10, CPT, and HCPCS coding for compliant claims.",
    icon: IconShieldCheck,
    stats: "100% Certified Coders",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Credentialing",
    href: "/services/credentialing",
    description:
      "Provider credentialing and payer enrollment to get your practice contracted faster.",
    icon: IconRosetteDiscountCheck,
    stats: "30 Days Avg.",
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Eligibility Verification",
    href: "/services/eligibility-verification",
    description:
      "Insurance eligibility and benefits verification before services are delivered.",
    icon: IconClipboardCheck,
    stats: "95% First-Pass Accuracy",
    color: "from-sky-500 to-blue-500",
  },
  {
    title: "Denial Management",
    href: "/services/denial-management",
    description:
      "Identify denial causes, correct errors, and recover lost revenue efficiently.",
    icon: IconAlertTriangle,
    stats: "40% Denial Reduction",
    color: "from-yellow-500 to-amber-500",
  },
  {
    title: "Accounts Receivable Management",
    href: "/services/accounts-receivable",
    description:
      "Aggressive AR follow-up with payers to reduce outstanding claims and improve cash flow.",
    icon: IconWallet,
    stats: "45 Days AR",
    color: "from-indigo-500 to-purple-500",
  },
  {
    title: "Payment Posting",
    href: "/services/payment-posting",
    description:
      "Accurate posting of insurance and patient payments with reconciliation.",
    icon: IconWallet,
    stats: "99% Posting Accuracy",
    color: "from-violet-500 to-indigo-500",
  },
  {
    title: "Medical Billing Audit",
    href: "/services/billing-audit",
    description:
      "Detailed audits to identify revenue leakage, compliance issues, and workflow improvements.",
    icon: IconShield,
    stats: "Revenue Leak Detection",
    color: "from-gray-500 to-slate-600",
  },
  {
    title: "Laboratory Billing",
    href: "/services/laboratory-billing",
    description:
      "Specialized billing for diagnostic labs with complex coding and payer rules.",
    icon: Microscope,
    stats: "Lab Billing Experts",
    color: "from-teal-500 to-emerald-500",
  },
  {
    title: "MIPS Consulting",
    href: "/services/mips-consulting",
    description:
      "Documentation and compliance consulting to maximize MIPS performance scores.",
    icon: BarChart3,
    stats: "Maximize MIPS Score",
    color: "from-rose-500 to-pink-500",
  },
];

export const FEATURES = [
  {
    title: "AI-Powered Automation",
    description: "Reduce manual work by 70% with intelligent automation",
    icon: IconCpu,
    stats: "70% Less Manual Work",
    color: "from-purple-500 to-fuchsia-500",
  },
  {
    title: "Real-time Analytics",
    description: "Make data-driven decisions with live dashboards",
    icon: IconChartLine,
    stats: "Real-time Insights",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Seamless Integration",
    description: "Connect with 50+ EHR systems effortlessly",
    icon: IconPlug,
    stats: "50+ Integrations",
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Fast Claim Processing",
    description: "Submit claims in minutes, not hours",
    icon: IconBolt,
    stats: "2x Faster Processing",
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "HIPAA Compliant",
    description: "Enterprise-grade security and compliance",
    icon: IconLock,
    stats: "100% Compliant",
    color: "from-indigo-500 to-blue-500",
  },
  {
    title: "Multi-Specialty Support",
    description: "Expertise across 40+ medical specialties",
    icon: IconWorld,
    stats: "40+ Specialties",
    color: "from-pink-500 to-rose-500",
  },
];

export const TESTIMONIALS = [
  {
    name: "Dr. Sarah Johnson",
    role: "Cardiology Specialist",
    content:
      "MIMedCare transformed our revenue cycle. Claim denials dropped by 40% and we're seeing payments 2x faster.",
    rating: 5,
    image: "/images/testimonials/sarah.jpg",
    practice: "HeartCare Associates",
  },
  {
    name: "Michael Chen",
    role: "Practice Administrator",
    content:
      "The AI automation has cut our administrative work by 70%. Our team can now focus on patient care.",
    rating: 5,
    image: "/images/testimonials/michael.jpg",
    practice: "Chen Medical Group",
  },
  {
    name: "Dr. Emily Rodriguez",
    role: "Dermatology",
    content:
      "Best decision we made. Their coding accuracy is unmatched and the analytics dashboard is incredible.",
    rating: 5,
    image: "/images/testimonials/emily.jpg",
    practice: "Dermatology Partners",
  },
  {
    name: "Robert Williams",
    role: "CFO, Regional Health",
    content:
      "98% clean claim rate and 45-day AR cycle. The ROI we've seen in 6 months is remarkable.",
    rating: 5,
    image: "/images/testimonials/robert.jpg",
    practice: "Regional Health System",
  },
];

export const BLOG_POSTS = [
  {
    title: "10 Ways AI is Transforming Medical Billing",
    excerpt:
      "Discover how artificial intelligence is revolutionizing revenue cycle management...",
    date: "Mar 15, 2024",
    readTime: "5 min read",
    category: "AI & Automation",
    image: "/images/blog/ai-billing.jpg",
    slug: "/blog/ai-transforming-medical-billing",
  },
  {
    title: "Maximizing Revenue in 2024: RCM Best Practices",
    excerpt:
      "Learn the latest strategies to optimize your practice's revenue cycle...",
    date: "Mar 10, 2024",
    readTime: "8 min read",
    category: "Revenue Management",
    image: "/images/blog/rcm-best-practices.jpg",
    slug: "/blog/rcm-best-practices-2024",
  },
  {
    title: "Understanding ICD-11: What Providers Need to Know",
    excerpt:
      "Get ready for the transition to ICD-11 with our comprehensive guide...",
    date: "Mar 5, 2024",
    readTime: "6 min read",
    category: "Medical Coding",
    image: "/images/blog/icd11-guide.jpg",
    slug: "/blog/icd-11-guide",
  },
];

export const FAQS = [
  {
    question: "How long does implementation take?",
    answer:
      "Most practices are fully integrated within 2-3 weeks. Our team handles the entire process with minimal disruption to your daily operations.",
  },
  {
    question: "What EHR systems do you integrate with?",
    answer:
      "We integrate with 50+ leading EHR systems including Epic, Cerner, Athenahealth, and more. Our API-first approach ensures seamless connectivity.",
  },
  {
    question: "Is my patient data secure?",
    answer:
      "Absolutely. We're HIPAA compliant with enterprise-grade encryption, regular security audits, and strict access controls.",
  },
  {
    question: "What's your pricing model?",
    answer:
      "We offer flexible pricing based on your practice size and needs. Typically, it's a percentage of collections or per-claim fee. Contact us for a custom quote.",
  },
  {
    question: "Do you support all medical specialties?",
    answer:
      "Yes, we have expertise across 40+ specialties including cardiology, dermatology, orthopedics, and more with specialty-specific coders.",
  },
  {
    question: "How do you handle denied claims?",
    answer:
      "Our AI-powered system identifies potential denials before submission. For denied claims, we have a dedicated team that appeals and recovers revenue.",
  },
  {
    question: "Will switching to your team interrupt our current billing?",
    answer:
      "No. We use a phased onboarding plan so your existing billing continues while we transition workflows, validate payer mappings, and verify reporting accuracy.",
  },
  {
    question: "Do you provide custom reporting for practice owners?",
    answer:
      "Yes. We provide role-based dashboards and custom reports covering collections, AR aging, denial trends, payer mix, and provider-level performance.",
  },
  {
    question: "Can you support multi-location practices?",
    answer:
      "Yes. We support single providers, group practices, and multi-location organizations with centralized billing operations and location-specific tracking.",
  },
  {
    question: "What specialties do you support the most?",
    answer:
      "We support 40+ specialties including primary care, cardiology, dermatology, orthopedics, behavioral health, urgent care, and surgical specialties.",
  },
];

export const CASE_STUDIES = [
  {
    title: "Cardiology Group Reduced AR by 32% in 4 Months",
    specialty: "Cardiology",
    result: "32% AR Reduction",
    timeline: "4 Months",
    summary:
      "A multi-provider cardiology group improved claim follow-up and denial workflows, reducing aging AR and accelerating monthly collections.",
    slug: "/case-studies/cardiology-ar-reduction",
  },
  {
    title: "Urgent Care Network Increased Net Collections by 18%",
    specialty: "Urgent Care",
    result: "18% Collection Growth",
    timeline: "6 Months",
    summary:
      "By tightening eligibility checks and coding QA, the practice lowered preventable denials and improved net reimbursement performance.",
    slug: "/case-studies/urgent-care-collections-growth",
  },
  {
    title: "Behavioral Health Practice Improved First-Pass Rate to 97%",
    specialty: "Behavioral Health",
    result: "97% First-Pass Rate",
    timeline: "90 Days",
    summary:
      "Targeted payer-rule setup and cleaner intake documentation helped this clinic reduce rework and speed up payment cycles.",
    slug: "/case-studies/behavioral-health-first-pass",
  },
  {
    title: "Orthopedic Center Recovered $420K in Underpaid Claims",
    specialty: "Orthopedics",
    result: "$420K Recovered",
    timeline: "5 Months",
    summary:
      "A focused underpayment review and appeal strategy uncovered missed reimbursements and recovered substantial lost revenue.",
    slug: "/case-studies/orthopedic-underpayment-recovery",
  },
];

export const HEADER_NAVIGATION: NavItem[] = [
  {
    title: "Solutions",
    children: SERVICES.slice(0, 6),

    featured: {
      title: "Complete Revenue Cycle Management Platform",
      description:
        "From eligibility verification to final payment, our end-to-end RCM services help healthcare practices increase collections and reduce administrative workload.",
      href: "/services",
      image: "/images/rcm-platform.jpg",
    },
  },

  {
    title: "Specialties",
    children: SPECIALTIES.slice(0, 6),

    featured: {
      title: `${SPECIALTIES.length}+ Medical Specialties Supported`,
      description:
        "Our teams understand the complex billing rules across dozens of healthcare specialties.",
      href: "/specialties",
      image: "/images/specialties.jpg",
    },
  },

  {
    title: "Technology",
    children: [
      {
        title: "AI Automation",
        href: "/technology/ai-automation",
        icon: IconCpu,
        description: "AI-powered automation that reduces administrative work.",
      },
      {
        title: "Analytics & Reporting",
        href: "/technology/analytics",
        icon: IconChartLine,
        description: "Real-time financial insights and performance reporting.",
      },
      {
        title: "EHR Integrations",
        href: "/technology/integrations",
        icon: IconPlug,
        description: "Seamless integration with leading EHR platforms.",
      },
    ],

    featured: {
      title: "Technology-Driven Healthcare RCM",
      description:
        "Our platform integrates analytics, automation, and AI to optimize healthcare revenue cycles.",
      href: "/technology",
      image: "/images/technology.jpg",
    },
  },

  {
    title: "Resources",
    children: [
      {
        title: "Blog",
        href: "/blogs",
        icon: IconBook,
        description:
          "Insights and articles about healthcare revenue management.",
      },
      {
        title: "Case Studies",
        href: "/case-studies",
        icon: IconBriefcase,
        description: "Success stories from healthcare providers.",
      },
      {
        title: "Testimonials",
        href: "/testimonials",
        icon: IconMessageCircle,
        description: "What our clients say about our services.",
      },
      {
        title: "FAQs",
        href: "/faqs",
        icon: IconHelpCircle,
        description: "Answers to common questions about RCM services.",
      },
    ],
  },

  {
    title: "Company",
    children: [
      {
        title: "About Us",
        href: "/about",
        description: "Learn about our mission and leadership.",
        icon: IconUsersGroup,
      },
      {
        title: "Careers",
        href: "/about/careers",
        icon: IconUserPlus,
        description: "Join our growing healthcare technology team.",
      },
      {
        title: "Compliance",
        href: "/about/compliance",
        icon: IconShieldCheck,
        description: "HIPAA-compliant processes and secure operations.",
      },
    ],
  },
];

export const FOOTER_NAVIGATION = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "Careers", href: "/about/careers" },
      { label: "News & Press", href: "/news" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Medical Billing", href: "/services/medical-billing" },
      { label: "Coding Services", href: "/services/coding" },
      {
        label: "Revenue Cycle Management",
        href: "/services/revenue-cycle-management",
      },
      { label: "Credentialing", href: "/services/credentialing" },
      { label: "AR Management", href: "/services/ar-management" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blogs" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "FAQs", href: "/faqs" },
      { label: "Compliance", href: "/about/compliance" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Client Portal", href: "/portal" },
      { label: "Technical Support", href: "/support" },
      { label: "HIPAA Compliance", href: "/hipaa" },
    ],
  },
];
