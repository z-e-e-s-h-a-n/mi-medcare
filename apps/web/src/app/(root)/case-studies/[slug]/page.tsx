import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { ComingSoonSection } from "@/components/sections/coming-soon-section";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Case Study Not Found",
    description: "The requested case study could not be found.",
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  if (!slug) notFound();

  return (
    <>
      <PageHeader
        title={slug}
        badge="Case Study"
        imageUrl="https://images.pexels.com/photos/7793162/pexels-photo-7793162.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <ComingSoonSection
        backHref="/"
        badge="Coming Soon"
        title="We are preparing something exciting & amazing for you."
        description="Coming Soon!"
      />
    </>
  );
}
