import { captureError } from "@/src/lib/sentry/sentryCustomMessage";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pdfUrl = searchParams.get("url");

  if (!pdfUrl) {
    captureError("Erreur lors de la génération du PDF.");
    return new NextResponse("Erreur lors de la génération du PDF.", { status: 400 });
  }

  try {
    const response = await fetch(pdfUrl);

    if (!response.ok) {
      captureError("Erreur lors du téléchargement du PDF.");
      return new NextResponse("Erreur lors du téléchargement du PDF.", { status: 400 });
    }

    const pdfBlob = await response.blob();
    const fileName = pdfUrl.split("/").pop() || "document.pdf";

    return new NextResponse(pdfBlob, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error("Erreur lors du téléchargement du PDF:", error);
    return new NextResponse("Erreur lors du téléchargement", { status: 500 });
  }
}
