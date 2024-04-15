import React from "react";
import Link from "next/link";

export default async function PageMentionsLegales() {
  return (
    <div className="fr-container">
      <h1 className="mt-8">Mentions légales</h1>
      <h2>Éditeur de la plateforme</h2>
      <p>{"Plus fraîche ma ville est édité par l'accélérateur de la transition écologique de l'ADEME situé :"}</p>
      <p>
        155 bis Av. Pierre Brossolette
        <br />
        92240 Montrouge
        <br />
        <a href="tel:+33147652000" target="_blank" rel="nofollow noopener noreferrer">
          01 47 65 20 00
        </a>
        <br />
        <a href="https://ademe.fr" target="_blank" rel="nofollow noopener noreferrer">
          https://ademe.fr
        </a>
      </p>
      <h2>Directeur de la publication</h2>
      <p>
        {"Le directeur de publication est M. Sylvain WASERMAN, agissant en qualité de " +
          "Président-directeur général de l'ADEME."}
      </p>
      <p>
        {"La personne responsable de l'accès aux documents administratifs et des questions relatives à" +
          " la réutilisation des informations est Monsieur Luc MORINIÈRE" +
          " en qualité de Chef du service des affaires juridiques."}
      </p>
      <h2>Hébergement du site</h2>
      <p>
        Ce site est hébergé par Scalingo SAS
        <br />
        9 rue de la Krutenau
        <br />
        67100 Strasbourg
        <br />
        <a href="https://scalingo.com/fr" target="_blank" rel="nofollow noopener noreferrer">
          https://scalingo.com/fr
        </a>
      </p>
      <h2>Accessibilité</h2>
      <p>
        {"La conformité aux normes d'accessibilité numérique est un objectif ultérieur mais tâchons de rendre ce site" +
          " accessible à toutes et tous, conformément à l'article 47 de la loi n°2005-102 du 11 février 2005."}
      </p>
      <h2>Signaler un dysfonctionnement</h2>
      <p>
        {"Si vous rencontrez un défaut d'accessibilité vous empêchant d'accéder à un contenu ou une" +
          " fonctionnalité du site, merci de nous en faire part. Si vous n'obtenez pas de réponse rapide de" +
          " notre part, vous êtes en droit de faire parvenir vos doléances ou une demande de saisine" +
          " au Défenseur des droits."}
      </p>
      <p>
        {"Pour en savoir plus sur la politique d'accessibilité numérique de l'État : "}
        <Link href="https://accessibilite.numerique.gouv.fr/" target="_blank">
          {"https://accessibilite.numerique.gouv.fr/"}
        </Link>
      </p>
      <h2>Sécurité</h2>
      <p>
        {"Le site est protégé par un certificat électronique, matérialisé pour la grande majorité des navigateurs" +
          " par un cadenas. Cette protection participe à la confidentialité des échanges. En aucun cas les" +
          " services associés à la plateforme ne seront à l'origine d'envoi d'emails pour demander la saisie" +
          " d'informations personnelles."}
      </p>
      <h2>Modification des mentions légales</h2>
      <p>
        {"L'ADEME se réserve le droit de modifier les présentes mentions légales à tout moment. L'utilisateur est" +
          " lié par les conditions en vigueur lors de sa visite."}
      </p>
    </div>
  );
}
