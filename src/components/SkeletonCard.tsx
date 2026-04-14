"use client";

export default function SkeletonCard() {
  return (
    <div className="rounded-3xl overflow-hidden bg-[var(--card-bg)] border border-[var(--card-border)]">
      <div className="aspect-[4/3] skeleton" />
      <div className="p-5 space-y-3">
        <div className="h-5 w-3/4 skeleton" />
        <div className="h-4 w-full skeleton" />
        <div className="h-4 w-2/3 skeleton" />
        <div className="flex justify-between mt-4">
          <div className="h-3 w-20 skeleton" />
          <div className="h-3 w-16 skeleton" />
        </div>
      </div>
    </div>
  );
}
