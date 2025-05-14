import { NextRequest, NextResponse } from "next/server";
import { searchClimadiagInfo } from "@/src/lib/prisma/prisma-climadiag-queries";
import { climadiagToPublicClimadiag } from "@/src/components/surchauffe-urbaine/territoire/search-helpers";

export async function GET(request: NextRequest) {
  const searchText = request.nextUrl.searchParams.get("search");
  const limit = +(request.nextUrl.searchParams.get("limit") || 15);
  if (!searchText || searchText.length < 3 || limit <= 0 || limit > 20) {
    return NextResponse.json([], { status: 400 });
  }

  const searchTerms = searchText
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/ +/);
  const climadiagInfos = await searchClimadiagInfo(searchTerms, limit);

  return NextResponse.json(climadiagInfos.map(climadiagToPublicClimadiag));
}
