import Image from "next/image";
import Button from "@codegouvfr/react-dsfr/Button";
import { PFMV_ROUTES } from "@/src/helpers/routes";

type HomepageIdeeActionProps = {
  displayTitle?: boolean;
  displayAllServices?: boolean;
};

export const HomepageIdeeAction = ({ displayTitle = true, displayAllServices = true }: HomepageIdeeActionProps) => {
  const data = {
    blocs: [
      {
        title: "Sachez où agir en premier",
        description: "Un coefficient de rafraîchissement calculé en quelques clics et des méthodes de diagnostic",
        picto: "diagnostic",
        mainService: true,
      },
      {
        title: "Un budget maîtrisé",
        description: "Simulation des coûts d’investissement et d'entretien pour cadrer votre enveloppe",
        picto: "estimation",
        mainService: true,
      },
      {
        title: "Evitez les faux pas",
        description: "45 solutions éprouvées avec les bonnes pratiques et les erreurs à éviter",
        picto: "solutions",
        mainService: true,
      },
      {
        title: "Les aides à portée de main",
        description: "Opportunités de financements et contacts pour concrétiser votre projet",
        picto: "financement",
        mainService: true,
      },
      {
        title: "Invitez des membres à collaborer sur votre projet",
        description: "Partagez la conception de votre projet au sein de votre collectivité",
        picto: "collaborer",
        mainService: false,
      },
      {
        title: "Annuaire des projets Plus fraîche ma ville",
        description: "Trouvez les contacts utiles à votre projet : collectivités, bureaux d'étude, AMO, entreprises",
        picto: "annuaire",
        mainService: false,
      },
    ],
  };

  const blocs = displayAllServices ? data.blocs : data.blocs.filter((bloc) => bloc.mainService);

  return (
    <section className="fr-mb-8w fr-container mx-auto w-full text-center">
      {displayTitle && <h2 className="fr-h2 fr-mt-8w fr-mb-6w">De l'idée à l'action sans partir de zéro</h2>}
      <div className="fr-py-6w fr-px-3w md:fr-p-6w bg-dsfr-beige-galet text-left">
        <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2">
          {blocs.map((bloc, index) => (
            <div className="flex flex-col gap-3 self-center md:flex-row md:gap-6" key={index}>
              <Image
                className="size-16 h-full shrink-0 md:size-28"
                src={`/images/espace-projet-incentive/icons/${bloc.picto}.svg`}
                width={118}
                height={118}
                alt=""
              />
              <div className="items-center">
                <div className="fr-h5 !mb-2">{bloc.title}</div>
                <div className="fr-text--xl">{bloc.description}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="fr-mt-4w flex w-full justify-center">
          <Button
            className="w-full justify-center md:w-fit"
            size="large"
            linkProps={{ href: PFMV_ROUTES.ESPACE_PROJET }}
          >
            Commencer
          </Button>
        </div>
      </div>
    </section>
  );
};
