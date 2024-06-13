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

// no financial, no technical, no aid_type
// aid_types only "Subvention", "Ingénierie technique", "Ingénierie financière", "Ingénierie Juridique / administrative"

export const aides: AidesTerritoiresAide[] = [
  {
    id: 162670,
    slug: "deployer-des-moyens-dingenierie-en-faveur-des-projets-de-revitalisation-des-centres-bourgs",
    url: "/aides/deployer-des-moyens-dingenierie-en-faveur-des-projets-de-revitalisation-des-centres-bourgs/",
    name: "Déployer des moyens d'ingénierie en faveur des projets de revitalisation des centres-bourgs",
    name_initial:
      // eslint-disable-next-line max-len
      "Préserver et dynamiser un maillage de centres-bourgs vivants, structures de la ruralité ligérienne - AAP 3.1 - Déployer des moyens d'ingénierie",
    short_title: null,
    financers: ["GAL Loire"],
    instructors: [],
    programs: ["🇪🇺 LEADER - Liaison entre Actions de Développement de l’Économie Rurale"],
    description:
      // eslint-disable-next-line max-len
      "<p><strong>CONTEXTE ET DESCRIPTIF DU DISPOSITIF</strong><br></p><p><strong>Cet appel à projets s'inscrit dans le cadre du programme LEADER Loire 2023-2027, qui a pour objectif de favoriser la transition vers la sobriété et l'amélioration des conditions de vie dans nos territoires ruraux.</strong></p><p><strong>1. Contexte</strong></p><p>Les centres-bourgs constituent l’armature de la ruralité ligérienne. Lieux de vie, de services, d’offres\r\nculturelles et commerciales, ils permettent à la population de bénéficier d’un cadre de vie qualitatif\r\nsans être soumise à des déplacements trop longs.</p><p>En effet, dans les territoires à faible densité, plus de 50% de la part de CO2 est produite par les transports\r\n(hommes et marchandises) et ce coût, sans cesse augmenté, est une source de précarité énergétique\r\nau moins aussi importante que celle du logement. L’enjeu de réduction de ces impacts se conjugue\r\navec l’enjeu de revitalisation des centres-bourgs. Il est donc important de préserver l’actuel maillage\r\nde centres-bourgs et de le dynamiser pour réajuster la trajectoire de leur développement et tendre\r\nvers la sobriété.</p><p><strong>Les objectifs poursuivis par le GAL sont de :</strong></p><p><span>&nbsp; &nbsp; &nbsp;</span>-&nbsp;D’améliorer la concertation publique / privée dans les projets de revitalisation des centres-bourgs</p><p><span>&nbsp; &nbsp; &nbsp;</span><span>-</span><span>&nbsp;Déployer des moyens d’ingénierie pour améliorer la vision prospective et concertée des\r\nprojets de développement des centres-bourgs</span></p><p><span>&nbsp; &nbsp; &nbsp;</span>-&nbsp;Favoriser les expérimentations en centre-bourg</p><p>La prise en compte des enjeux de transition écologique et énergétique :</p><p><span>&nbsp; &nbsp; &nbsp;</span>-&nbsp;Favoriser le développement des centres-bourgs qui tendent vers la sobriété</p><p><span>&nbsp; &nbsp; &nbsp;</span>-&nbsp;Sensibiliser les habitants et les usagers</p><p><span>&nbsp; &nbsp; &nbsp;</span>-&nbsp;Adapter ou réutiliser l’existant et développer sa polyvalence</p><p><br></p><p><strong>2. Description du dispositif</strong></p><p>Au travers du présent appel à projets, le GAL Loire vise à soutenir :</p><p><span>&nbsp; &nbsp; &nbsp;</span>- L’élaboration de projets prospectifs, intégrés et multisectoriels de revitalisation des centres-bourgs ;</p><p><span>&nbsp; &nbsp; &nbsp;</span>- L’accompagnement pour la montée en compétences des acteurs publics et privés sur la\r\nthématique de revitalisation des centres-bourgs ;</p><p><span>&nbsp; &nbsp; &nbsp;</span>- La mise en place de démarches participatives, de méthodes innovantes intégrant la\r\nconcertation des citoyens dans les projets de revitalisation des centres-bourgs ;</p><p><span>&nbsp; &nbsp; &nbsp;</span>- L’émergence de projets opérationnels innovants, qualitatifs et éco-responsables évitant\r\nl’étalement urbain et permettant de redensifier le centre-bourg.</p><p>Les caractères innovant, qualitatif et éco-responsable s‘apprécieront au regard de la grille de\r\nsélection.</p><p>À ce titre seront soutenues, plus précisément, les actions suivantes :</p><p><span>&nbsp; &nbsp; &nbsp;</span>- Les actions d’animation ;</p><p><span>&nbsp; &nbsp; &nbsp;</span>- Les actions de communication ;</p><p><span>&nbsp; &nbsp; &nbsp;</span>- Les formations ;</p><p><span>&nbsp; &nbsp; &nbsp;</span>- Les études ;</p><p><span>&nbsp; &nbsp; &nbsp;</span>- La création d’outils et de services numériques ;</p><p>&nbsp; &nbsp; &nbsp;- La création et diffusion culturelle et artistique.</p><p><strong>---&gt;</strong> Sont inéligibles les projets éligibles aux autres dispositifs FEADER régionaux de droit commun ou aux\r\ndispositifs européens FEDER/FSE. Se renseigner auprès du GAL<br></p>",
    eligibility:
      // eslint-disable-next-line max-len
      "<p><strong style=\"background-color: var(--body-bg); color: var(--text-color); font-family: var(--font-family-base); font-size: var(--font-size-base); text-align: var(--bs-body-text-align);\">PORTEURS DE PROJETS ELIGIBLES</strong><br></p><p>Pour présenter une candidature à cet appel à projets, sont éligibles les bénéficiaires suivants :</p><p><span>&nbsp; &nbsp; &nbsp;</span>− Toute personne physique ou morale</p><p>Sont inéligibles :</p><p><span>&nbsp; &nbsp; &nbsp;</span>− Les bénéficiaires définis comme inéligibles dans le document « Les règles communes à toutes\r\nles aides FEADER » ;</p><p><span>&nbsp; &nbsp; &nbsp;</span>−&nbsp;Les indivisions.</p><p><br></p><p><strong>CONDITIONS D’ELIGIBILITE</strong></p><p>Les conditions d’éligibilité sont les obligations qui doivent être remplies au moment de la sélection pour\r\nque le projet soit éligible au présent appel à projets. Ces conditions sont les suivantes :</p><p><span>&nbsp; &nbsp; &nbsp;</span>• Les conditions d’éligibilité définies dans le document « Les règles communes à toutes les aides\r\nFEADER » consultables sur le site du Guide des aides de la Région Auvergne Rhône-Alpes\r\nhttps://www.auvergnerhonealpes.fr/aides, dans la rubrique « Déposer une demande » du\r\ndispositif concerné.</p><p>&nbsp; &nbsp; &nbsp;• Le projet ne doit pas avoir commencé<span>&nbsp;</span><span>(signature de devis ou de bon de commande, paiement d'un acompte, attribution d'un marché public, etc.)</span><span>&nbsp;avant l'obtention de l'accusé de réception de dépôt du dossier.</span></p><p><span>&nbsp; &nbsp; &nbsp;</span>• La localisation du projet doit se situer dans la partie agglomérée d’une commune éligible\r\n(annexe 1). Un plan de localisation devra être fourni par le porteur de projet.</p><p><span>&nbsp; &nbsp; &nbsp;</span>• Pour les actions concernant l’élaboration de projets prospectifs, intégrés et multisectoriels de\r\nrevitalisation des centres-bourgs, un argumentaire devra être fourni par le porteur de projet et\r\nvalidé par le comité de programmation du GAL.</p><p><br></p><p><strong>DÉPENSES</strong></p><p><strong>1. Dépenses éligibles</strong></p><p><strong>---&gt; </strong>Les dépenses doivent être supportées par le bénéficiaire, être nécessaires à la réalisation de\r\nl’opération et comporter un lien démontré avec celle-ci.</p><p>Peuvent être financées les dépenses suivantes :</p><p>Dépenses au réel :</p><p>- Toutes dépenses (matérielles et immatérielles) directement liées à l’opération y compris :</p><p>&nbsp; &nbsp; &nbsp;o Le matériel d’occasion selon les conditions précisées dans le document « Les règles communes à toutes les aides FEADER » ;</p><p><span>&nbsp; &nbsp; &nbsp;</span>o Les dépenses de déplacement de personnes non rémunérées par la structure ou les dépenses\r\nde déplacement hors France métropolitaine ;</p><p><span>&nbsp; &nbsp; &nbsp;</span>o Tout devis ou facture inférieur à 100 € HT.</p><p>- Dépenses sous forme de coûts simplifiés (OCS) :</p><p><span>&nbsp; &nbsp; &nbsp;</span>o Les frais de personnel directs, pris en charge sous forme de coûts unitaires ;</p><p><span>&nbsp; &nbsp; &nbsp;</span>o Les coûts indirects et frais de déplacement, pris en compte sous forme d’un taux forfaitaire\r\nrespectif de 15% et 5% des frais de personnel directs éligibles.\r\nLes modalités de prise en compte des dépenses sous formes de coûts simplifiés (OCS) sont décrites\r\ndans le document « Les règles communes à toutes les aides FEADER » partie « règles communes relatives\r\nà la mise en place des options de coûts simplifiés », consultables sur le site du Guide des aides de la\r\nRégion Auvergne Rhône Alpes https://www.auvergnerhonealpes.fr/aides, dans la rubrique « Déposer\r\nune demande » du dispositif concerné.</p><p><br></p><p><strong>2. Dépenses inéligibles</strong></p><p><span>&nbsp; &nbsp; &nbsp;</span>- Les dépenses définies comme inéligibles dans le document « Les règles communes à toutes les\r\naides FEADER » ;</p><p><span>&nbsp; &nbsp; &nbsp;</span>- Les véhicules standards (utilitaires, remorques) sans aménagement spécifique ;</p><p><span>&nbsp; &nbsp; &nbsp;</span>- Les études exclusives de voirie et réseaux divers ;</p><p><span>&nbsp; &nbsp; &nbsp;</span>- Les diagnostics énergétiques exclusifs ;</p><p><span>&nbsp; &nbsp; &nbsp;</span>- Les frais de bouche ;</p><p><span>&nbsp; &nbsp; &nbsp;</span>- Les études préalables initiées en amont du dépôt du projet ;</p><p><span>&nbsp; &nbsp; &nbsp;</span>- Les frais de personnel directs éligibles aux projets d’animation des dispositifs Petites Villes de Demain\r\net Villages d’Avenir ;</p><p><span>&nbsp; &nbsp; &nbsp;</span>- Les études portant exclusivement sur la création ou le développement de commerces ou services.</p><p><br></p><p><strong>3. Plancher et plafond de mes dépenses</strong></p><p>Pour être éligibles, les projets doivent présenter des dépenses pour un montant devant dépasser\r\n5 000 € HT de dépenses éligibles retenues après instruction.</p><p><strong>---&gt; Seules les dépenses initiées après le dépôt de votre dossier sont éligibles à la subvention. Cette\r\ndate est rappelée dans votre récapitulatif de demande après saisie de votre dossier en ligne. Vous\r\ndevez donc veiller à déposer votre dossier avant le début de réalisation de votre projet.</strong></p><p><strong>---&gt;&nbsp;Les dépenses initiées avant le dépôt de votre dossier peuvent rendre la totalité de votre projet\r\ninéligible ; c’est notamment le cas pour les projets n’ayant pas une finalité agricole et devant relever\r\nd’un régime d’aide d’Etat. Renseignez-vous auprès du service instructeur.\r\nNB : Par dépenses initiées pour la conduite du projet, il faut comprendre tout devis signé, tout bon pour accord\r\nsigné, toute notification de marché, toute commande passée au bénéfice de la mise en œuvre du projet.</strong></p><p><strong>---&gt;&nbsp;L’attribution d’une subvention n’est pas automatique. Votre demande d’aide peut être rejetée.\r\nAussi, tout commencement des dépenses après le dépôt de votre dossier, mais avant l’éventuelle\r\nnotification de l’aide attribuée, relève de votre seule responsabilité.</strong><br></p><p><strong><br></strong></p><p><strong>MODALITES D’ATTRIBUTION DE L’AIDE POUR MON PROJET</strong></p><p><strong>1. Financeurs possibles</strong></p><p>Cet appel à projets est financé par le fonds européen FEADER (mesure 501 LEADER). Ce financement \r\nest cumulable avec d’autres cofinancements publics non européens&nbsp;(Etat, Région, Département, EPCI…).\r\nL’attribution des subventions FEADER est d’ailleurs conditionnée à l'obtention de cofinancements \r\npublics nationaux (Etat, Région, Département, EPCI…).</p><p><strong>2. Modalité de calcul de l’aide</strong></p><p>Plafond d’aide LEADER : 30 000 €. Le taux d’aide appliqué aux projets sélectionnés est de 80 % de l’assiette des dépenses éligibles HT \r\nretenues par le service instructeur. \r\nLorsque le projet relève d'un règlement d'aide d'Etat, le taux d’aide mentionné ci-dessus est plafonné \r\npar les règles des régimes d’aides d’Etat en vigueur mais ne peut en aucun cas excéder celui du \r\nprésent dispositif.&nbsp;<strong><br></strong></p>",
    perimeter: "GAL Loire AAP Revitalisation de centre-bourg",
    mobilization_steps: ["Réflexion / conception", "Mise en œuvre / réalisation"],
    origin_url: "https://www.loireforez.fr/wp-content/uploads/2024/03/20240306_AAP_3.1_INGENIERIE_ETUDES_approuve.pdf",
    categories: [
      "Urbanisme / logement / aménagement / Espaces verts",
      "Urbanisme / logement / aménagement / Espace public",
      "Urbanisme / logement / aménagement / Foncier",
      "Solidarités / lien social / Accès aux services",
      "Solidarités / lien social / Citoyenneté",
      "Développement économique / production et consommation / Revitalisation",
      "Développement économique / production et consommation / Innovation, créativité et recherche",
      "Urbanisme / logement / aménagement / Accessibilité",
      "Fonctions support / Appui méthodologique",
      "Fonctions support / Animation et mise en réseau",
      "Fonctions support / Valorisation d'actions",
      "Nature / environnement / Solutions d'adaptation fondées sur la nature (SafN)",
    ],
    is_call_for_project: true,
    application_url: "https://www.auvergnerhonealpes.fr/aides/porter-un-projet-leader-feader",
    targeted_audiences: [
      "Commune",
      "Intercommunalité / Pays",
      "Département",
      "Etablissement public dont services de l'Etat",
      "Entreprise publique locale (Sem, Spl, SemOp)",
      "Association",
      "Recherche",
    ],
    // eslint-disable-next-line max-len
    aid_types: ["Subvention", "Ingénierie technique", "Ingénierie financière", "Ingénierie Juridique / administrative"],
    is_charged: false,
    destinations: ["Dépenses de fonctionnement", "Dépenses d’investissement"],
    start_date: "2024-03-20",
    predeposit_date: null,
    submission_deadline: "2025-02-28",
    subvention_rate_lower_bound: 0,
    subvention_rate_upper_bound: 80,
    loan_amount: null,
    recoverable_advance_amount: null,
    contact:
      // eslint-disable-next-line max-len
      '<p>Avant toute procédure de dépôt, contactez les animateurs du GAL Loire pour savoir si votre projet peut être éligible à l\'accompagnement technique et financier LEADER.</p><p>L’<span>équipe LEADER</span>, composée de<span>&nbsp;référents locaux,&nbsp;</span>est à votre écoute pour vous accompagner dans la concrétisation de votre projet.</p><p>Coordination :&nbsp;<a id="dceLink-4" href="tel:04 26 24 72 36">04 26 24 72 36</a></p><p>Mail :&nbsp;<a href="mailto:leaderloire@loireforez.fr">leaderloire@loireforez.fr</a></p><p><span>Pour joindre votre référent local&nbsp;:</span></p><p>Secteur Nord :&nbsp;<a id="dceLink-4" href="tel:04 77 44 64 48">04 77 44 64 48</a></p><p>Secteur Centre :&nbsp;<a id="dceLink-4" href="tel:04 26 24 72 36">04 26 24 72 36</a></p><p>Secteur Sud :&nbsp;<a id="dceLink-4" href="tel:04 74 87 52 01">04 74 87 52 01</a></p>',
    recurrence: "Ponctuelle",
    // eslint-disable-next-line max-len
    project_examples: "<p>https://www.loireforez.fr/entreprendre/les-aides-financieres/leader-loire-2023-2027/<br></p>",
    import_data_url: null,
    import_data_mention: null,
    import_share_licence: null,
    date_created: "2024-05-21T12:15:00+00:00",
    date_updated: "2024-06-09T00:03:04+00:00",
    project_references: [],
  },
];
