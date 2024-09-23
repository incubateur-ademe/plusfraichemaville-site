"use client";

import { useSession } from "next-auth/react";
import AnalyticsPageView from "../analytics/analytics-page-view";
import { useHubspot } from "./use-hubspot";

export default function HubspotPageView() {
  const service = useHubspot();
  const email = useSession().data?.user.email;

  if (!email) {
    return null;
  }

  return (
    <AnalyticsPageView
      service="hubspot"
      acceptCookie={service.acceptCookie}
      declineCookie={service.declineCookie}
      tracker={(path) => service.setIdentity(email, { path })}
    />
  );
}
