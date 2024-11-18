"use client";

import Script from "next/script";
import { useSession } from "next-auth/react";
import { useConsent } from "@/src/components/cookie/consentManagement";

export function HusbpotScript() {
  const email = useSession().data?.user.email;

  const { finalityConsent } = useConsent();
  const consent = finalityConsent?.hubspot;

  if (!email || !consent) {
    return null;
  }

  return <Script type="text/javascript" id="hs-script-loader" async defer src="//js-eu1.hs-scripts.com/145216267.js" />;
}
