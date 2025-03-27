import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { LienRexDiagnostic } from "@/src/lib/strapi/types/api/lien-rex-diagnostic";
import Image from "next/image";
import clsx from "clsx";
import CmsRichText from "../common/CmsRichText";
import { TypeFiche } from "@/src/helpers/common";
import { GenericSaveFiche } from "../common/generic-save-fiche";
import { GenericFicheLink } from "../common/generic-save-fiche/generic-fiche-link";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { getEchellesThermiquesByFicheDiagnostic } from "@/src/helpers/ficheDiagnostic/echelle-thermique-diagnostic";
import Tag from "@codegouvfr/react-dsfr/Tag";
import { isEmpty } from "lodash";

type RetourExperienceDiagCombinaisonProps = {
  lienRexDiagnostics: LienRexDiagnostic[];
};

export const RetourExperienceDiagCombinaison = ({ lienRexDiagnostics }: RetourExperienceDiagCombinaisonProps) => {
  return (
    <>
      {lienRexDiagnostics.map((lienRexDiagnostic) => {
        if (!lienRexDiagnostic.attributes.fiche_diagnostic) return null;
        const ficheDiagData = lienRexDiagnostic.attributes.fiche_diagnostic.data;

        const { titre, nom_scientifique, slug, image_icone } = ficheDiagData.attributes;

        return (
          <div className="mb-20 flex w-full flex-col gap-10 md:flex-row" key={lienRexDiagnostic.id}>
            <div
              className={clsx(
                "fiche-diagnostic-icone",
                "flex size-[8.5rem] shrink-0 items-center justify-center rounded-full",
              )}
            >
              <Image
                src={getStrapiImageUrl(image_icone, STRAPI_IMAGE_KEY_SIZE.medium)}
                alt={titre ?? ""}
                width={110}
                height={110}
                unoptimized
              />
            </div>
            <div className="w-full">
              <h2 className="mb-3 text-[1.375rem] font-bold">{titre}</h2>
              <CmsRichText className="mb-5 leading-6" label={lienRexDiagnostic.attributes.description} />
              <div className=" relative max-w-xl">
                <GenericFicheLink href={PFMV_ROUTES.ESPACE_PROJET_FICHE_DIAGNOSTIC(slug)}>
                  <div className="pfmv-card max-w-xl cursor-pointer p-5">
                    {!isEmpty(getEchellesThermiquesByFicheDiagnostic(ficheDiagData)) && (
                      <div className="mb-4 flex flex-wrap gap-2 uppercase">
                        {getEchellesThermiquesByFicheDiagnostic(ficheDiagData).map((effet) => (
                          <Tag
                            key={effet.label}
                            small
                            className="!mb-0 !rounded-sm font-bold !text-dsfr-text-mention-grey"
                          >
                            {effet.label}
                          </Tag>
                        ))}
                      </div>
                    )}

                    <h3 className="mb-1 mr-28 text-base">{titre}</h3>
                    <i>{nom_scientifique}</i>
                  </div>
                </GenericFicheLink>
                <GenericSaveFiche
                  id={ficheDiagData.id}
                  type={TypeFiche.diagnostic}
                  classNameButton="absolute top-3 right-4"
                />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
