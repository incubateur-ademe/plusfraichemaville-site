import { PropsWithChildren } from "react";
import { Breadcrumb } from "@codegouvfr/react-dsfr/Breadcrumb";
import { getAideDecisionEtapeBySlug, getAideDecisionHistoryBySlug } from "@/lib/directus/queries/aideDecisionQueries";

export default async function Layout({
  params,
  children,
}: PropsWithChildren<{ params: { aideDecisionEtapeSlug: string } }>) {
  const etapeCourante = await getAideDecisionEtapeBySlug(params.aideDecisionEtapeSlug);
  const historique = await getAideDecisionHistoryBySlug(params.aideDecisionEtapeSlug);
  if (etapeCourante && historique) {
    return <>{children}</>;
  } else {
    return null;
  }
}
