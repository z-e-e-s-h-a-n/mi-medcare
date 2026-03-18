import type { ReactNode } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { LegalProse } from "@/components/legal/legal-prose";
import { LegalToc, type LegalTocItem } from "@/components/legal/legal-toc";
import { getCachedBusinessProfile } from "@/lib/business-profile";
import { Button } from "@workspace/ui/components/button";

type LegalPageShellProps = {
  title: string;
  badge?: string;
  description?: string;
  imageUrl?: string;
  toc?: LegalTocItem[];
  children: ReactNode;
};

export async function LegalPageShell({
  title,
  badge,
  description,
  imageUrl,
  toc = [],
  children,
}: LegalPageShellProps) {
  const business = await getCachedBusinessProfile();

  return (
    <>
      <PageHeader
        title={title}
        badge={badge}
        description={description}
        imageUrl={imageUrl}
        height="h-80"
      />
      <section className="section-wrapper py-12">
        <div className="section-container">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
            <div className="min-w-0">
              <LegalProse>{children}</LegalProse>
            </div>

            <aside className="lg:sticky lg:top-24 space-y-6">
              {!!toc.length && (
                <div className="rounded-2xl border border-border/60 bg-muted/30 p-6 shadow-sm">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    On this page
                  </p>
                  <LegalToc items={toc} className="mt-4" />
                </div>
              )}

              <div className="rounded-2xl border border-border/60 bg-background/70 backdrop-blur-xl p-6 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Need help?
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Questions about these terms or policies? Reach our team.
                </p>

                <div className="mt-4 grid gap-3">
                  <Button href="/contact" size="lg" className="group">
                    Contact us
                  </Button>

                  <Button asChild variant="outline" className="justify-start">
                    <a href={`mailto:${business.email}`}>
                      Email: {business.email}
                    </a>
                  </Button>

                  <Button asChild variant="outline" className="justify-start">
                    <a href={`tel:${business.phones[0].value}`}>
                      Call: {business.phones[0].label}
                    </a>
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
