import { prismaClient } from "@/src/lib/prisma/prismaClient";
import { fetchEntrepriseFromSirenApi } from "@/src/lib/siren/fetch";
import { updateUserEtablissementInfo } from "@/src/lib/prisma/prismaUserQueries";

async function main() {
  const usersToProcess = await prismaClient.user.findMany({
    where: {
      nom_etablissement: null,
    },
  });
  const interval = 1000; // how much time should the delay between two iterations be (in milliseconds)?
  usersToProcess.forEach(function (userToProcess, index) {
    setTimeout(async function () {
      // @ts-ignore
      const siret = userToProcess.agentconnect_info?.siret;
      if (siret) {
        const entityFromSiret = await fetchEntrepriseFromSirenApi(siret);

        if (entityFromSiret?.etablissement) {
          await updateUserEtablissementInfo(
            userToProcess.id,
            entityFromSiret.etablissement?.uniteLegale?.denominationUniteLegale,
            entityFromSiret.etablissement,
          );
        }
        console.log(`L'utilisateur ${userToProcess.email} a été mis à jour`);
      } else {
        console.log(`L'utilisateur ${userToProcess.email} n'a pas de siret`);
      }
    }, index * interval);
  });
  console.log("Loop finished.");
}

main();
