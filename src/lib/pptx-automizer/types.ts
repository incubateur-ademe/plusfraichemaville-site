import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";

export enum PptxTemplateTag {
  NOM_PROJET = "nom_projet",
  COMMUNE_PROJET = "commune_projet",
  CODE_POSTAL_PROJET = "code_postal_projet",
  ADRESSE_PROJET = "adresse_projet",
  DATE_GENERATION_SYNTHESE = "date_generation_synthese",
  TITRE_FICHES_DIAGNOSTIC = "titre_fiches_diagnostic",
  // Analyse simplifiée slide (3): each coefficient's value and its range analysis.
  COEFF_RU = "coeff_ru",
  ANALYSE_COEFF_RU = "analyse_coeff_ru",
  COEFF_PERMEABILITE = "coeff_perm",
  ANALYSE_COEFF_PERMEABILITE = "analyse_coeff_perm",
  COEFF_BIODIVERSITE = "coeff_bio",
  ANALYSE_COEFF_BIODIVERSITE = "analyse_coeff_bio",
  PART_CANOPEE = "part_canopee",
  NUMERO_FICHE_DIAGNOSTIC = "n°_diagnostic",
  TITRE_FICHE_DIAGNOSTIC = "titre_fiche_diagnostic",
  NOM_SCIENTIFIQUE_FICHE_DIAGNOSTIC = "nom_scientifique_fiche_diagnostic",
  DELAI_FICHE_DIAGNOSTIC = "delai_fiche_diagnostic",
  COUT_FICHE_DIAGNOSTIC = "cout_fiche_diagnostic",
  TYPE_LIVRABLE_FICHE_DIAGNOSTIC = "type_livrable_fiche_diagnostic",
  OBJECTIFS_FICHE_DIAGNOSTIC = "objectifs_fiche_diagnostic",
  TITRE_FICHES_SOLUTION = "titre_fiches_solution",
  NUMERO_FICHE_SOLUTION = "n°_solution",
  TITRE_FICHE_SOLUTION = "titre_fiche_solution",
  DESCRIPTION_COURTE_FICHE_SOLUTION = "description_courte_fiche_solution",
  PORTEE_BAISSE_TEMPERATURE_FICHE_SOLUTION = "portee_baisse_temperature",
  BAISSE_TEMPERATURE_FICHE_SOLUTION = "baisse_temperature",
  COUT_FICHE_SOLUTION = "cout_fiche_solution",
  DELAI_FICHE_SOLUTION = "delai_fiche_solution",
  PAGINATION_SOLUTION_MATERIAUX = "pagination_solution_materiaux",
  TITRE_MATERIAU = "titre_materiau",
  DESCRIPTION_MATERIAU = "description_materiau",
  QUANTITE_MATERIAU = "quantite_materiau",
  COUT_INVESTISSEMENT_MATERIAU = "cout_investissement_materiau",
  COUT_ENTRETIEN_MATERIAU = "cout_entretien_materiau",
  // Estimation recap slide (9): a fiche solution's own subtotal, and the grand total across
  // every selected fiche solution.
  PAGINATION_RECAP_ESTIMATION = "pagination_recap_estimation",
  COUT_INVESTISSEMENT_FICHE_SOLUTION = "cout_investissement_fiche_solution",
  COUT_ENTRETIEN_FICHE_SOLUTION = "cout_entretien_fiche_solution",
  COUT_INVESTISSEMENT_ESTIMATION = "cout_investissement_estimation",
  // Typo ("enretien") is in the template itself — must match it exactly.
  COUT_ENTRETIEN_ESTIMATION = "cout_enretien_estimation",
  // Ressources utiles slide (13): one fiche solution per slide.
  RESSOURCES_UTILES_FICHE_SOLUTION = "ressources_utiles_fiche_solution",
  PAGINATION_RESSOURCES_UTILES = "pagination_ressources_utiles",
  // Aides slide (11): every aide's block flows in the same shared zone_aide text box, as many
  // as estimated to fit per slide.
  AIDE_TYPE = "aide_type",
  AIDE_NOM = "aide_nom",
  AIDE_FINANCIERS = "aide_financiers",
  AIDE_ECHEANCE = "aide_echeance",
  AIDE_LIEN = "aide_lien",
  PAGINATION_AIDES = "pagination_aides",
}

export enum PptxSlide {
  PAGE_DE_GARDE = 1,
  ANALYSE_SIMPLIFIEE_INTRO = 2,
  ANALYSE_SIMPLIFIEE = 3,
  FICHES_DIAGNOSTIC_INTRO = 4,
  FICHE_DIAGNOSTIC_DETAIL = 5,
  FICHES_SOLUTION_INTRO = 6,
  FICHE_SOLUTION_DETAIL = 7,
  FICHE_SOLUTION_MATERIAUX = 8,
  ESTIMATION_INTRO = 9,
  ESTIMATION_RECAP = 10,
  AIDES_INTRO = 11,
  AIDES = 12,
  RESSOURCES_UTILES_INTRO = 13,
  RESSOURCES_UTILES = 14,
}

// Names of non-text shapes on the template slides, targeted via slide.removeElement().
// These must match the shape name set in PowerPoint's Selection pane.
export enum PptxSlideElement {
  PICTO_THERMOMETRE_BAISSE_TEMPERATURE = "picto_thermometre_baisse_temperature",
  CONTOUR_MATERIAU = "contour_materiau",
  IMAGE_MATERIAU = "image_materiau",
  ZONE_TITRE_MATERIAU = "zone_titre_materiau",
  ZONE_QUANTITE_MATERIAU = "zone_quantite_materiau",
  ZONE_DESCRIPTION_MATERIAU = "zone_description_materiau",
  ZONE_COUTS_MATERIAU = "zone_cout_materiau",
  ZONE_TITRE_FICHE_SOLUTION_RECAP = "zone_titre_fs_recap_estimation",
  RECAP_FICHE_SOLUTION_TOTAL_BACKGROUND = "bg_recap_estimation_fs",
  RECAP_FICHE_SOLUTION_TOTAL_LABELS = "zone_recap_fiche_solution",
  RECAP_FICHE_SOLUTION_TOTAL_VALUES = "ZoneTexte 10",
  RECAP_GRAND_TOTAL_TITLE = "recap_titre",
  RECAP_GRAND_TOTAL_LABELS = "recap_total_libelles",
  RECAP_GRAND_TOTAL_VALUES = "recap_total_libelles_valeurs",
  ZONE_TITRE_FICHE_SOLUTION_RESSOURCES_UTILES = "zone_titre_fiche_solution",
  ZONE_RESSOURCES_UTILES_FICHE_SOLUTION = "zone_ressources_fiche_solution",
  // Aides slide (11): every field of one aide (type, nom, financiers, echeance, lien) now lives
  // in this single bulleted text box, instead of one shape per field.
  ZONE_AIDE = "zone_aide",
  ZONE_OBJECTIFS_FICHE_DIAGNOSTIC = "zone_objectifs_fiche_diagnostic",
  ZONE_OBJECTIFS_FICHE_DIAGNOSTIC_TITRE = "zone_objectifs_fiche_diagnostic_titre",
  // Analyse simplifiée slide (3): each coefficient's 0 → 1 scale, and the cursor slid along it
  // to the value.
  ZONE_COEFF_RU_ECHELLE = "zone_coeff_ru_echelle",
  ZONE_COEFF_RU_CURSEUR = "zone_coeff_ru_curseur",
  ZONE_COEFF_PERMEABILITE_ECHELLE = "zone_coeff_perm_echelle",
  ZONE_COEFF_PERMEABILITE_CURSEUR = "zone_coeff_perm_curseur",
  ZONE_COEFF_BIODIVERSITE_ECHELLE = "zone_coeff_bio_echelle",
  ZONE_COEFF_BIODIVERSITE_CURSEUR = "zone_coeff_bio_curseur",
  // Analyse simplifiée slide (3): pie chart of the surface's répartition, like
  // IndienResultPieChartSurface.
  GRAPH_REPARTITION_SOLS = "graph_repartition_sols",
}

// The materiau row (contour_materiau + its texts and image) is duplicated for the 2nd and
// 3rd materiau of a slide, shifted down by this many EMU per row. The value reuses the
// template's own row height (contour_materiau's cy) plus the gap already used between the
// header line and the first card, so duplicated rows keep the template's spacing.
export const MAX_MATERIAUX_PAR_SLIDE = 3;
const MATERIAU_ROW_HEIGHT_EMU = 1234440;
const MATERIAU_ROW_GAP_EMU = 435534;
export const MATERIAU_ROW_DELTA_EMU = MATERIAU_ROW_HEIGHT_EMU + MATERIAU_ROW_GAP_EMU;

export const MAX_COBENEFICE_SLOTS = 5;

export const getCobeneficeTextTag = (slotIndex: number) => `cobenefice_${slotIndex + 1}`;

export const getPictoCobeneficeElementName = (slotIndex: number) => `picto_cobenefice_${slotIndex + 1}`;

export type GenerateSyntheseProjetPptxParams = {
  projet: ProjetWithRelations;
  diagnosticIds?: string[];
  includeAnalyseSimplifiee?: boolean;
  solutionIds?: string[];
  estimationId?: number | null;
  aideIds?: number[];
  templateFileName?: string;
};
