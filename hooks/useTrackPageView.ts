import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackPageView } from "@/helpers/matomo/trackEvent";

export default function useTrackPageView() {
  const pathname = usePathname();
  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);
}
