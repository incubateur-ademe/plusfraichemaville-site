import { XmlElement } from "pptx-automizer";
import { AddTemplateSlide, PptxSlideInfo } from "./types";
import { PptxSlideElement, PptxTemplateTag } from "../types";
import { mergeTextRunsInElement, replaceTagWithBulletList } from "../helpers";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";
import { formatNumberWithSpaces } from "@/src/helpers/common";

const getLabelDelaiFicheDiagnostic = (ficheDiagnostic: FicheDiagnostic) =>
  ficheDiagnostic.delai_min != null && ficheDiagnostic.delai_max != null
    ? `de ${ficheDiagnostic.delai_min} à ${ficheDiagnostic.delai_max} mois`
    : "";

const getLabelCoutFicheDiagnostic = (ficheDiagnostic: FicheDiagnostic) =>
  ficheDiagnostic.cout_min != null && ficheDiagnostic.cout_max != null
    ? `de ${formatNumberWithSpaces(ficheDiagnostic.cout_min)} à ${formatNumberWithSpaces(
        ficheDiagnostic.cout_max,
      )} euros HT`
    : "";

/**
 * Slide 3: one fiche diagnostic's detail. This is a blueprint slide, duplicated once per
 * selected fiche diagnostic.
 */
export const addFicheDiagnosticDetailSlide = ({
  addTemplateSlide,
  slideInfo,
  ficheDiagnostic,
  index,
}: {
  addTemplateSlide: AddTemplateSlide;
  slideInfo: PptxSlideInfo;
  ficheDiagnostic: FicheDiagnostic;
  index: number;
}) => {
  const objectifs = (ficheDiagnostic.objectifs ?? [])
    .map((objectif) => objectif.description)
    .filter((description): description is string => Boolean(description));
  const hasObjectifs = objectifs.length > 0;

  addTemplateSlide(
    slideInfo,
    [
      { replace: PptxTemplateTag.NUMERO_FICHE_DIAGNOSTIC, by: { text: `${index + 1}` } },
      { replace: PptxTemplateTag.TITRE_FICHE_DIAGNOSTIC, by: { text: ficheDiagnostic.titre ?? "" } },
      {
        replace: PptxTemplateTag.NOM_SCIENTIFIQUE_FICHE_DIAGNOSTIC,
        by: { text: ficheDiagnostic.nom_scientifique ?? "" },
      },
      { replace: PptxTemplateTag.DELAI_FICHE_DIAGNOSTIC, by: { text: getLabelDelaiFicheDiagnostic(ficheDiagnostic) } },
      { replace: PptxTemplateTag.COUT_FICHE_DIAGNOSTIC, by: { text: getLabelCoutFicheDiagnostic(ficheDiagnostic) } },
      {
        replace: PptxTemplateTag.TYPE_LIVRABLE_FICHE_DIAGNOSTIC,
        by: { text: ficheDiagnostic.type_livrables ?? "Non renseigné" },
      },
    ],
    (slide) => {
      if (!hasObjectifs) {
        return;
      }

      // The objectifs are a dynamic-length bullet list. The tag's split runs must be merged in
      // this same callback chain: pptx-automizer merges this modification into
      // addTemplateSlide's own one on this element, and runs it first.
      slide.modifyElement({ name: PptxSlideElement.ZONE_OBJECTIFS_FICHE_DIAGNOSTIC }, [
        mergeTextRunsInElement,
        (element: XmlElement) =>
          replaceTagWithBulletList(element, PptxTemplateTag.OBJECTIFS_FICHE_DIAGNOSTIC, objectifs),
      ]);
    },
    hasObjectifs
      ? []
      : [PptxSlideElement.ZONE_OBJECTIFS_FICHE_DIAGNOSTIC_TITRE, PptxSlideElement.ZONE_OBJECTIFS_FICHE_DIAGNOSTIC],
  );
};
