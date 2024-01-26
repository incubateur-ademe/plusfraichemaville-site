import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return process.env.NEXT_PUBLIC_SENTRY_ENV !== "production" ? {
    rules: {
      userAgent: "*",
      disallow: "/",
    }
  } : {
    rules: {
      userAgent: "*",
      allow: "/",
    }
  };
}
