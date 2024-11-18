"use client";

import Script from "next/script";
import { useSession } from "next-auth/react";

export function HusbpotScript() {
  const email = useSession().data?.user.email;

  if (!email) {
    return null;
  }

  return <Script type="text/javascript" id="hs-script-loader" async defer src="//js-eu1.hs-scripts.com/145216267.js" />;
}
