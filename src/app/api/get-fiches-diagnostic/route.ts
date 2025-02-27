import { getFicheDiagnosticById, getAllFichesDiagnostic } from "@/src/lib/strapi/queries/fiches-diagnostic-queries";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const ficheDiagnosticIds = request.nextUrl.searchParams.get("ficheDiagnosticIds");
  console.log("ids", ficheDiagnosticIds);

  if (ficheDiagnosticIds) {
    const ids = JSON.parse(ficheDiagnosticIds) as number[];

    const fiches = await Promise.all(ids.map((id) => getFicheDiagnosticById(id.toString())));

    return NextResponse.json(fiches.filter(Boolean));
  }

  return NextResponse.json([]);
}
