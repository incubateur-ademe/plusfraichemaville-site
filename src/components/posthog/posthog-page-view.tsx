"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { useEffect } from "react";
import { useConsent } from "@/src/components/cookie/consentManagement";

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  const { finalityConsent } = useConsent();
  const postHogConsent = finalityConsent?.posthog;

  useEffect(() => {
    if (postHogConsent) {
      console.debug("Activation des cookies PostHog.");
      posthog.set_config({ persistence: "localStorage+cookie", disable_persistence: false, disable_cookie: false });
    } else {
      console.debug("Désactivation des cookies PostHog.");
      posthog.set_config({ persistence: "memory" });
    }
  }, [postHogConsent]);

  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname;
      const search = searchParams.toString();
      if (search) {
        url += `?${search}`;
      }
      posthog.capture("$pageview", { $current_url: url });
    }
  }, [pathname, searchParams, posthog]);

  return null;
}

export function SuspendedPostHogPageView() {
  return <PostHogPageView />;
}
