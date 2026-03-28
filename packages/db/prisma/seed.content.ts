import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, PostStatus, UserRole } from "./generated/client";

const connectionString = process.env.DB_URI;

if (!connectionString) {
  throw new Error("DB_URI is required");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

type CategorySeed = {
  name: string;
  slug: string;
  description?: string;
};

type TagSeed = {
  name: string;
  slug: string;
};

type PostSeed = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  categorySlug: string;
  tagSlugs: string[];
};

const CATEGORY_SEEDS: CategorySeed[] = [
  {
    name: "Revenue Cycle Management",
    slug: "revenue-cycle-management",
    description:
      "Revenue cycle strategy, reimbursement workflows, denials, collections, and operational performance.",
  },
  {
    name: "Medical Billing",
    slug: "medical-billing",
    description:
      "Core billing processes, specialty billing guidance, and claim submission best practices.",
  },
  {
    name: "Medical Coding",
    slug: "medical-coding",
    description:
      "Coding accuracy, CPT and HCPCS guidance, documentation alignment, and reimbursement support.",
  },
  {
    name: "Compliance",
    slug: "compliance",
    description:
      "HIPAA, audit readiness, payer compliance, documentation standards, and risk reduction.",
  },
  {
    name: "Outsourcing",
    slug: "outsourcing",
    description:
      "Outsourced billing, vendor selection, process visibility, and outsourced compliance workflows.",
  },
  {
    name: "Practice Operations",
    slug: "practice-operations",
    description:
      "Practice workflow improvement, front-office processes, staffing efficiency, and administrative performance.",
  },
  {
    name: "Specialty Billing",
    slug: "specialty-billing",
    description:
      "Billing guidance for family practice, internal medicine, urgent care, behavioral health, dental, and outpatient services.",
  },
];

const TAG_SEEDS: TagSeed[] = [
  { name: "medical billing", slug: "medical-billing" },
  { name: "revenue cycle management", slug: "revenue-cycle-management" },
  { name: "claim denials", slug: "claim-denials" },
  { name: "insurance verification", slug: "insurance-verification" },
  { name: "patient intake", slug: "patient-intake" },
  { name: "medical coding", slug: "medical-coding" },
  { name: "cpt codes", slug: "cpt-codes" },
  { name: "hcpcs", slug: "hcpcs" },
  { name: "documentation", slug: "documentation" },
  { name: "reimbursement", slug: "reimbursement" },
  { name: "compliance", slug: "compliance" },
  { name: "hipaa", slug: "hipaa" },
  { name: "billing audit", slug: "billing-audit" },
  { name: "outsourced billing", slug: "outsourced-billing" },
  { name: "family practice", slug: "family-practice" },
  { name: "internal medicine", slug: "internal-medicine" },
  { name: "urgent care", slug: "urgent-care" },
  { name: "behavioral health", slug: "behavioral-health" },
  { name: "dental billing", slug: "dental-billing" },
  { name: "outpatient billing", slug: "outpatient-billing" },
  { name: "small practices", slug: "small-practices" },
  { name: "accounts receivable", slug: "accounts-receivable" },
  { name: "denial management", slug: "denial-management" },
];

const POST_SEEDS: PostSeed[] = [
  {
    title:
      "Behavioral Health Billing 101: CPT Codes, Guidelines & Reimbursement",
    slug: "behavioral-health-billing-101-cpt-codes-guidelines-reimbursement",
    excerpt:
      "An introduction to behavioral health billing, including coding basics, documentation expectations, and reimbursement challenges.",
    metaTitle:
      "Behavioral Health Billing 101: CPT Codes, Guidelines & Reimbursement",
    metaDescription:
      "Learn the basics of behavioral health billing, CPT coding, documentation, and reimbursement workflows.",
    categorySlug: "specialty-billing",
    tagSlugs: [
      "behavioral-health",
      "medical-billing",
      "cpt-codes",
      "documentation",
      "reimbursement",
    ],
    content: [
      "Behavioral health billing covers the submission and processing of claims for mental health and substance use treatment services.",
      "Because many behavioral health services are time-based and recurring, billing accuracy depends heavily on correct coding, strong documentation, and alignment with payer rules.",
      "Providers must clearly document medical necessity, session length, treatment goals, and patient progress to support reimbursement.",
      "Behavioral health CPT code selection should reflect the service type, session duration, provider role, and level of complexity.",
      "A structured billing process helps reduce denials, avoid underpayments, and improve reimbursement consistency over time.",
    ].join("\n\n"),
  },
  {
    title: "Best Practices to Reduce Claim Denials in Healthcare",
    slug: "best-practices-to-reduce-claim-denials-in-healthcare",
    excerpt:
      "A practical guide to understanding why claim denials happen and how healthcare organizations can reduce them.",
    metaTitle: "Best Practices to Reduce Claim Denials in Healthcare",
    metaDescription:
      "Explore practical steps to reduce claim denials through better intake, eligibility checks, and billing workflows.",
    categorySlug: "revenue-cycle-management",
    tagSlugs: [
      "claim-denials",
      "denial-management",
      "medical-billing",
      "insurance-verification",
      "patient-intake",
    ],
    content: [
      "Claim denials disrupt revenue, increase administrative workload, and slow down reimbursement for healthcare providers.",
      "Common causes include incomplete records, coding errors, missing information, and insurance eligibility issues.",
      "Reducing denials starts at the front end with accurate patient intake, insurance verification, and benefit checks before services are delivered.",
      "Pre-authorization workflows, better data entry, and stronger internal validation improve first-pass claim acceptance.",
      "Tracking denial trends helps organizations identify repeat problems and improve revenue cycle performance over time.",
    ].join("\n\n"),
  },
  {
    title:
      "Dental Revenue Cycle Management (RCM) Guide: Understanding What It Is",
    slug: "dental-revenue-cycle-management-rcm-guide-understanding-what-it-is",
    excerpt:
      "A foundational guide to dental revenue cycle management and the workflows that support healthy cash flow.",
    metaTitle:
      "Dental Revenue Cycle Management (RCM) Guide: Understanding What It Is",
    metaDescription:
      "Understand dental revenue cycle management, from intake and insurance verification to claims and collections.",
    categorySlug: "specialty-billing",
    tagSlugs: [
      "dental-billing",
      "revenue-cycle-management",
      "insurance-verification",
      "patient-intake",
      "reimbursement",
    ],
    content: [
      "Dental revenue cycle management connects patient scheduling, treatment, billing, and payment collection into one financial workflow.",
      "Strong dental RCM helps practices reduce claim rejections, improve reimbursement speed, and create a better patient billing experience.",
      "The process includes patient intake, insurance verification, coding, claim submission, payment posting, and follow-up.",
      "Accurate pre-appointment information and benefit verification reduce downstream billing issues and unexpected balances.",
      "A consistent dental RCM workflow improves financial stability while supporting smoother day-to-day practice operations.",
    ].join("\n\n"),
  },
  {
    title: "Family Practice Medical Billing for Faster Reimbursements",
    slug: "family-practice-medical-billing-for-faster-reimbursements",
    excerpt:
      "How family practices can improve billing accuracy, reduce delays, and strengthen reimbursement cycles.",
    metaTitle: "Family Practice Medical Billing for Faster Reimbursements",
    metaDescription:
      "See how family practices can improve billing, reduce denials, and accelerate reimbursements with better workflows.",
    categorySlug: "specialty-billing",
    tagSlugs: [
      "family-practice",
      "medical-billing",
      "claim-denials",
      "insurance-verification",
      "medical-coding",
    ],
    content: [
      "Family practice billing plays a direct role in maintaining steady cash flow and reducing payment delays.",
      "Errors in demographics, insurance details, coding, and payer-specific rules can all slow down reimbursement.",
      "Better patient intake and eligibility verification help prevent avoidable claim issues before they begin.",
      "Standardized visit documentation and coding review improve claim accuracy and reduce underpayments and denials.",
      "A well-organized billing process gives providers more time to focus on patient care and less time on financial disruption.",
    ].join("\n\n"),
  },
  {
    title: "Internal Medicine Billing Services for Small Practices",
    slug: "internal-medicine-billing-services-for-small-practices",
    excerpt:
      "A guide to internal medicine billing challenges and how small practices can improve revenue performance.",
    metaTitle: "Internal Medicine Billing Services for Small Practices",
    metaDescription:
      "Learn how internal medicine practices can improve billing accuracy, reduce denials, and support cash flow.",
    categorySlug: "specialty-billing",
    tagSlugs: [
      "internal-medicine",
      "medical-billing",
      "small-practices",
      "documentation",
      "reimbursement",
    ],
    content: [
      "Internal medicine practices often manage chronic conditions, multiple diagnoses, and long-term patient care, which makes billing more complex.",
      "Small practices can struggle with coding accuracy, documentation quality, payer changes, and follow-up workloads.",
      "Strong billing services support coding, claim submission, payment posting, and unpaid claim follow-up.",
      "Accuracy, consistency, and knowledge of payer requirements are essential to prevent repeated denials and delays.",
      "A better billing structure helps physicians focus more on patients and less on administrative burden.",
    ].join("\n\n"),
  },
  {
    title: "Coding and Reimbursement for Outpatient Facilities",
    slug: "coding-and-reimbursement-for-outpatient-facilities",
    excerpt:
      "An overview of coding, modifier use, reimbursement rules, and documentation needs in outpatient settings.",
    metaTitle: "Coding and Reimbursement for Outpatient Facilities",
    metaDescription:
      "Learn how outpatient facilities can improve coding accuracy, documentation, and reimbursement performance.",
    categorySlug: "medical-coding",
    tagSlugs: [
      "outpatient-billing",
      "medical-coding",
      "hcpcs",
      "cpt-codes",
      "documentation",
      "reimbursement",
    ],
    content: [
      "Outpatient facilities depend on accurate coding and documentation to maintain financial performance and avoid payment delays.",
      "These settings often deal with a wide range of services, which increases the risk of coding errors, bundling problems, and modifier misuse.",
      "Correct CPT and HCPCS code selection is necessary to represent services properly and support reimbursement.",
      "Clear documentation is essential to show medical necessity and support compliant billing.",
      "Regular internal review helps identify repeated coding issues before they turn into denials or underpayments.",
    ].join("\n\n"),
  },
  {
    title: "Outsourced Medical Billing Services",
    slug: "outsourced-medical-billing-services",
    excerpt:
      "What outsourced medical billing services are, why practices choose them, and what to consider before outsourcing.",
    metaTitle: "Outsourced Medical Billing Services",
    metaDescription:
      "Understand outsourced medical billing services, their benefits, and what practices should consider before outsourcing.",
    categorySlug: "outsourcing",
    tagSlugs: [
      "outsourced-billing",
      "medical-billing",
      "revenue-cycle-management",
      "accounts-receivable",
      "small-practices",
    ],
    content: [
      "Outsourced medical billing allows practices to hand over billing, coding, and claim management tasks to an external partner.",
      "This can reduce internal administrative workload and help providers stay focused on patient care.",
      "Many practices outsource because of staffing shortages, complex payer requirements, and the need for better billing consistency.",
      "The main benefits often include improved claim accuracy, fewer delays, better collections, and more predictable operational costs.",
      "Choosing between in-house and outsourced billing depends on practice size, internal resources, visibility needs, and long-term goals.",
    ].join("\n\n"),
  },
  {
    title:
      "RCM (Revenue Cycle Management): Everything Healthcare Providers Need to Know",
    slug: "rcm-revenue-cycle-management-everything-healthcare-providers-need-to-know",
    excerpt:
      "A broad introduction to revenue cycle management and the core stages that affect reimbursement and cash flow.",
    metaTitle:
      "RCM (Revenue Cycle Management): Everything Healthcare Providers Need to Know",
    metaDescription:
      "Understand the key stages of revenue cycle management and how they affect provider reimbursement and cash flow.",
    categorySlug: "revenue-cycle-management",
    tagSlugs: [
      "revenue-cycle-management",
      "medical-billing",
      "patient-intake",
      "insurance-verification",
      "reimbursement",
    ],
    content: [
      "Revenue cycle management covers the full financial path of patient care, starting from appointment scheduling and ending with final payment.",
      "It connects registration, coding, claim submission, payment posting, and follow-up into one coordinated workflow.",
      "When RCM processes are weak, organizations often see denials, payment delays, and revenue leakage.",
      "Accurate patient intake and insurance verification help prevent downstream billing problems early.",
      "A well-managed revenue cycle improves transparency, supports patient satisfaction, and creates stronger long-term financial stability.",
    ].join("\n\n"),
  },
  {
    title:
      "Revenue Cycle Management Strategies for Small & Independent Practices",
    slug: "revenue-cycle-management-strategies-for-small-and-independent-practices",
    excerpt:
      "RCM strategies tailored for small and independent healthcare practices that need stronger workflows and more stable reimbursement.",
    metaTitle:
      "Revenue Cycle Management Strategies for Small & Independent Practices",
    metaDescription:
      "Explore revenue cycle strategies that help small and independent practices reduce denials and improve cash flow.",
    categorySlug: "revenue-cycle-management",
    tagSlugs: [
      "revenue-cycle-management",
      "small-practices",
      "patient-intake",
      "denial-management",
      "medical-billing",
    ],
    content: [
      "Small and independent practices often have limited staff and fewer operational resources, which makes revenue cycle mistakes more costly.",
      "A strong RCM strategy begins with reliable patient registration and accurate insurance verification.",
      "Improved coding accuracy, documentation quality, and denial tracking all contribute to healthier reimbursement performance.",
      "Clear workflows and accountability help reduce administrative pressure and create more predictable cash flow.",
      "Simple billing communication and stronger patient payment processes can also improve collections and patient satisfaction.",
    ].join("\n\n"),
  },
  {
    title: "Urgent Care Billing Explained: A Complete Guide to the Basics",
    slug: "urgent-care-billing-explained-a-complete-guide-to-the-basics",
    excerpt:
      "A beginner-friendly guide to urgent care billing, coding, claim filing, and reimbursement basics.",
    metaTitle: "Urgent Care Billing Explained: A Complete Guide to the Basics",
    metaDescription:
      "Learn the basics of urgent care billing, including coding, documentation, claims, and reimbursement workflows.",
    categorySlug: "specialty-billing",
    tagSlugs: [
      "urgent-care",
      "medical-billing",
      "medical-coding",
      "claim-denials",
      "reimbursement",
    ],
    content: [
      "Urgent care billing involves claims for immediate, walk-in medical services delivered outside a traditional primary care setting.",
      "Because urgent care centers treat a large number of patients and a wide mix of cases, billing accuracy is critical.",
      "The workflow includes patient registration, coding, documentation, claim filing, and payment posting.",
      "Minor coding mistakes, missing information, and eligibility issues can quickly lead to denials and delayed payment.",
      "Clean claims, better follow-up, and stronger visibility into payer trends help urgent care centers improve reimbursement results.",
    ].join("\n\n"),
  },
  {
    title: "What Is Medical Billing Audit and Its Importance",
    slug: "what-is-medical-billing-audit-and-its-importance",
    excerpt:
      "A guide to medical billing audits, why they matter, and how they support compliance and revenue protection.",
    metaTitle: "What Is Medical Billing Audit and Its Importance",
    metaDescription:
      "Understand medical billing audits, their objectives, and how they help reduce compliance and reimbursement risk.",
    categorySlug: "compliance",
    tagSlugs: [
      "billing-audit",
      "compliance",
      "medical-billing",
      "documentation",
      "reimbursement",
    ],
    content: [
      "A medical billing audit is a structured review of billing records, claims, coding, and supporting documentation.",
      "Its purpose is to confirm billing accuracy, identify compliance gaps, and find areas where revenue may be leaking.",
      "Regular audits help practices catch coding and documentation issues before they lead to denials, repayment demands, or penalties.",
      "Audits can be internal or external, depending on the goals and requirements of the organization.",
      "A disciplined audit process supports better billing accuracy, stronger reporting, and more reliable long-term reimbursement performance.",
    ].join("\n\n"),
  },
  {
    title: "How to Stay HIPAA Compliant When Outsourcing",
    slug: "how-to-stay-hipaa-compliant-when-outsourcing",
    excerpt:
      "A practical look at HIPAA responsibilities, outsourcing risks, and how to work safely with external billing partners.",
    metaTitle: "How to Stay HIPAA Compliant When Outsourcing",
    metaDescription:
      "Learn how healthcare organizations can stay HIPAA compliant when outsourcing billing or administrative work.",
    categorySlug: "compliance",
    tagSlugs: [
      "hipaa",
      "compliance",
      "outsourced-billing",
      "medical-billing",
      "documentation",
    ],
    content: [
      "HIPAA compliance is essential whenever healthcare organizations share patient information with outside billing or administrative partners.",
      "Outsourcing can increase efficiency, but it also increases the need for strong privacy, security, and vendor oversight.",
      "Providers remain responsible for protecting patient information even when a third party handles billing functions.",
      "A safe outsourcing relationship requires clear standards, proper safeguards, and confidence that the partner follows HIPAA requirements.",
      "Careful vendor selection and structured compliance workflows reduce legal, financial, and reputational risk over time.",
    ].join("\n\n"),
  },
];

async function resolveSeedAuthorId(): Promise<string> {
  const explicitAuthorId = process.env.SEED_POST_AUTHOR_ID;

  if (explicitAuthorId) {
    const existingUser = await prisma.user.findUnique({
      where: { id: explicitAuthorId },
      select: { id: true },
    });

    if (!existingUser) {
      throw new Error(
        `SEED_POST_AUTHOR_ID was provided but no user was found for id: ${explicitAuthorId}`,
      );
    }

    return existingUser.id;
  }

  const fallbackUser = await prisma.user.findFirst({
    where: {
      deletedAt: null,
      OR: [{ role: UserRole.author }, { role: UserRole.admin }],
    },
    orderBy: { createdAt: "asc" },
    select: { id: true },
  });

  if (!fallbackUser) {
    throw new Error(
      "No author/admin user found. Create one user first or set SEED_POST_AUTHOR_ID in env.",
    );
  }

  return fallbackUser.id;
}

async function seedCategories() {
  const categoriesBySlug = new Map<string, { id: string; slug: string }>();

  for (const category of CATEGORY_SEEDS) {
    const saved = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        description: category.description ?? null,
        deletedAt: null,
      },
      create: {
        name: category.name,
        slug: category.slug,
        description: category.description ?? null,
      },
      select: {
        id: true,
        slug: true,
      },
    });

    categoriesBySlug.set(saved.slug, saved);
  }

  return categoriesBySlug;
}

async function seedTags() {
  const tagsBySlug = new Map<string, { id: string; slug: string }>();

  for (const tag of TAG_SEEDS) {
    const saved = await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: {
        name: tag.name,
        deletedAt: null,
      },
      create: {
        name: tag.name,
        slug: tag.slug,
      },
      select: {
        id: true,
        slug: true,
      },
    });

    tagsBySlug.set(saved.slug, saved);
  }

  return tagsBySlug;
}

async function seedPosts(
  authorId: string,
  categoriesBySlug: Map<string, { id: string; slug: string }>,
  tagsBySlug: Map<string, { id: string; slug: string }>,
) {
  for (const post of POST_SEEDS) {
    const category = categoriesBySlug.get(post.categorySlug);

    if (!category) {
      throw new Error(`Missing category for slug: ${post.categorySlug}`);
    }

    const tagConnections = post.tagSlugs.map((slug) => {
      const tag = tagsBySlug.get(slug);

      if (!tag) {
        throw new Error(`Missing tag for slug: ${slug}`);
      }

      return { id: tag.id };
    });

    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {
        authorId,
        categoryId: category.id,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        status: PostStatus.draft,
        publishedAt: null,
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        deletedAt: null,
        tags: {
          set: [],
          connect: tagConnections,
        },
      },
      create: {
        authorId,
        categoryId: category.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        status: PostStatus.draft,
        publishedAt: null,
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        tags: {
          connect: tagConnections,
        },
      },
    });
  }
}

export async function seedContent() {
  console.log("Seeding blog content...");

  const authorId = await resolveSeedAuthorId();
  const categoriesBySlug = await seedCategories();
  const tagsBySlug = await seedTags();
  await seedPosts(authorId, categoriesBySlug, tagsBySlug);

  console.log(`Seeded ${CATEGORY_SEEDS.length} categories`);
  console.log(`Seeded ${TAG_SEEDS.length} tags`);
  console.log(`Seeded ${POST_SEEDS.length} posts as draft`);
}
