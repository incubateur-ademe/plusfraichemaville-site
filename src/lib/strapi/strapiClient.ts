import { APIResponse } from "@/src/lib/strapi/types/types";
import { captureError, customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { revalidateTag } from "next/cache";

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

type StrapiGraphQLCallConfig = {
  variables?: any;
  signal?: AbortSignal;
  tag?: string;
};

export const strapiGraphQLCall = async (query: string, config?: StrapiGraphQLCallConfig) => {
  const tag = config?.tag ? `strapi-${config.tag}` : "strapi";
  try {
    const response = await fetch(STRAPI_URL + "/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: config?.variables,
      }),
      signal: config?.signal,
      next: { revalidate: +(process.env.CMS_CACHE_TTL || 0) || 1, tags: [tag] },
    });

    const res = await response.json();

    if (res?.errors) {
      revalidateTag(tag);
      captureError("Some Strapi error occurred", res?.errors);
    }

    return res?.data;
  } catch (err) {
    revalidateTag(tag);
    customCaptureException("Caught exception while calling Strapi", err);
  }
};
