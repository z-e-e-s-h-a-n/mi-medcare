import type { Metadata } from "next";
import { notFound } from "next/navigation";
import specialties from "../data.json";
import { SpecialtyDetails } from "./_page";

type PageProps = {
  params: Promise<{ slug: string }>;
};

type SpecialtyData = (typeof specialties)[number];

const getSpecialtySlug = (href: string) =>
  href.split("/").filter(Boolean).pop() ?? href;

const getSpecialtyDetail = (slug: string): SpecialtyData | undefined =>
  specialties.find((specialty) => getSpecialtySlug(specialty.href) === slug);

export function generateStaticParams() {
  return specialties.map((specialty) => ({
    slug: getSpecialtySlug(specialty.href),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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
    description: specialty.description,
  };
}

export default async function SpecialtyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const detail = getSpecialtyDetail(slug);

  if (!detail) {
    notFound();
  }

  return <SpecialtyDetails slug={slug} detail={detail} />;
}
