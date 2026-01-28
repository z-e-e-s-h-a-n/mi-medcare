import React from "react";

interface PageHeaderProps {
  title: string;
  bgImage: string;
}

const PageHeader = ({ title, bgImage }: PageHeaderProps) => {
  return (
    <section
      className="relative bg-center bg-no-repeat bg-cover h-64 flex-center before:absolute before:inset-0 before:bg-secondary/90 after:absolute after:inset-0 after:bg-primary/10"
      style={{ backgroundImage: `url(/images/${bgImage}-page-bg.webp)` }}
    >
      <h2 className="relative z-10">{title}</h2>
    </section>
  );
};

export default PageHeader;
