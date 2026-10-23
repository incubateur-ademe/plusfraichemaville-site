import { HomepageCitation, HomepageCitationsSlider } from "@/src/components/homepage/homepage-citations-slider";

export const HomepageCitations = () => {
  const citationsInHome: HomepageCitation[] = [
    {
      image: "/images/homepage/citations/cuers.jpg",
      citation:
        "Nous avons modifié le Plan Local d’Urbanisme pour préconiser, voire pour imposer de nouvelles manières " +
        "de construire avec des obligations plus draconiennes en matière d’arborisation, de non-artificialisation " +
        "des sols dédiés au stationnement ou de choix de traitement des façades.",
      auteur: "Bernard Mouttet, Maire de la ville de Cuers",
    },
    {
      image: "/images/homepage/citations/cuers.jpg",
      citation:
        "Nous avons modifié le Plan Local d’Urbanisme pour préconiser, voire pour imposer de nouvelles manières " +
        "de construire avec des obligations plus draconiennes en matière d’arborisation, de non-artificialisation " +
        "des sols dédiés au stationnement ou de choix de traitement des façades.",
      auteur: "Bernard Mouttet, Maire de la ville de Cuers",
    },
  ];

  return (
    <section className="fr-py-7w mx-auto w-full justify-items-center bg-dsfr-artwork-minor-blue-cumulus">
      <div className="fr-container">
        <hgroup>
          <h2 className="fr-h2 !mb-2 text-center text-dsfr-text-inverted-grey">Ce qu’en pense notre communauté</h2>
          <p className="fr-text--lead text-center text-dsfr-text-inverted-grey">
            Découvrez comment Plus fraîche ma ville aide déjà +600 collectivités
          </p>
        </hgroup>
        <HomepageCitationsSlider citations={citationsInHome} />
      </div>
    </section>
  );
};
