import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

const privatePages = ["/espace-projet.*", "/info-perso.*"];

const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
const cspHeader = `
    default-src 'self';
    script-src 'self' https://stats.beta.gouv.fr 'nonce-${nonce}' 'strict-dynamic' ${
      process.env.NODE_ENV === "production" ? "" : `'unsafe-eval' 'unsafe-inline'`
    };
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://cdn.plusfraichemaville.fr/ https://pfmv-cms-prod.s3.fr-par.scw.cloud/
    https://*.basemaps.cartocdn.com
    https://cartagene.cerema.fr
    https://tile.openstreetmap.org
    https://*.hsforms.com 
    https://data.geopf.fr
    https://*.hubspot.com;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-src https://stats.plusfraichemaville.fr;
    frame-ancestors 'none';
    upgrade-insecure-requests;
    connect-src 'self' https://sentry.incubateur.net/ https://stats.beta.gouv.fr/matomo.php https://cta-eu1.hubspot.com/
     https://api-adresse.data.gouv.fr/search/ https://*.hscollectedforms.net https://cartagene.cerema.fr https://data.geopf.fr
      https://openmaptiles.github.io https://openmaptiles.geo.data.gouv.fr https://openmaptiles.data.gouv.fr ;
`;
const cspHeaderValue = cspHeader.replace(/\s{2,}/g, " ").trim();

const authMiddleware = withAuth(
  function onSuccess(req) {
    return cspMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token !== null,
    },
  },
);

const cspMiddleware = (request: NextRequest) => {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", cspHeaderValue);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set("Content-Security-Policy", cspHeaderValue);
  return response;
};

export default function middleware(request: NextRequest) {
  const privatePathnameRegex = RegExp(`^(${privatePages.join("|")})/?$`, "i");
  const isPrivatePage = privatePathnameRegex.test(request.nextUrl.pathname);

  return isPrivatePage ? (authMiddleware as any)(request) : cspMiddleware(request);
}
