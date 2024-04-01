import { PFMV_ROUTES } from "@/helpers/routes";
import clsx from "clsx";

export const homepageData = {
  hero: {
    title: () => (
      <>
        Plus <strong>fraîche</strong> ma ville
      </>
    ),
    baseline: "Le service numérique dédié aux élus et aux agents qui rafraîchissent durablement leur collectivité.",
    cta1: {
      label: "Trouver une  solution",
      url: PFMV_ROUTES.FICHES_SOLUTIONS,
    },
    cta2: {
      label: "Créer un projet",
      url: PFMV_ROUTES.ESPACE_PROJET,
    },
  },
  projet: {
    title: ["Vous avez un projet de rafraîchissement ?", "N'attendez pas la prochaine vague."],
    subtitle: [
      "Grâce à l'espace projet, réalisez des simulations budgétaires",
      "et accédez à des recommandations techniques détaillées.",
    ],
    cta: {
      label: "Je crée un projet",
      url: PFMV_ROUTES.ESPACE_PROJET,
    },
    image: "/images/homepage/home-hero.png",
  },
  stories: {
    title: "Vous aider à trouver les bonnes solutions pour rafraîchir durablement votre collectivité",
    cards: [
      {
        title: "Stockage eau de pluie",
        alt: "",
        code: "bleue",
        slug: "stockage-eau-de-pluie",
        image: "/images/homepage/solutions/stockage-eau-de-pluie.jpeg",
      },
      {
        title: "Arbres et végétaux dans la cour d'école",
        alt: "",
        code: "verte",
        slug: "arbres-vegetaux-cour-ecole",
        image: "/images/homepage/solutions/arbres-vegetaux-cour-ecole.jpeg",
      },
      {
        title: "Adaptation des batiments - école",
        alt: "",
        code: "grise",
        slug: "batiment-ecole-adaptation-renovation-batiments",
        image: "/images/homepage/solutions/batiment-ecole-adaptation-renovation-batiments.jpeg",
      },
      {
        title: "Comportements collectifs face à la chaleur",
        alt: "",
        code: "douce",
        slug: "comportements-collectifs",
        image: "/images/homepage/solutions/comportements-collectifs.jpeg",
      },
      {
        title: "Façade végétalisée",
        alt: "",
        code: "verte",
        slug: "facade-vegetalisee",
        image: "/images/homepage/solutions/facade-vegetalisee.jpeg",
      },
      {
        title: "Revêtement à albédo élevé",
        alt: "",
        code: "grise",
        slug: "revetement-albedo-eleve",
        image: "/images/homepage/solutions/revetement-albedo-eleve.jpeg",
      },
      {
        title: "Stockage eau de pluie dans la cour d'école",
        alt: "",
        code: "bleue",
        slug: "stockage-eau-pluie-ecole",
        image: "/images/homepage/solutions/stockage-eau-pluie-ecole.jpeg",
      },
    ],
  },
  start: {
    title: "Par où commencer ?",
    lines: [
      {
        title: "Faites un diagnostic de la surchauffe sur votre territoire",
        description: "Consultez les différentes méthodes de diagnostic en fonction de votre besoin.",
        image: { url: "/images/homepage/home-start-1.svg", width: 331, height: 320 },
        cta: {
          label: "Je trouve la bonne méthode",
          url: PFMV_ROUTES.FICHES_DIAGNOSTIC,
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
      image_principale: "/images/homepage/rex/lyon-arbres-de-pluie.jpeg",
      // eslint-disable-next-line max-len
      description: `<p>Le projet "arbres de pluie" à Lyon, initié fin 2020 dans le cadre du programme européen <a target="_blank" rel="noopener noreferrer" href="https://www.ofb.gouv.fr/le-projet-life-integre-artisan">Life ARTISAN</a>, offre une solution prometteuse face au réchauffement climatique et à la dégradation urbaine. Porté par la Métropole de Lyon, ce projet vise à élargir les fosses qui entourent les arbres existants, afin de permettre une meilleure infiltration des eaux de pluie et le rafraîchissement de la ville. Par la capture de carbone, la recharge des nappes phréatiques et le refuge qu’ils constituent pour la biodiversité, les arbres se transforment en alliés précieux pour l'environnement. De plus, cette initiative crée des îlots de fraîcheur grâce à l'évapotranspiration des arbres. Les résultats probants des premières installations, avec une absorption complète des petites pluies et une meilleure résilience face aux sécheresses, témoignent de l'efficacité de ce projet bénéfique pour l'amélioration du cadre de vie urbain et la préservation de la nature.&nbsp;</p>`,
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
        image_principale: "/images/homepage/rex/cour-oasis-berthelot-montrouge.jpeg",
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
      url: PFMV_ROUTES.RETOURS_EXPERIENCE,
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

export const multilines = (lines: string[], className?: string) => (
  <span className={clsx(className, "block")}>
    {lines.map((line, i) => (
      <span className="block" key={i}>
        {line}
      </span>
    ))}
  </span>
);
