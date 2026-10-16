import { HomepageInspirerCard } from "./homepage-inspirer-card";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import Button from "@codegouvfr/react-dsfr/Button";

export const HomepageInspirer = () => {
  const data = [
    {
      slug: "toulouse-plus-fraiche",
      climat_actuel: "oceanique",
      climat_futur: "mediterraneen",
      titre: "Toulouse Plus Fraîche : un plan d’adaptation en 30 actions ",
      image_principale: "/images/homepage/rex/toulouse-plus-fraiche.jpg",
      region: {
        code: "FR-OCC",
      },
    },
    {
      slug: "verdissons-nos-murs-lille",
      climat_actuel: "oceanique",
      climat_futur: "mediterraneen",
      titre: "“Verdissons nos murs”, le programme de Lille pour végétaliser ses façades",
      image_principale: "/images/homepage/rex/verdissons-nos-murs-lille.jpeg",
      region: {
        code: "FR-HDF",
      },
    },
    {
      slug: "cour-oasis-berthelot-montrouge",
      climat_actuel: "oceanique",
      climat_futur: "mediterraneen",
      titre: "La cour Oasis Berthelot, un îlot de fraîcheur au coeur de Montrouge",
      image_principale: "/images/homepage/rex/cour-oasis-berthelot-montrouge.jpg",
      region: {
        code: "FR-IDF",
      },
    },
    {
      slug: "micro-foret-bordeaux",
      climat_actuel: "oceanique",
      climat_futur: "mediterraneen",
      titre: "Wangari Muta Maathai, la première micro-forêt de Bordeaux ",
      image_principale: "/images/homepage/rex/micro-foret-bordeaux.jpeg",
      region: {
        code: "FR-NAQ",
      },
    },
  ];
  return (
    <section className="fr-mb-8w fr-container mx-auto w-full justify-items-center">
      <h2 className="fr-h2 fr-mb-6w max-w-[50rem] text-center">
        Découvrez les projets de rafraichissement urbains déjà réalisés partout en France
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-8 lg:flex-row lg:flex-nowrap">
        {data.map((rex, index) => (
          <HomepageInspirerCard rex={rex} key={index} />
        ))}
      </div>
      <div className="fr-mt-4w flex justify-center">
        <Button
          linkProps={{
            href: PFMV_ROUTES.RETOURS_EXPERIENCE_PROJET,
          }}
        >
          Voir tous les retours d'expérience
        </Button>
      </div>
    </section>
  );
};
