"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { acceptCookie, declineCookie, trackPageView } from "@/src/helpers/matomo/track-matomo";
import { useConsent } from "@/src/components/cookie/consentManagement";

export default function MatomoPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { finalityConsent } = useConsent();
  const matomoConsent = finalityConsent?.matomo;

  useEffect(() => {
    if (matomoConsent) {
      console.debug("Activation des cookies Matomo.");
      acceptCookie();
    } else {
      console.debug("Désactivation des cookies Matomo.");
      declineCookie();
    }
  }, [matomoConsent]);

  useEffect(() => {
    const url = `${pathname}${Array.from(searchParams.keys()).length ? "?" + searchParams : ""}`;
    trackPageView(url);
  }, [pathname, searchParams]);

  return <></>;
}
