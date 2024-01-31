import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { revalidateTag } from "next/cache";

export async function POST() {
  const authorization = headers().get("authorization");
  if (authorization !== `Bearer ${process.env.CACHE_REVALIDATION_TOKEN}`) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  try {
    revalidateTag("strapi");
    return NextResponse.json({ message: "Successfully revalidated cache" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Unexpected error" }, { status: 500 });
  }
}