import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const headersToken = request.headers.get("authorization");
    const token = `Bearer ${process.env.REVALIDATE_STRAPI_CONTENT_TOKEN}`;

    if (!headersToken || headersToken !== token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    revalidatePath("/webinaires");

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date(),
    });
  } catch (err) {
    return NextResponse.json({ message: "Erreur dans l'appel du webhook" }, { status: 500 });
  }
}
