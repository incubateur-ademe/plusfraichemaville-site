import { AideEstimationsListe } from "./aide/aide-estimations-liste";
import { AideEstimationListeEmpty } from "./aide/aide-estimations-liste-empty";

export const Financement = async () => {
  return (
    <div className="fr-container pt-8">
      <AideEstimationListeEmpty />
      <AideEstimationsListe />
    </div>
  );
};
