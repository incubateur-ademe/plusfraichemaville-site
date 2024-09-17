"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useConsent } from "@/src/components/cookie/consentManagement";
import { AnalyticsService } from "./types";

type AnalyticsPageViewProps = {
  service: AnalyticsService;
  acceptCookie: () => void;
  declineCookie: () => void;
  tracker: (_path: string) => void;
};

export default function AnalyticsPageView({ service, acceptCookie, declineCookie, tracker }: AnalyticsPageViewProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { finalityConsent } = useConsent();
  const consent = finalityConsent?.[service];

  useEffect(() => {
    if (consent) {
      console.debug(`Activation des cookies ${service}.`);
      acceptCookie();
    } else {
      console.debug(`Désactivation des cookies ${service}.`);
      declineCookie();
    }
  }, [acceptCookie, consent, declineCookie, service]);

  useEffect(() => {
    if (consent) {
      const url = `${pathname}${Array.from(searchParams.keys()).length ? "?" + searchParams : ""}`;
      tracker(url);
    }
  }, [consent, pathname, searchParams, tracker]);

  return null;
}
