import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetails } from "./_page";
import serviceDetails from "../details.json";

const getServiceDetail = (slug: string) =>
  serviceDetails.find((service) => service.slug === slug);

export function generateStaticParams() {
  return serviceDetails.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceDetail(slug);

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found.",
    };
  }

  return {
    title: service.title,
    description: service.heroDescription,
  };
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const detail = getServiceDetail(slug);

  if (!detail) {
    notFound();
  }

  return <ServiceDetails slug={slug} detail={detail} />;
}
