"use client";
import { trackEvent } from "@/src/helpers/matomo/track-matomo";
import { MATOMO_EVENT } from "@/src/helpers/matomo/matomo-tags";

export default function CustomTabButton({
  label,
  isSelected,
  contentId,
  className,
  matomoTrackEvent,
}: {
  label: string;
  isSelected: boolean;
  contentId: string;
  className?: string;
  matomoTrackEvent?: MATOMO_EVENT;
}) {
  return (
    <button
      className={className}
      tabIndex={isSelected ? 0 : -1}
      role="tab"
      aria-selected={isSelected}
      aria-controls={contentId}
      onClick={() => matomoTrackEvent && trackEvent(matomoTrackEvent)}
    >
      {label}
    </button>
  );
}
