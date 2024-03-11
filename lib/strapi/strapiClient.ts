import { APIResponse } from "@/lib/strapi/types/types";
import { captureError, customCaptureException } from "@/lib/sentry/sentryCustomMessage";

export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "";
export const STRAPI_TOKEN = process.env.STRAPI_TOKEN || "";

export const STRAPI_IMAGE_KEY_SIZE = {
  large: "large",
  medium: "medium",
  small: "small",
} as const;
export type STRAPI_IMAGE_KEY_SIZE_TYPE = (typeof STRAPI_IMAGE_KEY_SIZE)[keyof typeof STRAPI_IMAGE_KEY_SIZE];

export const getStrapiImageUrl = (
  image?: APIResponse<"plugin::upload.file"> | null,
  sizeKey?: STRAPI_IMAGE_KEY_SIZE_TYPE,
) => {
  if (!image?.data?.attributes) {
    return "/images/placeholder.svg";
  }
  // @ts-ignore
  if (sizeKey && image.data.attributes.formats && !!image.data.attributes.formats[sizeKey]) {
    // @ts-ignore
    return image.data.attributes.formats[sizeKey].url;
  }
  return image.data.attributes.url;
};

export const strapiGraphQLCall = async (query: String, variables?: any) => {
  try {
    return await fetch(STRAPI_URL + "/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
      next: { revalidate: +(process.env.CMS_CACHE_TTL || 0) || 1, tags: ["strapi"] },
    })
      .then((res) =>
        res.json().catch((err) => {
          customCaptureException("Error when transforming Strapi response to JSON", err);
          throw new Error("Error when transforming Strapi response to JSON " + err);
        }),
      )
      .then((res) => {
        if (res?.errors) {
          captureError("Some Strapi error occured", res?.errors);
        }
        return res?.data;
      })
      .catch((err) => {
        customCaptureException("Caugth an exception while calling Strapi", err);
      });
  } catch (err) {
    customCaptureException("Caugth exception while calling Strapi", err);
  }
};
