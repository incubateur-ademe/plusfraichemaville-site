import { getFicheDiagnosticById } from "@/lib/strapi/queries/fiches-diagnostic-queries";
import useSWRImmutable from "swr/immutable";
import { FicheDiagnosticCard } from "./fiche-diagnostic-card";

const fetcher = async (fdId: number) => await getFicheDiagnosticById(fdId.toString());

export const FicheDiagnosticCardWithFetcher = ({ ficheDiagnosticId }: { ficheDiagnosticId: number }) => {
  const { data } = useSWRImmutable(`fiche-diagnostic-${ficheDiagnosticId}`, () => fetcher(ficheDiagnosticId));
  if (!data) {
    return null;
  }
  return <FicheDiagnosticCard ficheDiagnostic={data} />;
};
