"use client";

import { useEffect } from "react";
import { createPostView } from "@workspace/sdk/content";

interface PostViewTrackerProps {
  postId?: string;
}

const VISITOR_KEY_STORAGE = "mi-medcare-visitor-key";

function getVisitorKey() {
  if (typeof window === "undefined") return undefined;

  const existingKey = window.localStorage.getItem(VISITOR_KEY_STORAGE);
  if (existingKey) return existingKey;

  const generatedKey =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  window.localStorage.setItem(VISITOR_KEY_STORAGE, generatedKey);
  return generatedKey;
}

export function PostViewTracker({ postId }: PostViewTrackerProps) {
  useEffect(() => {
    if (!postId) return;

    const visitorKey = getVisitorKey();
    if (!visitorKey) return;

    void createPostView({ postId, visitorKey });
  }, [postId]);

  return null;
}
