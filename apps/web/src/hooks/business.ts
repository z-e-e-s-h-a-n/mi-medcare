"use client";

import { useBusinessProfileContext } from "@/providers/business-profile-provider";

export function useBusinessProfile() {
  return useBusinessProfileContext();
}
