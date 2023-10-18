import { PropsWithChildren } from "react";
import Stepper from "@codegouvfr/react-dsfr/Breadcrumb";
import { getAideDecisionEtapeBySlug, getAideDecisionHistoryBySlug } from "@/lib/directus/queries/aideDecisionQueries";

export default async function Layout({
  params,
  children,
}: PropsWithChildren<{ params: { aideDecisionEtapeSlug: string } }>) {
  const etapeCourante = await getAideDecisionEtapeBySlug(params.aideDecisionEtapeSlug);
  const historique = await getAideDecisionHistoryBySlug(params.aideDecisionEtapeSlug);
  if (etapeCourante && historique) {
    return (
      <>
        <Stepper currentPageLabel={etapeCourante.nom} segments={historique} homeLinkProps={{ href: "/" }} />
        {children}
      </>
    );
  } else {
    return null;
  }
}
