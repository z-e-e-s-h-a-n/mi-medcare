"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackTrafficSource } from "@workspace/sdk/traffic";
import type { CreateTrafficSourceType } from "@workspace/contracts/traffic";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

const buildPayload = (
  pathname: string,
  searchParams: URLSearchParams,
): CreateTrafficSourceType => {
  const query = searchParams.toString();
  const landingPage = query ? `${pathname}?${query}` : pathname;
  const referrer =
    typeof document !== "undefined" && document.referrer.length > 0
      ? document.referrer
      : undefined;

  return {
    utmSource: searchParams.get("utm_source") || undefined,
    utmMedium: searchParams.get("utm_medium") || undefined,
    utmCampaign: searchParams.get("utm_campaign") || undefined,
    utmTerm: searchParams.get("utm_term") || undefined,
    utmContent: searchParams.get("utm_content") || undefined,
    referrer,
    landingPage,
  };
};

const hasUtmParams = (searchParams: URLSearchParams) =>
  UTM_KEYS.some((key) => Boolean(searchParams.get(key)));

const hasTrackableContext = (payload: CreateTrafficSourceType) =>
  Boolean(
    payload.utmSource ||
      payload.utmMedium ||
      payload.utmCampaign ||
      payload.utmTerm ||
      payload.utmContent ||
      payload.referrer,
  );

const TrafficSourceTracker = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasTrackedInitialRef = useRef(false);
  const lastCampaignKeyRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    const payload = buildPayload(pathname, searchParams);
    const campaignKey = JSON.stringify(payload);
    const shouldTrack = hasTrackableContext(payload);

    if (!hasTrackedInitialRef.current) {
      hasTrackedInitialRef.current = true;
      lastCampaignKeyRef.current = campaignKey;
      if (shouldTrack) {
        void trackTrafficSource(payload).catch(() => undefined);
      }
      return;
    }

    if (
      !hasUtmParams(searchParams) ||
      !shouldTrack ||
      lastCampaignKeyRef.current === campaignKey
    ) {
      return;
    }

    lastCampaignKeyRef.current = campaignKey;
    void trackTrafficSource(payload).catch(() => undefined);
  }, [pathname, searchParams]);

  return null;
};

export default TrafficSourceTracker;
