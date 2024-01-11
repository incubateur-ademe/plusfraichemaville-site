import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { trackPageView } from "@/helpers/matomo/trackEvent";

export default function useTrackPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    // @ts-ignore
    const url = `${pathname}${[...searchParams.keys()].length ? "?" + searchParams : ""}`;
    trackPageView(url);
  }, [pathname, searchParams]);
}
