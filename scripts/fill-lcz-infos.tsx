import { isEmpty } from "@/src/helpers/listUtils";
import { prismaClient } from "@/src/lib/prisma/prismaClient";
import { Prisma } from "@prisma/client";
import { captureError } from "@/src/lib/sentry/sentryCustomMessage";

type LCZCommuneCoverage = {
  insee_commune: string;
  population: number;
  siren_epci: string;
  couverture_lcz: number;
  superficie_ha: number;
};

const LCZ_COVERAGE_THRESHOLD = 0;
const PAGE_SIZE = 200;

async function paginated_fetch(page = 0) {
  console.log("page", page);
  const response = await fetch(
    `https://tabular-api.data.gouv.fr/api/resources/fb8028d6-8018-40fa-b655-4672e8f6feaf/data/?couverture_lcz__strictly_greater=${LCZ_COVERAGE_THRESHOLD}&page_size=${PAGE_SIZE}&page=${page}`,
  );
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
    return paginated_fetch(page);
  }
}

function main() {
  console.log("Début traitement d'import des données LCZ");
  paginated_fetch().then(() => console.log("Traitement terminé"));
}

main();
