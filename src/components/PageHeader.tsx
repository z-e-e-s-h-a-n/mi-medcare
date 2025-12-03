import React from "react";

interface PageHeaderProps {
  title: string;
  bgImage: string;
}

const PageHeader = ({ title, bgImage }: PageHeaderProps) => {
  return (
    <section
      className="page-header"
      style={
        {
          "--bg-image": `url(/images/${bgImage}-page-bg.webp)`,
        } as React.CSSProperties
      }
    >
      <h2>{title}</h2>
    </section>
  );
};

export default PageHeader;
