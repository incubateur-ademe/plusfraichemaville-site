import { APIResponseData } from "@/lib/strapi/types/types";

export type FichesDiagnosticResponse = APIResponseData<"api::fiche-diagnostic.fiche-diagnostic">[];
export type FicheDiagnosticResponse = APIResponseData<"api::fiche-diagnostic.fiche-diagnostic">;
export type FicheDiagnosticResponseAttributes = APIResponseData<"api::fiche-diagnostic.fiche-diagnostic">["attributes"];
