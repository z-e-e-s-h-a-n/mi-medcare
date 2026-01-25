import EHRsSection from "@components/root/EHRsSection";
import PageHeader from "@components/root/PageHeader";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EMR & EHR Support Services",
  description:
    "MI MedCare provides expert EMR and EHR support services to ensure clean claims, faster reimbursements, and seamless medical billing across all major EHR platforms.",
};

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
