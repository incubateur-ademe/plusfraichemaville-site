import { prismaClient } from "@/src/lib/prisma/prismaClient";
import * as fs from "fs";
import * as path from "path";

type EpciRow = {
  code_departement: string;
  siren: string;
  nom: string;
  type: "CC" | "CA" | "CU" | "MET";
  population: number;
};

type CommuneRow = {
  siren_epci: string;
  insee: string;
  siren: string;
  nom: string;
  population: number;
};

/**
 * Remove BOM character from file content
 */
function removeBOM(content: string): string {
  return content.charCodeAt(0) === 0xfeff ? content.slice(1) : content;
}

/**
 * Parse population string (removes spaces and converts to integer)
 * Example: "15 282" → 15282
 */
function parsePopulation(popString: string): number {
  const cleaned = popString.replace(/\s/g, "");
  const parsed = parseInt(cleaned, 10);
  if (isNaN(parsed)) {
    throw new Error(`Invalid population value: "${popString}"`);
  }
  return parsed;
}

/**
 * Parse EPCI CSV file
 */
function parseEpciCsv(filePath: string): EpciRow[] {
  const content = removeBOM(fs.readFileSync(filePath, "utf-8"));
  const lines = content.split("\n").filter((line) => line.trim());

  // Skip header row
  const dataLines = lines.slice(1);

  return dataLines.map((line, index) => {
    const parts = line.split(";");
    if (parts.length !== 5) {
      throw new Error(`EPCI CSV line ${index + 2} has ${parts.length} columns, expected 5: ${line}`);
    }

    const [code_departement, siren, nom, typeRaw, population] = parts;

    // Map CSV type values to database enum values
    const typeMapping: Record<string, "CC" | "CA" | "CU" | "MET"> = {
      CC: "CC",
      CA: "CA",
      CU: "CU",
      METRO: "MET",
      MET: "MET",
    };

    const trimmedType = typeRaw.trim();
    const type = typeMapping[trimmedType];

    if (!type) {
      throw new Error(`Invalid EPCI type "${trimmedType}" at line ${index + 2}. Expected: CC, CA, CU, METRO, or MET`);
    }

    return {
      code_departement: code_departement.trim(),
      siren: siren.trim(),
      nom: nom.trim(),
      type,
      population: parsePopulation(population.trim()),
    };
  });
}

/**
 * Parse Commune CSV file
 */
function parseCommuneCsv(filePath: string): CommuneRow[] {
  const content = removeBOM(fs.readFileSync(filePath, "utf-8"));
  const lines = content.split("\n").filter((line) => line.trim());

  // Skip header row
  const dataLines = lines.slice(1);

  return dataLines.map((line, index) => {
    const parts = line.split(";");
    if (parts.length !== 5) {
      throw new Error(`Commune CSV line ${index + 2} has ${parts.length} columns, expected 5: ${line}`);
    }

    const [siren_epci, insee, siren, nom, population] = parts;

    return {
      siren_epci: siren_epci.trim(),
      insee: insee.trim(),
      siren: siren.trim(),
      nom: nom.trim(),
      population: parsePopulation(population.trim()),
    };
  });
}

/**
 * Validate data integrity
 */
function validateData(epciRows: EpciRow[], communeRows: CommuneRow[]): void {
  console.log("\n🔍 Validating data integrity...");

  // Check EPCI SIREN uniqueness
  const epciSirens = new Set<string>();
  const duplicateEpciSirens: string[] = [];

  for (const epci of epciRows) {
    if (epciSirens.has(epci.siren)) {
      duplicateEpciSirens.push(epci.siren);
    }
    epciSirens.add(epci.siren);
  }

  if (duplicateEpciSirens.length > 0) {
    throw new Error(`Duplicate EPCI SIREN codes found: ${duplicateEpciSirens.join(", ")}`);
  }
  console.log(`✓ All ${epciRows.length} EPCI SIREN codes are unique`);

  // Check Commune INSEE uniqueness
  const communeInsees = new Set<string>();
  const duplicateCommuneInsees: string[] = [];

  for (const commune of communeRows) {
    if (communeInsees.has(commune.insee)) {
      duplicateCommuneInsees.push(commune.insee);
    }
    communeInsees.add(commune.insee);
  }

  if (duplicateCommuneInsees.length > 0) {
    throw new Error(`Duplicate Commune INSEE codes found: ${duplicateCommuneInsees.join(", ")}`);
  }
  console.log(`✓ All ${communeRows.length} Commune INSEE codes are unique`);

  // Check Commune SIREN uniqueness
  const communeSirens = new Set<string>();
  const duplicateCommuneSirens: string[] = [];

  for (const commune of communeRows) {
    if (communeSirens.has(commune.siren)) {
      duplicateCommuneSirens.push(commune.siren);
    }
    communeSirens.add(commune.siren);
  }

  if (duplicateCommuneSirens.length > 0) {
    throw new Error(`Duplicate Commune SIREN codes found: ${duplicateCommuneSirens.join(", ")}`);
  }
  console.log(`✓ All ${communeRows.length} Commune SIREN codes are unique`);

  // Verify all communes reference existing EPCIs
  const orphanedCommunes: string[] = [];

  for (const commune of communeRows) {
    if (!epciSirens.has(commune.siren_epci)) {
      orphanedCommunes.push(`${commune.nom} (INSEE: ${commune.insee}, EPCI SIREN: ${commune.siren_epci})`);
    }
  }

  if (orphanedCommunes.length > 0) {
    throw new Error(
      `Found ${orphanedCommunes.length} communes referencing non-existent EPCIs:\n` +
        orphanedCommunes.slice(0, 10).join("\n") +
        (orphanedCommunes.length > 10 ? `\n... and ${orphanedCommunes.length - 10} more` : ""),
    );
  }
  console.log(`✓ All communes have matching EPCIs`);

  console.log("✅ Data validation successful\n");
}

/**
 * Main execution
 */
async function main() {
  console.log("🚀 Starting EPCI and Commune tables population script\n");

  // File paths
  const epciCsvPath = path.join(__dirname, "fill-collectivite", "epci_2026.csv");
  const communeCsvPath = path.join(__dirname, "fill-collectivite", "epci_commune_2026.csv");

  // Check files exist
  if (!fs.existsSync(epciCsvPath)) {
    throw new Error(`EPCI CSV file not found: ${epciCsvPath}`);
  }
  if (!fs.existsSync(communeCsvPath)) {
    throw new Error(`Commune CSV file not found: ${communeCsvPath}`);
  }

  // Parse CSV files
  console.log("📄 Parsing CSV files...");
  const epciRows = parseEpciCsv(epciCsvPath);
  console.log(`✓ Parsed ${epciRows.length} EPCIs from ${epciCsvPath}`);

  const communeRows = parseCommuneCsv(communeCsvPath);
  console.log(`✓ Parsed ${communeRows.length} communes from ${communeCsvPath}\n`);

  // Validate data
  validateData(epciRows, communeRows);

  // Check if tables already contain data
  const existingEpciCount = await prismaClient.epci.count();
  const existingCommuneCount = await prismaClient.commune.count();

  if (existingEpciCount > 0 || existingCommuneCount > 0) {
    console.log(`⚠️  Tables already contain data:`);
    console.log(`   - EPCIs: ${existingEpciCount}`);
    console.log(`   - Communes: ${existingCommuneCount}`);
    console.log("\n🗑️  Deleting existing data...");

    await prismaClient.commune.deleteMany({});
    await prismaClient.epci.deleteMany({});

    console.log("✓ Existing data deleted\n");
  }

  // Insert data in a transaction
  console.log("💾 Inserting data into database...");

  await prismaClient.$transaction(
    async (tx) => {
      // Insert EPCIs in batches
      console.log("\n📥 Inserting EPCIs...");
      for (let i = 0; i < epciRows.length; i += 500) {
        const batch = epciRows.slice(i, i + 500);
        await tx.epci.createMany({ data: batch });
        const inserted = Math.min(i + 500, epciRows.length);
        console.log(`   ${inserted}/${epciRows.length} EPCIs inserted`);
      }

      // Build EPCI SIREN to ID mapping
      console.log("\n🔗 Building EPCI SIREN to ID mapping...");
      const allEpcis = await tx.epci.findMany({
        select: { id: true, siren: true },
      });

      const epciSirenToIdMap = new Map<string, string>();
      for (const epci of allEpcis) {
        epciSirenToIdMap.set(epci.siren, epci.id);
      }
      console.log(`✓ Mapped ${epciSirenToIdMap.size} EPCIs`);

      // Transform commune rows to include epci_id
      const communeRowsWithEpciId = communeRows.map((commune) => {
        const epciId = epciSirenToIdMap.get(commune.siren_epci);
        if (!epciId) {
          throw new Error(`Cannot find EPCI ID for SIREN ${commune.siren_epci} (commune: ${commune.nom})`);
        }

        return {
          insee: commune.insee,
          siren: commune.siren,
          epci_id: epciId,
          nom: commune.nom,
          population: commune.population,
        };
      });

      // Insert communes in batches
      console.log("\n📥 Inserting communes...");
      for (let i = 0; i < communeRowsWithEpciId.length; i += 1000) {
        const batch = communeRowsWithEpciId.slice(i, i + 1000);
        await tx.commune.createMany({ data: batch });
        const inserted = Math.min(i + 1000, communeRowsWithEpciId.length);
        console.log(`   ${inserted}/${communeRowsWithEpciId.length} communes inserted`);
      }
    },
    { timeout: 60000 },
  );

  console.log("\n✅ Data insertion completed successfully!");

  // Final verification
  const finalEpciCount = await prismaClient.epci.count();
  const finalCommuneCount = await prismaClient.commune.count();

  console.log("\n📊 Final counts:");
  console.log(`   - EPCIs: ${finalEpciCount}`);
  console.log(`   - Communes: ${finalCommuneCount}`);
}

// Execute main function
main()
  .then(() => {
    console.log("\n🎉 Script completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Error occurred:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
