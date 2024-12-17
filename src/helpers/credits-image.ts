import { RetourExperience } from "@/src/lib/strapi/types/api/retour-experience";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { Media } from "@/src/lib/strapi/types/common/Media";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";

export const getCreditsImageForFicheSolution = (ficheSolution: FicheSolution) => {
  const credits = new Set<string>();
  addImageCreditToSet(credits, ficheSolution.attributes.image_principale);
  ficheSolution.attributes.materiaux?.data.map((materiau) => addImageCreditToSet(credits, materiau.attributes.image));
  return Array.from(credits);
};

export const getCreditsImageForRetourExperience = (retourExperience: RetourExperience) => {
  const credits = new Set<string>();
  addImageCreditToSet(credits, retourExperience.attributes.image_principale);
  addImageCreditToSet(credits, retourExperience.attributes.situation_avant?.image);
  addImageCreditToSet(credits, retourExperience.attributes.situation_apres?.image);
  retourExperience.attributes.solution_retour_experiences?.data.map((solution) =>
    addImageCreditToSet(credits, solution.attributes.image),
  );
  return Array.from(credits);
};

export const getCreditsImageForFicheDiagnostic = (ficheAttributes: FicheDiagnostic["attributes"]) => {
  const credits = new Set<string>();
  addImageCreditToSet(credits, ficheAttributes.image_principale);
  return Array.from(credits);
};

const addImageCreditToSet = (creditsSet: Set<string>, image?: { data: Media } | null) => {
  const imageCredit = image?.data.attributes?.caption;
  if (imageCredit) creditsSet.add(imageCredit);
};
