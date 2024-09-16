import artworkOvoidSvgUrl from "@codegouvfr/react-dsfr/dsfr/artwork/background/ovoid.svg";
import artworkTechnicalErrorSvgUrl from "@codegouvfr/react-dsfr/dsfr/artwork/pictograms/system/technical-error.svg";
import clsx from "clsx";

type UnavailablePageProps = {
  title: string;
};
/**
 * Utitliser ce composant lorsqu'une page est inacessible, en construction, etc.
 * @param {string} title Titre de la page. Ex: Page stat non accessible
 * @returns
 */

export const UnavailablePage = ({ title }: UnavailablePageProps) => {
  return (
    <div className="fr-container">
      <div
        className={clsx(
          "fr-my-7w fr-mt-md-12w fr-mb-md-10w fr-grid-row fr-grid-row--gutters",
          "fr-grid-row--center fr-grid-row--middle",
        )}
      >
        <div className="fr-py-0 fr-col-12 fr-col-md-6">
          <h1>{title ?? "Page non disponible"}</h1>
          <p className="fr-mb-3w fr-text--lead">
            Cette page est toujours en construction. Les données ne sont pas accessibles pour le moment.
          </p>

          <ul
            id="fr-btns-group-:S1:"
            className="fr-btns-group fr-btns-group--inline-md fr-btns-group--left fr-btns-group--icon-left"
          >
            <li>
              <a id="fr-button-:S2:" className="fr-btn rounded-3xl" href="/">
                Accueil
              </a>
            </li>
          </ul>
        </div>
        <div className="fr-px-6w fr-py-0 fr-px-md-0 fr-col-6 fr-col-md-3 fr-col-offset-md-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="fr-responsive-img fr-artwork"
            aria-hidden="true"
            width="160"
            height="200"
            viewBox="0 0 160 200"
          >
            <use className="fr-artwork-motif" href={`${artworkOvoidSvgUrl.src}#artwork-motif`}></use>
            <use className="fr-artwork-background" href={`${artworkOvoidSvgUrl.src}#artwork-background`}></use>
            <g transform="translate(40, 60)">
              <use
                className="fr-artwork-decorative"
                href={`${artworkTechnicalErrorSvgUrl.src}#artwork-decorative`}
              ></use>
              <use className="fr-artwork-minor" href={`${artworkTechnicalErrorSvgUrl.src}#artwork-minor`}></use>
              <use className="fr-artwork-major" href={`${artworkTechnicalErrorSvgUrl.src}#artwork-major`}></use>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};
