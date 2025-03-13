import { captureError, customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { Media } from "@/src/lib/strapi/types/common/Media";
import { customRevalidateTag } from "@/src/helpers/revalidate-tag-call";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "";
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || "";

const SCALEWAY_S3_URL = "plusfraichemaville.s3.fr-par.scw.cloud";
const SCALEWAY_CDN_URL = "cdn.plusfraichemaville.fr";

export const STRAPI_IMAGE_KEY_SIZE = {
  large: "large",
  medium: "medium",
  small: "small",
} as const;
export type STRAPI_IMAGE_KEY_SIZE_TYPE = (typeof STRAPI_IMAGE_KEY_SIZE)[keyof typeof STRAPI_IMAGE_KEY_SIZE];

export const getStrapiImageUrl = (image?: { data: Media } | null, sizeKey?: STRAPI_IMAGE_KEY_SIZE_TYPE) => {
  if (!image?.data?.attributes) {
    return "/images/placeholder.svg";
  }
  if (sizeKey && image.data.attributes.formats && !!image.data.attributes.formats[sizeKey]) {
    return image.data.attributes.formats[sizeKey].url?.replace(SCALEWAY_S3_URL, SCALEWAY_CDN_URL);
  }
  return image.data.attributes.url?.replace(SCALEWAY_S3_URL, SCALEWAY_CDN_URL);
};

type StrapiGraphQLCallConfig = {
  variables?: any;
  signal?: AbortSignal;
  tag: string;
};

export const strapiGraphQLCall = async (query: string, config: StrapiGraphQLCallConfig) => {
  const defaultTag = "strapi";
  const tags = [defaultTag, config.tag];

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
      next: { revalidate: +(process.env.CMS_CACHE_TTL || 0) || 1, tags },
    });

    const res = await response.json();

    if (res?.errors) {
      captureError(`Some Strapi error occurred. Tags: ${tags.join(", ")}.`, res?.errors);
      await customRevalidateTag(config.tag);
    }

    return res?.data;
  } catch (err) {
    customCaptureException(`Caught exception while calling Strapi. Tags: ${tags.join(", ")}.`, err);
    await customRevalidateTag(config.tag);
  }
};
