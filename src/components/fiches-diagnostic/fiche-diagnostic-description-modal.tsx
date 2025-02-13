"use client";

import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { useModalStore } from "@/src/stores/modal/provider";
import { useIsModalOpen } from "@codegouvfr/react-dsfr/Modal/useIsModalOpen";
import { useEffect } from "react";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";
import { FicheDiagnosticUtilite } from "@/src/lib/strapi/types/strapi-custom-types";
import Image from "next/image";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { getFicheDiagUtilite, getFicheDiagUtiliteProperties } from "@/src/components/fiches-diagnostic/helpers";
import { clsx } from "clsx";
import { isEmpty } from "@/src/helpers/listUtils";
import { getEchelleSpatialeLabel } from "@/src/helpers/echelle-spatiale-diagnostic";
import { formatNumberWithSpaces, TypeFiche } from "@/src/helpers/common";
import { getCoutFiche } from "@/src/helpers/cout/cout-fiche-solution";
import { getDelaiTravauxFiche } from "@/src/helpers/delaiTravauxFiche";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { useProjetsStore } from "@/src/stores/projets/provider";
import Link from "next/link";
import { GenericSaveAuthenticatedInsideProjet } from "@/src/components/common/generic-save-fiche/generic-save-button-authenticated-inside-projet";
import toast from "react-hot-toast";

export type FicheDiagnosticDescriptionModalState = {
  ficheDiagnostic: FicheDiagnostic;
  overrideUtiliteFiche: FicheDiagnosticUtilite;
} | null;

const modal = createModal({
  id: "fiche-diagnostic-description-modal",
  isOpenedByDefault: false,
});

export const FicheDiagnosticDescriptionModal = () => {
  const currentFicheDiagnostic = useModalStore((state) => state.currentFicheDiagnostic);
  const setCurrentFicheDiagnostic = useModalStore((state) => state.setCurrentFicheDiagnostic);
  const ficheDiagnostic = currentFicheDiagnostic?.ficheDiagnostic;
  const projetId = useProjetsStore((state) => state.currentProjetId);
  const utiliteFiche =
    getFicheDiagUtiliteProperties(currentFicheDiagnostic?.overrideUtiliteFiche) ??
    (ficheDiagnostic && getFicheDiagUtilite(ficheDiagnostic));
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
    if (currentFicheDiagnostic) {
      modal.open();
    }
  }, [currentFicheDiagnostic]);

  useIsModalOpen(modal, {
    onConceal: () => setCurrentFicheDiagnostic(null),
  });

  return (
    <>
      <modal.Component
        title={
          <span aria-hidden className="hidden">
            {currentFicheDiagnostic?.ficheDiagnostic.attributes.titre}
          </span>
        }
        size="large"
        className={clsx(
          "custom-modal l-modal",
          utiliteFiche.type === FicheDiagnosticUtilite.ConfortThermique ? "confort-thermique-modal" : "icu-modal",
        )}
      >
        <div className="flex gap-7">
          {ficheDiagnostic && utiliteFiche && (
            <div
              className={clsx(
                "max-w-[60%] rounded-2xl p-8",
                utiliteFiche.type === FicheDiagnosticUtilite.DiminutionICU
                  ? "bg-background-fiche-diag-icu"
                  : "bg-background-fiche-confort-thermique",
              )}
            >
              <div className="relative mb-4 block h-24 w-24 overflow-hidden">
                <Image
                  fill
                  sizes="(max-width: 768px) 80vw, 33vw"
                  src={getStrapiImageUrl(
                    currentFicheDiagnostic.ficheDiagnostic.attributes.image_principale,
                    STRAPI_IMAGE_KEY_SIZE.medium,
                  )}
                  alt={ficheDiagnostic?.attributes.titre}
                  className="z-0 h-full w-full object-cover"
                />
              </div>
              <div className={"text-2xl font-bold "}>{currentFicheDiagnostic.ficheDiagnostic.attributes.titre}</div>
              <div className={"mt-4 text-xl italic"}>{ficheDiagnostic.attributes.nom_scientifique}</div>
              {!isEmpty(ficheDiagnostic.attributes.utilite_methode) && (
                <>
                  <hr className="mt-4 h-[0.01rem] bg-dsfr-background-flat-warning !bg-none !p-0" />
                  <div className="mt-4 font-bold">Cette méthode permet de :</div>
                  <ul className=" arrow-list orange-arrow-list text-sky-400">
                    {ficheDiagnostic.attributes.utilite_methode.map((utilite) => (
                      <li key={utilite.description} className="relative">
                        {utilite?.description}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <hr className="mt-4 h-[0.01rem] bg-dsfr-background-flat-warning !bg-none !p-0" />
              <div className="mt-4 flex justify-between">
                <div>
                  <div className="font-bold">Échelle</div>
                  <div>{getEchelleSpatialeLabel(ficheDiagnostic) ?? "Non renseigné"}</div>
                </div>
                <div>
                  <div className="font-bold">Type de livrables</div>
                  <div>{ficheDiagnostic.attributes.type_livrables ?? "Non renseigné"}</div>
                </div>
              </div>
              <hr className="mt-4 h-[0.01rem] bg-dsfr-background-flat-warning !bg-none !p-0" />
              <div className=" mt-4 flex justify-between">
                <div>
                  <div className="font-bold">Coût</div>
                  <div className="flex items-center">
                    <div className="mr-2">{cout?.icons(TypeFiche.diagnostic, "fr-icon--sm")}</div>
                    <small className="text-sm">
                      de {formatNumberWithSpaces(coutMin)} à {formatNumberWithSpaces(coutMax)} €
                    </small>
                  </div>
                </div>
                <div>
                  <div className="font-bold">{"Durée de l'étude"}</div>
                  <div className="flex items-center">
                    <div className="mr-2">{delai?.icons(TypeFiche.diagnostic, "fr-icon--sm")}</div>
                    <small className="text-sm text-dsfr-text-mention-grey">
                      de {delaiMin} à {delaiMax} mois
                    </small>
                  </div>
                </div>
              </div>
              <Link
                className={clsx(
                  "fr-btn--tertiary fr-btn--sm fr-btn fr-btn--icon-left mt-4 rounded-3xl",
                  utiliteFiche.colors.text,
                  utiliteFiche.colors.border,
                )}
                href={ficheDiagUrl}
                onClick={modal.close}
              >
                Lire la méthode
              </Link>
            </div>
          )}
          {ficheDiagnostic && (
            <GenericSaveAuthenticatedInsideProjet
              type={TypeFiche.diagnostic}
              id={ficheDiagnostic?.id}
              opener={() => toast.success("La fiche a bien été rajoutée à votre projet.")}
            />
          )}
        </div>
      </modal.Component>
    </>
  );
};
