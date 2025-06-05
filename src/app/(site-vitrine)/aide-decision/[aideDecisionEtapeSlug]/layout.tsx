import { PropsWithChildren } from "react";
import { notFound } from "next/navigation";
import { getAideDecisionBySlug, getAideDecisionHistoryBySlug } from "@/src/lib/strapi/queries/aideDecisionQueries";

export default async function Layout(props: PropsWithChildren<{ params: Promise<{ aideDecisionEtapeSlug: string }> }>) {
  const params = await props.params;

  const { children } = props;

  const etapeCourante = await getAideDecisionBySlug(params.aideDecisionEtapeSlug);
  const historique = await getAideDecisionHistoryBySlug(params.aideDecisionEtapeSlug);
  if (etapeCourante && historique) {
    return <>{children}</>;
  } else {
    notFound();
  }
}
