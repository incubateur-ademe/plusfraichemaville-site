import React from "react";
import AdemeAMFLogo from "@/public/images/logo-ademe-amf.webp";
import Image from "next/image";
import { PFMV_ROUTES } from "@/src/helpers/routes";

export default function AppFooter() {
  return (
    <footer className="fr-footer !mt-0 !pt-0 !shadow-none" role="contentinfo" id="footer">
      <hr className="pb-6" />
      <div className="fr-container">
        <div className="fr-footer__body">
          <div className="fr-footer__brand fr-enlarge-link">
            <p className="fr-logo !text-[1rem]">
              République
              <br />
              Française
            </p>
            <a
              className="fr-footer__brand-link"
              href="/"
              title="Retour à l’accueil du site - Plus fraîche ma ville - République Française"
            >
              <Image className="fr-footer__logo" height={80} src={AdemeAMFLogo} alt={"ADEME - Plus fraîche ma ville"} />
            </a>
          </div>
          <div className="fr-footer__content">
            <p className="fr-footer__content-desc">
              {"Plus fraîche ma ville est une startup d'État portée par l’Agence de la Transition " +
                "Écologique (ADEME), en partenariat avec l'association des maires de France (AMF)."}
              <br />
              {"Notre mission : aider les collectivités dans le choix de solutions " +
                "de rafraîchissement urbain pérennes et durables. Plus fraîche ma ville" +
                " est la 4"}
              <sup>ème</sup>
              {" action du plan de gestion des vagues de chaleur."}
            </p>
            <ul className="fr-footer__content-list">
              <li className="fr-footer__content-item">
                <a
                  className="fr-footer__content-link"
                  target="_blank"
                  rel="noopener external"
                  title="ADEME - nouvelle fenêtre"
                  href="https://www.ademe.fr"
                >
                  ademe.fr
                </a>
              </li>
              <li className="fr-footer__content-item">
                <a
                  className="fr-footer__content-link"
                  target="_blank"
                  rel="noopener external"
                  title="Beta Gouv - nouvelle fenêtre"
                  href="https://beta.gouv.fr"
                >
                  beta.gouv.fr
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="fr-footer__bottom">
          <ul className="fr-footer__bottom-list">
            <li className="fr-footer__bottom-item">
              <a className="fr-footer__bottom-link" href="/accessibilite">
                Accessibilité : non conforme
              </a>
            </li>
            <li className="fr-footer__bottom-item">
              <a className="fr-footer__bottom-link" href="/mentions-legales">
                Mentions légales
              </a>
            </li>
            <li className="fr-footer__bottom-item">
              <a className="fr-footer__bottom-link" href="/politique-de-confidentialite">
                Politique de confidentialité
              </a>
            </li>
            <li className="fr-footer__bottom-item">
              <button className="fr-footer__bottom-link" data-fr-opened="false" aria-controls="fr-consent-modal">
                Gestion des cookies
              </button>
            </li>
            <li className="fr-footer__bottom-item">
              <a className="fr-footer__bottom-link" href="/stats" target="_self">
                Statistiques
              </a>
            </li>
            <li className="fr-footer__bottom-item">
              <a className="fr-footer__bottom-link" href={PFMV_ROUTES.NEWSLETTER} target="_self">
                Newsletter
              </a>
            </li>
            <li className="fr-footer__bottom-item">
              <a
                className="fr-footer__bottom-link"
                href="https://github.com/incubateur-ademe/plusfraichemaville-site"
                target="_blank"
              >
                Code source
              </a>
            </li>
          </ul>
          <div className="fr-footer__bottom-copy">
            <p>
              Sauf mention explicite de propriété intellectuelle détenue par des tiers, les contenus de ce site sont
              proposés sous{" "}
              <a
                href="https://github.com/etalab/licence-ouverte/blob/master/LO.md"
                rel="noopener external"
                title="Voir la licence Etalab 2.0 - nouvelle fenêtre"
                target="_blank"
              >
                licence etalab-2.0
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
