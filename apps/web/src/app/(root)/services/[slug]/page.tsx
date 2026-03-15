import type { Metadata } from "next";
import { notFound } from "next/navigation";
import services from "../data.json";
import { ServiceDetails } from "./_page";

type PageProps = {
  params: Promise<{ slug: string }>;
};

type ServiceData = (typeof services)[number];

const getServiceSlug = (href: string) =>
  href.split("/").filter(Boolean).pop() ?? href;

const getServiceDetail = (slug: string): ServiceData | undefined =>
  services.find((service) => getServiceSlug(service.href) === slug);

export function generateStaticParams() {
  return services.map((service) => ({ slug: getServiceSlug(service.href) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const detail = getServiceDetail(slug);

  if (!detail) {
    notFound();
  }

  const related = services
    .filter((service) => getServiceSlug(service.href) !== slug)
    .slice(0, 3);

  return <ServiceDetails slug={slug} detail={detail} related={related} />;
}
