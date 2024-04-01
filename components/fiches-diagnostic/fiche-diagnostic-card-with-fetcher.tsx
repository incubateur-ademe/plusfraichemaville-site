import { getFicheDiagnosticById } from "@/lib/strapi/queries/fiches-diagnostic-queries";
import useSWRImmutable from "swr/immutable";
import { FicheDiagnosticCard } from "./fiche-diagnostic-card";

export const FicheDiagnosticCardWithFetcher = ({
  ficheDiagnosticId,
  horizontal,
}: {
  ficheDiagnosticId: number;
  horizontal?: boolean;
}) => {
  const fetcher = async (fdId: number) => await getFicheDiagnosticById(fdId.toString());
  const { data } = useSWRImmutable(`fiche-diagnostic-${ficheDiagnosticId}`, () => fetcher(ficheDiagnosticId));

  if (!data) {
    return null;
  }
  return <FicheDiagnosticCard ficheDiagnostic={data} horizontal={horizontal} />;
};
