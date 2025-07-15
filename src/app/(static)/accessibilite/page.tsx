import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

export default async function PageAccessibilite() {
  return (
    <div className="fr-container">
      <h1 className="mt-8">{"Déclaration d’accessibilité"}</h1>
      <p>
        <strong>{"L'ADEME "}</strong>
        {"s’engage à rendre ses sites internet, intranet, extranet et ses applications mobiles, etc. accessibles" +
          " conformément à l’article 47 de la loi n° 2005-102 du 11 février 2005."}
      </p>
      <span>{"A cette fin, il met en œuvre la stratégie et les actions suivantes :"}</span>
      <ul className="normalList mt-2">
        <li>
          <LinkWithoutPrefetch
            href="https://librairie.ademe.fr/institutionnel/6794-schema-pluriannuel-de-mise-en-accessibilite-des-sites-web-de-l-ademe-2024-2026.html"
            target="_blank"
          >
            Schéma pluriannuel en cours
          </LinkWithoutPrefetch>
        </li>
        <li>
          <LinkWithoutPrefetch
            href="https://librairie.ademe.fr/institutionnel/6823-plan-annuel-de-mise-en-accessibilite-des-sites-web-de-l-ademe.html"
            target="_blank"
          >
            {"Plan d’action de l’année en cours"}
          </LinkWithoutPrefetch>
        </li>
      </ul>
      <p>
        {"Cette déclaration d’accessibilité s’applique au site "}
        <LinkWithoutPrefetch href="https://plusfraichemaville.fr">https://plusfraichemaville.fr/</LinkWithoutPrefetch>.
      </p>
      <h2>{"État de conformité"}</h2>
      <p>
        En l’absence d’audit et dans l’attente de celui-ci, le site{" "}
        <LinkWithoutPrefetch href="https://plusfraichemaville.fr">https://plusfraichemaville.fr/</LinkWithoutPrefetch>{" "}
        n’est pas en conformité avec le référentiel général d’amélioration de l’accessibilité. Les non-conformités et/ou
        les dérogations sont énumérées ci-dessous.
      </p>
      <h2 className="!mb-2">Contenus non accessibles</h2>
      Les contenus listés ci-dessous ne sont pas accessibles pour les raisons suivantes.
      <h3 className="!mb-0 mt-4">Non-conformité</h3>
      <p>Néant</p>
      <h3 className="!mb-0 mt-4">Dérogations pour charge disproportionnée</h3>
      <p>Néant</p>
      <h3 className="!mb-0 mt-4">Contenus non soumis à l’obligation d’accessibilité</h3>
      <p>Néant</p>
      <h2 className="!mb-2">Établissement de cette déclaration d’accessibilité</h2>
      <p>Cette déclaration a été établie le 15/07/2025.</p>
      <ul className="normalList">
        <li>
          Technologies utilisées pour la réalisation du site web :
          <ul className="normalList">
            <li>Infrastructure langage : React / NextJS</li>
            <li>Infrastructure CMS : Strapi</li>
          </ul>
        </li>
        <li>
          Agents utilisateurs, technologies d’assistance et outils utilisés pour vérifier l’accessibilité
          <ul className="normalList">
            <li>
              Les tests des pages web ont été effectués avec les combinaisons de navigateurs web et lecteurs d’écran
              suivants : Néant
            </li>
            <li>Les outils suivants ont été utilisés lors de l’évaluation : Néant</li>
            <li>Pages du site ayant fait l’objet de la vérification de conformité : Néant</li>
          </ul>
        </li>
      </ul>
      <h2>Retour d’information et contact</h2>
      <p>
        Si vous n’arrivez pas à accéder à un contenu ou à un service, vous pouvez contacter le responsable du site
        internet pour être orienté vers une alternative accessible ou obtenir le contenu sous une autre forme.
      </p>
      <ul className="normalList">
        <li>
          <a href="mailto:rgaa@ademe.fr">Envoyer un message au référent accessibilité de l’ADEME</a>
        </li>
        <li>Contacter Estelle Ribot, ADEME, DEMTE — 20 avenue du Grésillé BP 90 406 – 49 004 Angers Cedex 01</li>
      </ul>
      <h2 className="mt-6">Voie de recours</h2>
      <p>
        Cette procédure est à utiliser dans le cas suivant : vous avez signalé au responsable du site internet un défaut
        d’accessibilité qui vous empêche d’accéder à un contenu ou à un des services du portail et vous n’avez pas
        obtenu de réponse satisfaisante.
      </p>
      <ul className="normalList">
        <li>
          Écrire un message au Défenseur des droits (
          <a href="https://formulaire.defenseurdesdroits.fr/" target="_blank">
            https://formulaire.defenseurdesdroits.fr/
          </a>
          )
        </li>
        <li>
          Contacter le délégué du Défenseur des droits dans votre région (
          <a href="https://www.defenseurdesdroits.fr/saisir/delegues" target="_blank">
            https://www.defenseurdesdroits.fr/saisir/delegues/
          </a>
          )
        </li>
        <li>
          Envoyer un courrier par la poste (gratuit, ne pas mettre de timbre)
          <ul className="normalList">
            <li>
              Défenseur des droits
              <br />
              Libre réponse 71120 75342 Paris CEDEX 07
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
