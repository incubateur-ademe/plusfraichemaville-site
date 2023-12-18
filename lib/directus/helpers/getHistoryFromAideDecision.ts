import { AideDecisionEtapeHistory } from "@/lib/directus/queries/commonFilters";
import { AideDecisionEtape } from "@/lib/directus/directusModels";

export function getHistoryFromAideDecisionEtape(aideDecisionEtape: AideDecisionEtape, includeCurrentStep = false) {
  const history: AideDecisionEtapeHistory[] = [];
  let etapeParente: AideDecisionEtape | null | undefined = <AideDecisionEtape | null | undefined>(
    (includeCurrentStep ? aideDecisionEtape : aideDecisionEtape.etape_parente_id)
  );
  while (etapeParente) {
    history.unshift(
      new AideDecisionEtapeHistory(
        <string>etapeParente.nom,
        <string>etapeParente.slug,
        <string | null>etapeParente.image,
      ),
    );
    etapeParente = <AideDecisionEtape | null | undefined>etapeParente.etape_parente_id;
  }
  history.unshift(new AideDecisionEtapeHistory("Espace", ""));
  return history;
}
