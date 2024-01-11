"use client";
import Script from "next/script";

export default function MatomoScript() {
  return (
    <>
      {process.env.NEXT_PUBLIC_MATOMO_SITE_ID && process.env.NEXT_PUBLIC_MATOMO_URL && (
        <>
          <Script id="matomo">
            {`
          var _paq = window._paq = window._paq || [];
          /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
          _paq.push(['trackPageView']);
          _paq.push(['enableLinkTracking']);
          (function() {
            var u="${process.env.NEXT_PUBLIC_MATOMO_URL}";
            _paq.push(['setTrackerUrl', u+'matomo.php']);
            _paq.push(['setSiteId', ${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}]);
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
          })();
        `}
          </Script>
        </>
      )}
    </>
  );
}
