import { NextRequest, NextResponse } from "next/server";
import { searchClimadiagInfo } from "@/src/lib/prisma/prisma-climadiag-queries";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
  const authorization = (await headers()).get("X-AUTH-TOKEN");
  if (authorization !== process.env.PFAT_CLIMADIAG_API_TOKEN) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const searchText = request.nextUrl.searchParams.get("search");
  const limit = +(request.nextUrl.searchParams.get("limit") || 15);
  if (!searchText || searchText.length < 3 || limit <= 0 || limit > 20) {
    return NextResponse.json([], { status: 400 });
  }

  const searchTerms = searchText
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/ +/);

  return NextResponse.json(await searchClimadiagInfo(searchTerms, limit));
}
