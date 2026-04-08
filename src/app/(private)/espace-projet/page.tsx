import { getPendingUserProjetsAction } from "@/src/actions/projets/get-pending-user-projets-action";
import { getUserProjetsAction } from "@/src/actions/projets/get-user-projets-action";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { auth } from "@/src/lib/next-auth/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import ListProjetsPageClient from "./ListProjetsPageClient";
import { isEmpty } from "@/src/helpers/listUtils";

export const metadata: Metadata = computeMetadata("Mes projets");

export default async function ListProjetsPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const session = await auth();
  const userId = session?.user?.id;

  if (userId && !searchParams?.invitation_token) {
    const { projets } = await getUserProjetsAction(userId);
    const { pendingProjets } = await getPendingUserProjetsAction(userId);

    if (projets && pendingProjets && isEmpty(projets) && isEmpty(pendingProjets)) {
      redirect(PFMV_ROUTES.CREATE_PROJET);
    }
  }

  return <ListProjetsPageClient />;
}
