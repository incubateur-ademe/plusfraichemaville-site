import { getFicheDiagnosticById } from "@/src/lib/strapi/queries/fiches-diagnostic-queries";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const ficheDiagnosticId = request.nextUrl.searchParams.get("ficheDiagnosticId");

  if (ficheDiagnosticId) {
    return NextResponse.json(await getFicheDiagnosticById(ficheDiagnosticId));
  }
  return NextResponse.json(null);
}
