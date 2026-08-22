import { RetourExperience } from "@/src/lib/strapi/types/api/retour-experience";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { Media } from "@/src/lib/strapi/types/common/Media";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";

export const getCreditsImageForFicheSolution = (ficheSolution: FicheSolution) => {
  const credits = new Set<string>();
  addImageCreditToSet(credits, ficheSolution.image_principale);
  ficheSolution.materiaux?.map((materiau) => addImageCreditToSet(credits, materiau.image));
  return Array.from(credits);
};

export const getCreditsImageForRetourExperience = (retourExperience: RetourExperience) => {
  const credits = new Set<string>();
  addImageCreditToSet(credits, retourExperience.image_principale);
  addImageCreditToSet(credits, retourExperience.situation_avant?.image);
  addImageCreditToSet(credits, retourExperience.situation_apres?.image);
  retourExperience.solution_retour_experiences?.map((solution) => addImageCreditToSet(credits, solution.image));
  return Array.from(credits);
};

export const getCreditsImageForFicheDiagnostic = (ficheAttributes: FicheDiagnostic) => {
  const credits = new Set<string>();
  addImageCreditToSet(credits, ficheAttributes.image_principale);
  return Array.from(credits);
};

const addImageCreditToSet = (creditsSet: Set<string>, image?: Media | null) => {
  const imageCredit = image?.caption;
  if (imageCredit) creditsSet.add(imageCredit);
};
