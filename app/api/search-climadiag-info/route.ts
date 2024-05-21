import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/next-auth/auth";
import { searchClimadiagInfo } from "@/lib/prisma/prisma-climadiag-queries";

export async function GET(request: NextRequest) {
  const searchText = request.nextUrl.searchParams.get("search");
  const session = await getServerSession(authOptions);
  if (session) {
    if (searchText) {
      const searchTerms = searchText.split(" ");
      return NextResponse.json(await searchClimadiagInfo(searchTerms, 15));
    } else {
      return NextResponse.json(null, { status: 400 });
    }
  } else {
    return NextResponse.json(null, { status: 401 });
  }
}
