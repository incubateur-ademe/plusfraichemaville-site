import { prismaClient } from "@/src/lib/prisma/prismaClient";

type MatomoEventActionSearch = [{ label: string; idsubdatatable: string }];

type MatomoEventNameSearch = [{ label: string }];

async function getActionId(dateDebut: string, dateFin: string) {
  const url = `${process.env.NEXT_PUBLIC_MATOMO_URL}/index.php?module=API&method=Events.getAction&idSite=
  ${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&period=range&date=${dateDebut},${dateFin}&format=json`;

  const response = await fetch(url);
  const result: MatomoEventActionSearch = await response.json();
  return result.find((row) => row.label === "surchauffe-urbaine-search-territoire")?.idsubdatatable;
}

async function getAllCollectiviteFromMatomo(idsubdatatable: string, dateDebut: string, dateFin: string) {
  const url = `${process.env.NEXT_PUBLIC_MATOMO_URL}/index.php?module=API&method=Events.getNameFromActionId
  &idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&period=range&date=${dateDebut},${dateFin}
&format=json&idSubtable=${idsubdatatable}`;

  const response = await fetch(url);
  const result: MatomoEventNameSearch = await response.json();
  const codesInsee = result.map((row) => row.label.replace("Recherche du code INSEE : « ", "").replace(" »", ""));
  console.log("codesInsee", codesInsee);
  const collectivites = await prismaClient.climadiag.findMany({
    where: { code_insee: { in: codesInsee } },
    orderBy: { nom: "asc" },
  });
  collectivites.map((collectivite) => {
    console.log(`${collectivite.nom};${collectivite.code_postal}`);
  });
}

function main() {
  const dateDebut = "2025-05-20";
  const dateFin = "2025-07-10";
  getActionId(dateDebut, dateFin)
    .then((idSubData: string | undefined) => {
      if (idSubData) {
        return getAllCollectiviteFromMatomo(idSubData, dateDebut, dateFin);
      } else {
        console.log("Id de l'action non trouvé dans la période donnnée");
        return null;
      }
    })
    .then(() => {
      console.log("Traitement terminé");
    });
}

main();
