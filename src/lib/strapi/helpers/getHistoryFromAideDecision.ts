import { APIResponse, GetValues } from "@/src/lib/strapi/types/types";
import { AideDecisionEtapeHistory } from "@/src/lib/strapi/queries/commonStrapiFilters";

export function getHistoryFromAideDecisionEtape(
  aideDecisionEtape: GetValues<"api::aide-decision-etape.aide-decision-etape">,
  includeCurrentStep = false,
) {
  const history: AideDecisionEtapeHistory[] = [];
  let etapeParente: GetValues<"api::aide-decision-etape.aide-decision-etape"> | null | undefined = <
    GetValues<"api::aide-decision-etape.aide-decision-etape"> | null | undefined
  >(includeCurrentStep ? aideDecisionEtape : aideDecisionEtape.etape_precedente?.data?.attributes);
  while (etapeParente) {
    history.unshift(
      new AideDecisionEtapeHistory(
        <string>etapeParente.nom,
        <string>etapeParente.slug,
        <APIResponse<"plugin::upload.file"> | null>etapeParente.image,
      ),
    );
    etapeParente = <GetValues<"api::aide-decision-etape.aide-decision-etape"> | null | undefined>(
      etapeParente.etape_precedente?.data?.attributes
    );
  }
  history.unshift(new AideDecisionEtapeHistory("Espace", ""));
  return history;
}
