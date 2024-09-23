import { headers } from "next/headers";
import Script from "next/script";

export function HusbpotScript() {
  const nonce = headers().get("x-nonce") || "";

  return (
    <Script
      type="text/javascript"
      id="hs-script-loader"
      async
      defer
      src="//js-eu1.hs-scripts.com/145216267.js"
      nonce={`nonce-${nonce}`}
    />
  );
}
