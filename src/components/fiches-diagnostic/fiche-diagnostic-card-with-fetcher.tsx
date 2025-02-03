import { FicheDiagnosticCard } from "./fiche-diagnostic-card";
import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { makeFicheDiagnosticUrlApi } from "./helpers";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";
import { FicheDiagnosticCardSkeleton } from "@/src/components/fiches-diagnostic/fiche-diagnostic-card-skeleton";

export const FicheDiagnosticCardWithFetcher = ({
  ficheDiagnosticId,
}: {
  ficheDiagnosticId: number;
  vertical?: boolean;
}) => {
  const { data, isLoading } = useImmutableSwrWithFetcher<FicheDiagnostic>(makeFicheDiagnosticUrlApi(ficheDiagnosticId));

  return !data && isLoading ? <FicheDiagnosticCardSkeleton /> : data && <FicheDiagnosticCard ficheDiagnostic={data} />;
};
