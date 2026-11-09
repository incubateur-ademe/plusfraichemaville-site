import { ISlide, modify, ReplaceText, XmlElement } from "pptx-automizer";
import { AddTemplateSlide, PptxSlideInfo } from "./types";
import { PptxSlideElement, PptxTemplateTag } from "../types";
import { replaceTagWithBulletList, setElementTextRuns } from "../helpers";
import { Climadiag, ClimadiagYear } from "@/src/components/climadiag/types";
import { ProjectionsIndicateurClimadiag } from "@/src/lib/prisma/prismaCustomTypes";

const CLIMADIAG_YEARS: ClimadiagYear[] = [2030, 2050, 2100];

type IndicateurRow = {
  row: string;
  reference: number | null;
  projections: ProjectionsIndicateurClimadiag;
};

// Same display rules as ClimadiagIndicateursLineJour. The number and the unit are returned
// apart, as the template shows them in two runs of different sizes.
const formatNombreJours = (jour: number | null): string[] => {
  if (jour == null) return ["N.R."];
  const roundedJour = Math.round(jour);
  return [`${roundedJour} `, roundedJour > 1 ? "jours" : "jour"];
};

const getRowValues = ({ row, reference, projections }: IndicateurRow) => [
  { elementName: `${row}_reference`, texts: formatNombreJours(reference) },
  ...CLIMADIAG_YEARS.map((year) => ({
    elementName: `${row}_${year}`,
    texts: formatNombreJours(projections[year].max),
  })),
];

// The template doesn't group a background with what is laid out on top of it, so each block is
// listed as its background followed by the shapes on top of it.
const VDC_ELEMENTS = [
  PptxSlideElement.SHP_VDC,
  PptxSlideElement.VDC_PICTO,
  PptxSlideElement.VDC_TITRE,
  PptxSlideElement.VDC_REFERENCE,
  PptxSlideElement.VDC_2030,
  PptxSlideElement.VDC_2050,
  PptxSlideElement.VDC_2100,
];

const LEGENDE_ELEMENTS = [PptxSlideElement.SHP_LEGENDE_CLIMADIAG, PptxSlideElement.LEGENDE_TEXTE];

const getElementPosition = (slideInfo: PptxSlideInfo, name: string) =>
  slideInfo.elements?.find((element) => element.name === name)?.position;

/**
 * Moves the legend up by one row, into the space freed by the vague de chaleur row, which keeps
 * the template's gap between the last row and the legend.
 */
const moveLegendeUpOneRow = (slide: ISlide, slideInfo: PptxSlideInfo) => {
  const nuitsChaudes = getElementPosition(slideInfo, PptxSlideElement.SHP_NUITS_CHAUDES);
  const vdc = getElementPosition(slideInfo, PptxSlideElement.SHP_VDC);
  if (!nuitsChaudes || !vdc) return;

  const rowHeight = vdc.y - nuitsChaudes.y;
  LEGENDE_ELEMENTS.forEach((name) => {
    const position = getElementPosition(slideInfo, name);
    if (!position) return;
    slide.modifyElement({ name }, [modify.setPosition({ y: position.y - rowHeight })]);
  });
};

/**
 * Slide 4: climat futur de la commune, with the valeurs hautes of each horizon. The values are
 * sample text in the template rather than tags, so their shapes are targeted by name. As on the
 * web, the seuil is left out when unknown and the vague de chaleur row when it has no projection,
 * in which case the legend moves up to take its place.
 */
export const addClimadiagSlide = (addTemplateSlide: AddTemplateSlide, slideInfo: PptxSlideInfo, data: Climadiag) => {
  const hasVdc = !!data.jours_vdc_prevision;
  const rows: IndicateurRow[] = [
    { row: "jours_chauds", reference: data.jours_tres_chauds_ref, projections: data.jours_tres_chauds_prevision },
    { row: "nuits_chaudes", reference: data.nuits_chaudes_ref, projections: data.nuits_chaudes_prevision },
    ...(data.jours_vdc_prevision
      ? [{ row: "vdc", reference: data.jours_vdc_ref, projections: data.jours_vdc_prevision }]
      : []),
  ];

  const seuils = [
    {
      tag: PptxTemplateTag.SEUIL_JOURS_CHAUDS,
      titre: PptxSlideElement.JOURS_CHAUDS_TITRE,
      value: data.seuil_jours_tres_chauds,
    },
    {
      tag: PptxTemplateTag.SEUIL_NUITS_CHAUDES,
      titre: PptxSlideElement.NUITS_CHAUDES_TITRE,
      value: data.seuil_nuits_chaudes,
    },
  ];

  const replacements: ReplaceText[] = seuils
    .filter(({ value }) => value != null)
    .map(({ tag, value }) => ({ replace: tag, by: { text: `${value}` } }));

  const vdcElementsToRemove: string[] = hasVdc ? [] : VDC_ELEMENTS;

  addTemplateSlide(
    slideInfo,
    replacements,
    (slide) => {
      rows.flatMap(getRowValues).forEach(({ elementName, texts }) => {
        slide.modifyElement({ name: elementName }, [(element: XmlElement) => setElementTextRuns(element, texts)]);
      });
      seuils
        .filter(({ value }) => value == null)
        .forEach(({ tag, titre }) => {
          slide.modifyElement({ name: titre }, [(element: XmlElement) => replaceTagWithBulletList(element, tag, [])]);
        });
      if (!hasVdc) {
        moveLegendeUpOneRow(slide, slideInfo);
      }
    },
    vdcElementsToRemove,
  );
};
