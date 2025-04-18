"use client";
import Image from "next/image";
import Link from "next/link";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import React from "react";
import Button from "@codegouvfr/react-dsfr/Button";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import clsx from "clsx";
// eslint-disable-next-line max-len
import { comebackLaterDiagnosticSimulationAction } from "@/src/actions/diagnostic-simulation/comeback-later-diagnostic-simulation-action";
import { useRouter } from "next/navigation";

export default function IndienReminderModal({ projetId }: { projetId: number }) {
  const modal = createModal({
    id: "indien-reminder-modal",
    isOpenedByDefault: false,
  });
  const router = useRouter();

  const onComebackLater = async () => {
    await comebackLaterDiagnosticSimulationAction(+projetId);
    router.push(PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_CHOIX_PARCOURS(projetId));
  };

  return (
    <div>
      <Button className="fr-btn mb-4 rounded-3xl" nativeButtonProps={modal.buttonProps}>
        Commencer le calcul
      </Button>
      <div>
        <i className={clsx("ri-timer-line", "fr-icon--sm mr-1 mt-4 text-dsfr-text-mention-grey")} />
        <span className="text-sm text-dsfr-text-mention-grey">
          <strong>10 min</strong>, si le métré est déjà réalisé.{" "}
          <span className="cursor-pointer underline hover:decoration-1" role="button" onClick={() => modal.open()}>
            Voir les données à préparer pour le questionnaire
          </span>
        </span>
      </div>

      <modal.Component title="" className="custom-modal md-modal">
        <h1 className="!text-xl !text-pfmv-navy">
          Pour calculer vos indicateurs, vous aurez besoin d’observer l’espace à rafraîchir et d’en connaître le métré
          suivant :
        </h1>
        <div className="flex flex-row flex-wrap gap-6">
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
            <div className="font-bold">Liste des éléments :</div>
            <div className=" mb-2">
              <i className="fr-icon-success-fill mr-2 text-dsfr-background-action-high-success-hover" />
              Nombre et maturité des arbres
            </div>
            <div className=" mb-2">
              <i className="fr-icon-success-fill mr-2 text-dsfr-background-action-high-success-hover" />
              Surface végétaliseé au sol
            </div>
            <div className=" mb-2">
              <i className="fr-icon-success-fill mr-2 text-dsfr-background-action-high-success-hover" />
              Surface et types de revêtement au sol
            </div>
            <div className=" mb-2">
              <i className="fr-icon-success-fill mr-2 text-dsfr-background-action-high-success-hover" />
              Surface de fontaine et de bassins d’eau
            </div>
            <div className=" mb-2">
              <i className="fr-icon-success-fill mr-2 text-dsfr-background-action-high-success-hover" />
              Surface et type de toiture
            </div>
          </div>
        </div>
        <div className="mt-6 font-bold text-pfmv-navy">
          À tout moment vous avez la possibilité d’enregistrer vos réponses et de revenir plus tard.
        </div>
        <div>
          <Link
            className="fr-btn mb-6 mr-6 mt-6 rounded-3xl"
            href={PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_INDICATEURS_QUESTIONS(projetId)}
          >
            C’est parti !
          </Link>
          <Button onClick={() => onComebackLater()} priority="secondary">
            Revenir plus tard
          </Button>
        </div>
      </modal.Component>
    </div>
  );
}
