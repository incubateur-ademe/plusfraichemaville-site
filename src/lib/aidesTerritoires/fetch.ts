"use server";
import {
  IApiAidesTerritoiresPaginatedAides,
  IApiAidesTerritoiresQueryPerimeter,
} from "@/src/lib/aidesTerritoires/types";
import { collectivite } from "@/src/generated/prisma/client";
import { updateCollectiviteAidesTerritoireId } from "@/src/lib/prisma/prismaCollectiviteQueries";
import { callAidesTerritoiresApi, extractMotsClesFromFichesSolutions } from "@/src/lib/aidesTerritoires/helpers";
import { AidesTerritoiresAide } from "@/src/components/financement/types";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";

const DEFAULT_PERIMETER_ID = "70956-france";

export const fetchAideFromAidesTerritoiresById = async (aideTerritoireAideId: number) => {
  // SSRF protection: validate input
  if (
    typeof aideTerritoireAideId !== "number" ||
    !Number.isFinite(aideTerritoireAideId) ||
    !Number.isInteger(aideTerritoireAideId) ||
    aideTerritoireAideId <= 0
  ) {
    throw new Error("Invalid aideTerritoireAideId passed to fetchAideFromAidesTerritoiresById");
  }
  return await callAidesTerritoiresApi<AidesTerritoiresAide>(
    `${process.env.AIDES_TERRITOIRES_API_URL}/aids/by-id/${aideTerritoireAideId}`,
  );
};

export const searchAidesFromAidesTerritoires = async (
  fichesSolutions: FicheSolution["attributes"][],
  collectivite: collectivite,
  useNewVersion?: boolean,
) => {
  const motsCles = extractMotsClesFromFichesSolutions(fichesSolutions);
  const perimeterId = await getPerimterIdIdOrFetchItFromAidesTerritoires(collectivite);

  return await callAidesTerritoiresApi<IApiAidesTerritoiresPaginatedAides>(
    `${process.env.AIDES_TERRITOIRES_API_URL}/aids/?perimeter=${perimeterId}&text=${motsCles}
    &itemsPerPage=1000&targeted_audiences=commune&targeted_audiences=epci${useNewVersion ? "&new=1" : ""}`,
  );
};

const getPerimterIdIdOrFetchItFromAidesTerritoires = async (collectivite: collectivite): Promise<string> => {
  if (collectivite.aides_territoires_perimeter_id) {
    return collectivite.aides_territoires_perimeter_id;
  }
  let collectiviteAideTerritoireId = null;
  if (collectivite.code_insee) {
    const result = await callAidesTerritoiresApi<IApiAidesTerritoiresQueryPerimeter>(
      `${process.env.AIDES_TERRITOIRES_API_URL}/perimeters/?insees=${collectivite.code_insee}`,
    );

    if ((result?.results.length || 0) > 0 && result?.results[0].id) {
      collectiviteAideTerritoireId = result?.results[0].id;
    }
  }
  if (!collectiviteAideTerritoireId && collectivite.code_postal) {
    const result = await callAidesTerritoiresApi<IApiAidesTerritoiresQueryPerimeter>(
      `${process.env.AIDES_TERRITOIRES_API_URL}/perimeters/?zipcodes=${collectivite.code_postal}`,
    );

    if ((result?.results.length || 0) > 0 && result?.results[0].id) {
      collectiviteAideTerritoireId = result?.results[0].id;
    }
  }

  await updateCollectiviteAidesTerritoireId(collectivite.id, collectiviteAideTerritoireId || DEFAULT_PERIMETER_ID);
  return collectiviteAideTerritoireId || DEFAULT_PERIMETER_ID;
};
