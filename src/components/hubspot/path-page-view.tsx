"use client";

import AnalyticsPageView from "../analytics/analytics-page-view";
import { useHubspot } from "./use-hubspot";

export default function HubspotPageView() {
  const service = useHubspot();
  return (
    <AnalyticsPageView
      service="hubspot"
      acceptCookie={() => {}}
      declineCookie={service.declineCookie}
      tracker={service.setPathPageView}
    />
  );
}
