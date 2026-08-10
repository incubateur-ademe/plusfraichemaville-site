"use client";
import { ReactNode, useId } from "react";
import clsx from "clsx";

export type FilDArianeAvecBoutonSegment = {
  label: ReactNode;
  onClick: () => void;
};

type FilDArianeAvecBoutonProps = {
  segments: FilDArianeAvecBoutonSegment[];
  currentPageLabel: ReactNode;
  className?: string;
};

/**
 * Fil d'ariane basé sur le composant Breadcrumb du DSFR
 * (https://components.react-dsfr.codegouv.studio/?path=/docs/components-breadcrumb--default),
 * mais dont chaque étape est un bouton plutôt qu'un lien, pour permettre de déclencher une action
 * (ex: changement d'étape dans un store) plutôt qu'une navigation.
 */
export const FilDArianeAvecBouton = ({ segments, currentPageLabel, className }: FilDArianeAvecBoutonProps) => {
  const collapseId = `fil-d-arianne-avec-bouton-${useId()}`;

  return (
    <nav role="navigation" aria-label="vous êtes ici dans la recherche de solutions :" className={clsx("fr-breadcrumb", className)}>
      <button className="fr-breadcrumb__button" aria-expanded="false" aria-controls={collapseId}>
        Voir le fil d’Ariane
      </button>
      <div className="fr-collapse" id={collapseId}>
        <ol className="fr-breadcrumb__list">
          {segments.map((segment, index) => (
            <li key={index}>
              <button type="button" className="fr-link fr-breadcrumb__link fr-text--xs" onClick={segment.onClick}>
                {segment.label}
              </button>
            </li>
          ))}
          <li>
            <span className="fr-breadcrumb__link" aria-current="page">
              {currentPageLabel}
            </span>
          </li>
        </ol>
      </div>
    </nav>
  );
};
