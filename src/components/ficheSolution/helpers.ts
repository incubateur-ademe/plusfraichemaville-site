import { UNITE_COUT_MEGAWATTHEURE } from "@/src/helpers/cout/cout-common";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";

export const makeFicheSolutionUrlApi = (id: string[]) =>
  `/api/get-fiches-solutions?ficheSolutionIds=${JSON.stringify(id)}`;
export const makeFicheSolutionCompleteUrlApi = (id: string[]) =>
  `/api/get-fiches-solutions-complete?ficheSolutionIds=${JSON.stringify(id)}`;

export const isSimpleMateriauFicheSolution = (ficheSolution?: FicheSolution) =>
  ficheSolution?.cout_unite === UNITE_COUT_MEGAWATTHEURE.code;
