import { auth } from "@/src/lib/next-auth/auth";
import { headers } from "next/headers";
import Script from "next/script";

export async function HusbpotScript() {
  const nonce = headers().get("x-nonce") || "";
  const session = await auth();

  if (!session?.user.email) {
    return null;
  }

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
