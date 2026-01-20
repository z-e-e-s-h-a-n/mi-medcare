import ContactSection from "@/components/ContactSection";
import IconWrapper from "@/components/IconWrapper";
import PageHeader from "@/components/PageHeader";
import { servicesMenu } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: AppPageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageData = servicesMenu.find((s) => s.href.includes(slug));

  if (!pageData) return {};

  const cleanTitle = pageData.title
    .replace(/[\/-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return {
    title: cleanTitle,
    description: `MI MedCare offers professional ${pageData.title.toLowerCase()} services to improve revenue cycle efficiency, reduce denials, and increase reimbursements.`,
  };
}

const ServicesPage = async ({ params }: AppPageProps) => {
  const { slug } = await params;

  const pageData = servicesMenu.find((s) => s.href.includes(slug));
  if (!pageData) return notFound();

  const isObjectServices = pageData.services.every(
    (s) => typeof s === "object",
  );

  return (
    <>
      <PageHeader
        title={pageData.title}
        bgImage={pageData.href.replace("/services/", "")}
      />
      <section className="space-y-16">
        <div
          className={cn(
            isObjectServices
              ? "flex flex-col md:flex-row md:items-end md:*:basis-1/2 text-center space-y-4"
              : "text-center space-y-8",
          )}
        >
          <div className="space-y-6">
            <span className="subtitle">What We Offers</span>
            <h3 className="text-5xl font-semibold">{pageData.title}</h3>
          </div>
          <p
            className="md:pl-20"
            dangerouslySetInnerHTML={{ __html: pageData.desc }}
          />
        </div>

        <ul
          className={cn(
            "flex flex-wrap gap-4",
            isObjectServices ? "" : "bg-secondary p-4 rounded-2xl dot-list",
          )}
        >
          {pageData.subtitle && (
            <h4 className="text-primary text-2xl font-medium basis-full mb-4  ">
              {pageData.subtitle}
            </h4>
          )}
          {pageData.services.map((s) => {
            return typeof s === "object" ? (
              <li
                key={s.title}
                className="basis-full sm:basis-[calc(50%-16px)] md:basis-[calc(33.3%-16px)] lg:basis-[calc(25%-16px)] xl:basis-[calc(20%-16px)] p-4 bg-white rounded-2xl text-center space-y-4 shadow-sm"
              >
                <IconWrapper className="shadow-sm mx-auto" size="md">
                  {<s.icon />}
                </IconWrapper>
                <h4 className="text-xl font-medium">{s.title}</h4>
                <p>{s.desc}</p>
                <Link
                  href="#"
                  className="flex-center-inline gap-1 text-primary"
                >
                  Learn more <ArrowRight />
                </Link>
              </li>
            ) : (
              <li className="basis-full sm:basis-[calc(50%-16px)] md:basis-[calc(33.3%-16px)]">
                {s}
              </li>
            );
          })}
        </ul>
      </section>
      <ContactSection />
    </>
  );
};

export default ServicesPage;
