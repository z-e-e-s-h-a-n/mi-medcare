"use client";

import { MediaCard } from "./MediaCard";

interface MediaGridProps {
  medias: MediaResponse[];
  isLoading?: boolean;
  selectable?: boolean;
  onSelect?: (media: MediaResponse) => void;
}

export function MediaGrid({
  medias,
  isLoading,
  selectable,
  onSelect,
}: MediaGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-lg bg-muted animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(160px,1fr))]">
      {medias.map((m) => (
        <MediaCard
          key={m.id}
          media={m}
          selectable={selectable}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
