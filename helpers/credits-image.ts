import { APIResponse } from "@/lib/strapi/types/types";
import { FicheSolution } from "@/components/ficheSolution/type";

export const getCreditsImageForFicheSolution = (ficheSolution: FicheSolution) => {
  const credits = new Set<string>();
  addImageCreditToSet(credits, ficheSolution.image_principale);
  ficheSolution.materiaux?.data.map((materiau) => addImageCreditToSet(credits, materiau.attributes.image));
  return Array.from(credits);
};

const addImageCreditToSet = (creditsSet: Set<string>, image?: APIResponse<"plugin::upload.file"> | null) => {
  const imageCredit = image?.data.attributes?.caption;
  if (imageCredit) creditsSet.add(imageCredit);
};
