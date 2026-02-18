import { prismaClient } from "@/src/lib/prisma/prismaClient";
import { SirenInfo } from "@/src/lib/siren/types";

async function main() {
  const usersToProcess = await prismaClient.user.findMany({
    where: {
      siren: null,
    },
  });
  for (const userToProcess of usersToProcess) {
    const userSirenInfo = userToProcess.siren_info as SirenInfo | null;
    const userSiren = userSirenInfo?.siren;
    if (userSiren) {
      await prismaClient.user.update({
        where: {
          id: userToProcess.id,
        },
        data: {
          siren: userSiren,
        },
      });
      console.log(`L'utilisateur ${userToProcess.email} a été mis à jour`);
    } else {
      console.log(`L'utilisateur ${userToProcess.email} n'a pas de siren`);
    }
  }
  console.log("All Siren have been updated.");
}

main();
