import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@workspace/ui/components/button";

export const metadata: Metadata = {
  title: "Specialty Details",
  description:
    "Placeholder page for specialty details while the dedicated content is being built.",
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SpecialtyDetailPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <>
      <PageHeader
        title="Specialty Details"
        badge="Specialty"
        description={`Placeholder page for: /specialties/${slug}`}
      />

      <section className="section-container py-16">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold">Content coming soon</h2>
          <p className="mt-3 text-muted-foreground">
            We&apos;ll add full specialty details here later.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link href="/specialties">Back to Specialties</Link>
            </Button>
            <Button asChild variant="gradient">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
