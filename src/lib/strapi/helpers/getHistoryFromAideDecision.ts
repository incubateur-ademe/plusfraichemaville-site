import { AideDecisionEtapeHistory } from "@/src/lib/strapi/queries/commonStrapiFilters";
import { AideDecisionEtape } from "@/src/lib/strapi/types/api/aide-decision-etape";

export function getHistoryFromAideDecisionEtape(aideDecisionEtape: AideDecisionEtape, includeCurrentStep = false) {
  const history: AideDecisionEtapeHistory[] = [];
  let etapeParente: AideDecisionEtape | null | undefined = includeCurrentStep
    ? aideDecisionEtape
    : aideDecisionEtape.etape_precedente;
  while (etapeParente) {
    history.unshift(
      new AideDecisionEtapeHistory(<string>etapeParente.nom, <string>etapeParente.slug, etapeParente.image),
    );
    etapeParente = etapeParente.etape_precedente;
  }
  history.unshift(new AideDecisionEtapeHistory("Choix du type d'espace", ""));
  return history;
}
