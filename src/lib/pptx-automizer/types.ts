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
  COUT_INVESTISSEMENT_FICHE_SOLUTION = "cout_investissement_fiche_solution",
  COUT_ENTRETIEN_FICHE_SOLUTION = "cout_entretien_fiche_solution",
  COUT_INVESTISSEMENT_ESTIMATION = "cout_investissement_estimation",
  // Typo ("enretien") is in the template itself — must match it exactly.
  COUT_ENTRETIEN_ESTIMATION = "cout_enretien_estimation",
}

export enum PptxSlide {
  PAGE_DE_GARDE = 1,
  FICHES_SOLUTION_INTRO = 2,
  FICHE_SOLUTION_DETAIL = 3,
  FICHE_SOLUTION_MATERIAUX = 4,
  ESTIMATION_INTRO = 5,
  ESTIMATION_RECAP = 6,
}

// Names of non-text shapes on the template slides, targeted via slide.removeElement().
// These must match the shape name set in PowerPoint's Selection pane.
export enum PptxSlideElement {
  PICTO_THERMOMETRE_BAISSE_TEMPERATURE = "picto_thermometre_baisse_temperature",
  CONTOUR_MATERIAU = "contour_materiau",
  IMAGE_MATERIAU = "image_materiau",
  ZONE_TITRE_MATERIAU = "ZoneTexte 8",
  ZONE_QUANTITE_MATERIAU = "Text 8",
  ZONE_DESCRIPTION_MATERIAU = "ZoneTexte 16",
  ZONE_COUTS_MATERIAU = "ZoneTexte 18",
  ZONE_TITRE_FICHE_SOLUTION_RECAP = "ZoneTexte 1",
  RECAP_FICHE_SOLUTION_TOTAL_BACKGROUND = "Rectangle 11",
  RECAP_FICHE_SOLUTION_TOTAL_LABELS = "zone_recap_fiche_solution",
  RECAP_FICHE_SOLUTION_TOTAL_VALUES = "ZoneTexte 10",
  RECAP_GRAND_TOTAL_TITLE = "recap_titre",
  RECAP_GRAND_TOTAL_LABELS = "ZoneTexte 5",
  RECAP_GRAND_TOTAL_VALUES = "ZoneTexte 17",
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
  templateFileName?: string;
};
