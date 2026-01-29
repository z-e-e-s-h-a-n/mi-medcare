import {
  PrismaClient,
  type User,
  type Media,
  type Category,
  type Tag,
} from "@generated/prisma";
import argon2 from "argon2";
import axios from "axios";
import { createHash } from "crypto";

// =========================
// USERS SEEDING
// =========================
export async function seedUsers(prisma: PrismaClient) {
  console.log("👥 Creating users...");

  // Hash passwords
  const editorPassword = await argon2.hash("Editor123!");
  const authorPassword = await argon2.hash("Author123!");

  const editor = await prisma.user.create({
    data: {
      firstName: "Sarah",
      lastName: "Johnson",
      displayName: "Sarah Editor",
      email: "editor@medicalbilling.com",
      password: editorPassword,
      role: "editor",
      status: "active",
      isEmailVerified: true,
    },
  });

  const author = await prisma.user.create({
    data: {
      firstName: "Michael",
      lastName: "Chen",
      displayName: "Mike Chen",
      email: "author@medicalbilling.com",
      password: authorPassword,
      role: "author",
      status: "active",
      isEmailVerified: true,
    },
  });

  // Create additional authors
  const authors = await Promise.all([
    prisma.user.create({
      data: {
        firstName: "Dr. Emily",
        lastName: "Wilson",
        displayName: "Dr. Emily Wilson",
        email: "emily@medicalbilling.com",
        password: await argon2.hash("Author123!"),
        role: "author",
        status: "active",
        isEmailVerified: true,
      },
    }),
    prisma.user.create({
      data: {
        firstName: "Robert",
        lastName: "Miller",
        displayName: "Robert Miller",
        email: "robert@medicalbilling.com",
        password: await argon2.hash("Author123!"),
        role: "author",
        status: "pending",
        isEmailVerified: false,
      },
    }),
  ]);

  console.log(`✅ Created ${authors.length + 3} users`);
  return { editor, author, authors: [author, ...authors] };
}

// =========================
// MEDIA SEEDING
// =========================
export async function seedMedia(prisma: PrismaClient, uploadedBy: User) {
  console.log("🖼️ Creating media items...");

  const mediaItems = [
    {
      url: "https://res.cloudinary.com/dlkeqltf0/image/upload/v1769179331/main-sample.png",
      filename: "medical-billing-guide.jpg",
      mimeType: "image/jpeg",
      size: 1024 * 512,
    },
    {
      url: "https://res.cloudinary.com/dlkeqltf0/image/upload/v1769179329/cld-sample.jpg",
      filename: "icd10-updates.jpg",
      mimeType: "image/jpeg",
      size: 1024 * 768,
    },
    {
      url: "https://res.cloudinary.com/dlkeqltf0/image/upload/v1769179329/cld-sample-4.jpg",
      filename: "hipaa-compliance.jpg",
      mimeType: "image/jpeg",
      size: 1024 * 683,
    },
    {
      url: "https://res.cloudinary.com/dlkeqltf0/image/upload/v1769179329/cld-sample-3.jpg",
      filename: "revenue-cycle.jpg",
      mimeType: "image/jpeg",
      size: 1024 * 512,
    },
    {
      url: "https://res.cloudinary.com/dlkeqltf0/image/upload/v1769179326/samples/upscale-face-1.jpg",
      filename: "telemedicine-billing.jpg",
      mimeType: "image/jpeg",
      size: 1024 * 768,
    },
    {
      url: "https://res.cloudinary.com/dlkeqltf0/image/upload/v1769179326/samples/dessert-on-a-plate.jpg",
      filename: "author-profile.jpg",
      mimeType: "image/jpeg",
      size: 800 * 800,
    },
    {
      url: "https://res.cloudinary.com/dlkeqltf0/image/upload/v1769179322/samples/breakfast.jpg",
      filename: "cms-changes.jpg",
      mimeType: "image/jpeg",
      size: 1024 * 683,
    },
  ];

  const createdMedia = await Promise.all(
    mediaItems.map(async (media) => {
      const response = await axios.get(media.url, {
        responseType: "arraybuffer",
      });
      const buffer = Buffer.from(response.data);
      const hash = createHash("sha256").update(buffer).digest("hex");

      return prisma.media.create({
        data: {
          ...media,
          uploadedById: uploadedBy.id,
          hash,
        },
      });
    }),
  );

  console.log(`✅ Created ${createdMedia.length} media items`);
  return createdMedia;
}

// =========================
// CATEGORIES SEEDING
// =========================
export async function seedCategories(prisma: PrismaClient) {
  console.log("📂 Creating categories...");

  const categories = [
    {
      name: "Medical Billing Basics",
      slug: "medical-billing-basics",
      description: "Fundamental concepts and terminology in medical billing",
    },
    {
      name: "Coding Updates",
      slug: "coding-updates",
      description: "Latest ICD-10, CPT, and HCPCS code changes",
    },
    {
      name: "Compliance",
      slug: "compliance",
      description: "HIPAA, Stark Law, and regulatory compliance",
    },
    {
      name: "Revenue Cycle Management",
      slug: "revenue-cycle-management",
      description: "Strategies for optimizing the revenue cycle",
    },
    {
      name: "Technology & Software",
      slug: "technology-software",
      description: "EMR, EHR, and billing software reviews",
    },
    {
      name: "Insurance",
      slug: "insurance",
      description: "Dealing with Medicare, Medicaid, and private insurers",
    },
    {
      name: "Practice Management",
      slug: "practice-management",
      description: "Running an efficient medical practice",
    },
    {
      name: "Telemedicine",
      slug: "telemedicine",
      description: "Billing and coding for telehealth services",
    },
  ];

  const createdCategories = await Promise.all(
    categories.map((category) =>
      prisma.category.create({
        data: category,
      }),
    ),
  );

  // Create some subcategories
  const subcategories = [
    {
      name: "ICD-10 Codes",
      slug: "icd-10-codes",
      description: "International Classification of Diseases updates",
      parentId: createdCategories[1].id, // Coding Updates
    },
    {
      name: "CPT Codes",
      slug: "cpt-codes",
      description: "Current Procedural Terminology updates",
      parentId: createdCategories[1].id, // Coding Updates
    },
    {
      name: "HIPAA Privacy",
      slug: "hipaa-privacy",
      description: "Patient privacy and data security",
      parentId: createdCategories[2].id, // Compliance
    },
    {
      name: "HIPAA Security",
      slug: "hipaa-security",
      description: "Technical safeguards and risk management",
      parentId: createdCategories[2].id, // Compliance
    },
  ];

  await Promise.all(
    subcategories.map((subcategory) =>
      prisma.category.create({
        data: subcategory,
      }),
    ),
  );

  console.log(
    `✅ Created ${categories.length + subcategories.length} categories`,
  );
  return createdCategories;
}

// =========================
// TAGS SEEDING
// =========================
export async function seedTags(prisma: PrismaClient) {
  console.log("🏷️ Creating tags...");

  const tags = [
    { name: "ICD-10", slug: "icd-10" },
    { name: "CPT", slug: "cpt" },
    { name: "HIPAA", slug: "hipaa" },
    { name: "Medicare", slug: "medicare" },
    { name: "Medicaid", slug: "medicaid" },
    { name: "EMR", slug: "emr" },
    { name: "EHR", slug: "ehr" },
    { name: "Revenue", slug: "revenue" },
    { name: "Denial Management", slug: "denial-management" },
    { name: "Telehealth", slug: "telehealth" },
    { name: "CMS", slug: "cms" },
    { name: "Audit", slug: "audit" },
    { name: "Compliance", slug: "compliance" },
    { name: "Billing Software", slug: "billing-software" },
    { name: "Medical Coding", slug: "medical-coding" },
    { name: "Patient Billing", slug: "patient-billing" },
    { name: "Insurance Claims", slug: "insurance-claims" },
    { name: "AR Days", slug: "ar-days" },
    { name: "Prior Authorization", slug: "prior-authorization" },
    { name: "Credentialing", slug: "credentialing" },
  ];

  const createdTags = await Promise.all(
    tags.map((tag) =>
      prisma.tag.create({
        data: tag,
      }),
    ),
  );

  console.log(`✅ Created ${createdTags.length} tags`);
  return createdTags;
}

// =========================
// POSTS SEEDING
// =========================
export async function seedPosts(
  prisma: PrismaClient,
  data: {
    editor: User;
    author: User;
    mediaItems: Media[];
    categories: Category[];
    tags: Tag[];
  },
) {
  console.log("📝 Creating posts...");

  const posts = [
    {
      title: "Understanding Medical Billing: A Complete Guide for Beginners",
      slug: "understanding-medical-billing-complete-guide",
      excerpt:
        "Learn the fundamentals of medical billing and how it impacts healthcare revenue cycles.",
      content: `
        <h2>Introduction to Medical Billing</h2>
        <p>Medical billing is the process of submitting and following up on claims with health insurance companies to receive payment for services rendered by healthcare providers...</p>
        
        <h3>Key Components of Medical Billing</h3>
        <ul>
          <li>Patient Registration</li>
          <li>Insurance Verification</li>
          <li>Medical Coding</li>
          <li>Charge Entry</li>
          <li>Claim Submission</li>
          <li>Payment Posting</li>
          <li>Denial Management</li>
          <li>Patient Billing</li>
        </ul>
        
        <p>Understanding these components is essential for running a successful medical practice.</p>
      `,
      authorId: data.author.id,
      categoryId: data.categories[0].id, // Medical Billing Basics
      coverId: data.mediaItems[0].id,
      status: "published" as const,
      publishedAt: new Date(),
      metaTitle: "Medical Billing Guide | Complete Beginner's Tutorial",
      metaDescription:
        "Comprehensive guide to medical billing fundamentals for healthcare professionals and practice managers.",
      tags: [data.tags[14].id, data.tags[15].id, data.tags[16].id], // Medical Coding, Patient Billing, Insurance Claims
    },
    {
      title: "2024 ICD-10 Updates: What You Need to Know",
      slug: "2024-icd10-updates-what-you-need-to-know",
      excerpt:
        "Stay compliant with the latest ICD-10 coding changes and implementation guidelines.",
      content: `
        <h2>2024 ICD-10-CM Code Changes</h2>
        <p>The Centers for Disease Control and Prevention (CDC) have released updates to the ICD-10-CM code set for 2024...</p>
        
        <h3>Notable Updates</h3>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>New Codes</th>
              <th>Revised Codes</th>
              <th>Deleted Codes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mental Health</td>
              <td>15</td>
              <td>8</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Cardiology</td>
              <td>12</td>
              <td>6</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Orthopedics</td>
              <td>20</td>
              <td>10</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>
        
        <p>Ensure your practice is updated with these changes to avoid claim denials.</p>
      `,
      authorId: data.editor.id,
      categoryId: data.categories[1].id, // Coding Updates
      coverId: data.mediaItems[1].id,
      status: "published" as const,
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      metaTitle: "2024 ICD-10 Code Updates | Medical Billing Changes",
      metaDescription:
        "Complete overview of 2024 ICD-10 coding changes for medical billers and coders.",
      tags: [data.tags[0].id, data.tags[10].id, data.tags[11].id], // ICD-10, CMS, Audit
    },
    {
      title: "HIPAA Compliance Checklist for Medical Practices",
      slug: "hipaa-compliance-checklist-medical-practices",
      excerpt:
        "Ensure your practice meets all HIPAA requirements with this comprehensive checklist.",
      content: `
        <h2>HIPAA Compliance Essentials</h2>
        <p>The Health Insurance Portability and Accountability Act (HIPAA) sets the standard for protecting sensitive patient data...</p>
        
        <h3>Compliance Checklist</h3>
        <ol>
          <li>Conduct a Risk Analysis</li>
          <li>Implement Administrative Safeguards</li>
          <li>Establish Physical Safeguards</li>
          <li>Enforce Technical Safeguards</li>
          <li>Develop Policies and Procedures</li>
          <li>Train Staff Regularly</li>
          <li>Secure Business Associate Agreements</li>
          <li>Prepare for Breach Notification</li>
        </ol>
        
        <p>Regular audits and updates are crucial for maintaining compliance.</p>
      `,
      authorId: data.author.id,
      categoryId: data.categories[2].id, // Compliance
      coverId: data.mediaItems[2].id,
      status: "published" as const,
      publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
      metaTitle: "HIPAA Compliance Checklist | Medical Practice Guidelines",
      metaDescription:
        "Step-by-step HIPAA compliance checklist for healthcare providers and medical practices.",
      tags: [data.tags[2].id, data.tags[12].id, data.tags[11].id], // HIPAA, Compliance, Audit
    },
  ];

  const createdPosts = await Promise.all(
    posts.map((post) =>
      prisma.post.create({
        data: {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          authorId: post.authorId,
          categoryId: post.categoryId,
          coverId: post.coverId,
          status: post.status,
          publishedAt: post.publishedAt,
          metaTitle: post.metaTitle,
          metaDescription: post.metaDescription,
          tags: {
            connect: post.tags.map((id) => ({ id })),
          },
        },
      }),
    ),
  );

  console.log(`✅ Created ${createdPosts.length} posts`);
  return createdPosts;
}

// =========================
// CREATE SAMPLE CONTENT FOR EACH USER
// =========================
export async function createSampleContent(
  prisma: PrismaClient,
  users: { editor: User; author: User },
  categories: Category[],
  tags: Tag[],
  mediaItems: Media[],
) {
  console.log("🎯 Creating sample content for each user...");

  const samplePosts = [
    // Admin posts
    {
      title: "Revenue Cycle Optimization: Best Practices",
      slug: "revenue-cycle-optimization-best-practices",
      excerpt:
        "Learn how to optimize your revenue cycle for maximum efficiency and profitability.",
      content: "Comprehensive guide to revenue cycle management...",
      authorId: users.author.id,
      categoryId: categories[3].id, // Revenue Cycle Management
      status: "published" as const,
      tags: [tags[7].id, tags[8].id, tags[17].id], // Revenue, Denial Management, AR Days
    },
    {
      title: "Telemedicine Billing Guidelines 2024",
      slug: "telemedicine-billing-guidelines-2024",
      excerpt: "Updated billing and coding guidelines for telehealth services.",
      content: "Telemedicine has revolutionized healthcare delivery...",
      authorId: users.author.id,
      categoryId: categories[7].id, // Telemedicine
      status: "draft" as const,
      tags: [tags[9].id, tags[0].id, tags[1].id], // Telehealth, ICD-10, CPT
    },

    // Editor posts
    {
      title: "Choosing the Right Medical Billing Software",
      slug: "choosing-right-medical-billing-software",
      excerpt:
        "Comparison of top medical billing software solutions for your practice.",
      content: "Selecting the right billing software is crucial...",
      authorId: users.editor.id,
      categoryId: categories[4].id, // Technology & Software
      status: "review" as const,
      tags: [tags[6].id, tags[13].id, tags[5].id], // EHR, Billing Software, EMR
    },
    {
      title: "Medicare Advantage Plan Billing Tips",
      slug: "medicare-advantage-plan-billing-tips",
      excerpt:
        "Essential tips for billing Medicare Advantage plans effectively.",
      content: "Medicare Advantage plans have specific requirements...",
      authorId: users.editor.id,
      categoryId: categories[5].id, // Insurance
      status: "published" as const,
      tags: [tags[3].id, tags[18].id, tags[19].id], // Medicare, Prior Authorization, Credentialing
    },

    // Author posts
    {
      title: "Common Medical Billing Errors and How to Avoid Them",
      slug: "common-medical-billing-errors-how-to-avoid",
      excerpt:
        "Learn about frequent billing mistakes and prevention strategies.",
      content: "Medical billing errors can cost practices thousands...",
      authorId: users.author.id,
      categoryId: categories[0].id, // Medical Billing Basics
      status: "published" as const,
      tags: [tags[14].id, tags[8].id, tags[11].id], // Medical Coding, Denial Management, Audit
    },
    {
      title: "Patient Collections: Strategies for Success",
      slug: "patient-collections-strategies-success",
      excerpt: "Improve your patient collections with these proven strategies.",
      content: "With rising patient responsibility...",
      authorId: users.author.id,
      categoryId: categories[6].id, // Practice Management
      status: "published" as const,
      tags: [tags[15].id, tags[7].id, tags[16].id], // Patient Billing, Revenue, Insurance Claims
    },
  ];

  for (const post of samplePosts) {
    await prisma.post.create({
      data: {
        ...post,
        content: post.content + " " + generateLoremIpsum(),
        publishedAt: post.status === "published" ? new Date() : undefined,
        coverId: mediaItems[Math.floor(Math.random() * mediaItems.length)].id,
        metaTitle: post.title,
        tags: {
          connect: post.tags.map((id) => ({ id })),
        },
      },
    });
  }

  console.log(`✅ Created ${samplePosts.length} sample posts`);
}

// =========================
// HELPER FUNCTIONS
// =========================
function generateLoremIpsum(): string {
  return `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
    eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
    in culpa qui officia deserunt mollit anim id est laborum.</p>
  `;
}

// =========================
// OTP SEEDING (Optional - for testing)
// =========================
export async function seedOtps(prisma: PrismaClient, users: User[]) {
  console.log("🔑 Creating OTPs for testing...");

  const otps = await Promise.all(
    users.map((user) =>
      prisma.otp.create({
        data: {
          userId: user.id,
          purpose: "verifyEmail",
          secret: Math.floor(100000 + Math.random() * 900000).toString(),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        },
      }),
    ),
  );

  console.log(`✅ Created ${otps.length} OTPs`);
  return otps;
}

// =========================
// REFRESH TOKENS SEEDING (Optional - for testing)
// =========================
export async function seedRefreshTokens(prisma: PrismaClient, users: User[]) {
  console.log("🔄 Creating refresh tokens...");

  const refreshTokens = await Promise.all(
    users.map((user) =>
      prisma.refreshToken.create({
        data: {
          userId: user.id,
          token: `test-token-${user.id}-${Date.now()}`,
          ip: "127.0.0.1",
          userAgent: "Mozilla/5.0 (Test Agent)",
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        },
      }),
    ),
  );

  console.log(`✅ Created ${refreshTokens.length} refresh tokens`);
  return refreshTokens;
}
