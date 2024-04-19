"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { trackPageView } from "@/helpers/matomo/trackEvent";

export default function MatomoPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    const url = `${pathname}${Array.from(searchParams.keys()).length ? "?" + searchParams : ""}`;
    trackPageView(url);
  }, [pathname, searchParams]);

  return <></>;
}
