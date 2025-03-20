import Image from "next/image";
import Link from "next/link";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import React from "react";
import Button from "@codegouvfr/react-dsfr/Button";
import { createModal } from "@codegouvfr/react-dsfr/Modal";

export default async function ModalIndienReminder({ projetId }: { projetId: number }) {
  const modal = createModal({
    id: "partage-overview-invite-member",
    isOpenedByDefault: false,
  });

  return (
    <>
      <Button className="fr-btn rounded-3xl" nativeButtonProps={modal.buttonProps}>
        Commencer le calcul
      </Button>

      <modal.Component title="" className="custom-modal md-modal">
        <h1 className="!text-xl !text-pfmv-navy">
          Pour calculer vos indicateurs, vous aurez besoin d’observer l’espace à rafraîchir et de métrer les éléments
          suivants :
        </h1>
        <div className="flex flex-row gap-6">
          <div>
            <Image
              src="/images/fiches-diagnostic/indicateurs-environnementaux/tribu-exemple-plan.jpg"
              alt="exemple de plan de masse"
              width={1033}
              height={628}
              className="max-w-[30rem] "
            />
            <div className="mt-2 text-xs italic text-dsfr-text-mention-grey">Plan de masse des éléments à métrer</div>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <i className="fr-icon-success-fill mr-2 text-dsfr-background-action-high-success-hover" />
              Nombre et maturité des arbres
            </div>
            <div>
              <i className="fr-icon-success-fill mr-2 text-dsfr-background-action-high-success-hover" />
              Surface végétaliseé au sol
            </div>
            <div>
              <i className="fr-icon-success-fill mr-2 text-dsfr-background-action-high-success-hover" />
              Surface et types de revêtement au sol
            </div>
            <div>
              <i className="fr-icon-success-fill mr-2 text-dsfr-background-action-high-success-hover" />
              Surface de fontaine et de bassins d’eau
            </div>
            <div>
              <i className="fr-icon-success-fill mr-2 text-dsfr-background-action-high-success-hover" />
              Surface et type de toiture
            </div>
          </div>
        </div>
        <div className="mt-6 font-bold text-pfmv-navy">
          À tout moment vous avez la possibilité d’enregistrer vos réponses et de revenir plus tard.
        </div>
        <Link
          className="fr-btn mb-6 mt-6 rounded-3xl"
          href={PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_INDICATEURS_QUESTIONS(projetId)}
        >
          C’est parti !
        </Link>
      </modal.Component>
    </>
  );
}
