"use server";
import {
  IApiAidesTerritoiresPaginatedAides,
  IApiAidesTerritoiresQueryPerimeter,
} from "@/src/lib/aidesTerritoires/types";
import { FicheSolution } from "@/src/components/ficheSolution/type";
import { collectivite } from "@prisma/client";
import { updateCollectiviteAidesTerritoireId } from "@/src/lib/prisma/prismaCollectiviteQueries";
import { callAidesTerritoiresApi, extractMotsClesFromFichesSolutions } from "@/src/lib/aidesTerritoires/helpers";
import { AidesTerritoiresAide } from "@/src/components/financement/types";

const DEFAULT_PERIMETER_ID = "70956-france";

export const fetchAideFromAidesTerritoiresById = async (aideTerritoireAideId: number) => {
  return await callAidesTerritoiresApi<AidesTerritoiresAide>(
    `${process.env.AIDES_TERRITOIRES_API_URL}/aids/by-id/${aideTerritoireAideId}`,
  );
};

export const searchAidesFromAidesTerritoires = async (fichesSolutions: FicheSolution[], collectivite: collectivite) => {
  const motsCles = extractMotsClesFromFichesSolutions(fichesSolutions);
  const perimeterId = await getPerimterIdIdOrFetchItFromAidesTerritoires(collectivite);

  return await callAidesTerritoiresApi<IApiAidesTerritoiresPaginatedAides>(
    `${process.env.AIDES_TERRITOIRES_API_URL}/aids/?perimeter=${perimeterId}&text=${motsCles}
    &itemsPerPage=1000&targeted_audiences=commune&targeted_audiences=epci`,
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
