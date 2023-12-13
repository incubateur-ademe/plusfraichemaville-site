import * as Sentry from "@sentry/nextjs";

export const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://127.0.0.1/";
export const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN || "";
const DIRECTUS_ASSET_URL = DIRECTUS_URL + "/assets/";

export const DIRECTUS_IMAGE_KEY_SIZE = {
  aideDecisionCard: "aide-decision-card",
  ficheSolutionCard: "fiche-solution-card",
  retourExperienceCard: "retour-experience-card",
  retourExperiencePage: "retour-experience-page",
  retourExperienceSolutionThumbnail: "rex-solution-thumb",
  ficheSolutionLogoPartenaire: "fiche-solution-logo-partenaire",
} as const;
export type DIRECTUS_IMAGE_KEY_SIZE_TYPE = (typeof DIRECTUS_IMAGE_KEY_SIZE)[keyof typeof DIRECTUS_IMAGE_KEY_SIZE];

export const getDirectusImageUrl = (imageId?: string | null, customSizeKey?: DIRECTUS_IMAGE_KEY_SIZE_TYPE) => {
  if (!imageId) {
    return "/images/placeholder.svg";
  }
  return customSizeKey ? `${DIRECTUS_ASSET_URL}${imageId}?key=${customSizeKey}` : `${DIRECTUS_ASSET_URL}${imageId}`;
};

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
