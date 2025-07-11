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

// Injected content via Sentry wizard below
const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options
    errorHandler: (err, invokeErr, compilation) => {
      compilation.warnings.push("Sentry CLI Plugin: " + err.message);
    },

    // Suppresses source map uploading logs during build
    silent: true,
    org: "incubateur-ademe",
    project: "plusfraichemaville",
    url: "https://sentry.incubateur.net/",
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  },
);
