import { modify, ShapeModificationCallback, XmlElement } from "pptx-automizer";
import { AddTemplateSlide, PptxSlideInfo } from "./types";
import { mergeTextRunsInElement, setElementTextRuns } from "../helpers";
import { PptxSlide, PptxSlideElement, PptxTemplateTag } from "../types";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";

// The source template's "template" alias, as loaded in generate-synthese-projet-pptx.ts.
const TEMPLATE_PRES_NAME = "template";

export type SommaireSection = {
  titre: string;
  // Template slides making up the section, in template order: its intro slide and every
  // content slide generated from the following ones.
  templateSlides: PptxSlide[];
};

// The sections listed on the sommaire, in the order they appear in the presentation.
export const SOMMAIRE_SECTIONS: SommaireSection[] = [
  {
    titre: "Contexte et enjeux climatiques",
    templateSlides: [PptxSlide.ENJEUX_CLIMATIQUES_INTRO, PptxSlide.CARTE_LCZ, PptxSlide.CLIMADIAG],
  },
  {
    titre: "Analyse de l’espace à rafraîchir",
    templateSlides: [PptxSlide.ANALYSE_SIMPLIFIEE_INTRO, PptxSlide.ANALYSE_SIMPLIFIEE],
  },
  {
    titre: "Méthodes de diagnostic identifiées",
    templateSlides: [PptxSlide.FICHES_DIAGNOSTIC_INTRO, PptxSlide.FICHE_DIAGNOSTIC_DETAIL],
  },
  {
    titre: "Solutions de rafraîchissement retenues",
    templateSlides: [
      PptxSlide.FICHES_SOLUTION_INTRO,
      PptxSlide.FICHE_SOLUTION_DETAIL,
      PptxSlide.FICHE_SOLUTION_MATERIAUX,
    ],
  },
  {
    titre: "Estimation budgétaire",
    templateSlides: [PptxSlide.ESTIMATION_INTRO, PptxSlide.ESTIMATION_RECAP],
  },
  {
    titre: "Aides financières et en ingénierie",
    templateSlides: [PptxSlide.AIDES_INTRO, PptxSlide.AIDES],
  },
  {
    titre: "Ressources utiles",
    templateSlides: [PptxSlide.RESSOURCES_UTILES_INTRO, PptxSlide.RESSOURCES_UTILES],
  },
];

export const getSommaireSectionOfTemplateSlide = (templateSlideNumber: number) =>
  SOMMAIRE_SECTIONS.find((section) => section.templateSlides.includes(templateSlideNumber));

// First and last slide numbers of a section in the generated presentation.
export type SommaireSectionRange = { debut: number; fin: number };

// The cards are laid out in 2 columns, the right one mirroring the template card's left margin.
const SLIDE_WIDTH_EMU = 12192000;
const NB_COLONNES = 2;
// Lowest edge the cards may reach: just above the footer line ("Connecteur droit 1", y 6512991).
const CARTES_BOTTOM_LIMIT_EMU = 6400000;
const CARTES_ROW_GAP_EMU = 228600;

// The shapes laid out on top of the card. They are not grouped with it.
const CARTE_CONTENT_ELEMENT_NAMES = [
  PptxSlideElement.SOMMAIRE_TITRE,
  PptxSlideElement.SOMMAIRE_PLAN,
  PptxSlideElement.SOMMAIRE_NUMERO,
];
const CARTE_ELEMENT_NAMES = [PptxSlideElement.SOMMAIRE_CARTE, ...CARTE_CONTENT_ELEMENT_NAMES];

type Position = { x: number; y: number; cx: number; cy: number };

/**
 * Computes where each card goes: filled column by column, top to bottom. With up to 3 rows the
 * cards keep the template's height. Beyond, they are shrunk to fit above the footer line, their
 * texts moved up so that the space above and below them shrinks proportionally.
 */
const getCartesLayout = (nbCartes: number, carte: Position, contentPositions: Position[]) => {
  const nbRows = Math.ceil(nbCartes / NB_COLONNES);
  const availableHeight = CARTES_BOTTOM_LIMIT_EMU - carte.y - (nbRows - 1) * CARTES_ROW_GAP_EMU;
  const carteHeight = Math.min(carte.cy, availableHeight / nbRows);

  const spaceAboveContent = Math.min(...contentPositions.map((position) => position.y)) - carte.y;
  const spaceBelowContent =
    carte.y + carte.cy - Math.max(...contentPositions.map((position) => position.y + position.cy));
  const contentShiftY =
    -(carte.cy - carteHeight) * (spaceAboveContent / Math.max(1, spaceAboveContent + spaceBelowContent));

  const rightColumnX = SLIDE_WIDTH_EMU - carte.x - carte.cx;

  return {
    carteHeight,
    contentShiftY,
    getCarteDelta: (index: number) => ({
      x: Math.floor(index / nbRows) === 0 ? 0 : rightColumnX - carte.x,
      y: (index % nbRows) * (carteHeight + CARTES_ROW_GAP_EMU),
    }),
  };
};

/**
 * Slide 2: one card per section included in the export, duplicated from the template's single
 * card (sommaire_shp, with sommaire_titre, sommaire_plan and sommaire_numero on top of it).
 *
 * A section's slide numbers depend on how many slides the following modules generate (e.g. how
 * many aides fit per slide). They are read through `getSectionRange` only when the presentation
 * is written: pptx-automizer runs shape callbacks then, once every slide has been added.
 */
export const addSommaireSlide = ({
  addTemplateSlide,
  slideInfo,
  sections,
  getSectionRange,
}: {
  addTemplateSlide: AddTemplateSlide;
  slideInfo: PptxSlideInfo;
  sections: SommaireSection[];
  getSectionRange: (section: SommaireSection) => SommaireSectionRange | undefined;
}) => {
  const getPosition = (name: string) => slideInfo.elements?.find((element) => element.name === name)?.position;
  const cartePosition = getPosition(PptxSlideElement.SOMMAIRE_CARTE);
  const contentPositions = CARTE_CONTENT_ELEMENT_NAMES.map(getPosition);

  if (!cartePosition || contentPositions.some((position) => !position)) {
    customCaptureException("Sommaire slide of the synthese projet template is missing a card shape", {
      elements: slideInfo.elements?.map((element) => element.name),
    });
    addTemplateSlide(slideInfo, [], undefined, CARTE_ELEMENT_NAMES);
    return;
  }

  const layout = getCartesLayout(sections.length, cartePosition, contentPositions as Position[]);

  // The template card is removed, then every card (the first one included) is added back from
  // the template slide: its texts can't be modified twice, addTemplateSlide already queuing a
  // replacement of the tags shared by every slide on the shapes holding a tag.
  addTemplateSlide(
    slideInfo,
    [],
    (slide) => {
      sections.forEach((section, index) => {
        const delta = layout.getCarteDelta(index);
        const moveContent = modify.updatePosition({ x: delta.x, y: delta.y + layout.contentShiftY });

        const callbacksByElement: Record<string, ShapeModificationCallback[]> = {
          [PptxSlideElement.SOMMAIRE_CARTE]: [
            modify.updatePosition({ x: delta.x, y: delta.y }),
            modify.setPosition({ h: layout.carteHeight }),
          ],
          [PptxSlideElement.SOMMAIRE_TITRE]: [
            mergeTextRunsInElement,
            modify.replaceText([{ replace: PptxTemplateTag.SOMMAIRE_TITRE_SECTION, by: { text: section.titre } }]),
            moveContent,
          ],
          [PptxSlideElement.SOMMAIRE_PLAN]: [
            mergeTextRunsInElement,
            // Read only when the presentation is written, see above.
            (element: XmlElement) => {
              const range = getSectionRange(section);
              modify.replaceText([
                { replace: PptxTemplateTag.SOMMAIRE_DEBUT_SECTION, by: { text: `${range?.debut ?? ""}` } },
                { replace: PptxTemplateTag.SOMMAIRE_FIN_SECTION, by: { text: `${range?.fin ?? ""}` } },
              ])(element);
            },
            moveContent,
          ],
          [PptxSlideElement.SOMMAIRE_NUMERO]: [
            (element: XmlElement) => setElementTextRuns(element, [`${index + 1}`]),
            moveContent,
          ],
        };

        CARTE_ELEMENT_NAMES.forEach((name) => {
          slide.addElement(TEMPLATE_PRES_NAME, slideInfo.number, { name }, callbacksByElement[name]);
        });
      });
    },
    CARTE_ELEMENT_NAMES,
  );
};
