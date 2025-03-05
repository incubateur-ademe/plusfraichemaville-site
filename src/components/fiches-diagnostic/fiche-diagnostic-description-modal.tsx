"use client";

import "@splidejs/splide/css/core";
// TODO: Check changelog from Splide and remove ts-ignore
// @ts-ignore
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { useModalStore } from "@/src/stores/modal/provider";
import { useIsModalOpen } from "@codegouvfr/react-dsfr/Modal/useIsModalOpen";
import { useEffect } from "react";
import { FicheDiagnosticUtilite } from "@/src/lib/strapi/types/strapi-custom-types";
import Image from "next/image";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { getFicheDiagUtilite } from "@/src/components/fiches-diagnostic/helpers";
import { clsx } from "clsx";
import { isEmpty } from "@/src/helpers/listUtils";

import { formatNumberWithSpaces, ICON_COLOR_FICHE_DIAGNOSTIC, TypeFiche } from "@/src/helpers/common";
import { getCoutFiche } from "@/src/helpers/cout/cout-fiche-solution";
import { getDelaiTravauxFiche } from "@/src/helpers/delaiTravauxFiche";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { useProjetsStore } from "@/src/stores/projets/provider";
import Link from "next/link";
import { Separator } from "@/src/components/common/separator";
// eslint-disable-next-line max-len
import { GenericSaveAuthenticatedInsideProjet } from "@/src/components/common/generic-save-fiche/generic-save-button-authenticated-inside-projet";
import { notifications } from "@/src/components/common/notifications";
import { RetourExperienceDiagCard } from "@/src/components/retour-experience-diag/retour-experience-diag-card";
import { SplideController } from "../common/splide-controllers";

const modal = createModal({
  id: "fiche-diagnostic-description-modal",
  isOpenedByDefault: false,
});

export const FicheDiagnosticDescriptionModal = () => {
  const ficheDiagnostic = useModalStore((state) => state.currentFicheDiagnostic);
  const setCurrentFicheDiagnostic = useModalStore((state) => state.setCurrentFicheDiagnostic);
  const projetId = useProjetsStore((state) => state.currentProjetId);
  const utiliteFiche = ficheDiagnostic && getFicheDiagUtilite(ficheDiagnostic);
  const coutMin = ficheDiagnostic?.attributes.cout_min;
  const coutMax = ficheDiagnostic?.attributes.cout_max;
  const delaiMin = ficheDiagnostic?.attributes.delai_min;
  const delaiMax = ficheDiagnostic?.attributes.delai_max;
  const cout = getCoutFiche(TypeFiche.diagnostic, coutMin, coutMax);
  const delai = getDelaiTravauxFiche(TypeFiche.diagnostic, delaiMin, delaiMax);
  const ficheDiagUrl = PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS_LISTE_FICHE_DIAGNOSTIC(
    projetId!,
    ficheDiagnostic?.attributes.slug!,
  );
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
        size="large"
        className={clsx(
          "custom-modal l-modal",
          utiliteFiche?.type === FicheDiagnosticUtilite.ConfortThermique ? "confort-thermique-modal" : "icu-modal",
        )}
      >
        <div className="flex gap-7 pb-8">
          {ficheDiagnostic && utiliteFiche && (
            <div className="flex w-full flex-col gap-8 lg:flex-row">
              <div className={clsx("relative h-fit w-full max-w-[55%] rounded-2xl p-8", utiliteFiche.colors.bgDark)}>
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
                    "relative mb-4 flex size-24 items-center justify-center overflow-hidden rounded-full bg-white",
                  )}
                >
                  <Image
                    src={getStrapiImageUrl(ficheDiagData?.image_icone, STRAPI_IMAGE_KEY_SIZE.small)}
                    width={64}
                    height={64}
                    alt={ficheDiagData?.titre ?? ""}
                    className="z-0 size-16 object-contain"
                  />
                </div>
                <div className={"text-2xl font-bold "}>{ficheDiagData?.titre}</div>
                <div className={"mb-4 text-xl italic"}>{ficheDiagData?.nom_scientifique}</div>
                {!isEmpty(ficheDiagData?.utilite_methode) && (
                  <>
                    <Separator className={clsx("!h-[1px] !opacity-100", utiliteFiche.colors.separator)} />
                    <div className="mt-4 font-bold">Cette méthode permet de :</div>
                    <ul className={utiliteFiche.colors.pictoList}>
                      {ficheDiagData?.utilite_methode.map((utilite) => (
                        <li key={utilite.description} className="relative !mb-0 !leading-[1.25rem]">
                          {utilite?.description}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <Separator className={clsx("mt-4 !h-[1px] !opacity-100", utiliteFiche.colors.separator)} />
                <div className=" mt-4 flex justify-between">
                  <div>
                    <div className="font-bold">Coût</div>
                    <div className="flex items-center">
                      <div className="mr-2">{cout?.icons(ICON_COLOR_FICHE_DIAGNOSTIC)}</div>
                      <small className="text-sm">
                        de {formatNumberWithSpaces(coutMin)} à {formatNumberWithSpaces(coutMax)} €
                      </small>
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{"Durée de l'étude"}</div>
                    <div className="flex items-center">
                      <div className="mr-2">{delai?.icons(ICON_COLOR_FICHE_DIAGNOSTIC)}</div>
                      <small className="text-sm text-dsfr-text-mention-grey">
                        de {delaiMin} à {delaiMax} mois
                      </small>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <Link
                    className={clsx(
                      "fr-btn--tertiary fr-btn--sm fr-btn rounded-3xl !text-black",
                      utiliteFiche.colors.button,
                    )}
                    href={ficheDiagUrl}
                    onClick={modal.close}
                  >
                    Lire la méthode
                  </Link>
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
                  options={{ rewind: true, autoWidth: true, start: 0 }}
                >
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
                  <SplideController
                    arrow="left"
                    size={{ width: "w-10", height: "h-10" }}
                    position={{ top: "top-[8.5rem]", left: "!left-6" }}
                    className={`!bg-black/60 ${rex.length <= 1 ? "pointer-events-none !hidden" : ""}`}
                  />
                  <SplideController
                    arrow="right"
                    size={{ width: "w-10", height: "h-10" }}
                    position={{ top: "top-[8.5rem]", right: "!right-6" }}
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
