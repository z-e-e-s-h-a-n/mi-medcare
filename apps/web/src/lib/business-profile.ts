import { cache } from "react";

import type { BusinessProfileResponse } from "@workspace/contracts/business";
import { getBusinessProfile } from "@workspace/sdk/business";

import { businessFallback } from "@/lib/constants";

export const getCachedBusinessProfile = cache(
  async (): Promise<BusinessProfileResponse> => {
    const response = await getBusinessProfile();
    return response.data ?? businessFallback;
  },
);
