import EHRsSection from "@/components/EHRsSection";
import PageHeader from "@/components/PageHeader";
import React from "react";

const EHRsPage = () => {
  return (
    <>
      <PageHeader title="EMR/EHR Support" bgImage="page-header-bg" />

      <EHRsSection
        title="We work with these EHRs"
        desc=" Our medical billing specialists know the workarounds of all the EHRs. We
        help you submit clean claims no matter which EHR you use, ensuring a
        hassle-free and efficient billing process for your healthcare facility."
        className="mb-16"
      />
    </>
  );
};

export default EHRsPage;
