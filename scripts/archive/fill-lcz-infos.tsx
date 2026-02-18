import { isEmpty } from "@/src/helpers/listUtils";
import { prismaClient } from "@/src/lib/prisma/prismaClient";
import { captureError, customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { fetchCommuneFromBanApi } from "@/src/lib/adresseApi/fetch";
import { Prisma } from "@/src/generated/prisma/client";
import AnyNull = Prisma.AnyNull;

type LCZCommuneCoverage = {
  insee_commune: string;
  population: number;
  siren_epci: string;
  couverture_lcz: number;
  superficie_ha: number;
};

const LCZ_COVERAGE_THRESHOLD = 0;
const PAGE_SIZE = 200;

async function fillLczCoverage(page = 0) {
  console.log("page", page);
  const response = await fetch(
    `https://tabular-api.data.gouv.fr/api/resources/fb8028d6-8018-40fa-b655-4672e8f6feaf/data/?couverture_lcz__strictly_greater=${LCZ_COVERAGE_THRESHOLD}&page_size=${PAGE_SIZE}&page=${page}`,
  );
  try {
    const data: any = await response.json();
    console.log("Received data");
    if (!isEmpty(data.data)) {
      for (const row of data.data as LCZCommuneCoverage[]) {
        try {
          await prismaClient.climadiag.update({
            where: {
              code_insee: row.insee_commune,
            },
            data: {
              population: row.population,
              superficie: row.superficie_ha,
              couverture_lcz: row.couverture_lcz,
            },
          });
        } catch (e) {
          if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2025") {
              captureError("Code insee non trouvé dans table Climadiag", row.insee_commune);
            }
          }
        }
      }
      page++;
      return fillLczCoverage(page);
    }
  } catch (e) {
    customCaptureException("Error while fetching data", e);
    return;
  }
}

async function fillCoordinatesForLCZ() {
  const rowsToProcess = await prismaClient.climadiag.findMany({
    where: {
      adresse_all_infos: { equals: AnyNull },
      couverture_lcz: { gt: 0 },
    },
  });
  for (const collectivite of rowsToProcess) {
    console.log("Processing collectivite", collectivite.nom);
    let fetchedCollectivites = await fetchCommuneFromBanApi(`${collectivite.nom} ${collectivite.code_postal}`, 40);
    let matchedCollectivite = fetchedCollectivites.find(
      (fc) => fc.codeInsee === collectivite.code_insee || fc.oldCodeInsee === collectivite.code_insee,
    );
    if (!matchedCollectivite) {
      fetchedCollectivites = await fetchCommuneFromBanApi(`${collectivite.code_postal}`, 40);
      matchedCollectivite = fetchedCollectivites.find(
        (fc) =>
          fc.codeInsee === collectivite.code_insee ||
          fc.oldCodeInsee === collectivite.code_insee ||
          fc.codePostal === collectivite.code_postal,
      );
    }
    if (matchedCollectivite) {
      await prismaClient.climadiag.update({
        where: {
          id: collectivite.id,
        },
        data: {
          adresse_all_infos: matchedCollectivite.banInfo as unknown as Prisma.JsonObject,
        },
      });
    } else {
      console.log("Pas de correspondance pour la collectivite avec le code insee", collectivite.code_insee);
    }
  }
}

async function fillLCZInfosForEPCI() {
  const epcisCoverage = await prismaClient.climadiag.groupBy({
    by: ["epci_parent_id"],
    where: {
      NOT: { epci_parent_id: null },
    },
    _avg: { couverture_lcz: true },
  });

  for (const epciCoverage of epcisCoverage) {
    const mostCoveredCollectivite = await prismaClient.climadiag.findFirst({
      where: {
        epci_parent_id: epciCoverage.epci_parent_id,
      },
      orderBy: [{ couverture_lcz: "desc" }, { population: "desc" }],
    });
    if (mostCoveredCollectivite) {
      await prismaClient.climadiag.update({
        where: { id: epciCoverage.epci_parent_id! },
        data: {
          couverture_lcz: Math.round(epciCoverage._avg.couverture_lcz || 0),
          adresse_all_infos: mostCoveredCollectivite.adresse_all_infos as unknown as Prisma.JsonObject,
        },
      });
      console.log("updated coverage of epci", epciCoverage.epci_parent_id);
    }
  }
}

function main() {
  console.log("Début traitement d'import des données LCZ");
  fillLczCoverage().then(() => {
    console.log("Import des données LCZ terminé");
    fillCoordinatesForLCZ().then(() => {
      console.log("Coordonnées récupérées");
      fillLCZInfosForEPCI().then(() => {
        console.log("Traitement terminé");
      });
    });
  });
}

main();
