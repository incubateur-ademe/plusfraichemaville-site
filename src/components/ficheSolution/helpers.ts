import { UNITE_COUT_MEGAWATTHEURE } from "@/src/helpers/cout/cout-common";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";

export const makeFicheSolutionUrlApi = (id: string | number | string[] | number[]) =>
  `/api/get-fiches-solutions?ficheSolutionIds=[${id}]`;
export const makeFicheSolutionCompleteUrlApi = (id: string | number | string[] | number[]) =>
  `/api/get-fiches-solutions-complete?ficheSolutionIds=[${id}]`;

export const isSimpleMateriauFicheSolution = (ficheSolution?: FicheSolution) =>
  ficheSolution?.attributes.cout_unite === UNITE_COUT_MEGAWATTHEURE.code;
