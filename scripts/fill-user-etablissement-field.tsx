import { prismaClient } from "@/src/lib/prisma/prismaClient";
import { fetchEntrepriseFromSirenApi } from "@/src/lib/siren/fetch";
import { updateUserEtablissementInfo } from "@/src/lib/prisma/prismaUserQueries";

async function main() {
  const usersToProcess = await prismaClient.user.findMany({
    where: {
      nom_etablissement: null,
    },
  });

  usersToProcess.map(async (userToProcess) => {
    // @ts-ignore
    const siret = userToProcess.agentconnect_info?.siret;
    if (siret) {
      await new Promise(r => setTimeout(r, 300));
      const entityFromSiret = await fetchEntrepriseFromSirenApi(siret);
      if (entityFromSiret?.etablissement) {
        await updateUserEtablissementInfo(
          userToProcess.id,
          entityFromSiret.etablissement?.uniteLegale?.denominationUniteLegale,
          entityFromSiret.etablissement,
        );
      }
      console.log(`L'utilisateur ${userToProcess.email} a été mis à jour`);
    }
  });
}

main();
