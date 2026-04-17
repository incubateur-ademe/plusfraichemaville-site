import { PFMV_ROUTES } from "@/src/helpers/routes";
import clsx from "clsx";

export const homepageData = {
  start: {
    title: "Un peu tôt pour créer votre projet ?",
    lines: [
      {
        title: "Évaluez la surchauffe urbaine dans votre commune",
        description:
          "Explorez tous les enjeux de la surchauffe urbaine, apprenez à en faire le diagnostic et inspirez-vous des " +
          "collectivités qui ont déjà franchi le pas.",
        image: { url: "/images/homepage/home-start-1.jpg", width: 331, height: 320 },
        cta: {
          label: "J’analyse la surchauffe avant de me lancer",
          url: PFMV_ROUTES.SURCHAUFFE_URBAINE_INTRODUCTION,
        },
      },
      {
        title: "Trouvez les solutions de rafraîchissement adaptées à votre projet",
        description:
          "Accédez à l’outil de découverte des solutions ou recherchez des fiches solutions par thématiques.",
        image: { url: "/images/homepage/home-start-2.svg", width: 331, height: 353 },
        cta: {
          label: "Je découvre les solutions",
          url: PFMV_ROUTES.FICHES_SOLUTIONS,
        },
      },
    ],
  },
  inspirer: {
    title: "S'inspirer des collectivités qui sont passées à l'action",
    featuredRex: {
      slug: "lyon-arbres-de-pluie",
      climat_actuel: "semi_continental",
      climat_futur: "mediterraneen",
      titre: "À Lyon, les arbres de pluie comme armes de résilience",
      image_principale: "/images/homepage/rex/lyon-arbres-de-pluie.jpg",
      region: {
        data: {
          attributes: {
            code: "FR-ARA",
          },
        },
      },
    },
    otherRex: [
      {
        slug: "toulouse-plus-fraiche",
        climat_actuel: "oceanique",
        climat_futur: "mediterraneen",
        titre: "Toulouse Plus Fraîche : un plan d’adaptation en 30 actions ",
        image_principale: "/images/homepage/rex/toulouse-plus-fraiche.jpeg",
        region: {
          data: {
            attributes: {
              code: "FR-OCC",
            },
          },
        },
      },
      {
        slug: "verdissons-nos-murs-lille",
        climat_actuel: "oceanique",
        climat_futur: "mediterraneen",
        titre: "“Verdissons nos murs”, le programme de Lille pour végétaliser ses façades",
        image_principale: "/images/homepage/rex/verdissons-nos-murs-lille.jpeg",
        region: {
          data: {
            attributes: {
              code: "FR-HDF",
            },
          },
        },
      },
      {
        slug: "cour-oasis-berthelot-montrouge",
        climat_actuel: "oceanique",
        climat_futur: "mediterraneen",
        titre: "La cour Oasis Berthelot, un îlot de fraîcheur au coeur de Montrouge",
        image_principale: "/images/homepage/rex/cour-oasis-berthelot-montrouge.jpg",
        region: {
          data: {
            attributes: {
              code: "FR-IDF",
            },
          },
        },
      },
      {
        slug: "micro-foret-bordeaux",
        climat_actuel: "oceanique",
        climat_futur: "mediterraneen",
        titre: "Wangari Muta Maathai, la première micro-forêt de Bordeaux ",
        image_principale: "/images/homepage/rex/micro-foret-bordeaux.jpeg",
        region: {
          data: {
            attributes: {
              code: "FR-NAQ",
            },
          },
        },
      },
    ],
    cta: {
      label: "Voir tous les projets réalisés",
      url: PFMV_ROUTES.RETOURS_EXPERIENCE_PROJET,
    },
  },
  newsletter: {
    title: "Abonnez-vous à notre lettre d’information",
    subtitle:
      // eslint-disable-next-line max-len
      "Rejoignez la communauté Plus Fraîche ma ville, recevez des conseils d'experts lors de nos webinaires et parlez-nous de vos projets.",
    input: {
      label: "Votre adresse électronique (ex. : nom@domaine.fr)",
      button: "S'abonner",
      // eslint-disable-next-line max-len
      info: "En renseignant votre adresse électronique, vous acceptez de recevoir nos actualités par courriel. Vous pouvez vous désinscrire à tout moment à l’aide des liens de désinscription ou en nous contactant.",
    },
  },
};

