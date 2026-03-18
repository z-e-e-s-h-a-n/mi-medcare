"use client";

import { createContext, useContext } from "react";

import type { BusinessProfileResponse } from "@workspace/contracts/business";

type BusinessProfileContextValue = {
  data: BusinessProfileResponse;
  isLoading: false;
  isFetching: false;
  error: null;
};

const BusinessProfileContext =
  createContext<BusinessProfileContextValue | null>(null);

export function BusinessProfileProvider({
  business,
  children,
}: {
  business: BusinessProfileResponse;
  children: React.ReactNode;
}) {
  return (
    <BusinessProfileContext.Provider
      value={{
        data: business,
        isLoading: false,
        isFetching: false,
        error: null,
      }}
    >
      {children}
    </BusinessProfileContext.Provider>
  );
}

export function useBusinessProfileContext() {
  const context = useContext(BusinessProfileContext);

  if (!context) {
    throw new Error(
      "useBusinessProfile must be used within BusinessProfileProvider",
    );
  }

  return context;
}
