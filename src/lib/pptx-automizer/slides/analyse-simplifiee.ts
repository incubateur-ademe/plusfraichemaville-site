import { ChartData, ISlide, modify, ReplaceText } from "pptx-automizer";
import { AddTemplateSlide, PptxSlideInfo } from "./types";
import { PptxSlideElement, PptxTemplateTag } from "../types";
import { ProjetIndiEnSimuation } from "@/src/lib/prisma/prismaCustomTypes";
import {
  getRangeFromValue,
  INDIEN_BIODIVERSITE,
  INDIEN_PERMEABILITE,
  INDIEN_RAFRAICHISSEMENT_URBAIN,
  IndienType,
} from "@/src/helpers/indicateurs-environnementaux/indicateurs-environnementaux-list";
import {
  INDIEN_QUESTION_GROUPE_BASSIN,
  INDIEN_QUESTION_GROUPE_REVETEMENT_SOL,
  INDIEN_QUESTION_GROUPE_SURFACE_VEGETALISEE,
  INDIEN_QUESTION_GROUPE_TOITURE,
} from "@/src/helpers/indicateurs-environnementaux/indi-en-questions";

type CoefficientBlock = {
  coefficient: IndienType;
  value: number;
  valueTag: PptxTemplateTag;
  analyseTag: PptxTemplateTag;
  echelle: PptxSlideElement;
  curseur: PptxSlideElement;
};

const getCoefficientReplacements = ({ coefficient, value, valueTag, analyseTag }: CoefficientBlock): ReplaceText[] => [
  { replace: valueTag, by: { text: `${value}` } },
  { replace: analyseTag, by: { text: getRangeFromValue(value, coefficient).title } },
];

/**
 * Slides the coefficient's cursor along its scale so that the cursor's center points at the
 * value, like IndienResultRange does on the web. Both shapes' positions are read off the
 * template slide itself, so moving or resizing the scale in the template needs no code change.
 */
const moveCurseurToValue = (slide: ISlide, slideInfo: PptxSlideInfo, { value, echelle, curseur }: CoefficientBlock) => {
  const echellePosition = slideInfo.elements?.find((element) => element.name === echelle)?.position;
  const curseurPosition = slideInfo.elements?.find((element) => element.name === curseur)?.position;
  if (!echellePosition || !curseurPosition) {
    return;
  }

  const clampedValue = Math.min(Math.max(value, 0), 1);
  const x = Math.round(echellePosition.x + clampedValue * echellePosition.cx - curseurPosition.cx / 2);
  slide.modifyElement({ name: curseur }, [modify.setPosition({ x })]);
};

/**
 * Fills the répartition des sols pie chart with the same parts as IndienResultPieChartSurface.
 * The slice colors are set per point index in the template, so categories must keep the
 * template's order (revêtement, fontainerie, végétalisée, toiture). Each category label
 * carries its percentage ("Toitures : 12 %"), so the chart's legend reads like the web one.
 */
const getRepartitionSolsChartData = (indiEnResults: ProjetIndiEnSimuation): ChartData => ({
  series: [{ label: "Part de la surface" }],
  categories: [
    { label: INDIEN_QUESTION_GROUPE_REVETEMENT_SOL.label, value: indiEnResults.partRevetementSol },
    { label: INDIEN_QUESTION_GROUPE_BASSIN.label, value: indiEnResults.partFontainerie },
    { label: INDIEN_QUESTION_GROUPE_SURFACE_VEGETALISEE.label, value: indiEnResults.partSurfaceVegetalisee },
    { label: INDIEN_QUESTION_GROUPE_TOITURE.label, value: indiEnResults.partToiture },
  ].map(({ label, value }) => ({ label: `${label} : ${value} %`, values: [value] })),
});

/**
 * Slide 3: analyse simplifiée de la surchauffe de l'espace, mirroring IndienResultRanges.
 * For each coefficient (rafraîchissement urbain, perméabilité, biodiversité): its value, its
 * range analysis, and the cursor moved along its scale to that value. Plus the répartition des
 * sols pie chart.
 */
export const addAnalyseSimplifieeSlide = (
  addTemplateSlide: AddTemplateSlide,
  slideInfo: PptxSlideInfo,
  indiEnResults: ProjetIndiEnSimuation,
) => {
  const coefficientBlocks: CoefficientBlock[] = [
    {
      coefficient: INDIEN_RAFRAICHISSEMENT_URBAIN,
      value: indiEnResults.coeffRafraichissementUrbain,
      valueTag: PptxTemplateTag.COEFF_RU,
      analyseTag: PptxTemplateTag.ANALYSE_COEFF_RU,
      echelle: PptxSlideElement.ZONE_COEFF_RU_ECHELLE,
      curseur: PptxSlideElement.ZONE_COEFF_RU_CURSEUR,
    },
    {
      coefficient: INDIEN_PERMEABILITE,
      value: indiEnResults.coeffPermeabilite,
      valueTag: PptxTemplateTag.COEFF_PERMEABILITE,
      analyseTag: PptxTemplateTag.ANALYSE_COEFF_PERMEABILITE,
      echelle: PptxSlideElement.ZONE_COEFF_PERMEABILITE_ECHELLE,
      curseur: PptxSlideElement.ZONE_COEFF_PERMEABILITE_CURSEUR,
    },
    {
      coefficient: INDIEN_BIODIVERSITE,
      value: indiEnResults.coeffBiodiversite,
      valueTag: PptxTemplateTag.COEFF_BIODIVERSITE,
      analyseTag: PptxTemplateTag.ANALYSE_COEFF_BIODIVERSITE,
      echelle: PptxSlideElement.ZONE_COEFF_BIODIVERSITE_ECHELLE,
      curseur: PptxSlideElement.ZONE_COEFF_BIODIVERSITE_CURSEUR,
    },
  ];

  addTemplateSlide(slideInfo, coefficientBlocks.flatMap(getCoefficientReplacements), (slide) => {
    coefficientBlocks.forEach((coefficientBlock) => moveCurseurToValue(slide, slideInfo, coefficientBlock));
    slide.modifyElement({ name: PptxSlideElement.GRAPH_REPARTITION_SOLS }, [
      modify.setChartData(getRepartitionSolsChartData(indiEnResults)),
    ]);
  });
};
