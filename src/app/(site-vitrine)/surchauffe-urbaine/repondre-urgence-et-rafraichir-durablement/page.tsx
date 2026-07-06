import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import CallOut from "@codegouvfr/react-dsfr/CallOut";
import Button from "@codegouvfr/react-dsfr/Button";

export const metadata: Metadata = computeMetadata(
  "Vague de chaleur : répondre à l'urgence",
  "Vague de chaleur, surchauffe urbaine, îlot de chaleur urbain : découvrez les premières actions à " +
    "mener et comment intégrer le rafraîchissement urbain dans vos projets d'aménagement.",
);

export default function SurchauffeUrbaineComprendreLesRisquesPage() {
  return (
    <>
      <div className="fr-container">
        <h1 className="mt-8 text-center text-[1.75rem] font-bold text-dsfr-text-title-grey">
          Vague de chaleur : répondre à l'urgence, rafraîchir durablement son territoire
        </h1>
        <p className="mb-6 mt-16">Mis à jour le 06/07/2026</p>
        <div className="fr-text--lg flex flex-col gap-16">
          <section>
            <p>
              En juin 2026, la France bat tous ses records de chaleur. Les 24 et 25 juin sont les journées les plus
              chaudes jamais enregistrées depuis le début des relevés météorologiques en 1900. L’indicateur thermique
              national atteint 30°C en moyenne sur 24h et les températures maximales dépassent 40°C sur une grande
              partie du territoire. D'ici 2050, ces épisodes pourraient se produire sur une fenêtre de mai à septembre
              et durer jusqu’à deux mois consécutifs.
            </p>
          </section>
          <section>
            <CallOut title="Qu’est-ce qu’une vague de chaleur ?" iconId="ri-information-line" bodyAs="div">
              Une vague de chaleur se caractérise par des températures nettement supérieures aux normales pendant
              plusieurs jours. En France, on parle de vague de chaleur lorsque la température moyenne quotidienne
              dépasse 25,3 °C. Quand ces températures élevées persistent de jour comme de nuit pendant au moins 3 jours
              et constituent un risque sanitaire, on parle de canicule, une notion évaluée département par département.
              <div className="mt-2">Source : Météo-France</div>
            </CallOut>
            <p>
              Lorsqu'une vague de chaleur frappe, des premières actions sont possibles pour faire face à la situation de
              crise. Elles ne se substituent pas à une stratégie de rafraichissement de long terme, elles contribuent à
              limiter les risques pour les personnes les plus vulnérables.
            </p>
            <p>
              Pour aller au-delà de l'urgence et lutter durablement contre la surchauffe urbaine, Plus fraîche ma ville
              met à disposition des collectivités les outils qui permettent de bâtir les projets adaptés aux besoins de
              leurs territoires.
            </p>
            <div className="text-center">
              <Button
                linkProps={{ href: PFMV_ROUTES.ESPACE_PROJET }}
                className="mt-4 rounded-3xl text-center"
                priority="primary"
              >
                Démarrer mon projet sur Plus fraîche ma ville
              </Button>
            </div>
          </section>
          <section>
            <h2>Identifier en priorité les personnes les plus à risque</h2>
            <p>
              Tous les habitants ne sont pas égaux face à la chaleur. Les personnes âgées, les enfants, les femmes
              enceintes, les travailleurs en extérieur et les habitants de logements mal isolés présentent des risques
              significativement plus élevés. Habiter sous les toits multiplie par 4 le risque de décès lors d'une
              canicule.
            </p>
            <p>
              Identifier ces populations sur le territoire et mettre en place des dispositifs de protection est le
              premier réflexe à avoir.
            </p>
          </section>
          <section>
            <h2>Des solutions mobilisables rapidement face aux vagues de chaleur</h2>
            <p>
              En situation de crise, certaines actions ou solutions rapides à mettre en œuvre peuvent limiter
              l’inconfort thermique. Elles gagnent néanmoins en efficacité quand elles s'inscrivent dans une stratégie
              plus globale.
            </p>
          </section>
          <section>
            <h2>Adapter les comportements : un premier rempart contre la chaleur</h2>
            <ul className="list-disc md:ml-4">
              <li>
                <LinkWithoutPrefetch
                  href={PFMV_ROUTES.FICHE_SOLUTION("comportements-individuels")}
                  className="text-pfmv-navy"
                >
                  Adapter les comportements individuels
                </LinkWithoutPrefetch>{" "}
                : Ajuster les horaires d'activité, limiter les efforts physiques aux heures les plus chaudes, s'hydrater
                régulièrement. Des mesures à diffuser largement auprès des habitants et des agents.
              </li>
              <li>
                <LinkWithoutPrefetch
                  href={PFMV_ROUTES.FICHE_SOLUTION("comportements-collectifs")}
                  className="text-pfmv-navy"
                >
                  Organiser une réponse collective
                </LinkWithoutPrefetch>{" "}
                : Signaler les personnes isolées, adapter les horaires des services publics, mobiliser des acteurs de
                proximité. La solidarité de voisinage est un levier essentiel en période de crise.
              </li>
              <li>
                <LinkWithoutPrefetch
                  href={PFMV_ROUTES.FICHE_SOLUTION("cartographie-refuges-climatiques")}
                  className="text-pfmv-navy"
                >
                  Cartographier les refuges climatiques existants
                </LinkWithoutPrefetch>{" "}
                : Recenser et informer sur les lieux frais déjà accessibles (bâtiments publics, espaces verts, points
                d’eau, commerces climatisés) où les populations peuvent trouver du réconfort thermique pendant les
                vagues de chaleur.
              </li>
            </ul>
          </section>
          <section>
            <h2>S’équiper pour protéger bâtiments et espaces publics</h2>
            <ul className="mb-6 list-disc md:ml-4">
              <li>
                <LinkWithoutPrefetch
                  href={PFMV_ROUTES.FICHE_SOLUTION("facade-structure-ombrage")}
                  className="text-pfmv-navy"
                >
                  Protéger le bâtiment du soleil avec des structures d’ombrages
                </LinkWithoutPrefetch>{" "}
                sur les façades (volets, films de protection solaire, stores, auvents, etc.) : Une manière de limiter la
                hausse de la température à l’intérieur et de garder la fraîcheur en interceptant le rayonnement solaire
                avant qu'il ne pénètre à travers les surfaces vitrées sans consommer d’électricité.
              </li>
              <li>
                <LinkWithoutPrefetch href={PFMV_ROUTES.FICHE_SOLUTION("structure-ombrage")} className="text-pfmv-navy">
                  Installer des structures d'ombrage
                </LinkWithoutPrefetch>{" "}
                <strong>
                  dans les espaces extérieurs fréquentés (voiles, pergolas, toiles tendues, auvents, etc.)
                </strong>{" "}
                : L’objectif est de limiter les rayonnements solaires directs et pour protéger la santé et préserver les
                activités essentielles pendant les fortes chaleurs. Elles sont particulièrement pertinentes dans les
                cours d'école, les parcs de jeux, les places accueillant des manifestations ou les infrastructures
                sportives.
              </li>
            </ul>
            <CallOut title="La climatisation : quand y recourir et comment ?" iconId="ri-information-line" bodyAs="div">
              <p>
                Lors des vagues de chaleur, la priorité est de protéger les personnes les plus vulnérables (enfants,
                personnes âgées, malades, travailleurs exposés). La première réponse est de limiter la surchauffe des
                bâtiments : volets fermés en journée, aération nocturne ou très tôt le matin, brasseurs d'air,
                ventilateurs.
              </p>
              <p>
                Lorsque ces solutions ne suffisent pas ou sont impossibles, la climatisation peut être nécessaire. Tous
                les équipements ne se valent pas. Les pompes à chaleur air-air réversibles, par exemple, donnent de bons
                résultats en termes d’efficacité énergétique car elles assurent le chauffage en hiver et le
                rafraîchissement en été. Elles peuvent à ce titre bénéficier d’aides publiques. Les climatiseurs
                mobiles, souvent achetés dans l’urgence, sont moins efficaces et peuvent coûter jusqu’à trois fois plus
                cher à l’usage : à réserver aux situations de crise dans les établissements accueillant du public pour
                protéger la santé des habitants.
              </p>
              <p>
                Quel que soit l’équipement, l'usage fait toute la différence : régler la consigne à 26°C plutôt que 23°C
                permet de diviser par trois la consommation. Par ailleurs, un recours massif et non maîtrisé à la
                climatisation peut intensifier localement le phénomène d’îlot de chaleur urbain et faire augmenter les
                températures extérieures.
              </p>
              <p>
                En savoir plus sur{" "}
                <LinkWithoutPrefetch
                  href={PFMV_ROUTES.FICHE_SOLUTION("climatisation-raisonnee")}
                  className="text-pfmv-navy"
                >
                  l’utilisation raisonnée de la climatisation
                </LinkWithoutPrefetch>
              </p>
            </CallOut>
          </section>
          <section>
            <h2>
              Au-delà de l’urgence estivale : intégrer le rafraîchissement urbain dans tous les projets d’aménagement
            </h2>
            <div className="text-center">
              <Button
                linkProps={{ href: PFMV_ROUTES.ESPACE_PROJET }}
                className="my-4 rounded-3xl text-center"
                priority="primary"
              >
                Agir durablement sur mon territoire avec Plus fraîche ma ville
              </Button>
            </div>
            <p>
              Si les réponses d'urgence sont parfois indispensables, elles ne permettront pas de transformer durablement
              les espaces urbains pour préserver la santé publique et la qualité de vie des habitants.
            </p>
            <p>
              La surchauffe urbaine est causée par plusieurs facteurs : morphologie urbaine, manque de végétation,
              surfaces minérales sombres, voitures thermiques, chauffage à partir d’énergies fossiles, etc. Elle ne se
              résout pas avec une seule solution “miracle”, et appelle une combinaison d'interventions sur la
              végétation, l'eau, les matériaux et les usages qui nécessite la mobilisation et la coordination
              transversale des services de la collectivité.
            </p>
          </section>
          <section>
            <h2>Un service pour agir sur tous les projets de la commune</h2>
            <p>
              Rues, écoles, places, équipements sportifs : le rafraîchissement urbain peut s'intégrer dans tous les
              projets de la commune. Chaque choix d'aménagement est susceptible d'amplifier ou de réduire la chaleur
              ressentie par les habitants.
            </p>
            Plus fraîche ma ville permet de ne pas partir d'une page blanche :
            <ul className="list-disc md:ml-4">
              <li>
                <strong>45 solutions éprouvées</strong>, filtrées par type d'espace, délai de mise en œuvre et coût ;
              </li>
              <li>
                <strong>Calcul de coefficient de rafraîchissement urbain d’un site </strong> pour identifier les
                priorités d'action ;
              </li>
              <li>
                <strong>Aide au choix de la méthode de diagnostic </strong> adaptée à la situation et aux moyens de la
                collectivité ;
              </li>
              <li>
                <strong>Premières estimations budgétaires </strong> et identification des aides financières mobilisables
                ;
              </li>
              <li>
                <strong>Plus de 60 retours d'expérience </strong>
                de collectivités ayant mené des projets de rafraîchissement urbain
              </li>
            </ul>
            <p>
              Chaque ville possède sa propre “signature thermique”. Plus fraîche ma ville est un service qui propose une
              boîte à outils accessible (données territoriales, retours d'expérience, expertise de l'ADEME et de ses
              partenaires) pour se poser les bonnes questions avant d'agir.
            </p>
          </section>
          <section>
            <h2>Ressources</h2>
            <strong>Données et expertises</strong>
            <ul className="mb-8 list-disc md:ml-4">
              <li>
                <LinkWithoutPrefetch href="https://tacct.ademe.fr/?utm_source=PFMV" target="_blank">
                  Facteurs d'inconfort thermique sur votre commune
                </LinkWithoutPrefetch>
                , Facili-TACCT
              </li>
              <li>
                <LinkWithoutPrefetch
                  href="https://librairie.ademe.fr/urbanisme-territoires-et-sols/9422-avis-de-l-ademe-agir-pour-rafraichir-durablement-nos-villes-et-villages.html"
                  target="_blank"
                >
                  Agir pour rafraîchir durablement nos villes et villages
                </LinkWithoutPrefetch>
                , Avis de l'ADEME, juin 2026
              </li>
              <li>
                <LinkWithoutPrefetch
                  href="https://www.ademe.fr/presse/communique-national/avis-de-lademe-vagues-de-chaleur-la-climatisation-va-t-elle-devenir-indispensable/"
                  target="_blank"
                >
                  La climatisation va-t-elle devenir indispensable ?
                </LinkWithoutPrefetch>
                , Avis de l'ADEME, juin 2024
              </li>
              <li>
                <LinkWithoutPrefetch
                  href="https://www.ademe.fr/presse/communique-national/vagues-de-chaleur-de-nouveaux-outils-pour-rafraichir-dans-lespace-public-et-au-travail/"
                  target="_blank"
                >
                  Renforcer notre endurance face aux vagues de chaleur
                </LinkWithoutPrefetch>
                , Plan gouvernemental, juin 2026
              </li>
              <li>
                <LinkWithoutPrefetch
                  href="https://www.santepubliquefrance.fr/climat/fortes-chaleurs-canicule/bulletin-national/chaleur-et-sante-bilan-de-lete-"
                  target="_blank"
                >
                  Nouveaux outils pour rafraîchir dans l'espace public et au travail
                </LinkWithoutPrefetch>
                , Communiqué de presse ADEME, juin 2026
              </li>
              <li>
                <LinkWithoutPrefetch href="" target="_blank">
                  Chaleur et santé : Bilan de l'été 2025
                </LinkWithoutPrefetch>
                , Santé publique France
              </li>
            </ul>
            <strong>Écoles et chaleur</strong>
            <ul className="list-disc md:ml-4">
              <li>
                <LinkWithoutPrefetch href={PFMV_ROUTES.FICHES_SOLUTIONS + `?espaceFilter=ecole`}>
                  Solutions pour bâtiments et cours d'école
                </LinkWithoutPrefetch>{" "}
                sur Plus fraîche ma ville
              </li>
              <li>
                <LinkWithoutPrefetch href="https://www.cerema.fr/fr/actualites/ecoles-chaleur-agir-maintenant-livret-du-cerema-presente">
                  Écoles & chaleur
                </LinkWithoutPrefetch>{" "}
                : agir maintenant, Cerema
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
