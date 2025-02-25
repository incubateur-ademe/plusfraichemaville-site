import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { LienRexDiagnostic } from "@/src/lib/strapi/types/api/lien-rex-diagnostic";
import Image from "next/image";
import { getFicheDiagUtilite, isFicheDiagICU } from "../fiches-diagnostic/helpers";
import clsx from "clsx";
import CmsRichText from "../common/CmsRichText";
import { TypeFiche } from "@/src/helpers/common";
import { GenericSaveFiche } from "../common/generic-save-fiche";
import { GenericFicheLink } from "../common/generic-save-fiche/generic-fiche-link";

type RetourExperienceDiagCombinaisonProps = {
  lienRexDiagnostics: LienRexDiagnostic[];
};

export const RetourExperienceDiagCombinaison = ({ lienRexDiagnostics }: RetourExperienceDiagCombinaisonProps) => {
  return (
    <>
      {lienRexDiagnostics.map((lienRexDiagnostic) => {
        if (!lienRexDiagnostic.attributes.fiche_diagnostic) return null;
        const ficheDiagData = lienRexDiagnostic.attributes.fiche_diagnostic.data;
        const utilite = getFicheDiagUtilite(ficheDiagData);

        const { image_diag_icu, image_confort_thermique, titre, nom_scientifique, slug } = ficheDiagData.attributes;
        const isICU = isFicheDiagICU(ficheDiagData);
        const image = isICU ? image_diag_icu : image_confort_thermique;

        return (
          <div className="mb-20 flex flex-col gap-10 md:flex-row" key={lienRexDiagnostic.id}>
            <div
              className={clsx("flex size-32 shrink-0 items-center justify-center rounded-full", utilite.colors.bgLight)}
            >
              <Image
                className="object-contain"
                src={getStrapiImageUrl(image, STRAPI_IMAGE_KEY_SIZE.small)}
                width={80}
                height={80}
                alt={titre ?? ""}
              />
            </div>
            <div>
              <h2 className="mb-3 text-[22px] font-bold">{titre}</h2>
              <CmsRichText className="mb-5 leading-6" label={lienRexDiagnostic.attributes.description} />
              <GenericFicheLink href={`/fiches-diagnostic/${slug}`}>
                <div className="pfmv-card relative max-w-lg cursor-pointer p-5">
                  <div className="mb-2 flex items-center gap-3 text-sm">
                    <div className={clsx("size-[18px] rounded-full", utilite.colors.bgLight)}></div>
                    {isICU ? "Mesure d'ICU" : "Évaluation de confort thermique"}
                  </div>
                  <h3 className="mb-1 text-base">{titre}</h3>
                  <i>{nom_scientifique}</i>
                  <GenericSaveFiche
                    id={ficheDiagData.id}
                    type={TypeFiche.diagnostic}
                    classNameButton="absolute top-3 right-4"
                  />
                </div>
              </GenericFicheLink>
            </div>
          </div>
        );
      })}
    </>
  );
};
