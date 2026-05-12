// eslint-disable-next-line
// @ts-nocheck
import { Prisma } from "@/src/generated/prisma/client";
import { ProjectionsIndicateurClimadiag } from "@/src/lib/prisma/prismaCustomTypes";
import { prismaClient } from "@/src/lib/prisma/prismaClient";

const SEUIL_JOURS_TRES_CHAUDS: Record<string, number> = { S1: 35, S9: 32, S11: 33 };
const SEUIL_NUITS_CHAUDES: Record<string, number> = { S2: 20, S5: 26, S8: 24, S10: 25 };

const fileStructureToPrismaIndicateur = (data: string): ProjectionsIndicateurClimadiag => {
  return {
    2030: { min: data[0][0].min, max: data[0][0].max, median: data[0][0].mean },
    2050: { min: data[1][0].min, max: data[1][0].max, median: data[1][0].mean },
    2100: { min: data[2][0].min, max: data[2][0].max, median: data[2][0].mean },
  };
};

function insertClimadiagRow(fileJson, typeLieu, epciParentId: number | undefined) {
  console.log("code insee", fileJson.identifiant_insee);
  const joursTresChaudsEntry =
    fileJson.indicateurs.find((i) => i.id === "S1") ||
    fileJson.indicateurs.find((i) => i.id === "S9") ||
    fileJson.indicateurs.find((i) => i.id === "S11");
  const nuitsChaudesEntry =
    fileJson.indicateurs.find((i) => i.id === "S2") ||
    fileJson.indicateurs.find((i) => i.id === "S5") ||
    fileJson.indicateurs.find((i) => i.id === "S8") ||
    fileJson.indicateurs.find((i) => i.id === "S10");
  const vagueDeChaleurEntry = fileJson.indicateurs.find((i) => i.id === "S3");

  const joursTresChauds = joursTresChaudsEntry.data;
  const nuitsChaudes = nuitsChaudesEntry.data;
  const vagueDeChaleur = vagueDeChaleurEntry?.data;

  return prismaClient.climadiag.create({
    data: {
      nom: fileJson.nom,
      type_lieu: typeLieu,
      code_insee: fileJson.identifiant_insee,
      code_postal: fileJson.code_recherche,
      epci_parent_id: epciParentId,
      jours_tres_chauds_ref: joursTresChauds[0][0].ref,
      jours_tres_chauds_prevision: fileStructureToPrismaIndicateur(joursTresChauds) as Prisma.JsonObject,
      seuil_jours_tres_chauds: SEUIL_JOURS_TRES_CHAUDS[joursTresChaudsEntry.id],
      nuits_chaudes_ref: nuitsChaudes[0][0].ref,
      nuits_chaudes_prevision: fileStructureToPrismaIndicateur(nuitsChaudes) as Prisma.JsonObject,
      seuil_nuits_chaudes: SEUIL_NUITS_CHAUDES[nuitsChaudesEntry.id],
      jours_vdc_ref: vagueDeChaleur ? vagueDeChaleur[0][0].ref : null,
      ...(vagueDeChaleur && {
        jours_vdc_prevision: fileStructureToPrismaIndicateur(vagueDeChaleur) as Prisma.JsonObject,
      }),
      population: fileJson.population,
      searchable_field: `${fileJson.nom
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")} ${fileJson.code_recherche} ${fileJson.identifiant_insee}`,
    },
  });
}

async function processEpciFiles(path: string) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const fs = require("fs");
  const epciPath = path + "\\epci";
  const pathToEpciFiles = fs.readdirSync(epciPath);
  for (const file of pathToEpciFiles) {
    const fileContent = fs.readFileSync(`${epciPath}/${file}`, "utf8");
    const fileJson = JSON.parse(fileContent);
    await insertClimadiagRow(fileJson, "epci", null);
    console.log("ligne epci insérée");
  }
}

async function processCommuneFiles(path: string) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const fs = require("fs");
  const communePath = path + "\\commune";
  const pathToCommuneFiles = fs.readdirSync(communePath);
  for (const file of pathToCommuneFiles) {
    const fileContent = fs.readFileSync(`${communePath}/${file}`, "utf8");
    const fileJson = JSON.parse(fileContent);
    const parentEpci = fileJson.identifiant_epci_parent
      ? await prismaClient.climadiag.findFirst({
          where: { code_insee: fileJson.identifiant_epci_parent },
        })
      : null;
    await insertClimadiagRow(fileJson, "commune", parentEpci?.id);
    console.log("ligne commune insérée");
  }
}

async function main() {
  const path = "C:\\Users\\rapha\\Documents\\PFMV\\climadiag\\20260421";

  await processEpciFiles(path);
  await processCommuneFiles(path);
}

main();
