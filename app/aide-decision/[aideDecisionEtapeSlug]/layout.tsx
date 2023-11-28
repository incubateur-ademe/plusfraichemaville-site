import { PropsWithChildren } from "react";
import { getAideDecisionEtapeBySlug, getAideDecisionHistoryBySlug } from "@/lib/directus/queries/aideDecisionQueries";
import { notFound } from "next/navigation";

export default async function Layout({
  params,
  children,
}: PropsWithChildren<{ params: { aideDecisionEtapeSlug: string } }>) {
  const etapeCourante = await getAideDecisionEtapeBySlug(params.aideDecisionEtapeSlug);
  const historique = await getAideDecisionHistoryBySlug(params.aideDecisionEtapeSlug);
  if (etapeCourante && historique) {
    return <>{children}</>;
  } else {
    notFound();
  }
}
