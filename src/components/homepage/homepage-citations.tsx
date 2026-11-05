import { HomepageCitation, HomepageCitationsSlider } from "@/src/components/homepage/homepage-citations-slider";

export const HomepageCitations = () => {
  const citationsInHome: HomepageCitation[] = [
    {
      image: "/images/homepage/citations/chanos-curson.jpg",
      citation:
        "Avec cet outil, nous avons pris conscience de l’impact de chaque solution. Il permet de " +
        "dire “il faut travailler sur certains aspects plutôt que d’autres, car il y a des actions" +
        " qui payent plus que d’autres.",
      auteur: "Pascal BAUDE, Maire de Chanos-Curson",
    },
    {
      image: "/images/homepage/citations/chantemerle-les-bles.webp",
      citation:
        "Plus fraîche ma ville nous a permis de ne pas passer à côté de sujets essentiels" +
        " avant de prévoir l’aménagement.",
      auteur: "Ludovic COSTE, Contrôleur du recouvrement à Chantemerle-les-Blés",
    },
    {
      image: "/images/homepage/citations/crapone-sur-arzon.png",
      citation:
        "Plus fraîche ma ville me donne les arguments pour convaincre et sensibiliser les élus comme les habitants.",
      auteur: "Charlène IMBERT, Cheffe de projet PVD à Craponne-sur-Arzon",
    },
  ];

  return (
    <section className="fr-py-7w mx-auto w-full justify-items-center bg-dsfr-artwork-minor-blue-cumulus">
      <div className="fr-container">
        <hgroup>
          <h2 className="fr-h2 !mb-2 text-center text-dsfr-text-inverted-grey">Ce qu’en pense notre communauté</h2>
          <p className="fr-text--lead text-center text-dsfr-text-inverted-grey">
            Découvrez comment Plus fraîche ma ville aide déjà plus de 900 collectivités
          </p>
        </hgroup>
        <HomepageCitationsSlider citations={citationsInHome} />
      </div>
    </section>
  );
};
