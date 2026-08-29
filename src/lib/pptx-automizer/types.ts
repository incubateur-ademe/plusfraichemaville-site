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
}

export enum PptxSlide {
  FICHES_SOLUTION_INTRO = 2,
  FICHE_SOLUTION_DETAIL = 3,
}

// Names of non-text shapes on the template slides, targeted via slide.removeElement().
// These must match the shape name set in PowerPoint's Selection pane.
export enum PptxSlideElement {
  PICTO_THERMOMETRE_BAISSE_TEMPERATURE = "picto_thermometre_baisse_temperature",
}

export const MAX_COBENEFICE_SLOTS = 5;

export const getCobeneficeTextTag = (slotIndex: number) => `cobenefice_${slotIndex + 1}`;

export const getPictoCobeneficeElementName = (slotIndex: number) => `picto_cobenefice_${slotIndex + 1}`;

export type GenerateSyntheseProjetPptxParams = {
  projet: ProjetWithRelations;
  solutionIds?: string[];
  templateFileName?: string;
};
