"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { acceptCookie, declineCookie, trackPageView } from "@/src/helpers/matomo/track-matomo";
import { useConsent } from "@/src/components/cookie/consentManagement";
import { useSession } from "next-auth/react";

export default function MatomoPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { finalityConsent } = useConsent();
  const matomoConsent = finalityConsent?.matomo;
  const { status } = useSession();

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
    if (status === "loading") return;
    const url = `${pathname}${Array.from(searchParams.keys()).length ? "?" + searchParams : ""}`;
    trackPageView(url, status === "authenticated");
  }, [pathname, searchParams, status]);

  return <></>;
}
