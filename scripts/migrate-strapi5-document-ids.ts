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
 * are NOT built from the old numeric `id` column anymore: the CMS migration lost/reshuffled
 * some of those ids, so matching on `id` is no longer reliable. Instead, the ancien id is
 * matched against a hardcoded (id -> titre/slug) list gathered by hand from the v4 content,
 * and the documentId is looked up by titre (matériaux) or slug (fiches diagnostic/solution,
 * retours d'expérience) directly in the Strapi CMS database (`DATABASE_STRAPI_URL`).
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
// Populated at runtime by loadCorrespondenceTables(), from the hardcoded entries below matched
// against the Strapi database by titre/slug.
let FICHE_DIAGNOSTIC_ID_MAP: Record<number, string> = {};
let FICHE_SOLUTION_ID_MAP: Record<number, string> = {};
let MATERIAU_ID_MAP: Record<number, string> = {};
let RETOUR_EXPERIENCE_ID_MAP: Record<number, string> = {};

type Entry = { id: number; key: string };

// Ancien id v4 -> titre, tel que relevé à la main dans le contenu v4.
const MATERIAU_ENTRIES: Entry[] = [
  { id: 77, key: "Abribus végétalisé" },
  { id: 163, key: "Accompagnement et conseil" },
  { id: 165, key: "Accompagner l'action politique" },
  { id: 164, key: "Actions de sensibilisation et animation auprès des habitants" },
  { id: 116, key: "Adaptation des modalités de travail" },
  { id: 32, key: "Agriculture urbaine en toiture" },
  { id: 37, key: "Ancrage et raccordement" },
  { id: 108, key: "Appareils de climatisation fixes" },
  { id: 109, key: "Appareils de climatisation mobiles" },
  { id: 68, key: "Arbre de pluie" },
  { id: 47, key: "Arbres à moyen ou grand développement" },
  { id: 57, key: "Arbres, rondins de bois, rochers" },
  { id: 9, key: "Auvents" },
  { id: 10, key: "Auvents solaires photovoltaïques" },
  { id: 52, key: "Bacs à compost" },
  { id: 53, key: "Bacs de plantation surélevé" },
  { id: 67, key: "Bassin de rétention infiltrant" },
  { id: 97, key: "Bétons coulés drainants ou à ouverture de drainage" },
  { id: 61, key: "Bordure ajourée" },
  { id: 73, key: "Borne-fontaine" },
  { id: 7, key: "Brise-soleil horizontal" },
  { id: 8, key: "Brise-soleil vertical" },
  { id: 60, key: "Cabane ou tunnel végétal" },
  { id: 20, key: "Capteur de vent" },
  { id: 105, key: "Chaussée à structure réservoir" },
  { id: 18, key: "Cheminée de ventilation" },
  { id: 110, key: "Climatiseur Inverter" },
  { id: 106, key: "Climatiseur monobloc" },
  { id: 107, key: "Climatiseur split" },
  { id: 21, key: "Conduits verticaux" },
  { id: 123, key: "Corbeille géothermique" },
  { id: 28, key: "Couche de drainage et filtre" },
  { id: 104, key: "Cuve de stockage" },
  { id: 95, key: "Dalles alvéolées" },
  { id: 51, key: "Eau de pluie" },
  { id: 91, key: "Eau potable" },
  { id: 130, key: "Échangeurs thermiques" },
  { id: 59, key: "Éco-matériaux" },
  { id: 14, key: "Enduit ou bardage" },
  { id: 96, key: "Enrobés drainants (enrobés poreux)" },
  { id: 34, key: "Equipement d'arrosage et d'irriguation automatique" },
  { id: 22, key: "Extracteur statique" },
  { id: 102, key: "Façade végétalisée" },
  { id: 16, key: "Fenêtre" },
  { id: 5, key: "Films de protection solaire" },
  { id: 124, key: "Fluide caloporteur" },
  { id: 90, key: 'Fontaine "classique"' },
  { id: 125, key: "Forage sur nappe" },
  { id: 48, key: "Fosses d'arbres" },
  { id: 70, key: "Géotextile" },
  { id: 17, key: "Grille de ventilation" },
  { id: 114, key: "Horaires aménagés et gratuité des lieux frais" },
  { id: 100, key: "Isolation thermique" },
  { id: 92, key: "Jardin de pluie" },
  { id: 24, key: "Jardinière" },
  { id: 88, key: "Jets d'eau et équipements ludiques" },
  { id: 40, key: "Matériaux à albédo élevé" },
  { id: 11, key: "Matériaux isolants biosourcés" },
  { id: 12, key: "Matériaux isolants minéraux" },
  { id: 13, key: "Matériaux isolants synthétiques" },
  { id: 89, key: "Matériaux synthétiques à éviter" },
  { id: 33, key: "Matériel arrosage au goutte-à-goutte ou par aspersion" },
  { id: 50, key: "Matériel de jardinage" },
  { id: 42, key: "MCP sous forme d'enduit" },
  { id: 41, key: "MCP sous forme de plaques" },
  { id: 87, key: "Miroir d'eau et fontaine sèche" },
  { id: 45, key: "Mur de jardinières" },
  { id: 43, key: "Murs de grimpantes" },
  { id: 44, key: "Murs vivants" },
  { id: 66, key: "Noue d'infiltration végétalisée" },
  { id: 75, key: "Ombrière de parking" },
  { id: 76, key: "Ombrière solaire" },
  { id: 36, key: "Panneaux photovoltaïques" },
  { id: 35, key: "Panneaux thermiques" },
  { id: 81, key: "Parasols" },
  { id: 54, key: "Parcelle de pleine terre (déblaiement, terrassement)" },
  { id: 94, key: "Pavés drainants ou à joints élargis" },
  { id: 39, key: "Peinture athermique" },
  { id: 38, key: "Peintures à albédo élevé" },
  { id: 83, key: "Pergola bioclimatique" },
  { id: 82, key: "Pergola non végétalisée" },
  { id: 46, key: "Pergola végétalisée" },
  { id: 56, key: "Plants" },
  { id: 93, key: "Plateforme pour revêtement végétal" },
  { id: 126, key: "Pompe à chaleur" },
  { id: 78, key: "Préaux en toile tendue" },
  { id: 71, key: "Protection des pieds d'arbre" },
  { id: 23, key: "Puits canadien" },
  { id: 65, key: "Puits d'infiltration" },
  { id: 113, key: "Raccordement aux réseaux d'eau" },
  { id: 58, key: "Relief : buttes, talus et creux" },
  { id: 128, key: "Réseau de distribution primaire" },
  { id: 118, key: "Réseau Sentinelles" },
  { id: 69, key: "Réservoir paysager" },
  { id: 72, key: "Revêtement naturels" },
  { id: 99, key: "Revêtements imperméables" },
  { id: 98, key: "Revêtements meubles organiques" },
  { id: 74, key: "Rivière pédagogique" },
  { id: 55, key: "Semis" },
  { id: 122, key: "Sonde géothermique verticale" },
  { id: 129, key: "Sous-station d'échange" },
  { id: 6, key: "Stores" },
  { id: 25, key: "Strates végétales" },
  { id: 62, key: "Structures alvéolaires ultra-légères" },
  { id: 27, key: "Substrat (1000L)" },
  { id: 115, key: "Supports de sensibilisation" },
  { id: 85, key: "Système à caissons, système flottant" },
  { id: 84, key: "Système d'ancrage de l'arbre" },
  { id: 86, key: "Système de brumisation" },
  { id: 49, key: "Système de protection du tronc (chocs et blessures)" },
  { id: 111, key: "Systèmes centralisés multi-splits" },
  { id: 29, key: "Toitures végétalisées extensives" },
  { id: 31, key: "Toitures végétalisées intensives" },
  { id: 30, key: "Toitures végétalisées semi-intensives" },
  { id: 103, key: "Toiture végétalisée" },
  { id: 19, key: "Tourelle à vent" },
  { id: 121, key: "Tranchée de Stockholm" },
  { id: 63, key: "Tranchée d'infiltration" },
  { id: 64, key: "Tranchée drainante" },
  { id: 127, key: "Unités de production de froid (usine, centrale)" },
  { id: 162, key: "Utilisation d'outils open source et collaboratifs" },
  { id: 119, key: "Utilisation raisonnée de la climatisation" },
  { id: 120, key: "Utilisation réduite des appareils éléctroniques" },
  { id: 26, key: "Végétaux en toiture" },
  { id: 112, key: "Ventilation naturelle" },
  { id: 15, key: "Vitrage" },
  { id: 80, key: "Voile d'ombrage en maille métallique" },
  { id: 79, key: "Voile d'ombrage en toile perméable" },
  { id: 4, key: "Volets" },
  { id: 117, key: "Zones de refuge" },
];

// Ancien id v4 -> slug.
const RETOUR_EXPERIENCE_ENTRIES: Entry[] = [
  { id: 128, key: "muttersholtz-cour-ecole" },
  { id: 17, key: "berges-rhone-laveyron" },
  { id: 30, key: "patrimoine-arbore-orleans" },
  { id: 44, key: "desimpermeabilisation-cours-ecoles-lilloises" },
  { id: 39, key: "collegue-bioclimatique-boueni" },
  { id: 49, key: "metz-foret-des-ponts" },
  { id: 33, key: "coefficient-de-vegetalisation-rennes" },
  { id: 46, key: "lyon-arbres-de-pluie" },
  { id: 15, key: "parc-ouagadougou-grenoble" },
  { id: 45, key: "desimpermeabilisation-vegetalisation-cours-ecoles-sete" },
  { id: 8, key: "desimpermeabilisation-cours-oasis-de-paris" },
  { id: 36, key: "sevran-friche-kodak" },
  { id: 13, key: "micro-foret-bordeaux" },
  { id: 24, key: "autoroute-urbaine-transformee-en-couloir-vert" },
  { id: 23, key: "ecole-marcel-david-echirolles" },
  { id: 37, key: "ecoquartier-coeur-de-ville-la-possession" },
  { id: 29, key: "toitures-vegetalisees-desnouettes" },
  { id: 35, key: "sophia-antipolis" },
  { id: 26, key: "ecoles-coin-de-verdure-et-de-pluie" },
  { id: 18, key: "pirmil-les-isles-nantes" },
  { id: 16, key: "recuperation-eaux-angouleme" },
  { id: 28, key: "ecole-maternelle-jean-carriere" },
  { id: 10, key: "cour-oasis-berthelot-montrouge" },
  { id: 38, key: "ecoquartier-luciline" },
  { id: 21, key: "prairies-st-martin-rennes" },
  { id: 90, key: "rue-garnier-pages-fort-de-France" },
  { id: 92, key: "saint-genis-laval-cours-d-ecole" },
  { id: 87, key: "mouans-sartoux-parking-multimodal" },
  { id: 34, key: "coeur-de-grippon" },
  { id: 20, key: "pen-ar-biez-lannion" },
  { id: 22, key: "parc-bougainville-marseille" },
  { id: 25, key: "transformation-parking-ilot-de-fraicheur" },
  { id: 50, key: "pietonniser-abords-ecoles-grenoble" },
  { id: 43, key: "jardins-participatifs-guadeloupe" },
  { id: 88, key: "perpignan-ilot-puig" },
  { id: 89, key: "jaden-lanmou-fort-de-france" },
  { id: 53, key: "saint-omer-stress-thermique-ecole" },
  { id: 32, key: "arbres-alignement-paris" },
  { id: 27, key: "ecoquartier-clichy-batignolles" },
  { id: 31, key: "verdissons-nos-murs-lille" },
  { id: 42, key: "cascade-aygalades" },
  { id: 48, key: "parc-soeurs-franciscaines" },
  { id: 40, key: "ecoquartier-rives-bief" },
  { id: 52, key: "place-eglise-champagnier" },
  { id: 51, key: "elne-ville-jardin" },
  { id: 11, key: "rue-carnot-cuers" },
  { id: 47, key: "alpha-angouleme-geothermie" },
  { id: 12, key: "toulouse-plus-fraiche" },
  { id: 127, key: "muttersholtz-coeur-village" },
  { id: 86, key: "st-michel-de-lanes-rue-de-l-eglise" },
  { id: 14, key: "ecoquartier-vauban-bensancon" },
  { id: 19, key: "jardin-de-pluie-bram" },
  { id: 93, key: "lakou-emma-chantier-insertion-fraicheur-diamant" },
  { id: 91, key: "parking-savane-fort-de-france" },
  { id: 41, key: "la-grande-borne" },
  { id: 94, key: "jardin-atoumo-dillon" },
];

// Ancien id v4 -> slug.
const FICHE_SOLUTION_ENTRIES: Entry[] = [
  { id: 10, key: "batiment-ecole-adaptation-renovation-batiments" },
  { id: 11, key: "arbres-vegetaux-cour-ecole" },
  { id: 74, key: "cartographie-refuges-climatiques" },
  { id: 37, key: "comportements-collectifs" },
  { id: 38, key: "comportements-individuels" },
  { id: 39, key: "desimpermabilisation" },
  { id: 12, key: "facade-vegetalisee" },
  { id: 13, key: "fontaines-reseau-fontainerie" },
  { id: 40, key: "geocooling" },
  { id: 14, key: "isolation-thermique" },
  { id: 16, key: "potagers-ecole" },
  { id: 15, key: "jardin-suspendu" },
  { id: 17, key: "jeux-eau" },
  { id: 18, key: "jeux-et-equipements-durables-ecoles" },
  { id: 19, key: "materiaux-changement-phase" },
  { id: 20, key: "ouvrage-paysager-ecole" },
  { id: 21, key: "gestion-eaux-pluviales" },
  { id: 22, key: "panneaux-solaires" },
  { id: 23, key: "parc-jardin" },
  { id: 24, key: "planter-un-arbre" },
  { id: 25, key: "prendre-soin-arbre-existant" },
  { id: 41, key: "reseaux_de_froid" },
  { id: 26, key: "revetement-albedo-eleve" },
  { id: 27, key: "revetement-drainant" },
  { id: 28, key: "revetement-drainant-ecole" },
  { id: 29, key: "stockage-eau-de-pluie" },
  { id: 30, key: "stockage-eau-pluie-ecole" },
  { id: 31, key: "structure-ombrage" },
  { id: 32, key: "facade-structure-ombrage" },
  { id: 33, key: "toiture-vegetalisee" },
  { id: 36, key: "climatisation-raisonnee" },
  { id: 34, key: "vegetalisation-des-voies-de-tramway" },
  { id: 35, key: "ventilation-naturelle" },
];

// Ancien id v4 -> slug.
const FICHE_DIAGNOSTIC_ENTRIES: Entry[] = [
  { id: 8, key: "indicateurs-empiriques" },
  { id: 6, key: "analyse-vulnerabilite-population" },
  { id: 7, key: "enquetes-confort-vecu" },
  { id: 4, key: "mesure-temperature-air" },
  { id: 5, key: "mesure-temperature-ressentie" },
  { id: 10, key: "simulation-echelle-territoriale" },
  { id: 2, key: "climadiag-commune" },
  { id: 9, key: "zones-climatiques-locales" },
  { id: 11, key: "simulation-echelle-urbaine" },
  { id: 44, key: "balade-urbaine" },
  { id: 1, key: "modelisation-icu-meteo-france" },
];

type TableConfig = { label: string; table: string; column: "titre" | "slug"; entries: Entry[] };

const TABLE_CONFIGS = {
  ficheDiagnostic: {
    label: "FicheDiagnostic",
    table: "fiche_diagnostics",
    column: "slug",
    entries: FICHE_DIAGNOSTIC_ENTRIES,
  },
  ficheSolution: { label: "FicheSolution", table: "fiche_solutions", column: "slug", entries: FICHE_SOLUTION_ENTRIES },
  materiau: { label: "Materiau", table: "materiaux", column: "titre", entries: MATERIAU_ENTRIES },
  retourExperience: {
    label: "RetourExperience",
    table: "retour_experiences",
    column: "slug",
    entries: RETOUR_EXPERIENCE_ENTRIES,
  },
} satisfies Record<string, TableConfig>;

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

/** Reads {titre|slug -> document_id} for every published/draft row of a table. */
async function buildLookupByColumn(
  client: Client,
  schema: string,
  table: string,
  column: "titre" | "slug",
): Promise<Map<string, string>> {
  const { rows } = await client.query<{ key: string; document_id: string }>(
    `SELECT "${column}" AS key, document_id FROM "${schema}"."${table}" WHERE document_id IS NOT NULL AND "${column}" IS NOT NULL`,
  );
  const lookup = new Map<string, string>();
  for (const row of rows) {
    lookup.set(row.key, row.document_id);
  }
  return lookup;
}

/** Resolves the hardcoded (ancien id -> titre/slug) entries against a {titre|slug -> document_id} lookup. */
function buildIdMapFromEntries(entries: Entry[], lookup: Map<string, string>, label: string): Record<number, string> {
  const map: Record<number, string> = {};
  for (const { id, key } of entries) {
    const documentId = lookup.get(key);
    if (documentId) {
      map[id] = documentId;
    } else {
      console.warn(`  ⚠️  ${label}: no match found for "${key}" (ancien id ${id}), leaving unmapped.`);
    }
  }
  return map;
}

/** Connects to the Strapi database and builds the four correspondence tables from the hardcoded entries. */
async function loadCorrespondenceTables() {
  const connectionString = process.env.DATABASE_STRAPI_URL;
  if (!connectionString) {
    throw new Error("Missing DATABASE_STRAPI_URL env var (connection string to the Strapi CMS database).");
  }
  const schema = getSchemaFromConnectionString(connectionString);

  console.log(
    "Connecting to the Strapi database to build the id -> documentId correspondence tables (matched by titre/slug)...",
  );
  const client = new Client({ connectionString });
  await client.connect();

  try {
    for (const config of Object.values(TABLE_CONFIGS)) {
      console.log(`  ${config.label}: matching "${schema}"."${config.table}".${config.column}`);
    }

    const ficheDiagnosticLookup = await buildLookupByColumn(
      client,
      schema,
      TABLE_CONFIGS.ficheDiagnostic.table,
      TABLE_CONFIGS.ficheDiagnostic.column,
    );
    FICHE_DIAGNOSTIC_ID_MAP = buildIdMapFromEntries(
      TABLE_CONFIGS.ficheDiagnostic.entries,
      ficheDiagnosticLookup,
      TABLE_CONFIGS.ficheDiagnostic.label,
    );

    const ficheSolutionLookup = await buildLookupByColumn(
      client,
      schema,
      TABLE_CONFIGS.ficheSolution.table,
      TABLE_CONFIGS.ficheSolution.column,
    );
    FICHE_SOLUTION_ID_MAP = buildIdMapFromEntries(
      TABLE_CONFIGS.ficheSolution.entries,
      ficheSolutionLookup,
      TABLE_CONFIGS.ficheSolution.label,
    );

    const materiauLookup = await buildLookupByColumn(
      client,
      schema,
      TABLE_CONFIGS.materiau.table,
      TABLE_CONFIGS.materiau.column,
    );
    MATERIAU_ID_MAP = buildIdMapFromEntries(
      TABLE_CONFIGS.materiau.entries,
      materiauLookup,
      TABLE_CONFIGS.materiau.label,
    );

    const retourExperienceLookup = await buildLookupByColumn(
      client,
      schema,
      TABLE_CONFIGS.retourExperience.table,
      TABLE_CONFIGS.retourExperience.column,
    );
    RETOUR_EXPERIENCE_ID_MAP = buildIdMapFromEntries(
      TABLE_CONFIGS.retourExperience.entries,
      retourExperienceLookup,
      TABLE_CONFIGS.retourExperience.label,
    );

    console.log(
      `  Loaded ${Object.keys(FICHE_DIAGNOSTIC_ID_MAP).length}/${
        TABLE_CONFIGS.ficheDiagnostic.entries.length
      } fiches diagnostic, ` +
        `${Object.keys(FICHE_SOLUTION_ID_MAP).length}/${TABLE_CONFIGS.ficheSolution.entries.length} fiches solution, ` +
        `${Object.keys(MATERIAU_ID_MAP).length}/${TABLE_CONFIGS.materiau.entries.length} matériaux, ` +
        `${Object.keys(RETOUR_EXPERIENCE_ID_MAP).length}/${
          TABLE_CONFIGS.retourExperience.entries.length
        } retours d'expérience.\n`,
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
