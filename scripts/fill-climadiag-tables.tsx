// @ts-nocheck
import { Prisma } from "@prisma/client";
import { ProjectionsIndicateurClimadiag } from "@/lib/prisma/prismaCustomTypes";
import { prismaClient } from "@/lib/prisma/prismaClient";

const fileStructureToPrismaIndicateur = (data: string): ProjectionsIndicateurClimadiag => {
  return {
    2030: { min: data[0][0].min, max: data[0][0].max, median: data[0][0].mean },
    2050: { min: data[1][0].min, max: data[1][0].max, median: data[1][0].mean },
    2100: { min: data[2][0].min, max: data[2][0].max, median: data[2][0].mean },
  };
};

function insertClimadiagRow(fileJson, typeLieu, epciParentId: number | undefined) {
  console.log("code insee", fileJson.identifiant_insee);
  const joursTresChauds = fileJson.indicateurs.find((indicateur) => indicateur.id === "S1").data;
  const nuitsChaudes = fileJson.indicateurs.find((indicateur) => indicateur.id === "S2").data;
  const vagueDeChaleur = fileJson.indicateurs.find((indicateur) => indicateur.id === "S3").data;
  return prismaClient.climadiag.create({
    data: {
      nom: fileJson.nom,
      type_lieu: typeLieu,
      code_insee: fileJson.identifiant_insee,
      code_postal: fileJson.code_recherche,
      epci_parent_id: epciParentId,
      jours_tres_chauds_ref: joursTresChauds[0][0].ref,
      jours_tres_chauds_prevision: fileStructureToPrismaIndicateur(joursTresChauds) as Prisma.JsonObject,
      nuits_chaudes_ref: nuitsChaudes[0][0].ref,
      nuits_chaudes_prevision: fileStructureToPrismaIndicateur(nuitsChaudes) as Prisma.JsonObject,
      jours_vdc_ref: vagueDeChaleur[0][0].ref,
      jours_vdc_prevision: fileStructureToPrismaIndicateur(vagueDeChaleur) as Prisma.JsonObject,
    },
  });
}

function processEpciFiles(path: string) {
  const fs = require("fs");
  const epciPath = path + "\\epci";
  const pathToEpciFiles = fs.readdirSync(epciPath);
  pathToEpciFiles.map(async (file: string) => {
    const fileContent = fs.readFileSync(`${epciPath}/${file}`, "utf8");
    const fileJson = JSON.parse(fileContent);
    await insertClimadiagRow(fileJson, "epci", null);
    console.log("ligne epci insérée");
  });
}

function processCommuneFiles(path: string) {
  const fs = require("fs");
  const communePath = path + "\\commune";
  const pathToCommuneFiles = fs.readdirSync(communePath);
  pathToCommuneFiles.map(async (file: string) => {
    const fileContent = fs.readFileSync(`${communePath}/${file}`, "utf8");
    const fileJson = JSON.parse(fileContent);
    const parentEpci = fileJson.identifiant_epci_parent
      ? await prismaClient.climadiag.findFirst({
          where: { code_insee: fileJson.identifiant_epci_parent },
        })
      : null;
    await insertClimadiagRow(fileJson, "commune", parentEpci?.id);
    console.log("ligne commune insérée");
  });
}

function main() {
  const path = "C:\\Users\\rapha\\PFMV\\Climadiag";

  processEpciFiles(path);
  processCommuneFiles(path);
}

main();
