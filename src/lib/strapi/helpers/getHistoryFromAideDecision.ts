import { AideDecisionEtapeHistory } from "@/src/lib/strapi/queries/commonStrapiFilters";
import { AideDecisionEtape } from "@/src/lib/strapi/types/api/aide-decision-etape";

export function getHistoryFromAideDecisionEtape(aideDecisionEtape: AideDecisionEtape, includeCurrentStep = false) {
  const history: AideDecisionEtapeHistory[] = [];
  let etapeParente: AideDecisionEtape | null | undefined = includeCurrentStep
    ? aideDecisionEtape
    : aideDecisionEtape.attributes.etape_precedente?.data;
  while (etapeParente) {
    history.unshift(
      new AideDecisionEtapeHistory(
        <string>etapeParente.attributes.nom,
        <string>etapeParente.attributes.slug,
        etapeParente.attributes.image,
      ),
    );
    etapeParente = etapeParente.attributes.etape_precedente?.data;
  }
  history.unshift(new AideDecisionEtapeHistory("Espace", ""));
  return history;
}
