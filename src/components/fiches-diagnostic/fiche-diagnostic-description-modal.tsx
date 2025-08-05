"use client";

import "@splidejs/splide/css/core";
// TODO: Check changelog from Splide and remove ts-ignore
// @ts-ignore
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { useModalStore } from "@/src/stores/modal/provider";
import { useIsModalOpen } from "@codegouvfr/react-dsfr/Modal/useIsModalOpen";
import { useEffect } from "react";
import Image from "next/image";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { clsx } from "clsx";
import { isEmpty } from "@/src/helpers/listUtils";

import { formatNumberWithSpaces, ICON_COLOR_FICHE_DIAGNOSTIC, TypeFiche } from "@/src/helpers/common";
import { getCoutFiche } from "@/src/helpers/cout/cout-fiche-solution";
import { getDelaiTravauxFiche } from "@/src/helpers/delaiTravauxFiche";
import { Separator } from "@/src/components/common/separator";
// eslint-disable-next-line max-len
import { GenericSaveAuthenticatedInsideProjet } from "@/src/components/common/generic-save-fiche/generic-save-button-authenticated-inside-projet";
import { notifications } from "@/src/components/common/notifications";
import { RetourExperienceDiagCard } from "@/src/components/retour-experience-diag/retour-experience-diag-card";
import { SplideController } from "../common/splide-controllers";
import { getEchellesThermiquesByFicheDiagnostic } from "@/src/helpers/ficheDiagnostic/echelle-thermique-diagnostic";
import Tag from "@codegouvfr/react-dsfr/Tag";
import { getEchellesSpatialesByFicheDiagnostic } from "@/src/helpers/ficheDiagnostic/echelle-spatiale-diagnostic";
import { FicheDiagLink } from "@/src/components/common/generic-save-fiche/fiche-diag-link";

const modal = createModal({
  id: "fiche-diagnostic-description-modal",
  isOpenedByDefault: false,
});

export const FicheDiagnosticDescriptionModal = () => {
  const ficheDiagnostic = useModalStore((state) => state.currentFicheDiagnostic);
  const setCurrentFicheDiagnostic = useModalStore((state) => state.setCurrentFicheDiagnostic);
  const coutMin = ficheDiagnostic?.attributes.cout_min;
  const coutMax = ficheDiagnostic?.attributes.cout_max;
  const delaiMin = ficheDiagnostic?.attributes.delai_min;
  const delaiMax = ficheDiagnostic?.attributes.delai_max;
  const cout = getCoutFiche(TypeFiche.diagnostic, coutMin, coutMax);
  const delai = getDelaiTravauxFiche(TypeFiche.diagnostic, delaiMin, delaiMax);
  useEffect(() => {
    if (ficheDiagnostic) {
      modal.open();
    }
  }, [ficheDiagnostic]);

  useIsModalOpen(modal, {
    onConceal: () => setCurrentFicheDiagnostic(null),
  });

  const ficheDiagData = ficheDiagnostic?.attributes;
  const rex = ficheDiagnostic?.attributes.lien_rex_diagnostics.data ?? [];

  return (
    <>
      <modal.Component
        title={
          <span aria-hidden className="hidden">
            {ficheDiagData?.titre}
          </span>
        }
        size={isEmpty(rex) ? "medium" : "large"}
        className={clsx("custom-modal fiche-diagnostic-modal", !isEmpty(rex) && "l-modal")}
      >
        <div className="pb-4">
          {ficheDiagnostic && (
            <div className="flex w-full flex-col gap-6 lg:flex-row">
              <div
                className={clsx("pfmv-flat-card relative h-fit w-full bg-white p-8", !isEmpty(rex) && "max-w-[55%]")}
              >
                {ficheDiagnostic && (
                  <GenericSaveAuthenticatedInsideProjet
                    type={TypeFiche.diagnostic}
                    id={ficheDiagnostic?.id}
                    opener={() => notifications("success", "FICHE_DIAGNOSTIC_ADDED_TO_PROJET")}
                    className="!absolute right-8 top-8"
                  />
                )}
                <div
                  className={clsx(
                    "fiche-diagnostic-icone relative mb-4 flex size-16 items-center justify-center rounded-full",
                  )}
                >
                  <Image
                    src={getStrapiImageUrl(ficheDiagData?.image_icone, STRAPI_IMAGE_KEY_SIZE.small)}
                    width={55}
                    height={55}
                    alt={ficheDiagData?.titre ?? ""}
                    unoptimized
                  />
                </div>
                <div className={"text-[1.375rem] font-bold"}>{ficheDiagData?.titre}</div>
                <div className={"mb-4 "}>{ficheDiagData?.nom_scientifique}</div>
                {!isEmpty(ficheDiagData?.objectifs) && (
                  <>
                    <Separator className="!h-[1px] !opacity-100" />
                    <div className="mt-4 font-bold">Objectifs</div>
                    <ul className="arrow-list mb-4">
                      {ficheDiagData?.objectifs.map((objectif) => (
                        <li key={objectif.description} className="relative !mb-0">
                          {objectif?.description}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <Separator className="!h-[1px] !opacity-100" />
                <div className="mt-3 flex gap-3 uppercase">
                  {getEchellesThermiquesByFicheDiagnostic(ficheDiagnostic).map((effet) => (
                    <Tag key={effet.label} small className="!mb-0 !rounded-sm font-bold !text-dsfr-text-mention-grey">
                      {effet.label}
                    </Tag>
                  ))}
                </div>
                <div className="mt-3 flex gap-3 uppercase">
                  {getEchellesSpatialesByFicheDiagnostic(ficheDiagnostic).map((echelle) => (
                    <Tag key={echelle.label} small className="!rounded-sm font-bold !text-dsfr-text-mention-grey">
                      {echelle.label}
                    </Tag>
                  ))}
                </div>
                <div className="flex justify-between">
                  <div>
                    <div className="text-sm">Coût</div>
                    <div className="flex items-center">
                      <div className="mr-2">{cout?.icons(ICON_COLOR_FICHE_DIAGNOSTIC)}</div>
                      <small className="text-sm">
                        de {formatNumberWithSpaces(coutMin)} à {formatNumberWithSpaces(coutMax)} €
                      </small>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm">Durée</div>
                    <div className="flex items-center">
                      <div className="mr-2">{delai?.icons(ICON_COLOR_FICHE_DIAGNOSTIC)}</div>
                      <small className="text-sm text-dsfr-text-mention-grey">
                        de {delaiMin} à {delaiMax} mois
                      </small>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <FicheDiagLink
                    className={clsx("fr-btn fr-btn--tertiary mt-4 rounded-3xl !text-dsfr-text-title-grey ")}
                    slug={ficheDiagData?.slug!}
                    onClick={modal.close}
                  >
                    Lire la méthode
                  </FicheDiagLink>
                </div>
              </div>

              {!rex.length ? null : rex.length <= 1 ? (
                <RetourExperienceDiagCard
                  onClickButton={() => modal.close()}
                  rex={rex[0].attributes.retour_experience_diagnostic?.data}
                />
              ) : (
                <Splide
                  id="fiche-diagnostic-rex-modal-slider"
                  hasTrack={false}
                  className="max-w-md"
                  options={{ start: 0, drag: false, pagination: false }}
                >
                  <div className="px-6">
                    <SplideTrack className="!-m-5 overflow-auto !p-5 lg:!overflow-hidden">
                      {rex?.map((r, index) => (
                        <SplideSlide className="!mr-8 size-full" key={index}>
                          <RetourExperienceDiagCard
                            key={index}
                            onClickButton={() => modal.close()}
                            rex={r.attributes.retour_experience_diagnostic?.data}
                          />
                        </SplideSlide>
                      ))}
                    </SplideTrack>
                  </div>
                  <SplideController
                    arrow="left"
                    size={{ width: "w-10", height: "h-10" }}
                    position={{ top: "top-[16rem]", left: "!left-0" }}
                    className={`!bg-black/60 ${rex.length <= 1 ? "pointer-events-none !hidden" : ""}`}
                  />
                  <SplideController
                    arrow="right"
                    size={{ width: "w-10", height: "h-10" }}
                    position={{ top: "top-[16rem]", right: "!right-0" }}
                    className={`!bg-black/60 ${rex.length <= 1 ? "pointer-events-none !hidden" : ""}`}
                  />
                </Splide>
              )}
            </div>
          )}
        </div>
      </modal.Component>
    </>
  );
};
