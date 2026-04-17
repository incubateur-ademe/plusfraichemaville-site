import clsx from "clsx";
import Image from "next/image";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import { PresentationServicesLink } from "@/src/components/homepage/presentation-services-link";

export const PresentationServices = ({ className }: { className?: string }) => {
  const servicesBlocs = [
    {
      title: "Voulez-vous convaincre pour lutter contre la surchauffe urbaine ?",
      description: "Faites un diagnostic simplifié et trouvez des prestations pour un diagnostic approfondi",
      picto: "diagnostic.svg",
      linkLabel: "Voir le module Diagnostic",
      linkUrl: PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_CHOIX_PARCOURS_SUFFIX,
    },
    {
      title: "Vous vous demandez quelles sont les meilleures solutions de rafraîchissement pour vous ?",
      description:
        "Trouvez les solutions adaptées à votre espace et accédez à des recommandations pour combiner " +
        "les types de solution.",
      picto: "solutions.svg",
      linkLabel: "Voir le module Solutions",
      linkUrl: PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS_SUFFIX,
    },
    {
      title: "Vous voulez une idée du budget pour rafraîchir votre espace ?",
      description: "Sélectionnez des solutions et évaluez le coût de leurs matériaux et de leur maintenance.",
      picto: "estimation.svg",
      linkLabel: "Voir le module Estimation budgétaire",
      linkUrl: PFMV_ROUTES.ESPACE_PROJET_LISTE_ESTIMATION_SUFFIX,
    },
    {
      title: "Vous recherchez un moyen de partager votre projet ?",
      description: "Invitez des membres à collaborer sur votre projet au sein de votre collectivité.",
      picto: "collaborer.svg",
      linkLabel: "Invitez des membres à votre projet",
      linkUrl: PFMV_ROUTES.ESPACE_PROJET_UTILISATEURS_PROJET_SUFFIX,
    },
    {
      title: "Vous recherchez des financements ?",
      description: "Identifiez les aides et les contacts nécessaires pour préparer un dossier de financement.",
      picto: "financement.svg",
      linkLabel: "Voir le module Aides financières et en ingénierie",
      linkUrl: PFMV_ROUTES.ESPACE_PROJET_FINANCEMENT_SUFFIX,
    },
    {
      title: "Vous voulez échanger avec des personnes qualifiées ?",
      description:
        "Trouvez les contacts utiles à votre projet : agents de collectivités, bureaux d'étude, AMO, entreprises.",
      picto: "annuaire.svg",
      linkLabel: "Voir la Carte des projets et contacts",
      linkUrl: PFMV_ROUTES.ESPACE_PROJET_ANNUAIRE_MAP_CONTACT,
    },
  ];

  return (
    <div className={clsx("flex w-full flex-col items-center px-4", className)}>
      <h2 className="mb-16 px-6 text-center text-lg font-bold text-pfmv-navy lg:text-3xl">
        Retrouvez des services adaptés à vos enjeux
      </h2>
      <div
        className={clsx(
          "mx-auto mb-12 flex max-w-[80rem] flex-wrap",
          "items-start justify-center gap-x-12 gap-y-10 md:gap-y-16",
        )}
      >
        {servicesBlocs.map((bloc, index) => (
          <div className="flex w-full max-w-lg justify-start gap-8" key={index}>
            <Image
              className="hidden h-full shrink-0 md:flex"
              src={`/images/espace-projet/${bloc.picto}`}
              width={125}
              height={125}
              alt=""
            />
            <hgroup className="">
              <h3 className="mb-3 text-xl font-bold leading-7">{bloc.title}</h3>
              <p className="mb-1 text-lg">{bloc.description}</p>
              <PresentationServicesLink linkUrl={bloc.linkUrl} linkLabel={bloc.linkLabel} />
            </hgroup>
          </div>
        ))}
      </div>
      <LinkWithoutPrefetch href={PFMV_ROUTES.ESPACE_PROJET} className="fr-btn rounded-3xl">
        Je retrouve ces services dans mon espace projet
      </LinkWithoutPrefetch>
    </div>
  );
};
