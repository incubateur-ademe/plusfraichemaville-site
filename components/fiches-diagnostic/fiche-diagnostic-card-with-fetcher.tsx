import { FicheDiagnosticCard } from "./fiche-diagnostic-card";
import { useImmutableSwrWithFetcher } from "@/hooks/use-swr-with-fetcher";
import { makeFicheDiagnosticUrlApi } from "./helpers";
import { FicheDiagnosticResponse } from "./types";
import { FicheCardSkeleton } from "../common/fiche-card-skeleton";

export const FicheDiagnosticCardWithFetcher = ({
  ficheDiagnosticId,
  vertical,
}: {
  ficheDiagnosticId: number;
  vertical?: boolean;
}) => {
  const { data, isLoading } = useImmutableSwrWithFetcher<FicheDiagnosticResponse>(
    makeFicheDiagnosticUrlApi(ficheDiagnosticId),
  );

  return !data && isLoading ? (
    <FicheCardSkeleton vertical />
  ) : (
    data && <FicheDiagnosticCard ficheDiagnostic={data} vertical={vertical} />
  );
};
