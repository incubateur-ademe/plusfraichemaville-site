import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { revalidateTag } from "next/cache";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";

type StrapiWebhookPayload = {
  model: "webinaire";
  entry: {
    id: number;
    slug?: string;
  };
};

export async function POST(request: NextRequest) {
  const authorization = headers().get("authorization");
  const tag = request.nextUrl.searchParams.get("tag");

  if (authorization !== `Bearer ${process.env.CACHE_REVALIDATION_TOKEN}`) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  try {
    const payload: StrapiWebhookPayload = await request.json();
    if (payload.model === "webinaire") {
      revalidateTag("webinaires");
      return NextResponse.json({ message: "Successfully revalidated webinaires" }, { status: 200 });
    }
    return NextResponse.json({ message: "Nothing to revalidate" }, { status: 200 });
  } catch (error) {
    console.log("No body found, process manual tag revalidition", tag ?? "strapi");
    try {
      tag ? revalidateTag(tag) : revalidateTag("strapi");
      return NextResponse.json({ message: "Successfully revalidated cache" }, { status: 200 });
    } catch (error) {
      customCaptureException("Error when revalidating cache", error);
      return NextResponse.json({ message: "Unexpected error" }, { status: 500 });
    }
  }
}
