import { RetourExperienceDiag } from "@/src/components/retour-experience-diag/retour-experience-diag";
import { getRetourExperienceDiagBySlug } from "@/src/lib/strapi/queries/retour-experience-diag-queries";
import { notFound } from "next/navigation";

type RetourExperienceDiagPageProps = {
  params: Promise<{ rexSlug: string }>;
};

export default async function RetourExperienceDiagPage(props: RetourExperienceDiagPageProps) {
  const params = await props.params;
  const rex = await getRetourExperienceDiagBySlug(params.rexSlug);

  if (!rex) {
    notFound();
  }

  return <RetourExperienceDiag rex={rex} showContacts={false} />;
}
