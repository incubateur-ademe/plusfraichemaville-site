import { FicheDiagnosticCard } from "./fiche-diagnostic-card";
import { useImmutableSwrWithFetcher } from "@/hooks/use-swr-with-fetcher";
import { makeFicheDiagnosticUrlApi } from "./helpers";
import { FicheDiagnosticResponse } from "./types";

export const FicheDiagnosticCardWithFetcher = ({
  ficheDiagnosticId,
  vertical,
}: {
  ficheDiagnosticId: number;
  vertical?: boolean;
}) => {
  const { data } = useImmutableSwrWithFetcher<FicheDiagnosticResponse>(makeFicheDiagnosticUrlApi(ficheDiagnosticId));

  if (!data) {
    return null;
  }
  return <FicheDiagnosticCard ficheDiagnostic={data} vertical={vertical} />;
};
