import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";

export enum PptxTemplateTag {
  NOM_PROJET = "nom_projet",
  COMMUNE_PROJET = "commune_projet",
  CODE_POSTAL_PROJET = "code_postal_projet",
  ADRESSE_PROJET = "adresse_projet",
  DATE_GENERATION_SYNTHESE = "date_generation_synthese",
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
  // Estimation recap slide (6): a fiche solution's own subtotal, and the grand total across
  // every selected fiche solution.
  PAGINATION_RECAP_ESTIMATION = "pagination_recap_estimation",
  COUT_INVESTISSEMENT_FICHE_SOLUTION = "cout_investissement_fiche_solution",
  COUT_ENTRETIEN_FICHE_SOLUTION = "cout_entretien_fiche_solution",
  COUT_INVESTISSEMENT_ESTIMATION = "cout_investissement_estimation",
  // Typo ("enretien") is in the template itself — must match it exactly.
  COUT_ENTRETIEN_ESTIMATION = "cout_enretien_estimation",
  // Ressources utiles slide (10): one fiche solution per slide.
  RESSOURCES_UTILES_FICHE_SOLUTION = "ressources_utiles_fiche_solution",
  PAGINATION_RESSOURCES_UTILES = "pagination_ressources_utiles",
  // Aides slide (8): up to MAX_AIDES_PAR_SLIDE aide cards per slide.
  AIDE_TYPE = "aide_type",
  AIDE_NOM = "aide_nom",
  AIDE_FINANCIERS = "aide_financiers",
  AIDE_ECHEANCE = "aide_echeance",
  AIDE_LIEN = "aide_lien",
  PAGINATION_AIDES = "pagination_aides",
}

export enum PptxSlide {
  PAGE_DE_GARDE = 1,
  FICHES_SOLUTION_INTRO = 2,
  FICHE_SOLUTION_DETAIL = 3,
  FICHE_SOLUTION_MATERIAUX = 4,
  ESTIMATION_INTRO = 5,
  ESTIMATION_RECAP = 6,
  AIDES_INTRO = 7,
  AIDES = 8,
  RESSOURCES_UTILES_INTRO = 9,
  RESSOURCES_UTILES = 10,
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
  CONTOUR_AIDE = "contour_aide",
  ZONE_TYPE_AIDE = "zone_aide_type",
  ZONE_TITRE_AIDE = "zone_aide_titre",
  ZONE_DETAILS_AIDE = "zone_aide_details",
  ZONE_LIEN_AIDE = "zone_aide_lien",
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
  solutionIds?: string[];
  estimationId?: number | null;
  aideIds?: number[];
  templateFileName?: string;
};
