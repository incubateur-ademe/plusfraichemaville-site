import { safeReturnStrapiEntities } from "../helpers/strapiArrayUtils";
import { strapiGraphQLCall } from "../strapiClient";
import { APIResponseCollection, APIResponseData } from "../types/types";
import { StrapiFilter } from "./commonStrapiFilters";
import { FICHE_DIAGNOSTIC_CARD_INFO_FRAGMENT, STRAPI_IMAGE_FRAGMENT } from "./strapiFragments";

export const GET_FICHE_DIAGNOSTIC_CARD_DATA = (
  strapiFilter: StrapiFilter,
) => ` ${STRAPI_IMAGE_FRAGMENT}  ${FICHE_DIAGNOSTIC_CARD_INFO_FRAGMENT} query {
      ficheDiagnostics ${strapiFilter.wholeFilterString()} {
        data {
          ...FicheDiagnosticCardInfo
        }
      }
  }`;

export async function getAllFichesDiagnostic(): Promise<APIResponseData<"api::fiche-diagnostic.fiche-diagnostic">[]> {
  const filter = new StrapiFilter(true, [], { attribute: "rank", order: "asc" });
  const apiResponse = (await strapiGraphQLCall(GET_FICHE_DIAGNOSTIC_CARD_DATA(filter)))
    ?.ficheDiagnostics as APIResponseCollection<"api::fiche-diagnostic.fiche-diagnostic">;
  return safeReturnStrapiEntities(apiResponse);
}
