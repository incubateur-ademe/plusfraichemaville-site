import { failure, Result, success } from "@/helpers/result-manager";

export enum RagtimeSlug {
  // eslint-disable-next-line no-unused-vars
  conversation = "conversation",
}

export type RagtimeConfigPromise<T> = Promise<Result<T>>;

export const ragtimeConfig = async <T>(
  slug: string,
  body: Record<string, unknown>,
  method: "POST" | "GET",
): Promise<Result<T>> => {
  const url = `${process.env.RAGTIME_CHAT_URL}/${slug}`;
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RAGTIME_API_KEY}`,
    },
    ...(method === "POST" && { body: JSON.stringify({ ...body, agent: process.env.RAGTIME_MODEL }) }),
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      response.status === 500 ? failure("ERROR_500") : failure("SERVICE_ERROR");
    }

    const data = (await response.json()) as T;
    return success(data);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    return failure("SERVICE_ERROR");
  }
};
