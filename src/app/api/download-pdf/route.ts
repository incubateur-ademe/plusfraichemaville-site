import { captureError } from "@/src/lib/sentry/sentryCustomMessage";
import { NextResponse } from "next/server";
import { SCALEWAY_CDN_URL, SCALEWAY_S3_URL } from "@/src/lib/strapi/strapiClient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pdfUrl = searchParams.get("url");

  if (!pdfUrl) {
    captureError("Erreur lors de la génération du PDF.");
    return new NextResponse("Erreur lors de la génération du PDF.", { status: 400 });
  }

  let validatedUrl: string;
  try {
    const parsedUrl = new URL(pdfUrl);
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      captureError("Protocole de l'URL non autorisé pour le téléchargement de PDF.");
      return new NextResponse("URL non valide pour le téléchargement du PDF.", { status: 400 });
    }

    const allowedHosts = [SCALEWAY_S3_URL, SCALEWAY_CDN_URL];
    if (!allowedHosts.includes(parsedUrl.hostname)) {
      captureError("Hôte de l'URL non autorisé pour le téléchargement de PDF.");
      return new NextResponse("URL non valide pour le téléchargement du PDF.", { status: 400 });
    }

    validatedUrl = parsedUrl.toString();
  } catch {
    captureError("URL fournie pour le téléchargement de PDF invalide.");
    return new NextResponse("URL non valide pour le téléchargement du PDF.", { status: 400 });
  }

  try {
    const response = await fetch(validatedUrl);
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
