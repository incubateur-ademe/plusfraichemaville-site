import * as Sentry from "@sentry/nextjs";

export const DIRECTUS_URL = process.env.DIRECTUS_URL || "http://127.0.0.1/";
export const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN || "";
export const DIRECTUS_ASSET_URL = DIRECTUS_URL + "/assets/";

export const directusGraphQLCall = async (query: String, variables?: any) => {
  try {
    return await fetch(DIRECTUS_URL + "/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${DIRECTUS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
      next: { revalidate: +(process.env.DIRECTUS_CACHE_TTL || 0) || 1 },
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.data && res.errors) {
          Sentry.captureMessage(
            `Directus error : ${res.errors[0].extensions.code} : ${res.errors[0].extensions.errors[0].message}`,
            "error",
          );
        } else {
          return res.data;
        }
      })
      .catch((err) => {
        Sentry.captureException(err);
      });
  } catch (err) {
    Sentry.captureException(err);
  }
};
