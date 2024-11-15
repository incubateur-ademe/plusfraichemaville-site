import { WebinaireResponse } from "@/src/components/webinaires/types";

export const isWebinaireInFuture = (webinaire: WebinaireResponse): boolean => {
  return (
    (webinaire.attributes.jour_evenement &&
      new Date(`${webinaire.attributes.jour_evenement} ${webinaire.attributes.heure_debut}`) > new Date()) ||
    false
  );
};
