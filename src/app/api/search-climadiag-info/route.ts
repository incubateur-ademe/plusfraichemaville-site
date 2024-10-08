import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/src/lib/next-auth/auth";
import { searchClimadiagInfo } from "@/src/lib/prisma/prisma-climadiag-queries";

export async function GET(request: NextRequest) {
  const searchText = request.nextUrl.searchParams.get("search");
  const limit = +(request.nextUrl.searchParams.get("limit") || 15);
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json([], { status: 401 });
  }
  if (!searchText || searchText.length < 3 || limit <= 0 || limit > 20) {
    return NextResponse.json([], { status: 400 });
  }

  const searchTerms = searchText
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/ +/);

  return NextResponse.json(await searchClimadiagInfo(searchTerms, limit));
}
