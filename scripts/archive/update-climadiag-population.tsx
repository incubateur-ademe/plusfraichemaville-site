// eslint-disable-next-line
// @ts-nocheck
import { prismaClient } from "@/src/lib/prisma/prismaClient";

function updateClimadiagRow(fileJson) {
  console.log("code insee : ", fileJson.identifiant_insee);
  return prismaClient.climadiag.updateMany({
    where: { code_insee: fileJson.identifiant_insee, population: 0 },
    data: {
      population: fileJson.population,
    },
  });
}

async function processFiles(path: string) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const fs = require("fs");
  const pathToEpciFiles = fs.readdirSync(path);
  for (const file of pathToEpciFiles) {
    const fileContent = fs.readFileSync(`${path}/${file}`, "utf8");
    const fileJson = JSON.parse(fileContent);
    const resultUpdate = await updateClimadiagRow(fileJson);
    console.log("ligne mise à jour : ", resultUpdate.count);
  }
}

function main() {
  const path = "C:\\Users\\rapha\\Documents\\PFMV\\climadiag\\entities_18avril2024_v2_Tracc\\JSON";

  processFiles(path + "\\epci");
  processFiles(path + "\\commune");
}

main();
