export const getRegionByDepartment = (dep?: string | null): string | undefined => {
  if (!dep) {
    return undefined;
  }
  const prefix = dep.startsWith("97") ? dep.slice(0, 3) : dep.slice(0, 2);

  const department = departements.find((d) => d.dep_num === prefix);
  return department?.region_name;
};

const departements = [
  {
    dep_num: "01",
    dep_name: "Ain",
    region_name: "Auvergne-Rhône-Alpes",
  },
  {
    dep_num: "02",
    dep_name: "Aisne",
    region_name: "Hauts-de-France",
  },
  {
    dep_num: "03",
    dep_name: "Allier",
    region_name: "Auvergne-Rhône-Alpes",
  },
  {
    dep_num: "04",
    dep_name: "Alpes-de-Haute-Provence",
    region_name: "Provence-Alpes-Côte d'Azur",
  },
  {
    dep_num: "05",
    dep_name: "Hautes-Alpes",
    region_name: "Provence-Alpes-Côte d'Azur",
  },
  {
    dep_num: "06",
    dep_name: "Alpes-Maritimes",
    region_name: "Provence-Alpes-Côte d'Azur",
  },
  {
    dep_num: "07",
    dep_name: "Ardèche",
    region_name: "Auvergne-Rhône-Alpes",
  },
  {
    dep_num: "08",
    dep_name: "Ardennes",
    region_name: "Grand Est",
  },
  {
    dep_num: "09",
    dep_name: "Ariège",
    region_name: "Occitanie",
  },
  {
    dep_num: "10",
    dep_name: "Aube",
    region_name: "Grand Est",
  },
  {
    dep_num: "11",
    dep_name: "Aude",
    region_name: "Occitanie",
  },
  {
    dep_num: "12",
    dep_name: "Aveyron",
    region_name: "Occitanie",
  },
  {
    dep_num: "13",
    dep_name: "Bouches-du-Rhône",
    region_name: "Provence-Alpes-Côte d'Azur",
  },
  {
    dep_num: "14",
    dep_name: "Calvados",
    region_name: "Normandie",
  },
  {
    dep_num: "15",
    dep_name: "Cantal",
    region_name: "Auvergne-Rhône-Alpes",
  },
  {
    dep_num: "16",
    dep_name: "Charente",
    region_name: "Nouvelle-Aquitaine",
  },
  {
    dep_num: "17",
    dep_name: "Charente-Maritime",
    region_name: "Nouvelle-Aquitaine",
  },
  {
    dep_num: "18",
    dep_name: "Cher",
    region_name: "Centre-Val de Loire",
  },
  {
    dep_num: "19",
    dep_name: "Corrèze",
    region_name: "Nouvelle-Aquitaine",
  },
  {
    dep_num: "21",
    dep_name: "Côte-d'Or",
    region_name: "Bourgogne-Franche-Comté",
  },
  {
    dep_num: "22",
    dep_name: "Côtes-d'Armor",
    region_name: "Bretagne",
  },
  {
    dep_num: "23",
    dep_name: "Creuse",
    region_name: "Nouvelle-Aquitaine",
  },
  {
    dep_num: "24",
    dep_name: "Dordogne",
    region_name: "Nouvelle-Aquitaine",
  },
  {
    dep_num: "25",
    dep_name: "Doubs",
    region_name: "Bourgogne-Franche-Comté",
  },
  {
    dep_num: "26",
    dep_name: "Drôme",
    region_name: "Auvergne-Rhône-Alpes",
  },
  {
    dep_num: "27",
    dep_name: "Eure",
    region_name: "Normandie",
  },
  {
    dep_num: "28",
    dep_name: "Eure-et-Loir",
    region_name: "Centre-Val de Loire",
  },
  {
    dep_num: "29",
    dep_name: "Finistère",
    region_name: "Bretagne",
  },
  {
    dep_num: "2A",
    dep_name: "Corse-du-Sud",
    region_name: "Corse",
  },
  {
    dep_num: "2B",
    dep_name: "Haute-Corse",
    region_name: "Corse",
  },
  {
    dep_num: "30",
    dep_name: "Gard",
    region_name: "Occitanie",
  },
  {
    dep_num: "31",
    dep_name: "Haute-Garonne",
    region_name: "Occitanie",
  },
  {
    dep_num: "32",
    dep_name: "Gers",
    region_name: "Occitanie",
  },
  {
    dep_num: "33",
    dep_name: "Gironde",
    region_name: "Nouvelle-Aquitaine",
  },
  {
    dep_num: "34",
    dep_name: "Hérault",
    region_name: "Occitanie",
  },
  {
    dep_num: "35",
    dep_name: "Ille-et-Vilaine",
    region_name: "Bretagne",
  },
  {
    dep_num: "36",
    dep_name: "Indre",
    region_name: "Centre-Val de Loire",
  },
  {
    dep_num: "37",
    dep_name: "Indre-et-Loire",
    region_name: "Centre-Val de Loire",
  },
  {
    dep_num: "38",
    dep_name: "Isère",
    region_name: "Auvergne-Rhône-Alpes",
  },
  {
    dep_num: "39",
    dep_name: "Jura",
    region_name: "Bourgogne-Franche-Comté",
  },
  {
    dep_num: "40",
    dep_name: "Landes",
    region_name: "Nouvelle-Aquitaine",
  },
  {
    dep_num: "41",
    dep_name: "Loir-et-Cher",
    region_name: "Centre-Val de Loire",
  },
  {
    dep_num: "42",
    dep_name: "Loire",
    region_name: "Auvergne-Rhône-Alpes",
  },
  {
    dep_num: "43",
    dep_name: "Haute-Loire",
    region_name: "Auvergne-Rhône-Alpes",
  },
  {
    dep_num: "44",
    dep_name: "Loire-Atlantique",
    region_name: "Pays de la Loire",
  },
  {
    dep_num: "45",
    dep_name: "Loiret",
    region_name: "Centre-Val de Loire",
  },
  {
    dep_num: "46",
    dep_name: "Lot",
    region_name: "Occitanie",
  },
  {
    dep_num: "47",
    dep_name: "Lot-et-Garonne",
    region_name: "Nouvelle-Aquitaine",
  },
  {
    dep_num: "48",
    dep_name: "Lozère",
    region_name: "Occitanie",
  },
  {
    dep_num: "49",
    dep_name: "Maine-et-Loire",
    region_name: "Pays de la Loire",
  },
  {
    dep_num: "50",
    dep_name: "Manche",
    region_name: "Normandie",
  },
  {
    dep_num: "51",
    dep_name: "Marne",
    region_name: "Grand Est",
  },
  {
    dep_num: "52",
    dep_name: "Haute-Marne",
    region_name: "Grand Est",
  },
  {
    dep_num: "53",
    dep_name: "Mayenne",
    region_name: "Pays de la Loire",
  },
  {
    dep_num: "54",
    dep_name: "Meurthe-et-Moselle",
    region_name: "Grand Est",
  },
  {
    dep_num: "55",
    dep_name: "Meuse",
    region_name: "Grand Est",
  },
  {
    dep_num: "56",
    dep_name: "Morbihan",
    region_name: "Bretagne",
  },
  {
    dep_num: "57",
    dep_name: "Moselle",
    region_name: "Grand Est",
  },
  {
    dep_num: "58",
    dep_name: "Nièvre",
    region_name: "Bourgogne-Franche-Comté",
  },
  {
    dep_num: "59",
    dep_name: "Nord",
    region_name: "Hauts-de-France",
  },
  {
    dep_num: "60",
    dep_name: "Oise",
    region_name: "Hauts-de-France",
  },
  {
    dep_num: "61",
    dep_name: "Orne",
    region_name: "Normandie",
  },
  {
    dep_num: "62",
    dep_name: "Pas-de-Calais",
    region_name: "Hauts-de-France",
  },
  {
    dep_num: "63",
    dep_name: "Puy-de-Dôme",
    region_name: "Auvergne-Rhône-Alpes",
  },
  {
    dep_num: "64",
    dep_name: "Pyrénées-Atlantiques",
    region_name: "Nouvelle-Aquitaine",
  },
  {
    dep_num: "65",
    dep_name: "Hautes-Pyrénées",
    region_name: "Occitanie",
  },
  {
    dep_num: "66",
    dep_name: "Pyrénées-Orientales",
    region_name: "Occitanie",
  },
  {
    dep_num: "67",
    dep_name: "Bas-Rhin",
    region_name: "Grand Est",
  },
  {
    dep_num: "68",
    dep_name: "Haut-Rhin",
    region_name: "Grand Est",
  },
  {
    dep_num: "69",
    dep_name: "Rhône",
    region_name: "Auvergne-Rhône-Alpes",
  },
  {
    dep_num: "70",
    dep_name: "Haute-Saône",
    region_name: "Bourgogne-Franche-Comté",
  },
  {
    dep_num: "71",
    dep_name: "Saône-et-Loire",
    region_name: "Bourgogne-Franche-Comté",
  },
  {
    dep_num: "72",
    dep_name: "Sarthe",
    region_name: "Pays de la Loire",
  },
  {
    dep_num: "73",
    dep_name: "Savoie",
    region_name: "Auvergne-Rhône-Alpes",
  },
  {
    dep_num: "74",
    dep_name: "Haute-Savoie",
    region_name: "Auvergne-Rhône-Alpes",
  },
  {
    dep_num: "75",
    dep_name: "Paris",
    region_name: "Île-de-France",
  },
  {
    dep_num: "76",
    dep_name: "Seine-Maritime",
    region_name: "Normandie",
  },
  {
    dep_num: "77",
    dep_name: "Seine-et-Marne",
    region_name: "Île-de-France",
  },
  {
    dep_num: "78",
    dep_name: "Yvelines",
    region_name: "Île-de-France",
  },
  {
    dep_num: "79",
    dep_name: "Deux-Sèvres",
    region_name: "Nouvelle-Aquitaine",
  },
  {
    dep_num: "80",
    dep_name: "Somme",
    region_name: "Hauts-de-France",
  },
  {
    dep_num: "81",
    dep_name: "Tarn",
    region_name: "Occitanie",
  },
  {
    dep_num: "82",
    dep_name: "Tarn-et-Garonne",
    region_name: "Occitanie",
  },
  {
    dep_num: "83",
    dep_name: "Var",
    region_name: "Provence-Alpes-Côte d'Azur",
  },
  {
    dep_num: "84",
    dep_name: "Vaucluse",
    region_name: "Provence-Alpes-Côte d'Azur",
  },
  {
    dep_num: "85",
    dep_name: "Vendée",
    region_name: "Pays de la Loire",
  },
  {
    dep_num: "86",
    dep_name: "Vienne",
    region_name: "Nouvelle-Aquitaine",
  },
  {
    dep_num: "87",
    dep_name: "Haute-Vienne",
    region_name: "Nouvelle-Aquitaine",
  },
  {
    dep_num: "88",
    dep_name: "Vosges",
    region_name: "Grand Est",
  },
  {
    dep_num: "89",
    dep_name: "Yonne",
    region_name: "Bourgogne-Franche-Comté",
  },
  {
    dep_num: "90",
    dep_name: "Territoire de Belfort",
    region_name: "Bourgogne-Franche-Comté",
  },
  {
    dep_num: "91",
    dep_name: "Essonne",
    region_name: "Île-de-France",
  },
  {
    dep_num: "92",
    dep_name: "Hauts-de-Seine",
    region_name: "Île-de-France",
  },
  {
    dep_num: "93",
    dep_name: "Seine-Saint-Denis",
    region_name: "Île-de-France",
  },
  {
    dep_num: "94",
    dep_name: "Val-de-Marne",
    region_name: "Île-de-France",
  },
  {
    dep_num: "95",
    dep_name: "Val-d'Oise",
    region_name: "Île-de-France",
  },
  {
    dep_num: "971",
    dep_name: "Guadeloupe",
    region_name: "Guadeloupe",
  },
  {
    dep_num: "972",
    dep_name: "Martinique",
    region_name: "Martinique",
  },
  {
    dep_num: "973",
    dep_name: "Guyane",
    region_name: "Guyane",
  },
  {
    dep_num: "974",
    dep_name: "La Réunion",
    region_name: "La Réunion",
  },
  {
    dep_num: "976",
    dep_name: "Mayotte",
    region_name: "Mayotte",
  },
];
