import { AideCard } from "./aide/aide-card";
import { resolveAidType } from "./helpers";
import { AidesTerritoiresAide } from "./types";

export const Financement = () => {
  return (
    <div>
      {aides.map((aide, index) => (
        <AideCard aide={aide} type={resolveAidType(aide.aid_types)} key={index} />
      ))}
    </div>
  );
};

export const aides: AidesTerritoiresAide[] = [
  {
    id: 34662,
    slug: "bc47-lieuxdeviecollectifs",
    url: "/aides/bc47-lieuxdeviecollectifs/",
    name: "Développer les lieux de vie collectifs s'adressant à des retraités autonomes",
    name_initial: null,
    short_title: null,
    financers: ["Caisse nationale d'assurance vieillesse (CNAV)"],
    instructors: ["Caisse d'assurance retraite et de la santé au travail (CARSAT)"],
    programs: [],
    description:
      // eslint-disable-next-line max-len
      "<p>\n Cette aide poursuit 3 objectifs. A noter que les EHPAD ne relèvent pas des financements de l'Assurance Retraite.\n <br/>\n</p>\n<ol>\n <li>\n  <strong>\n   Aider les structures permettant l'amélioration de la vie sociale\n  </strong>\n  et la prévention de la perte d'autonomie, grâce à des actions d'animation culturelle et sociale ou des activités physiques..\n </li>\n <li>\n  <strong>\n   Favoriser les modes d'accueil intermédiaires\n  </strong>\n  entre l'habitat individuel et l'hébergement collectif en institution, par la création de différentes formes de logements individuels regroupés autour d'un projet de vie sociale, tels que, par exemple, les domiciles services, les béguinages, les appartements d'accueil...\n </li>\n <li>\n  <strong>\n   Soutenir le développement d'un cadre de vie de qualité\n  </strong>\n  au sein des établissements d'hébergement pour personnes âgées (EHPA), notamment en participant aux actions visant à amplifier la rénovation des résidence autonomie.\n </li>\n</ol>",
    eligibility:
      // eslint-disable-next-line max-len
      "<p>\n <strong>\n  Structures visées\n </strong>\n</p>\n<ul>\n <li>\n  <strong>\n   Axe 1 Aider les structures permettant l'amélioration de la vie sociale et la prévention de la perte d'autonomie pour les personnes retraitées :\n  </strong>\n  L'ensemble des structures, à destination des personnes retraitées relevant des Gir 5 et 6, sont éligibles à une aide financière de l'Assurance Retraite, au titre de l'axe 1. Du fait des compétences incombant légalement au département, les EHPAD ne relèvent pas des financements de l'Assurance Retraite.\n </li>\n</ul>\n<ul>\n <li>\n  <strong>\n   Axe 2 Favoriser les modes d'accueil intermédiaires entre l'habitat individuel et l'hébergement collectif en institution :\n  </strong>\n  Structures destinées à l'accueil des personnes retraitées relevant des Gir 5 et 6 et proposant des logements, avec ou sans services intégrés, constituant une alternative attractive à l'hébergement en institution, tels que les logements individuels regroupés autour d'un projet de vie collective, les béguinages, les appartements d'accueils, les résidences sociales, les Marpa...\n </li>\n</ul>\n<ul>\n <li>\n  <strong>\n   Axe 3 Soutenir le développement d'un cadre de vie de qualité au sein des établissements d'hébergement pour personnes âgées (EHPA) :\n  </strong>\n  Structures entrant dans la catégorie des EHPA, c'est à dire les maisons de retraite non médicalisées et les logements-foyers pour personnes âgées ainsi que des structures d'hébergement temporaire. Les logements-foyers, ayant obtenu une aide financiére de l'Assurance retraite devront s'engager conventionnellement à évoluer, afin de répondre aux exigences des « résidences autonomie ».\n </li>\n</ul>",
    perimeter: "France",
    mobilization_steps: ["Réflexion / conception", "Mise en œuvre / réalisation"],
    origin_url: "https://www.partenairesactionsociale.fr/sites/ppas/home.html",
    categories: [
      "Solidarités / lien social / Personnes âgées",
      "Urbanisme / logement / aménagement / Bâtiments et construction",
    ],
    is_call_for_project: true,
    application_url:
      // eslint-disable-next-line max-len
      "https://www.partenairesactionsociale.fr/files/live/sites/ppas/files/base%20documentaire/Actualités/Circulaire%20CNAV%20n°2015-32%20du%2028%20mai%202015%20LVC.pdf",
    targeted_audiences: [
      "Commune",
      "Collectivité d’outre-mer à statut particulier",
      "Etablissement public dont services de l'Etat",
      "Association",
      "Entreprise privée",
    ],
    aid_types: ["Subvention"],
    is_charged: false,
    destinations: ["Dépenses d’investissement"],
    start_date: null,
    predeposit_date: null,
    submission_deadline: null,
    subvention_rate_lower_bound: 15,
    subvention_rate_upper_bound: 50,
    loan_amount: null,
    recoverable_advance_amount: null,
    contact:
      // eslint-disable-next-line max-len
      "<p>\n <em>\n  Prenez contact avec votre caisse locale :\n </em>\n</p>\n<p>\n <strong>\n  Carsat Alsace-Moselle\tMoselle (57), Bas-Rhin (67), Haut-Rhin (68)\n </strong>\n</p>\n<ul>\n <li>\n  Hubert MOSSER - 03.88.25.25.07 - hubert.mosser@carsat-am.fr\n </li>\n</ul>\n<p>\n <strong>\n  Carsat Aquitaine\tDordogne (24), Gironde (33), Landes (40), Lot-et-Garonne (47), Pyrénées-Atlantiques (64)\n </strong>\n</p>\n<ul>\n <li>\n  Nelly GIVRAN - 05 56 11 64 62 - nelly.givran@carsat-aquitaine.fr\n </li>\n</ul>\n<p>\n <strong>\n  Carsat Auvergne\tAllier (03), Cantal (15), Haute-Loire (43), Puy-de-Dôme (63)\n </strong>\n</p>\n<ul>\n <li>\n  Arnaud VILLAUME - 04 73 42 89 67 - arnaud.villaume@carsat-auvergne.fr\n </li>\n</ul>\n<p>\n <strong>\n  Carsat Bourgogne et Franche-Comté\tCôte d'Or(21), Doubs (25), Jura (39), Nièvre (58), Haute-Saône (70), Saône-et-Loire (71), Yonne (89), Territoire de Belfort (90)\n </strong>\n</p>\n<ul>\n <li>\n  Maryse JAVOY (Dpt 21/25/58/90) - 03 80 33 11 64\n </li>\n <li>\n  Mariette De Freitas (Dpt 70/89) - 03 80 33 11 65\n </li>\n <li>\n  Cécile DARBON (Dpt 71) - 03 80 33 11 67\n </li>\n <li>\n  Adresse mail commune : prets.subventions@carsat-bfc.fr\n </li>\n</ul>\n<p>\n <strong>\n  Carsat Bretagne\tCôtes d'Armor (22), Finistère (29), lle-et-Vilaine (35), Morbihan (56)\n </strong>\n</p>\n<ul>\n <li>\n  Régine GAUTIER - 02 99 26 74 84 - regine.gautier@carsat-bretagne.fr\n </li>\n</ul>\n<p>\n <strong>\n  Carsat Centre\tCher(18), Eure-et-Loir(28), Indre (36), Indre-et-Loire (37), Loiret (45), Loir-et-Cher(41)\n </strong>\n</p>\n<ul>\n <li>\n  Arnaud POIRIER, chargé de développement - 02 38 81 54 35 - arnaud.poirier@carsat-centre.fr\n </li>\n</ul>\n<p>\n <strong>\n  Carsat Centre-Ouest\tCharente (16), Charente-Maritime (17), Corrèze (19), Creuse (23), Deux-Sèvres (79), Vienne (86), Haute-Vienne (87)\n </strong>\n</p>\n<ul>\n <li>\n  Marie Christine JUDE - 05 55 45 39 61 - marie-christine.jude@carsat-centreouest.fr\n </li>\n</ul>\n<p>\n <strong>\n  Cnav Ile-de-France\tParis (75), Seine-et-Marne (77), Yvelines (78), Essonne (91), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94), Val-d'Oise (95)\n </strong>\n</p>\n<ul>\n <li>\n  Joachim Da Silva, Chargé d'études aides collectives - Dasif-lvc@cnav.fr - 01.55.45.51.88.\n  <br/>\n </li>\n</ul>\n<p>\n <strong>\n  Carsat Languedoc-Roussillon\tAude (11), Gard (30), Hérault (34), Lozère (48) Pyrénées Orientales (66)\n </strong>\n</p>\n<ul>\n <li>\n  Corinne CLAVEL Chargée de Conseils et Développement en Action Sociale - 04 67 12 94 45 - corinne.clavel@carsat-lr.fr\n </li>\n</ul>\n<p>\n <strong>\n  Carsat Midi-Pyrénées\tAriège (09), Aveyron (12), Haute-Garonne (31), Gers (32), Lot (46), Hautes-Pyrénées (65), Tarn (81), Tarn-et-Garonne (82)\n </strong>\n</p>\n<ul>\n <li>\n  Catherine LATAPIE Chargée d'Action Sociale Collective Service Action Sociale - 05 62 14 88 25 - Catherine.LATAPIE@carsat-mp.fr\n </li>\n</ul>\n<p>\n <strong>\n  Carsat Nord-Est\tArdennes (08), Aube (10), Marne (51), Haute-Marne (52), Meurthe-et-Moselle (54), Meuse (55), Vosges (88)\n </strong>\n</p>\n<ul>\n <li>\n  Nadine FRIRY - 03.83.34.48.74 - nadine.friry@carsat-nordest.fr\n </li>\n <li>\n  Christophe ROYET - 03.83.34.49.09 - christophe.royet@carsat-nordest.fr\n </li>\n</ul>\n<p>\n <strong>\n  Carsat Nord-Picardie\tAisne (02), Nord (59), Oise (60), Pas-de-Calais (62), Somme (80)\n </strong>\n</p>\n<ul>\n <li>\n  Sophie VANDECAVEYE - sophie.vandecaveye@carsat-nordpicardie.fr\n </li>\n <li>\n  Damien Vitel (sup) - damien.vitel@carsat-nordpicardie.fr\n </li>\n</ul>\n<p>\n <strong>\n  Carsat Normandie\tCalvados\r\n \r\n (14), Eure (27), Manche (50), Orne (61), Seine-Maritime (76)\n </strong>\n</p>\n<ul>\n <li>\n  Sophie NOBLET - Sophie.noblet@carsat-normandie.fr\n </li>\n</ul>\n<p>\n <strong>\n  Carsat Pays de la Loire\tL\n </strong>\n <strong>\n  oire-Atlantique\r\n \r\n (44), Maine-et-Loire (49), Mayenne (53), Sarthe (72), Vendée (85)\n </strong>\n</p>\n<ul>\n <li>\n  Nathalie GIRAUD - 02.51.72.81.83 - nathalie.giraud@carsat-pl.fr\n </li>\n</ul>\n<p>\n <strong>\n  Carsat Rhône-Alpes\tAin (01), Ardèche (07), Drôme (26), Isère (38), Loire (42), Rhône (69), Savoie (73), Haute-Savoie (74)\n </strong>\n</p>\n<ul>\n <li>\n  Mme Nathalie VOGE Responsable du Département Accompagnement de projets et Relations Partenariales –Direction de l'Action Sociale - nathalie.voge@carsat-ra.fr - 04.72.91.96.84\n </li>\n <li>\n  Mme Nadia BASSET Responsable Adjointe du Département Accompagnement de Projets et Relations Partenariales - 04.72.91.96.48 - nadia.basset@carsat-ra.fr\n </li>\n</ul>\n<p>\n <strong>\n  Carsat Sud-Est\tAlpes de Haute-Provence\n </strong>\n <strong>\n  (04), Hautes-Alpes (05), Alpes-Maritimes (06), Bouches-du-Rhône (13), Corse-du-Sud (2a), Haute-Corse (2b), Var(83), Vaucluse (84)\n </strong>\n</p>\n<ul>\n <li>\n  Marion AMBROSETTI - 04 91 85 97 53 - marion.ambrosetti@carsat-sudest.fr\n </li>\n <li>\n  Patricia AMIRAULT - 04 91 85 99 34 - patricia.amirault@carsat-sudest.fr\n </li>\n <li>\n  Valérie MERLIN - 04 91 85 76 31 - valérie.merlin@carsat-sudest.fr\n </li>\n</ul>\n<p>\n <strong>\n  CGSS Guadeloupe\tGuadeloupe (971)\n </strong>\n</p>\n<ul>\n <li>\n  Franciane MASSINA - 0590 90 50 77 - franciane.massina@cgss-guadeloupe.fr\n </li>\n</ul>\n<p>\n <strong>\n  CGSS Martinique\tMartinique (972)\n </strong>\n</p>\n<ul>\n <li>\n  Patricia CHEVON - 05 96 66 50 5 - Patricia.chevon@cgss-martinique.fr\n </li>\n</ul>\n<p>\n <strong>\n  CGSS Réunion\tRéunion (974)\n </strong>\n</p>\n<ul>\n <li>\n  Hélène MERCADIER - 02 62 40 35 34 - Helene.mercadier@cgss.re\n </li>\n</ul>",
    recurrence: "Permanente",
    project_examples: null,
    import_data_url: null,
    import_data_mention: null,
    import_share_licence: null,
    date_created: "2020-04-17T13:20:23+00:00",
    date_updated: "2024-02-25T06:04:08+00:00",
    project_references: [],
  },
];
