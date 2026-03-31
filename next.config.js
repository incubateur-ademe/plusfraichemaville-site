/** @type {import("next").NextConfig} */

const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/surchauffe-urbaine/retour-experience/:path*",
        destination: "/retour-experience/diagnostic/:path*",
        permanent: true,
      },
      {
        source: "/espace-projet/:projetId(\\d{1,})/tableau-de-bord",
        has: [{ type: "query", key: "tab", value: "statut" }],
        destination: "/espace-projet/:projetId/statut-projet",
        permanent: true,
      },
      {
        source: "/espace-projet/:projetId(\\d{1,})/tableau-de-bord",
        has: [{ type: "query", key: "tab", value: "partage" }],
        destination: "/espace-projet/:projetId/utilisateurs-projet",
        permanent: true,
      },
      {
        source: "/projet/:path*",
        destination: "/retour-experience/projet/:path*",
        permanent: true,
      },
      {
        source: "/fiches-techniques",
        destination: "/fiche-solution",
        permanent: true,
      },
      {
        source: "/projets-realises",
        destination: "/projet",
        permanent: true,
      },
      {
        source: "/mon-projet/favoris",
        destination: "/espace-projet",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.plusfraichemaville.fr" }],
        destination: "https://plusfraichemaville.fr/:path*",
        permanent: true,
      },
      {
        source: "/fiches-diagnostic/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.woff2$/,
      type: "asset/resource",
    });
    config.optimization.splitChunks.minSize = 50000;
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plusfraichemaville.s3.fr-par.scw.cloud",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pfmv-cms-prod.s3.fr-par.scw.cloud",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plusfraichemaville-dev.s3.fr-par.scw.cloud",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.plusfraichemaville.fr",
        port: "",
        pathname: "/**",
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

module.exports = nextConfig;

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(module.exports, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "incubateur-ademe",
  project: "plusfraichemaville",
  sentryUrl: "https://sentry.incubateur.net/",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: false,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  },
});
