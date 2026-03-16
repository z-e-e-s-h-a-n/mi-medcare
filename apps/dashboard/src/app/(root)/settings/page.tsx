"use client";

import BusinessProfileForm from "@/components/forms/BusinessProfileForm";
import { useBusinessProfile } from "@/hooks/business";

const SettingsPage = () => {
  const { data, isLoading, isPending, mutateAsync } = useBusinessProfile();

  return (
    <BusinessProfileForm
      data={data}
      isLoading={isLoading}
      isPending={isPending}
      onSubmit={mutateAsync}
    />
  );
};

export default SettingsPage;
