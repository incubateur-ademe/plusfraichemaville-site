import { FicheDiagnosticRex } from "@/src/components/fiches-diagnostic-rex/fiche-diagnostic-rex";
import { getRetourExperienceDiagBySlug } from "@/src/lib/strapi/queries/retour-experience-diag-queries";
import { notFound } from "next/navigation";

type FicheDiagnosticRexPageProps = {
  params: Promise<{ rexSlug: string }>;
};

export default async function FicheDiagnosticRexPage(props: FicheDiagnosticRexPageProps) {
  const params = await props.params;
  const rex = await getRetourExperienceDiagBySlug(params.rexSlug);

  if (!rex) {
    notFound();
  }

  return <FicheDiagnosticRex rex={rex} />;
}
