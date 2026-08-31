import { Webinaire } from "@/src/lib/strapi/types/api/webinaire";

export const isWebinaireInFuture = (webinaire: Webinaire): boolean => {
  return (
    (webinaire.jour_evenement && new Date(`${webinaire.jour_evenement} ${webinaire.heure_debut}`) > new Date()) || false
  );
};
