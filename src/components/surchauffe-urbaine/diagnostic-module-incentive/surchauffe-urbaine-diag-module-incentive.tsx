"use client";
import clsx from "clsx";
import Image from "next/image";
import React from "react";
import { Separator } from "@/src/components/common/separator";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { GenericDiagnosticModuleButton } from "./generic-diagnostic-module-button";
import { DiagnosticParcoursLink } from "@/src/components/surchauffe-urbaine/diagnostic-module-incentive/diagnostic-parcours-link";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { ModaleDiagnosticModuleOutsideProjet } from "@/src/components/surchauffe-urbaine/diagnostic-module-incentive/modale-diagnostic-module-outside-projet";

export const SurchauffeUrbaineDiagModuleIncentive = ({ className }: { className?: string }) => {
  const modalIndicateur = createModal({
    id: `diagnostic-indicateurs-modal`,
    isOpenedByDefault: false,
  });

  const modalPrestation = createModal({
    id: `diagnostic-prestation-modal`,
    isOpenedByDefault: false,
  });

  const modalChoixParcours = createModal({
    id: `diagnostic-choix-parcours-modal`,
    isOpenedByDefault: false,
  });

  return (
    <div className={clsx("bg-dsfr-background-alt-blue-france pb-16 pt-10", className)}>
      <div className="fr-container flex max-w-[65rem] flex-col justify-center">
        <h1 className="text-center text-[1.375rem] font-bold text-pfmv-navy">
          Lancez votre diagnostic directement depuis l’espace projet.
        </h1>
        <GenericDiagnosticModuleButton modal={modalChoixParcours} className="mx-auto mb-6" />
        <p className="md:ml-12">
          Avant de rafraîchir un espace, il est essentiel de comprendre son climat actuel. <br />
          Cela permet de choisir les meilleures solutions et d’en mesurer l’efficacité dans le temps. <br />
          Nous vous proposons deux approches dans l’espace projet :
        </p>
        <div className="mt-6 flex flex-col gap-24 md:flex-row md:justify-between md:gap-12">
          <div className="flex flex-col items-center gap-6">
            <div className="pfmv-strong-card fr-enlarge-button group max-w-[23rem]">
              <Image
                src="/images/fiches-diagnostic/parcours-indicateurs-environnementaux.svg"
                alt="Parcours indicateurs thermiques"
                width={200}
                height={200}
                className="mx-auto mt-6 h-40"
              />
              <div className="p-5 text-center">
                <DiagnosticParcoursLink
                  modal={modalIndicateur}
                  textLink="Je fais une analyse simplifiée et immédiate de la surchauffe"
                />
                <Separator className="my-4" />
                <div className="mb-8 text-left text-sm text-dsfr-text-mention-grey">
                  Observez la surchauffe au sein de votre espace à un instant “T” à l’aide de quatre indicateurs open
                  source et de vos propres relevés terrain.
                </div>
                <div className="fr-btn fr-btn--sm rounded-3xl group-hover:bg-dsfr-hover-blue-sun">
                  Calculer les indicateurs
                </div>
              </div>
            </div>
            <Image
              src="/images/espace-projet-incentive/arrow-down.svg"
              alt=""
              width={100}
              height={50}
              className="mx-auto my-4"
            />
            <div className="pfmv-flat-card bg-white p-3">
              <Image
                src="/images/espace-projet-incentive/apercu-resultat-tribu.jpg"
                alt="Aperçu du résultat d'une analyse simplifiée"
                width={500}
                height={400}
                className="mx-auto mt-6 h-[23rem]"
              />
            </div>
          </div>
          <div className="flex flex-col items-center gap-6">
            <div className="pfmv-strong-card fr-enlarge-button group max-w-[23rem]">
              <Image
                src="/images/fiches-diagnostic/parcours-prestation.svg"
                alt="Parcours prestation"
                width={200}
                height={200}
                className="mx-auto mt-6 h-40"
              />
              <div className="p-5 text-center">
                <DiagnosticParcoursLink
                  modal={modalPrestation}
                  textLink="Je fais réaliser par un prestataire un diagnostic approfondi"
                />
                <Separator className="my-4" />
                <div className="mb-8 text-left text-sm text-dsfr-text-mention-grey">
                  Sollicitez une expertise pour une analyse détaillée de l’effet d’îlot de chaleur urbain et/ou du
                  confort thermique, à différentes échelles.
                </div>
                <div className="fr-btn fr-btn--sm rounded-3xl group-hover:bg-dsfr-hover-blue-sun">
                  Choisir des prestations
                </div>
              </div>
            </div>
            <Image
              src="/images/espace-projet-incentive/arrow-down.svg"
              alt=""
              width={100}
              height={50}
              className="mx-auto my-4"
            />
            <div className="pfmv-flat-card bg-white p-3">
              <Image
                src="/images/espace-projet-incentive/apercu-prestation-diag.jpg"
                alt="Aperçu du résultat d'une analyse simplifiée"
                width={500}
                height={400}
                className="mx-auto mt-6 h-[23rem]"
              />
            </div>
          </div>
        </div>
      </div>
      <ModaleDiagnosticModuleOutsideProjet
        modal={modalChoixParcours}
        linkSuffix={PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_CHOIX_PARCOURS_SUFFIX}
      />
      <ModaleDiagnosticModuleOutsideProjet
        modal={modalIndicateur}
        linkSuffix={PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_INDICATEURS_SUFFIX}
      />
      <ModaleDiagnosticModuleOutsideProjet
        modal={modalPrestation}
        linkSuffix={PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_PRESTATION_SUFFIX}
      />
    </div>
  );
};
