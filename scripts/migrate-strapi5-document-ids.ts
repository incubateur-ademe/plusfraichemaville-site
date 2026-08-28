import { Client } from "pg";
import { prismaClient } from "@/src/lib/prisma/prismaClient";
import { FicheType } from "@/src/generated/prisma/client";

/**
 * One-shot data backfill for the Strapi v4 -> v5 migration.
 *
 * Context: prisma/schema.prisma columns that used to store Strapi's numeric `id` for
 * FicheSolution/FicheDiagnostic/Materiau/RetourExperience have been converted to String
 * (they now store the v5 `documentId`). That schema/type migration is handled separately
 * (Prisma migration file). This script only rewrites the *data*: every existing row still
 * holds the old numeric id (stringified by the column type change), which this script
 * replaces with the corresponding documentId.
 *
 * The correspondence tables (ancien id numérique Strapi v4 -> nouveau documentId Strapi v5)
 * are no longer hardcoded: they are built at runtime by connecting directly to the Strapi
 * CMS database (`DATABASE_STRAPI_URL`) and reading the `id`/`document_id` columns of each
 * content-type table. In Strapi v5, rows keep their original numeric `id` as primary key and
 * simply gain a `document_id` column, so this is a lossless source of truth (draft and
 * published rows share the same `document_id`, exactly like the previous hand-exported maps).
 *
 * Run AFTER the Prisma migration (Int -> String columns) has been applied, and BEFORE
 * relying on any Strapi v5 documentId-based query against this data.
 *
 * Usage:
 *   DATABASE_STRAPI_URL="postgres://..." npx tsx ./scripts/migrate-strapi5-document-ids.ts          # dry-run, logs only
 *   DATABASE_STRAPI_URL="postgres://..." npx tsx ./scripts/migrate-strapi5-document-ids.ts --apply  # writes changes
 */

const DRY_RUN = !process.argv.includes("--apply");

// Correspondence tables: ancien id numérique Strapi v4 -> nouveau documentId Strapi v5.
// Populated at runtime by loadCorrespondenceTables() from the Strapi database.
let FICHE_DIAGNOSTIC_ID_MAP: Record<number, string> = {};
let FICHE_SOLUTION_ID_MAP: Record<number, string> = {};
let MATERIAU_ID_MAP: Record<number, string> = {};
let RETOUR_EXPERIENCE_ID_MAP: Record<number, string> = {};

type TableConfig = { label: string; table: string };

const TABLE_CONFIGS = {
  ficheDiagnostic: { label: "FicheDiagnostic", table: "fiche_diagnostics" },
  ficheSolution: { label: "FicheSolution", table: "fiche_solutions" },
  materiau: { label: "Materiau", table: "materiaux" },
  retourExperience: { label: "RetourExperience", table: "retour_experiences" },
} satisfies Record<string, TableConfig>;

async function buildIdMap(client: Client, schema: string, table: string): Promise<Record<number, string>> {
  const { rows } = await client.query<{ id: number; document_id: string }>(
    `SELECT id, document_id FROM "${schema}"."${table}" WHERE document_id IS NOT NULL`,
  );
  const map: Record<number, string> = {};
  for (const row of rows) {
    map[row.id] = row.document_id;
  }
  return map;
}

/**
 * The `?schema=...` query param used by Prisma's DATABASE_URL (see .env.dist) is a Prisma-only
 * convention: the `pg` driver used here doesn't read it and would silently fall back to the
 * default "public" search_path. Extract it ourselves so table lookups target the right schema.
 */
function getSchemaFromConnectionString(connectionString: string): string {
  try {
    return new URL(connectionString).searchParams.get("schema") ?? "public";
  } catch {
    return "public";
  }
}

/** Connects to the Strapi database and builds the four correspondence tables from live data. */
async function loadCorrespondenceTables() {
  const connectionString = process.env.DATABASE_STRAPI_URL;
  if (!connectionString) {
    throw new Error("Missing DATABASE_STRAPI_URL env var (connection string to the Strapi CMS database).");
  }
  const schema = getSchemaFromConnectionString(connectionString);

  console.log("Connecting to the Strapi database to build the id -> documentId correspondence tables...");
  const client = new Client({ connectionString });
  await client.connect();

  try {
    for (const config of Object.values(TABLE_CONFIGS)) {
      console.log(`  ${config.label}: using table "${schema}"."${config.table}"`);
    }

    FICHE_DIAGNOSTIC_ID_MAP = await buildIdMap(client, schema, TABLE_CONFIGS.ficheDiagnostic.table);
    FICHE_SOLUTION_ID_MAP = await buildIdMap(client, schema, TABLE_CONFIGS.ficheSolution.table);
    MATERIAU_ID_MAP = await buildIdMap(client, schema, TABLE_CONFIGS.materiau.table);
    RETOUR_EXPERIENCE_ID_MAP = await buildIdMap(client, schema, TABLE_CONFIGS.retourExperience.table);

    console.log(
      `  Loaded ${Object.keys(FICHE_DIAGNOSTIC_ID_MAP).length} fiches diagnostic, ` +
        `${Object.keys(FICHE_SOLUTION_ID_MAP).length} fiches solution, ` +
        `${Object.keys(MATERIAU_ID_MAP).length} matériaux, ` +
        `${Object.keys(RETOUR_EXPERIENCE_ID_MAP).length} retours d'expérience.\n`,
    );
  } finally {
    await client.end();
  }
}

function mapId(map: Record<number, string>, rawValue: string, context: string): string | null {
  const oldId = Number(rawValue);
  if (!Number.isNaN(oldId) && map[oldId]) {
    return map[oldId];
  }
  if (Object.values(map).includes(rawValue)) {
    // Already migrated in a previous run of this script.
    return rawValue;
  }
  console.warn(`  ⚠️  ${context}: no correspondence found for "${rawValue}", leaving unchanged.`);
  return null;
}

function mapArray(map: Record<number, string>, values: string[], context: string): string[] {
  const mapped = values.map((v) => mapId(map, v, context) ?? v);
  return Array.from(new Set(mapped));
}

async function migrateProjetFicheArrays() {
  console.log("Migrating projet.fiches_solutions_id / fiches_diagnostic_id...");
  const projets = await prismaClient.projet.findMany({
    select: { id: true, fiches_solutions_id: true, fiches_diagnostic_id: true },
  });

  for (const projet of projets) {
    const newFichesSolutionsId = mapArray(
      FICHE_SOLUTION_ID_MAP,
      projet.fiches_solutions_id,
      `projet ${projet.id}.fiches_solutions_id`,
    );
    const newFichesDiagnosticId = mapArray(
      FICHE_DIAGNOSTIC_ID_MAP,
      projet.fiches_diagnostic_id,
      `projet ${projet.id}.fiches_diagnostic_id`,
    );

    const changed =
      JSON.stringify(newFichesSolutionsId) !== JSON.stringify(projet.fiches_solutions_id) ||
      JSON.stringify(newFichesDiagnosticId) !== JSON.stringify(projet.fiches_diagnostic_id);

    if (changed && !DRY_RUN) {
      await prismaClient.projet.update({
        where: { id: projet.id },
        data: { fiches_solutions_id: newFichesSolutionsId, fiches_diagnostic_id: newFichesDiagnosticId },
      });
    }
  }
}

async function migrateProjetFiche() {
  console.log("Migrating projet_fiche.fiche_id...");
  const projetFiches = await prismaClient.projet_fiche.findMany();

  for (const pf of projetFiches) {
    const map = pf.type === FicheType.SOLUTION ? FICHE_SOLUTION_ID_MAP : FICHE_DIAGNOSTIC_ID_MAP;
    const newFicheId = mapId(map, pf.fiche_id, `projet_fiche ${pf.id} (projet ${pf.projet_id})`);

    if (!newFicheId || newFicheId === pf.fiche_id) continue;

    if (!DRY_RUN) {
      try {
        await prismaClient.projet_fiche.update({ where: { id: pf.id }, data: { fiche_id: newFicheId } });
      } catch (e) {
        console.warn(
          `  ⚠️  projet_fiche ${pf.id}: could not update to fiche_id "${newFicheId}" ` +
            `(probably a duplicate created by the old draft/published id collapsing to the same document). ` +
            `Leaving the row as-is for manual review. Error: ${e}`,
        );
      }
    }
  }
}

async function migrateEstimationFicheSolution() {
  console.log("Migrating estimation_fiche_solution.fiche_solution_id...");
  const rows = await prismaClient.estimation_fiche_solution.findMany();

  for (const row of rows) {
    const newId = mapId(FICHE_SOLUTION_ID_MAP, row.fiche_solution_id, `estimation_fiche_solution ${row.id}`);
    if (!newId || newId === row.fiche_solution_id) continue;

    if (!DRY_RUN) {
      try {
        await prismaClient.estimation_fiche_solution.update({
          where: { id: row.id },
          data: { fiche_solution_id: newId },
        });
      } catch (e) {
        console.warn(
          `  ⚠️  estimation_fiche_solution ${row.id}: could not update to fiche_solution_id "${newId}" ` +
            `(likely a duplicate within the same estimation). Leaving as-is for manual review. Error: ${e}`,
        );
      }
    }
  }
}

async function migrateEstimationMateriaux() {
  console.log("Migrating estimation_materiaux.materiau_id...");
  const rows = await prismaClient.estimation_materiaux.findMany();

  for (const row of rows) {
    const newId = mapId(MATERIAU_ID_MAP, row.materiau_id, `estimation_materiaux ${row.id}`);
    if (!newId || newId === row.materiau_id) continue;

    if (!DRY_RUN) {
      try {
        await prismaClient.estimation_materiaux.update({ where: { id: row.id }, data: { materiau_id: newId } });
      } catch (e) {
        console.warn(
          `  ⚠️  estimation_materiaux ${row.id}: could not update to materiau_id "${newId}" ` +
            `(likely a duplicate within the same estimation_fiche_solution). ` +
            `Leaving as-is for manual review. Error: ${e}`,
        );
      }
    }
  }
}

async function migrateUserProjet() {
  console.log("Migrating user_projet.fiches_diagnostic_seen / aides_fs_unselected / annuaire_rex_projet_clicked...");
  const userProjets = await prismaClient.user_projet.findMany({
    select: { id: true, fiches_diagnostic_seen: true, aides_fs_unselected: true, annuaire_rex_projet_clicked: true },
  });

  for (const up of userProjets) {
    const newSeen = mapArray(
      FICHE_DIAGNOSTIC_ID_MAP,
      up.fiches_diagnostic_seen,
      `user_projet ${up.id}.fiches_diagnostic_seen`,
    );
    const newUnselected = mapArray(
      FICHE_SOLUTION_ID_MAP,
      up.aides_fs_unselected,
      `user_projet ${up.id}.aides_fs_unselected`,
    );
    const newClicked = mapArray(
      RETOUR_EXPERIENCE_ID_MAP,
      up.annuaire_rex_projet_clicked,
      `user_projet ${up.id}.annuaire_rex_projet_clicked`,
    );

    const changed =
      JSON.stringify(newSeen) !== JSON.stringify(up.fiches_diagnostic_seen) ||
      JSON.stringify(newUnselected) !== JSON.stringify(up.aides_fs_unselected) ||
      JSON.stringify(newClicked) !== JSON.stringify(up.annuaire_rex_projet_clicked);

    if (changed && !DRY_RUN) {
      await prismaClient.user_projet.update({
        where: { id: up.id },
        data: {
          fiches_diagnostic_seen: newSeen,
          aides_fs_unselected: newUnselected,
          annuaire_rex_projet_clicked: newClicked,
        },
      });
    }
  }
}

type RexContactId = { rexId: string | number; contactId: string | number };

async function migrateProjetSourcingRex() {
  console.log("Migrating projet.sourcing_rex (Json field)...");
  const projets = await prismaClient.projet.findMany({
    select: { id: true, sourcing_rex: true },
  });

  for (const projet of projets) {
    const rexContactIds = projet.sourcing_rex as unknown as RexContactId[] | null;
    if (!rexContactIds || !Array.isArray(rexContactIds)) continue;

    let changed = false;
    const newRexContactIds = rexContactIds.map((rc) => {
      const newRexId = mapId(RETOUR_EXPERIENCE_ID_MAP, String(rc.rexId), `projet ${projet.id}.sourcing_rex`);
      if (newRexId && newRexId !== String(rc.rexId)) {
        changed = true;
        return { ...rc, rexId: newRexId };
      }
      return rc;
    });

    if (changed && !DRY_RUN) {
      await prismaClient.projet.update({
        where: { id: projet.id },
        data: { sourcing_rex: newRexContactIds as unknown as object[] },
      });
    }
  }
}

async function migrate() {
  console.log(DRY_RUN ? "DRY RUN — no data will be written. Pass --apply to write changes.\n" : "APPLYING CHANGES.\n");

  await loadCorrespondenceTables();

  await migrateProjetFicheArrays();
  await migrateProjetFiche();
  await migrateEstimationFicheSolution();
  await migrateEstimationMateriaux();
  await migrateUserProjet();
  await migrateProjetSourcingRex();

  console.log("\nDone.");
}

migrate()
  .catch((e) => {
    console.error("Migration failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
