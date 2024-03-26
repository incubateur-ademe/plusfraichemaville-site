import { getFicheDiagnosticById } from "@/lib/strapi/queries/fiches-diagnostic-queries";
import useSWRImmutable from "swr/immutable";
import { FicheDiagnosticCard } from "./fiche-diagnostic-card";

export const FicheDiagnosticCardWithFetcher = ({ ficheDiagnosticId }: { ficheDiagnosticId: number }) => {
  const fetcher = async (fdId: number) => await getFicheDiagnosticById(fdId.toString());
  const { data } = useSWRImmutable(`fiche-diagnostic-${ficheDiagnosticId}`, () => fetcher(ficheDiagnosticId));
  console.log(data);

  if (!data) {
    return null;
  }
  return <FicheDiagnosticCard ficheDiagnostic={data} />;
};
