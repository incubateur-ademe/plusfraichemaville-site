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
        title: "Fontaines et réseaux de fontainerie",
        alt: "",
        code: "bleue",
        slug: "fontaines-reseau-fontainerie",
        image: "/images/homepage/solution-bleue-1.png",
      },
      {
        title: "Ouvrage paysager de gestion des eaux pluviales",
        alt: "",
        code: "verte",
        slug: "gestion-eaux-pluviales",
        image: "/images/homepage/solution-verte-1.jpeg",
      },
      {
        title: "Comportements collectifs face à la chaleur",
        alt: "",
        code: "douce",
        slug: "comportements-collectifs",
        image: "/images/homepage/solution-douce-1.jpeg",
      },
      {
        title: "Revêtement drainant / perméable",
        alt: "",
        code: "grise",
        slug: "revetement-drainant",
        image: "/images/homepage/solution-grise-1.jpeg",
      },
      {
        title: "Stockage eau de pluie",
        alt: "",
        code: "bleue",
        slug: "stockage-eau-de-pluie",
        image: "/images/homepage/solution-bleue-2.jpeg",
      },
      {
        title: "Prendre soin d'un arbre existant",
        alt: "",
        code: "verte",
        slug: "prendre-soin-arbre-existant",
        image: "/images/homepage/solution-verte-2.jpeg",
      },
      {
        title: "Jeux et équipements durables",
        alt: "",
        code: "grise",
        slug: "jeux-et-equipements-durables-ecoles",
        image: "/images/homepage/solution-grise-2.jpeg",
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
    featuredRex: "autoroute-urbaine-transformee-en-couloir-vert",
    otherRex: [
      "transformation-parking-ilot-de-fraicheur",
      "ecoquartier-clichy-batignolles",
      "transformation-parking-ilot-de-fraicheur",
      "ecoquartier-clichy-batignolles",
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
