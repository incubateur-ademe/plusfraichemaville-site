import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = request.headers.get("authorization");
  console.log(token);

  if (token !== process.env.REVALIDATE_STRAPI_CONTENT_TOKEN) {
    return NextResponse.json({ message: "Le token n'est pas valide." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const path = body.path;

    if (path) {
      revalidatePath(path);
      return NextResponse.json({ revalidated: true, path });
    }

    return NextResponse.json({ message: "Le chemin n'est pas valide." }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ message: "Erreur lors de la revalidation" }, { status: 500 });
  }
}
