import { AideListe } from "./aide/aide-liste";
import { AideListeEmpty } from "./aide/aide-liste-empty";

export const Financement = async () => {
  return (
    <div className="fr-container pt-8">
      <AideListeEmpty />
      <AideListe />
    </div>
  );
};
