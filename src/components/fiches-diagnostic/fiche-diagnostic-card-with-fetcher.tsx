import { FicheDiagnosticCard } from "./fiche-diagnostic-card";
import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { makeFicheDiagnosticUrlApi } from "./helpers";
import { FicheCardSkeleton } from "../common/fiche-card-skeleton";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";

export const FicheDiagnosticCardWithFetcher = ({
  ficheDiagnosticId,
  vertical,
}: {
  ficheDiagnosticId: number;
  vertical?: boolean;
}) => {
  const { data, isLoading } = useImmutableSwrWithFetcher<FicheDiagnostic>(makeFicheDiagnosticUrlApi(ficheDiagnosticId));

  return !data && isLoading ? (
    <FicheCardSkeleton horizontal={!vertical} />
  ) : (
    data && <FicheDiagnosticCard ficheDiagnostic={data} />
  );
};
