import Image from "next/image";
import Button from "@codegouvfr/react-dsfr/Button";
import { PFMV_ROUTES } from "@/src/helpers/routes";

export const HomepageIdeeAction = () => {
  const data = {
    blocs: [
      {
        title: "Sachez où agir en premier",
        description: "Un coefficient de rafraîchissement calculé en quelques clics et des méthodes de diagnostic",
        picto: "diagnostic",
      },
      {
        title: "Un budget maîtrisé",
        description: "Simulation des coûts d’investissement et de fonctionnement pour cadrer votre enveloppe",
        picto: "estimation",
      },
      {
        title: "Evitez les faux pas",
        description: "45 solutions éprouvées avec les bonnes pratiques et les erreurs à éviter",
        picto: "solutions",
      },
      {
        title: "Les aides à portée de main",
        description: "Opportunités de financements et contacts pour concrétiser votre projet",
        picto: "financement",
      },
    ],
  };

  return (
    <section className="fr-my-8w fr-container mx-auto w-full text-center">
      <h2 className="fr-h2 fr-mb-6w">De l'idée à l'action sans partir de zéro</h2>
      <div className="fr-py-6w fr-px-3w md:fr-p-6w bg-dsfr-beige-galet text-left">
        <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2">
          {data.blocs.map((bloc, index) => (
            <div className="flex flex-col md:flex-row gap-3 md:gap-6 self-center" key={index}>
              <Image
                className="h-full shrink-0 size-16 md:size-28"
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
        <div className="w-full fr-mt-4w flex justify-center">
          <Button className="w-full md:w-fit justify-center" linkProps={{ href: PFMV_ROUTES.ESPACE_PROJET }}>Commencer</Button>
        </div>
      </div>
    </section>
  );
};
