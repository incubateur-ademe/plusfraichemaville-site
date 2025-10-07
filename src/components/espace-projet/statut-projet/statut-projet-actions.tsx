"use client";
import { useProjetsStore } from "@/src/stores/projets/provider";
import clsx from "clsx";
import { StatutProjet } from "@/src/generated/prisma/client";
import { Case, Conditional } from "@/src/components/common/conditional-renderer";
import StatutProjetActionBanner from "@/src/components/espace-projet/statut-projet/statut-projet-action-banner";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { GenericFicheLink } from "@/src/components/common/generic-save-fiche/generic-fiche-link";
import { ContactForm } from "@/src/forms/contact/contact-form";

export const StatutProjetActions = ({ className }: { className?: string }) => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  if (!projet) {
    return null;
  }
  return (
    <div className={clsx("flex flex-row flex-wrap gap-6", className)}>
      <Conditional>
        <Case condition={projet.statut === StatutProjet.termine}>
          <StatutProjetActionBanner
            imagePath="/images/espace-projet/statut/action-termine.svg"
            className="fr-enlarge-link hover:cursor-pointer"
          >
            <h3 className="fr-h5">Merci pour votre retour et félicitations 🥳 !</h3>
            <div className="mb-6 mt-4">
              Un grand merci de la part de toute l'équipe et de la planète ! Votre avis compte beaucoup pour nous.
              Pourriez-vous prendre quelques instants afin de répondre à un court questionnaire de satisfaction ? Votre
              contribution nous aidera à améliorer nos services.
            </div>
            <LinkWithoutPrefetch
              href="https://share-eu1.hsforms.com/1MZvP_u_GTI2zEIqTSH0GwQ2eghl7"
              target="_blank"
              className="fr-btn rounded-3xl bg-pfmv-navy text-white hover:!bg-dsfr-hover-blue-sun"
            >
              Remplir le questionnaire
            </LinkWithoutPrefetch>
          </StatutProjetActionBanner>
        </Case>
        <Case condition={projet.statut === StatutProjet.en_cours}>
          <StatutProjetActionBanner
            imagePath="/images/espace-projet/statut/action-en_cours.png"
            className="fr-enlarge-link hover:cursor-pointer"
          >
            <h3 className="fr-h5">Merci pour votre retour !</h3>
            <div className="mb-6 mt-4">
              Au passage, connaissez-vous l’annuaire des projets Plus fraîche ma ville ? Il vous permet de vous inspirez
              des projets réalisés ou en cours et d’identifier les contacts utiles à votre projet.
              <br />
              N’hésitez pas à y jeter un coup d’oeil.
            </div>
            <GenericFicheLink
              href={PFMV_ROUTES.ESPACE_PROJET_ANNUAIRE_MAP}
              className="fr-btn rounded-3xl bg-pfmv-navy text-white hover:!bg-dsfr-hover-blue-sun"
            >
              Voir l’annuaire des projets
            </GenericFicheLink>
          </StatutProjetActionBanner>
        </Case>
        <Case condition={projet.statut === StatutProjet.besoin_aide}>
          <div className="flex w-full gap-6">
            <div className="max-w-[20rem] rounded-2xl bg-dsfr-background-default-grey-hover p-8">
              <h3 className="fr-h2">Besoin d’aide ? Discutons-en.</h3>
              <p>
                Notre équipe est à votre écoute pour toute question. N'hésitez pas à réserver un créneau dans notre
                agenda en ligne.
                <br /> <br />À bientôt !
              </p>
            </div>
            <iframe
              className="h-[30rem] w-full overflow-hidden"
              src="https://meetings-eu1.hubspot.com/tde-ferrieres?uuid=a93c56a5-c68f-4854-9010-a7cf0d8381eb"
            />
          </div>
        </Case>
        <Case condition={projet.statut === StatutProjet.autre}>
          <div className="w-full rounded-2xl bg-dsfr-background-default-grey-hover p-8">
            <h3 className="fr-h2">
              Vous avez des remarques, des suggestions ? <br />
              Écrivez-nous !
            </h3>
            <p>Notre équipe vous répondra dans les plus brefs délais. À vous de jouer.</p>
            <ContactForm whiteBackground />
          </div>
        </Case>
      </Conditional>
    </div>
  );
};
