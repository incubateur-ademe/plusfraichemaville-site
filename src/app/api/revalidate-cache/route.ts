import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { revalidateTag } from "next/cache";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";

export async function POST(request: NextRequest) {
  const authorization = headers().get("authorization");
  const tag = request.nextUrl.searchParams.get("tag");

  if (authorization !== `Bearer ${process.env.CACHE_REVALIDATION_TOKEN}`) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  try {
    tag ? revalidateTag(tag) : revalidateTag("strapi");

    return NextResponse.json({ message: "Successfully revalidated cache" }, { status: 200 });
  } catch (error) {
    customCaptureException("Error when revalidating cache", error);
    return NextResponse.json({ message: "Unexpected error" }, { status: 500 });
  }
}
