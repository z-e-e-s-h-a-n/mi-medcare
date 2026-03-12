import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SpecialtyDetails } from "./_page";
import specialtyDetails from "../details.json";

const getSpecialtyDetail = (slug: string) =>
  specialtyDetails.find((specialty) => specialty.slug === slug);

export function generateStaticParams() {
  return specialtyDetails.map((specialty) => ({ slug: specialty.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const specialty = getSpecialtyDetail(slug);

  if (!specialty) {
    return {
      title: "Specialty Not Found",
      description: "The requested specialty could not be found.",
    };
  }

  return {
    title: specialty.title,
    description: specialty.heroDescription,
  };
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SpecialtyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const detail = getSpecialtyDetail(slug);

  if (!detail) {
    notFound();
  }

  return <SpecialtyDetails slug={slug} detail={detail} />;
}
