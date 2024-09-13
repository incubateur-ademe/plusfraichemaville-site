import { APIResponse } from "@/src/lib/strapi/types/types";
import { FicheSolution } from "@/src/components/ficheSolution/type";
import { RetourExperience } from "@/src/components/retourExperience/type";
import { FicheDiagnosticResponseAttributes } from "@/src/components/fiches-diagnostic/types";

export const getCreditsImageForFicheSolution = (ficheSolution: FicheSolution) => {
  const credits = new Set<string>();
  addImageCreditToSet(credits, ficheSolution.image_principale);
  ficheSolution.materiaux?.data.map((materiau) => addImageCreditToSet(credits, materiau.attributes.image));
  return Array.from(credits);
};

export const getCreditsImageForRetourExperience = (retourExperience: RetourExperience) => {
  const credits = new Set<string>();
  addImageCreditToSet(credits, retourExperience.image_principale);
  addImageCreditToSet(credits, retourExperience.situation_avant?.image);
  addImageCreditToSet(credits, retourExperience.situation_apres?.image);
  retourExperience.solution_retour_experiences?.data.map((solution) =>
    addImageCreditToSet(credits, solution.attributes.image),
  );
  return Array.from(credits);
};

export const getCreditsImageForFicheDiagnostic = (ficheDiagnostic: FicheDiagnosticResponseAttributes) => {
  const credits = new Set<string>();
  addImageCreditToSet(credits, ficheDiagnostic.image_principale);
  return Array.from(credits);
};

const addImageCreditToSet = (creditsSet: Set<string>, image?: APIResponse<"plugin::upload.file"> | null) => {
  const imageCredit = image?.data.attributes?.caption;
  if (imageCredit) creditsSet.add(imageCredit);
};
