import Automizer, {
  ISlide,
  ModifyImageHelper,
  modify,
  ReplaceText,
  ShapeModificationCallback,
  XmlElement,
} from "pptx-automizer";
import path from "path";
import fs from "fs/promises";
import sharp from "sharp";
import {
  GenerateSyntheseProjetPptxParams,
  getCobeneficeTextTag,
  getPictoCobeneficeElementName,
  MAX_COBENEFICE_SLOTS,
  PptxSlide,
  PptxSlideElement,
  PptxTemplateTag,
} from "./types";
import { mergeTextRunsInElement, replaceTagWithBulletList, stripSvgBlipExtension } from "./helpers";
import { getFicheSolutionByIdsComplete } from "@/src/lib/strapi/queries/fichesSolutionsQueries";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { Icone } from "@/src/lib/strapi/types/api/cobenefice";
import { getPorteeBaisseTemperatureLabelFromCode } from "@/src/helpers/porteeBaisseTemperatureFicheSolution";

const COBENEFICE_BLANK_ICON = "cobenefice-blank";

// The cobenefice icons on the site are SVGs, but the pptx placeholder pictos must stay
// plain PNG-based images (not SVG) to avoid OOXML's dual PNG/SVG image relation, which
// pptx-automizer's relation-swap helper cannot reliably update both sides of.
const getCobeneficeIconPngFilename = (icone?: Icone) => `${icone ?? COBENEFICE_BLANK_ICON}.png`;

const getCobeneficeIconPngBuffer = async (icone?: Icone) => {
  const svgPath = path.join(process.cwd(), "public", "images", "cobenefices", `${icone ?? COBENEFICE_BLANK_ICON}.svg`);
  const svgBuffer = await fs.readFile(svgPath);
  return sharp(svgBuffer, { density: 300 }).png().toBuffer();
};

export const generateSyntheseProjetPptx = async ({
  projet,
  solutionIds = [],
  templateFileName = "template_synthese_projet.pptx",
}: GenerateSyntheseProjetPptxParams): Promise<Buffer> => {
  const templateDir = path.join(process.cwd(), "public", "templates");

  const automizer = new Automizer({
    templateDir,
    removeExistingSlides: true,
    verbosity: 0,
  });

  const pres = automizer.loadRoot(templateFileName).load(templateFileName, "template");

  const info = await pres.getInfo();
  const slides = info.slidesByTemplate("template");

  const fichesSolutions = solutionIds.length > 0 ? await getFicheSolutionByIdsComplete(solutionIds) : [];
  const fichesSolutionsMap = new Map(fichesSolutions.map((fs) => [fs.documentId, fs]));
  // Strapi returns the fiches in its own order: re-order them to follow the selection order.
  const orderedFichesSolutions = solutionIds
    .map((id) => fichesSolutionsMap.get(id))
    .filter((ficheSolution): ficheSolution is FicheSolution => Boolean(ficheSolution));
  const titresFichesSolutions = orderedFichesSolutions.map((ficheSolution) => ficheSolution.titre);

  // Convert every distinct cobenefice icon actually displayed (capped at MAX_COBENEFICE_SLOTS
  // per fiche) to PNG once, then register the buffers as media the pictos can point to.
  const iconesToLoad = new Set<Icone | undefined>();
  orderedFichesSolutions.forEach((ficheSolution) => {
    (ficheSolution.cobenefices ?? []).slice(0, MAX_COBENEFICE_SLOTS).forEach((cobenefice) => {
      iconesToLoad.add(cobenefice.icone);
    });
  });
  for (const icone of Array.from(iconesToLoad)) {
    const pngBuffer = await getCobeneficeIconPngBuffer(icone);
    pres.loadMediaBuffer(getCobeneficeIconPngFilename(icone), pngBuffer);
  }

  const dateGenerationSynthese = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const replacements = [
    {
      replace: PptxTemplateTag.NOM_PROJET,
      by: { text: projet.nom ?? "" },
    },
    {
      replace: PptxTemplateTag.COMMUNE_PROJET,
      by: { text: projet.collectivite?.nom ?? "" },
    },
    {
      replace: PptxTemplateTag.CODE_POSTAL_PROJET,
      by: { text: projet.collectivite?.code_postal ?? "" },
    },
    {
      replace: PptxTemplateTag.ADRESSE_PROJET,
      by: { text: projet.adresse ?? "" },
    },
    {
      replace: PptxTemplateTag.DATE_GENERATION_SYNTHESE,
      by: { text: dateGenerationSynthese },
    },
  ];

  const addTemplateSlide = (
    slideInfo: (typeof slides)[number],
    slideReplacements: ReplaceText[] = [],
    onSlideCreated?: (slide: ISlide) => void,
  ) => {
    pres.addSlide("template", slideInfo.number, (slide) => {
      slideInfo.elements?.forEach((element) => {
        if (element.hasTextBody) {
          slide.modifyElement({ name: element.name, nameIdx: element.nameIdx }, [
            mergeTextRunsInElement,
            (el: XmlElement) =>
              replaceTagWithBulletList(el, PptxTemplateTag.TITRE_FICHES_SOLUTION, titresFichesSolutions),
            modify.replaceText([...replacements, ...slideReplacements]),
          ]);
        }
      });
      onSlideCreated?.(slide);
    });
  };

  const slidesNeedingFichesSolutions: number[] = [PptxSlide.FICHES_SOLUTION_INTRO, PptxSlide.FICHE_SOLUTION_DETAIL];

  for (const slideInfo of slides) {
    if (slidesNeedingFichesSolutions.includes(slideInfo.number) && orderedFichesSolutions.length === 0) {
      continue;
    }

    if (slideInfo.number === PptxSlide.FICHE_SOLUTION_DETAIL) {
      // The detail slide is a blueprint: it is duplicated once per selected fiche solution.
      orderedFichesSolutions.forEach((ficheSolution, index) => {
        const hasBaisseTemperature = Boolean(ficheSolution.baisse_temperature);
        const cobeneficeTextReplacements = Array.from({ length: MAX_COBENEFICE_SLOTS }, (_, slotIndex) => ({
          replace: getCobeneficeTextTag(slotIndex),
          by: { text: ficheSolution.cobenefices?.[slotIndex]?.description ?? "" },
        }));

        addTemplateSlide(
          slideInfo,
          [
            { replace: PptxTemplateTag.NUMERO_FICHE_SOLUTION, by: { text: `${index + 1}` } },
            { replace: PptxTemplateTag.TITRE_FICHE_SOLUTION, by: { text: ficheSolution.titre ?? "" } },
            {
              replace: PptxTemplateTag.DESCRIPTION_COURTE_FICHE_SOLUTION,
              by: { text: ficheSolution.description_courte ?? "" },
            },
            {
              replace: PptxTemplateTag.PORTEE_BAISSE_TEMPERATURE_FICHE_SOLUTION,
              by: {
                text: hasBaisseTemperature
                  ? getPorteeBaisseTemperatureLabelFromCode(ficheSolution.portee_baisse_temperature)
                  : ficheSolution.libelle_avantage_solution ?? "",
              },
            },
            {
              replace: PptxTemplateTag.BAISSE_TEMPERATURE_FICHE_SOLUTION,
              by: { text: hasBaisseTemperature ? `-${ficheSolution.baisse_temperature?.toLocaleString("fr")}°C` : "" },
            },
            ...cobeneficeTextReplacements,
          ],
          (slide) => {
            if (hasBaisseTemperature) {
              slide.removeElement({ name: PptxSlideElement.PICTO_THERMOMETRE_BAISSE_TEMPERATURE });
            }

            for (let slotIndex = 0; slotIndex < MAX_COBENEFICE_SLOTS; slotIndex++) {
              const slotName = getPictoCobeneficeElementName(slotIndex);
              const cobenefice = ficheSolution.cobenefices?.[slotIndex];
              if (cobenefice) {
                slide.modifyElement({ name: slotName }, [
                  ModifyImageHelper.setRelationTarget(
                    getCobeneficeIconPngFilename(cobenefice.icone),
                  ) as ShapeModificationCallback,
                  stripSvgBlipExtension,
                ]);
              } else {
                slide.removeElement({ name: slotName });
              }
            }
          },
        );
      });
      continue;
    }

    addTemplateSlide(slideInfo);
  }

  const zip = await pres.getJSZip();
  const buffer = (await zip.generateAsync({ type: "nodebuffer" })) as Buffer;
  return buffer;
};
