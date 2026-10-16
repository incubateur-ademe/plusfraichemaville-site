import Image from "next/image";

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
    <section className="fr-py-8w fr-container mx-auto w-full text-center">
      <h2 className="fr-h2 fr-mb-6w">De l'idée à l'action sans partir de zéro</h2>
      <div className="fr-p-6w bg-dsfr-beige-galet text-left">
        <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2">
          {data.blocs.map((bloc, index) => (
            <div className="flex gap-6 self-center" key={index}>
              <Image
                className="h-full shrink-0"
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
      </div>
    </section>
  );
};
