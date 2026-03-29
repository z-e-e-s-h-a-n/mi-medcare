"use client";

import { Eye } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { trackPostView } from "@workspace/sdk/content";

interface PostViewTrackerProps {
  slug: string;
  prevCount: number;
}

const TRACK_DELAY_MS = 1500;

export function PostViewTracker({ slug, prevCount }: PostViewTrackerProps) {
  const [viewsCount, setViewsCount] = useState(prevCount);
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    hasTrackedRef.current = false;

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const runTracking = async () => {
      if (
        cancelled ||
        hasTrackedRef.current ||
        document.visibilityState !== "visible"
      ) {
        return;
      }

      hasTrackedRef.current = true;

      try {
        const res = await trackPostView(slug);

        if (!cancelled && res.data.tracked) {
          setViewsCount(res.data.viewsCount);
        }
      } catch {}
    };

    const scheduleTracking = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        void runTracking();
      }, TRACK_DELAY_MS);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        scheduleTracking();
        return;
      }

      if (timeoutId) clearTimeout(timeoutId);
    };

    if (document.visibilityState === "visible") {
      scheduleTracking();
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelled = true;

      if (timeoutId) clearTimeout(timeoutId);

      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [slug]);

  return (
    <div className="flex items-center gap-1">
      <Eye />
      {viewsCount.toLocaleString()} views
    </div>
  );
}
