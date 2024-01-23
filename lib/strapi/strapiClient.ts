import * as Sentry from "@sentry/nextjs";
import { APIResponse } from "@/lib/strapi/types/types";

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
      next: { revalidate: +(process.env.CMS_CACHE_TTL || 0) || 1 },
    })
      .then((res) =>
        res.json().catch((err) => {
          console.log("Error when transforming Strapi response to JSON", err, res);
          throw new Error("Error when transforming Strapi response to JSON " + err);
        }),
      )
      .then((res) => {
        if (res?.errors) {
          console.log("errors", res?.errors);
          Sentry.captureMessage("Some Strapi error occured", "error");
        }
        return res?.data;
      })
      .catch((err) => {
        Sentry.captureException(err);
      });
  } catch (err) {
    Sentry.captureException(err);
  }
};
