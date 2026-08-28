import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/next-auth/auth";
import { PermissionManager } from "@/src/helpers/permission-manager";
import { getProjetWithRelationsById } from "@/src/lib/prisma/prismaProjetQueries";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { ResponseAction } from "@/src/actions/actions-types";
import { ProjetSyntheseFormSchema } from "@/src/forms/projet-synthese/projet-synthese-form-schema";
import path from "path";
import fs from "fs/promises";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json<ResponseAction<{ fileBase64?: string | null }>>(
      { type: "error", message: "UNAUTHENTICATED", fileBase64: null },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();
    const projetId = Number(body.projetId);
    if (!projetId) {
      return NextResponse.json<ResponseAction<{ fileBase64?: string | null }>>(
        { type: "error", message: "PARSING_ERROR", fileBase64: null },
        { status: 400 },
      );
    }

    const parse = ProjetSyntheseFormSchema.safeParse(body.formData || body);
    if (!parse.success) {
      return NextResponse.json<ResponseAction<{ fileBase64?: string | null }>>(
        { type: "error", message: "PARSING_ERROR", fileBase64: null },
        { status: 400 },
      );
    }

    const projet = await getProjetWithRelationsById(projetId);
    if (!projet) {
      return NextResponse.json<ResponseAction<{ fileBase64?: string | null }>>(
        { type: "error", message: "TECHNICAL_ERROR", fileBase64: null },
        { status: 404 },
      );
    }

    const permission = new PermissionManager(session);
    if (!(await permission.canViewProject(projet.id))) {
      return NextResponse.json<ResponseAction<{ fileBase64?: string | null }>>(
        { type: "error", message: "UNAUTHORIZED", fileBase64: null },
        { status: 403 },
      );
    }

    const filePath = path.join(process.cwd(), "public", "templates", "template_synthese_projet.pptx");
    const fileBuffer = await fs.readFile(filePath);

    return NextResponse.json<ResponseAction<{ fileBase64?: string | null; filename?: string }>>({
      type: "success",
      fileBase64: fileBuffer.toString("base64"),
      filename: `synthese-projet-${projet.id}.pptx`,
    });
  } catch (error) {
    customCaptureException("Erreur lors de la lecture du template PPTX", error);
    return NextResponse.json<ResponseAction<{ fileBase64?: string | null }>>(
      { type: "error", message: "TECHNICAL_ERROR", fileBase64: null },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  const projetIdParam = request.nextUrl.searchParams.get("projetId");
  if (!projetIdParam) {
    return NextResponse.json<ResponseAction<{ fileBase64?: string | null }>>(
      { type: "error", message: "PARSING_ERROR", fileBase64: null },
      { status: 400 },
    );
  }

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json<ResponseAction<{ fileBase64?: string | null }>>(
      { type: "error", message: "UNAUTHENTICATED", fileBase64: null },
      { status: 401 },
    );
  }

  const projetId = +projetIdParam;
  const projet = await getProjetWithRelationsById(projetId);
  if (!projet) {
    return NextResponse.json<ResponseAction<{ fileBase64?: string | null }>>(
      { type: "error", message: "TECHNICAL_ERROR", fileBase64: null },
      { status: 404 },
    );
  }

  const permission = new PermissionManager(session);
  if (!(await permission.canViewProject(projet.id))) {
    return NextResponse.json<ResponseAction<{ fileBase64?: string | null }>>(
      { type: "error", message: "UNAUTHORIZED", fileBase64: null },
      { status: 403 },
    );
  }

  try {
    const filePath = path.join(process.cwd(), "public", "templates", "template_synthese_projet.pptx");
    const fileBuffer = await fs.readFile(filePath);

    return NextResponse.json<ResponseAction<{ fileBase64?: string | null; filename?: string }>>({
      type: "success",
      fileBase64: fileBuffer.toString("base64"),
      filename: `synthese-projet-${projet.id}.pptx`,
    });
  } catch (error) {
    customCaptureException("Erreur lors de la lecture du template PPTX", error);
    return NextResponse.json<ResponseAction<{ fileBase64?: string | null }>>(
      { type: "error", message: "TECHNICAL_ERROR", fileBase64: null },
      { status: 500 },
    );
  }
}
