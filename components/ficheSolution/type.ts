import { APIResponseData, GetValues } from "@/lib/strapi/types/types";

export type FicheSolution = GetValues<"api::fiche-solution.fiche-solution">;
export type FicheSolutionResponse = APIResponseData<"api::fiche-solution.fiche-solution">;
