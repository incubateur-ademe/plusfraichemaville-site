import { Webinaire } from "@/src/lib/strapi/types/api/webinaire";

export const isWebinaireInFuture = (webinaire: Webinaire): boolean => {
  return (
    (webinaire.attributes.jour_evenement &&
      new Date(`${webinaire.attributes.jour_evenement} ${webinaire.attributes.heure_debut}`) > new Date()) ||
    false
  );
};
