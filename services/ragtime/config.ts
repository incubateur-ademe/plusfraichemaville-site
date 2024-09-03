type RagtimeResponse<T> = T;

export enum RagtimeSlug {
  // eslint-disable-next-line no-unused-vars
  conversation = "conversation",
}

export const ragtimeConfig = async <T>(
  slug: string,
  body: Record<string, unknown>,
  method: "POST" | "GET",
): Promise<RagtimeResponse<T>> => {
  const url = `${process.env.RAGTIME_CHAT_URL}/${slug}`;
  const options = {
    method: method ?? "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${process.env.RAGTIME_API_KEY}`,
    },
  };

  const post = async () =>
    await fetch(url, {
      ...options,
      body: JSON.stringify({
        ...body,
        agent: process.env.RAGTIME_MODEL,
      }),
    });

  const get = async () =>
    await fetch(url, {
      ...options,
    });

  const response = method === "GET" ? await get() : await post();

  return (await response.json()) as RagtimeResponse<T>;
};
