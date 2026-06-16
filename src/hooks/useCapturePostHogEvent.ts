"use client";

import { usePostHog } from "posthog-js/react";
import { useCallback } from "react";
import { PosthogEvent } from "@/src/helpers/posthog/posthog-events";

export function useCapturePostHogEvent() {
  const posthog = usePostHog();

  const capturePostHogEvent = useCallback(
    (event: PosthogEvent) => {
      if (!posthog) return;
      posthog.capture(event);
    },
    [posthog],
  );

  return { capturePostHogEvent };
}
