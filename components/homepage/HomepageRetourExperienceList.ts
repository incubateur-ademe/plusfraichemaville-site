export type HomepageRetourExperience = {
  image: string;
  slug: string;
  description: string;
  region: string;
  climat_actuel: string;
  climat_futur: string;
};

export const ALL_REX_FOR_HOMEPAGE: HomepageRetourExperience[] = [
  {
    image: "/images/homepage/rex-home-verdissons-nos-murs-lille.jpg",
    slug: "verdissons-nos-murs-lille",
    description: `"Verdissons nos murs”, le programme de Lille pour végétaliser ses façades`,
    region: "Hauts-de-France",
    climat_actuel: "Océanique",
    climat_futur: "Méditeranéen",
  },
  {
    image: "/images/homepage/rex-home-cour-oasis-berthelot-montrouge.jpg",
    slug: "cour-oasis-berthelot-montrouge",
    description: `"La cour Oasis Berthelot, un îlot de fraîcheur au coeur de Montrouge`,
    region: "Île-de-France",
    climat_actuel: "Océanique",
    climat_futur: "Méditeranéen",
  },
  {
    image: "/images/homepage/rex-home-pen-ar-biez-lannion.jpg",
    slug: "pen-ar-biez-lannion",
    description: `Retrouver la nature en ville grâce à la remise au jour d'un ruisseau à Lannion`,
    region: "Bretagne",
    climat_actuel: "Océanique",
    climat_futur: "Méditeranéen",
  },
  {
    image: "/images/homepage/rex-home-cascade-aygalades.jpg",
    slug: "cascade-aygalades",
    description: `La renaturation des berges du ruisseau des Aygalades à Marseille`,
    region: "Provence-Alpes-Côte d'Azur",
    climat_actuel: "Méditeranéen",
    climat_futur: "Semi-aride",
  },
];
