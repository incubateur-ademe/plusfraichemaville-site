"use server";

import { revalidateTag } from "next/cache";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { ResponseAction } from "@/src/actions/actions-types";

export const revalidateTagAction = async (tags: string[]): Promise<ResponseAction<{ messageError?: string }>> => {
  try {
    tags.forEach((tag) => revalidateTag(tag));
    return { type: "success" };
  } catch (e) {
    customCaptureException(`Error in revalidateTagAction for tags ${tags}`, e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
