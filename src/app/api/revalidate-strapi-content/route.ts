import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type StrapiWebhookPayload = {
  model: "fiche-solution" | "retour-experience" | "fiche-diagnostic" | "webinaire";
  entry: {
    id: number;
    slug?: string;
  };
};

const getPathsToRevalidate = (payload: StrapiWebhookPayload) => {
  const paths = [];

  switch (payload.model) {
    case "webinaire":
      paths.push("/webinaires");
      break;
  }

  return Array.from(new Set(paths));
};

export async function POST(request: NextRequest) {
  try {
    const headersToken = request.headers.get("authorization");
    const token = `Bearer ${process.env.REVALIDATE_STRAPI_CONTENT_TOKEN}`;

    if (!headersToken || headersToken !== token) {
      console.log("Token non valide");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload: StrapiWebhookPayload = await request.json();

    const pathsToRevalidate = getPathsToRevalidate(payload);

    const results = pathsToRevalidate.map((path) => {
      try {
        revalidatePath(path);
        return { path, success: true };
      } catch (error) {
        console.error(`Erreur de revalidation pour ${path}:`, error);
        return { path, success: false };
      }
    });

    return NextResponse.json({
      revalidated: true,
      results,
      timestamp: new Date(),
    });
  } catch (err) {
    console.error("Erreur:", err);
    return NextResponse.json(
      {
        message: "Erreur dans l'appel du webhook",
      },
      { status: 500 },
    );
  }
}
