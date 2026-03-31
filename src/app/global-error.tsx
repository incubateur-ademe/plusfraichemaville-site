"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <main role="main" id="content">
          <div className="fr-container">
            {/* eslint-disable-next-line max-len */}
            <div className="fr-my-7w fr-mt-md-12w fr-mb-md-10w fr-grid-row fr-grid-row--gutters fr-grid-row--middle fr-grid-row--left">
              <div className="fr-py-0 fr-col-12 fr-col-md-6">
                <h1>Erreur inattendue</h1>
                <p className="fr-text--sm fr-mb-3w">Erreur 500</p>
                <p className="fr-text--sm fr-mb-5w">
                  Désolé, le service rencontre un problème, nous travaillons pour le résoudre le plus rapidement
                  possible.
                </p>
                <p className="fr-text--lead fr-mb-3w">Essayez de rafraîchir la page ou bien ressayez plus tard.</p>
                <ul className="fr-btns-group fr-btns-group--inline-md">
                  <li>
                    <a className="fr-btn fr-btn--secondary" href="https://plusfraichemaville.fr/contact">
                      Contactez-nous
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
