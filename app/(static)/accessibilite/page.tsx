export const dynamic = "force-static";
import React from "react";
import Link from "next/link";

export default async function PageAccessibilite() {
  return (
    <div className="fr-container">
      <h1 className="mt-8">{"Déclaration d’accessibilité"}</h1>
      <p>{"Établie le 15 avril 2024."}</p>
      <p>
        <strong>{"L'ADEME"}</strong>
        {" s’engage à rendre son service accessible, conformément à l’article 47 de la loi" +
          "n° 2005-102 du 11 février 2005."}
      </p>
      <p>
        {"À cette fin, nous mettons en œuvre la stratégie et les actions suivantes : "}
        {/* eslint-disable-next-line max-len */}
        <Link href="https://librairie.ademe.fr/institutionnel/6794-schema-pluriannuel-de-mise-en-accessibilite-des-sites-web-de-l-ademe.html">
          {/* eslint-disable-next-line max-len */}
          https://librairie.ademe.fr/institutionnel/6794-schema-pluriannuel-de-mise-en-accessibilite-des-sites-web-de-l-ademe.html
        </Link>
        .
      </p>
      <p>
        {"Cette déclaration d’accessibilité s’applique à "} <strong>Plus fraîche ma ville</strong>{" "}
        <Link href="https://plusfraichemaville.fr">
          {/* eslint-disable-next-line max-len */}
          (https://plusfraichemaville.fr)
        </Link>
        .
      </p>
      <h2>{"État de conformité"}</h2>
      <p>
        <strong>Plus fraîche ma ville</strong> est non conforme avec le{" "}
        <abbr title="Référentiel général d’amélioration de l’accessibilité">RGAA</abbr>. Le site n’a encore pas été
        audité.
      </p>
      <h2>{"Contenus non accessibles\n"}</h2>
      <p>Non applicable</p>
      <h2>{"Amélioration et contact"}</h2>
      <p>
        Si vous n’arrivez pas à accéder à un contenu ou à un service, vous pouvez contacter le responsable de
        <strong> Plus fraîche ma ville</strong> pourêtre orienté vers une alternative accessible ou obtenir le contenu
        sous une autre forme.
      </p>
      <ul className="basic-information feedback h-card mb-8">
        <li>
          E-mail&nbsp;: <a href="mailto:plusfraichemaville@ademe.fr">plusfraichemaville@ademe.fr</a>
        </li>

        <li>
          Formulaire de contact&nbsp;:{" "}
          <a href="https://plusfraichemaville.fr/contact">https://plusfraichemaville.fr/contact</a>
        </li>
      </ul>
      <h2>{"Voie de recours"}</h2>
      <p>
        Cette procédure est à utiliser dans le cas suivant&nbsp;: vous avez signalé au responsable du site internet un
        défaut d’accessibilité qui vous empêche d’accéder à un contenu ou à un des services du portail et vous n’avez
        pas obtenu de réponse satisfaisante.
      </p>
      <p>Vous pouvez&nbsp;:</p>
      <ul className="mb-8">
        <li>
          Écrire un message au <a href="https://formulaire.defenseurdesdroits.fr/">Défenseur des droits</a>
        </li>
        <li>
          Contacter{" "}
          <a href="https://www.defenseurdesdroits.fr/saisir/delegues">
            le délégué du Défenseur des droits dans votre région
          </a>
        </li>
        <li>
          Envoyer un courrier par la poste (gratuit, ne pas mettre de timbre)&nbsp;:
          <br />
          Défenseur des droits
          <br />
          Libre réponse 71120 75342 Paris CEDEX 07
        </li>
      </ul>
      <hr />
      <p>
        Cette déclaration d’accessibilité a été créé le <span>15 avril 2024</span> grâce au{" "}
        <a href="https://betagouv.github.io/a11y-generateur-declaration/#create">
          Générateur de Déclaration d’Accessibilité de BetaGouv
        </a>
        .
      </p>
    </div>
  );
}
