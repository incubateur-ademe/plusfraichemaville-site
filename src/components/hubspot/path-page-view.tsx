"use client";

import { acceptHubspotCookie, declineHubspotCookie, trackUserWithEmail } from "./track-hubspot";
import { useUserStore } from "@/src/stores/user/provider";
import { useEffect } from "react";
import { sanitizeUrlForAnalyticTool } from "@/src/components/analytics/helpers";
import { useConsent } from "@/src/components/cookie/consentManagement";
import { usePathname, useSearchParams } from "next/navigation";

export default function HubspotPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentUser = useUserStore((state) => state.userInfos);
  const { finalityConsent } = useConsent();
  const consent = finalityConsent?.hubspot;

  useEffect(() => {
    if (consent) {
      acceptHubspotCookie();
    } else {
      declineHubspotCookie();
    }
  }, [consent]);

  useEffect(() => {
    if (consent) {
      const url = `${pathname}${Array.from(searchParams.keys()).length ? "?" + searchParams : ""}`;
      const sanitizedUrl = sanitizeUrlForAnalyticTool(url);
      trackUserWithEmail(sanitizedUrl, currentUser?.email);
    }
  }, [consent, currentUser?.email, pathname, searchParams]);
  return <></>;
}
