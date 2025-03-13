"use server";

import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { getFullUrl, POST_REVALIDATE_TAG } from "@/src/helpers/routes";
import * as Sentry from "@sentry/nextjs";

export const customRevalidateTag = async (tag: string) => {
  try {
    const response = await fetch(getFullUrl(POST_REVALIDATE_TAG(tag)), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CACHE_REVALIDATION_TOKEN}`,
      },
    });

    const res = await response.json();
    Sentry.captureMessage(`${res?.message} tag: ${tag}`, (scope) =>
      scope.addBreadcrumb({
        data: res,
      }),
    );
  } catch (err) {
    customCaptureException(`Caught exception while calling revalidate-cache route. Tag: ${tag}.`, err);
  }
};
