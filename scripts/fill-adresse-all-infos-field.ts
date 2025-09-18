import { prismaClient } from "@/src/lib/prisma/prismaClient";
import { fetchCollectiviteFromBanApi, fetchProjetAddressFromBanApi } from "@/src/lib/adresseApi/fetch";
import AnyNull = Prisma.AnyNull;
import { Prisma } from "@/src/generated/prisma/client";

async function main() {
  console.log(`Mise à jour des collectivités`);
  const collectivitesToProcess = await prismaClient.collectivite.findMany({
    where: {
      adresse_all_infos: { equals: AnyNull },
      adresse_info: { not: { equals: undefined } },
    },
  });
  for (const collectivite of collectivitesToProcess) {
    if (collectivite.code_insee) {
      const fetchedCollectivites = await fetchCollectiviteFromBanApi(`${collectivite.nom} ${collectivite.code_insee}`);
      const matchedCollectivite = fetchedCollectivites.find((fc) => fc.codeInsee === collectivite.code_insee);
      if (matchedCollectivite) {
        await prismaClient.collectivite.update({
          where: {
            id: collectivite.id,
          },
          data: {
            adresse_all_infos: matchedCollectivite.banInfo as unknown as Prisma.JsonObject,
          },
        });
        console.log("Collectivite mise à jour", collectivite.nom);
      } else {
        console.log("Pas de correspondance pour la collectivite avec le code insee", collectivite.code_insee);
      }
    } else {
      console.log("Pas de code insee pour la collecvite id", collectivite.id);
    }
  }
  console.log(`Fin de mise à jour des collectivités`);
  console.log(`Mise à jour des projets`);
  const projetsToProcess = await prismaClient.projet.findMany({
    where: {
      adresse_all_infos: { equals: AnyNull },
      NOT: [{ adresse: null }, { adresse_info: { equals: AnyNull } }],
    },
  });

  for (const projet of projetsToProcess) {
    if (projet.adresse && projet.adresse_info) {
      const fetchedAdresses = await fetchProjetAddressFromBanApi(projet.adresse);
      // @ts-expect-error never null
      const matchedAdresses = fetchedAdresses.find((a) => a.banInfo["properties"]["id"] === projet.adresse_info["id"]);
      if (matchedAdresses) {
        await prismaClient.projet.update({
          where: {
            id: projet.id,
          },
          data: {
            adresse_all_infos: matchedAdresses.banInfo as unknown as Prisma.JsonObject,
          },
        });
        console.log("Projet mis à jour", projet.id);
      } else {
        console.log("Projet sans match d'adresse", projet.adresse);
      }
    } else {
      console.log("Projet sans adresse info", projet.id);
    }
  }
  console.log(`Fin de mise à jour des projets`);
}

main();
