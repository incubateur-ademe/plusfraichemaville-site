/* eslint-disable max-len */
import { AideFiche } from "./aide-fiche";
import { AideFicheModal } from "./aide-fiche-modal";
import { AidesTerritoiresAide } from "../types";
import Image from "next/image";
import { resolveAidType } from "../helpers";
import clsx from "clsx";

import { daysUntilDate } from "@/helpers/common";
import { AideCardLine } from "./aide-card-line";

type AideCardProps = {
  id: number;
};

export const AideCard = ({ id }: AideCardProps) => {
  //  const data  = useImmutableFetcher(id)... Webservice ici
  const aide = seed[0];
  const type = resolveAidType(aide.aid_types_full);
  const isAideFinanciere = type === "Aide financière";

  return (
    <div className="pfmv-card w-fit max-w-[266px] overflow-hidden hover:outline-none" id={`aide-card-${id}`}>
      <div
        className={clsx("h-24 px-5 py-4", {
          "bg-dsfr-background-alt-blue-france": isAideFinanciere,
          "bg-dsfr-background-alt-brown-cafe-creme": !isAideFinanciere,
        })}
      >
        <Image
          src={`/images/financement/${isAideFinanciere ? "financement" : "ingenierie"}.svg`}
          className="mb-2"
          width={32}
          height={32}
          alt=""
        />
        <span
          className={clsx("text-sm font-bold", {
            "text-dsfr-background-flat-info": isAideFinanciere,
            "text-dsfr-background-flat-orange-terre-battue": !isAideFinanciere,
          })}
        >
          {isAideFinanciere ? "Financemement" : "Soutien à l'ingénierie"}
        </span>
      </div>
      <div className="p-5">
        <div className="mb-4 w-fit rounded-[4px] bg-dsfr-background-alt-blue-france px-[6px] py-[2px] text-sm font-bold text-pfmv-navy">
          {aide.perimeter_scale}
        </div>
        <h2 className="mb-6 text-lg">{aide.name}</h2>
        <AideCardLine isAideFinanciere={isAideFinanciere} icon="porteur">
          {aide.financers.join(", ")}
        </AideCardLine>
        <AideCardLine isAideFinanciere={isAideFinanciere} icon="recurrence">
          {aide.recurrence}
        </AideCardLine>
        <AideCardLine isAideFinanciere={isAideFinanciere} icon="subvention">
          {aide.subvention_rate_lower_bound && (
            <span className="mb-2 block">Min: {aide.subvention_rate_lower_bound}%</span>
          )}
          {aide.subvention_rate_upper_bound && (
            <span className="mb-2 block">Max: {aide.subvention_rate_upper_bound}%</span>
          )}
          {aide.subvention_comment && <span className="mb-2 block">{aide.subvention_comment}%</span>}
        </AideCardLine>
        <AideCardLine isAideFinanciere={isAideFinanciere} icon="calendrier">
          <div className="flex items-center gap-4">
            <div className="w-fit rounded-[4px] bg-dsfr-background-contrast-yellow-tournesol-hover px-[6px] py-[2px] text-sm font-bold text-black">
              <i className="ri-error-warning-line mr-1 size-4 text-black before:!size-4 before:!align-[-4px]"></i>
              J-{daysUntilDate(aide.submission_deadline)}
            </div>
            <span>Échéance : {aide.submission_deadline}</span>
          </div>
        </AideCardLine>
      </div>
      <AideFicheModal id={id}>
        <AideFiche aide={aide} type={type} />
      </AideFicheModal>
    </div>
  );
};

const seed: AidesTerritoiresAide[] = [
  {
    id: 162936,
    slug: "rassembler-les-acteurs-autour-de-leconomie-circulaire-et-la-valorisation-de-nos-ressources-locales",
    url: "/aides/rassembler-les-acteurs-autour-de-leconomie-circulaire-et-la-valorisation-de-nos-ressources-locales/",
    name: "Rendre attrayante une mobilité sobre",
    name_initial: "LEADER - Fiche Action Mobilité et services",
    short_title: null,
    financers: ["Châteaux (Syndicat mixte)"],
    financers_full: [
      {
        id: 1371,
        name: "Châteaux (Syndicat mixte)",
        logo: "https://aides-territoires-prod.s3.fr-par.scw.cloud/aides-territoires-prod/backers/chateaux-syndicat-mixte_logo.png",
      },
    ],
    instructors: ["Conseil régional du Centre-Val de Loire"],
    instructors_full: [
      {
        id: 85,
        name: "Conseil régional du Centre-Val de Loire",
        logo: "https://aides-territoires-prod.s3.fr-par.scw.cloud/aides-territoires-prod/backers/region-centre-val-de-loire_logo.png",
      },
    ],
    programs: ["🇪🇺 LEADER - Liaison entre Actions de Développement de l’Économie Rurale"],
    description:
      '<p><font face="Segoe UI"><span>Objectifs :&nbsp;</span></font></p><p><font face="Segoe UI">-Penser l’accès aux services par une mobilité sobre, douce et/ou réduite</font></p><p><font face="Segoe UI">-Imaginer la mutualisation, la mutation, la réversibilité et/ou la recyclabilité de lieux, d’équipements, de véhicules et d’usages</font></p><p><font face="Segoe UI">-Accompagner à l’acceptabilité du changement des pratiques (comportements, aménagements) vers plus de sobriété</font></p><p><font face="Segoe UI">-Expérimenter de nouvelles mobilités dans une optique de sobriété</font></p><p><font face="Segoe UI">-Faire prendre conscience de l’urgente nécessité de changer les pratiques de mobilité par la sensibilisation, la formation, l’expérimentation, …</font></p><p><font face="Segoe UI">-Recréer l’effet « place du village » ou « vie de quartier », par une mobilité adaptée au changement climatique</font></p><p dir="ltr"><span></span></p>',
    eligibility:
      "<p>Présentation du projet par le bénéficiaire en groupe technique puis en Comité de Programmation</p><p>Le projet sera passé au crible d'une grille de sélection :&nbsp;</p><p>6 questions de 0 à 4 points</p><p></p><ul><li>1- RAYONNEMENT</li><li>2- PARTENARIAT &amp; COLLABORATION</li><li>3- ORIGINALITE &amp; INNOVATION</li><li>4- EFFET LEVIER LEADER</li><li>5- PERENNITE &amp; IMPACT A LONG TERME</li><li>6- PERTINENCE AVEC LA STRATEGIE DU GAL</li></ul><p>Avec une notation :&nbsp;</p><p></p><ul><li>&lt; 12/24 <span>\t\t</span>: Avis défavorable // Commentaires obligatoires</li><li>Entre 12 et 16/24 <span>\t</span>: Avis favorable avec réserves // Commentaires obligatoires</li><li>&gt; 16/24 <span>\t\t</span>: Avis favorable sans réserve // Commentaires facultatifs&nbsp;</li></ul><p><br></p>",
    perimeter: "PAYS DES CHÂTEAUX",
    perimeter_scale: "Ad-hoc",
    mobilization_steps: ["Réflexion / conception"],
    origin_url: "https://www.paysdeschateaux.fr/leader/2023-2027-pr%C3%A9sentation-r%C3%A9alisations",
    categories: [
      "Développement économique / production et consommation / Economie circulaire",
      "Développement économique / production et consommation / Economie locale et circuits courts",
      "Développement économique / production et consommation / Economie sociale et solidaire",
      "Fonctions support / Appui méthodologique",
      "Fonctions support / Animation et mise en réseau",
      "Mobilité / transports / Mobilité partagée",
      "Mobilité / transports / Mobilité pour tous",
      "Mobilité / transports / Connaissance de la mobilité",
      "Mobilité / transports / Mobilité et véhicules autonomes",
    ],
    is_call_for_project: false,
    application_url: "https://www.paysdeschateaux.fr/leader/2023-2027-monter-son-dossier-leader",
    targeted_audiences: [
      "Commune",
      "Intercommunalité / Pays",
      "Département",
      "Etablissement public dont services de l'Etat",
      "Entreprise publique locale (Sem, Spl, SemOp)",
      "Association",
      "Entreprise privée",
      "Particulier",
      "Agriculteur",
      "Recherche",
    ],
    aid_types: ["Subvention"],
    aid_types_full: [
      {
        id: 1,
        name: "Subvention",
        group: {
          id: 1,
          name: "Aide financière",
        },
      },
    ],
    is_charged: false,
    destinations: ["Dépenses de fonctionnement", "Dépenses d’investissement"],
    start_date: "2024-01-01",
    predeposit_date: null,
    submission_deadline: "2024-06-22",
    subvention_rate_lower_bound: null,
    subvention_rate_upper_bound: 80,
    subvention_comment:
      "Taux variable en fonction du plan de financement et des cofinanceurs. Plancher d'aide LEADER : 5 000 € // Plafond d'aide LEADER : 30 000 €",
    loan_amount: null,
    recoverable_advance_amount: null,
    contact:
      '<p dir="ltr">Geoffrey BELHOUTE<br></p><p dir="ltr"><span>Chargé de mission LEADER&nbsp;&nbsp;</span></p><p dir="ltr"><span>Tel : 06 32 04 43 15&nbsp;</span></p><p dir="ltr"><span>Courriel :&nbsp;</span><a href="mailto:cep@paysdeschateaux.fr" target="_blank"><span>leader@paysdeschateaux.fr</span></a></p>',
    recurrence: "Récurrente",
    project_examples:
      "<p>Quelques exemples :&nbsp;</p><ul><li>Mettre en place l’autopartage / un réseau d’autostop organisé et/ou amélioré</li><li>Réutiliser les anciennes voies de fret pour un nouvel usage de mobilité</li><li>Créer des itinéraires « bis » pour piétons ou cyclistes en dehors de routes (réouvertures d’anciennes voies, ...)</li><li>Former, créer des réseaux pour les décideurs (chefs d’entreprises, élus, …) sur les questions de mobilité sobre</li><li>Etudier et investir autour de nouvelles formes de mobilité douce</li><li>Solutions à destination des publics non véhiculés (sans permis, jeune, personne âgée)</li><li>Rendre plus simple l’accès aux services en télétravail</li><li>Mutualiser des services entre entreprises ou associations</li><li>Sensibilisation, organisation d’évènements autour de la mobilité pour une meilleure prise de conscience</li><li>Recréer une proximité entre services au sein d’une commune ou d’un quartier</li><li>Etude et investissement autour de solutions spécifiques de mobilité pour des publics de premières nécessités</li></ul>",
    import_data_url: null,
    import_data_mention: null,
    import_share_licence: null,
    date_created: "2024-06-18T14:52:00+00:00",
    date_updated: "2024-06-19T07:41:07+00:00",
    project_references: [],
  },
  {
    id: 162935,
    slug: "preserver-la-biodiversite-et-sensibiliser-tous-les-publics-aux-enjeux-du-futur",
    url: "/aides/preserver-la-biodiversite-et-sensibiliser-tous-les-publics-aux-enjeux-du-futur/",
    name: "Rassembler les acteurs autour de l’économie circulaire et la valorisation de nos ressources locales",
    name_initial: "LEADER - Fiche Action Economie circulaire",
    short_title: null,
    financers: ["Châteaux (Syndicat mixte)"],
    financers_full: [
      {
        id: 1371,
        name: "Châteaux (Syndicat mixte)",
        logo: "https://aides-territoires-prod.s3.fr-par.scw.cloud/aides-territoires-prod/backers/chateaux-syndicat-mixte_logo.png",
      },
    ],
    instructors: ["Conseil régional du Centre-Val de Loire"],
    instructors_full: [
      {
        id: 85,
        name: "Conseil régional du Centre-Val de Loire",
        logo: "https://aides-territoires-prod.s3.fr-par.scw.cloud/aides-territoires-prod/backers/region-centre-val-de-loire_logo.png",
      },
    ],
    programs: ["🇪🇺 LEADER - Liaison entre Actions de Développement de l’Économie Rurale"],
    description:
      '<p><ul><li>Développer l’utilisation et la disponibilité des agromatériaux et bois locaux</li><li>Sensibiliser et accompagner tous les acteurs à l’intérêt des filières d’agromatériaux et énergies renouvelables et à la valorisation des déchets</li><li>Développer des filières de recyclage / réutilisation des matériaux</li><li>Accompagner les entreprises, les collectivités locales et les agriculteurs à la gestion efficiente de l’eau</li><li>Accompagner les artisans et professionnels sur les enjeux de l’adaptation au changement climatique de l’économie circulaire et de la sobriété énergétique</li></ul></p><p dir="ltr"><span></span></p>',
    eligibility:
      "<p>Présentation du projet par le bénéficiaire en groupe technique puis en Comité de Programmation</p><p>Le projet sera passé au crible d'une grille de sélection :&nbsp;</p><p>6 questions de 0 à 4 points</p><p></p><ul><li>1- RAYONNEMENT</li><li>2- PARTENARIAT &amp; COLLABORATION</li><li>3- ORIGINALITE &amp; INNOVATION</li><li>4- EFFET LEVIER LEADER</li><li>5- PERENNITE &amp; IMPACT A LONG TERME</li><li>6- PERTINENCE AVEC LA STRATEGIE DU GAL</li></ul><p>Avec une notation :&nbsp;</p><p></p><ul><li>&lt; 12/24 <span>\t\t</span>: Avis défavorable // Commentaires obligatoires</li><li>Entre 12 et 16/24 <span>\t</span>: Avis favorable avec réserves // Commentaires obligatoires</li><li>&gt; 16/24 <span>\t\t</span>: Avis favorable sans réserve // Commentaires facultatifs&nbsp;</li></ul>",
    perimeter: "PAYS DES CHÂTEAUX",
    perimeter_scale: "Ad-hoc",
    mobilization_steps: ["Réflexion / conception"],
    origin_url: "https://www.paysdeschateaux.fr/leader/2023-2027-pr%C3%A9sentation-r%C3%A9alisations",
    categories: [
      "Énergies / Déchets / Economie d'énergie et rénovation énergétique",
      "Énergies / Déchets / Recyclage et valorisation des déchets",
      "Développement économique / production et consommation / Economie circulaire",
      "Développement économique / production et consommation / Economie locale et circuits courts",
      "Développement économique / production et consommation / Economie sociale et solidaire",
      "Nature / environnement / Biodiversité",
      "Fonctions support / Appui méthodologique",
      "Fonctions support / Animation et mise en réseau",
    ],
    is_call_for_project: false,
    application_url: "https://www.paysdeschateaux.fr/leader/2023-2027-monter-son-dossier-leader",
    targeted_audiences: [
      "Commune",
      "Intercommunalité / Pays",
      "Département",
      "Etablissement public dont services de l'Etat",
      "Entreprise publique locale (Sem, Spl, SemOp)",
      "Association",
      "Entreprise privée",
      "Particulier",
      "Agriculteur",
      "Recherche",
    ],
    aid_types: ["Subvention"],
    aid_types_full: [
      {
        id: 1,
        name: "Subvention",
        group: {
          id: 1,
          name: "Aide en ingénierie",
        },
      },
    ],
    is_charged: false,
    destinations: ["Dépenses de fonctionnement", "Dépenses d’investissement"],
    start_date: "2024-01-01",
    predeposit_date: null,
    submission_deadline: "2024-06-25",
    subvention_rate_lower_bound: null,
    subvention_rate_upper_bound: 80,
    subvention_comment:
      "Taux variable en fonction du plan de financement et des cofinanceurs. Plancher d'aide LEADER : 5 000 € // Plafond d'aide LEADER : 30 000 €",
    loan_amount: null,
    recoverable_advance_amount: null,
    contact:
      '<p dir="ltr">Geoffrey BELHOUTE<br></p><p dir="ltr"><span>Chargé de mission LEADER&nbsp;&nbsp;</span></p><p dir="ltr"><span>Tel : 06 32 04 43 15&nbsp;</span></p><p dir="ltr"><span>Courriel :&nbsp;</span><a href="mailto:cep@paysdeschateaux.fr" target="_blank"><span>leader@paysdeschateaux.fr</span></a></p>',
    recurrence: "Récurrente",
    project_examples:
      "<p>Quelques exemples :&nbsp;</p><p></p><ul><li>Réfléchir et investir sur la réduction, la récupération d’eau et son utilisation</li><li>Réfléchir et investir sur la réutilisation des eaux usées</li><li>Sensibiliser sur l’utilisation de l’eau dans les différents usages domestiques</li><li>Adapter les aménagements autour de la consommation d’eau (récupération, …)</li><li>Sensibiliser sur le devenir des déchets (réutilisation, valorisation, …) et leur recyclage</li><li>Mettre en place des ressourceries, des matériauthèques / des solutions autour de la récupération de matériaux</li><li>Sensibiliser et accompagner sur les agro-matériaux ou bio sourcés</li><li>Mener des inventaires, états des lieux, études, études de faisabilité sur les filières d’agromatériaux</li><li>Sensibiliser et communiquer sur l’adaptation au changement climatique</li><li>Sensibiliser et communiquer auprès des élus et/ou techniciens sur l’usage des bâtiments et la maitrise de l’énergie</li><li>Mener des réflexions, études et investissements sur les nouvelles énergies renouvelables et de récupération</li></ul>",
    import_data_url: null,
    import_data_mention: null,
    import_share_licence: null,
    date_created: "2024-06-18T14:50:00+00:00",
    date_updated: "2024-06-19T07:42:09+00:00",
    project_references: [],
  },
];
