import { FichesDiagnostic } from "@/src/components/fiches-diagnostic/fiches-diagnostic";
import { getAllFichesDiagnostic } from "@/src/lib/strapi/queries/fiches-diagnostic-queries";
import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";

export const metadata: Metadata = computeMetadata("Évaluez la surchauffe");

export default async function FichesDiagnosticPage() {
  const fichesDiagnosticResponse = await getAllFichesDiagnostic();

  return <FichesDiagnostic fichesDiagnostic={fichesDiagnosticResponse} />;
}
