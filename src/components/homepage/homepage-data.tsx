import { PFMV_ROUTES } from "@/src/helpers/routes";
import clsx from "clsx";

export const homepageData = {
  inspirer: {
    title: "S'inspirer des collectivités qui sont passées à l'action",
    featuredRex: {
      slug: "lyon-arbres-de-pluie",
      climat_actuel: "semi_continental",
      climat_futur: "mediterraneen",
      titre: "À Lyon, les arbres de pluie comme armes de résilience",
      image_principale: "/images/homepage/rex/lyon-arbres-de-pluie.jpg",
      region: {
        code: "FR-ARA",
      },
    },
    otherRex: [
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
    ],
    cta: {
      label: "Voir tous les projets réalisés",
      url: PFMV_ROUTES.RETOURS_EXPERIENCE_PROJET,
    },
  },
};

