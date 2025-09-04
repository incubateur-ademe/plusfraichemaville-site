"use client";
import { SearchResult } from "@/src/components/recherche/recherche-types";
import { FicheDiagnosticCard } from "@/src/components/fiches-diagnostic/fiche-diagnostic-card";
import FicheSolutionCard from "@/src/components/ficheSolution/fiche-solution-card";
import { RetourExperienceDiagCardSiteVitrine } from "@/src/components/retour-experience-diag/retour-experience-diag-card-site-vitrine";
import RetourExperienceCard from "@/src/components/retourExperience/RetourExperienceCard";
import CustomTabButton from "@/src/components/common/CustomTabButton";
import { WebinairesList } from "@/src/components/webinaires/webinaires-list";
import clsx from "clsx";
import Tabs from "@codegouvfr/react-dsfr/Tabs";
import { RetourExperienceDiagCard } from "@/src/components/retour-experience-diag/retour-experience-diag-card";

type RechercheResultatsProps = {
  searchResult?: SearchResult;
  className?: string;
};

export const RechercheResultats = ({ className, searchResult }: RechercheResultatsProps) => {
  const {
    ficheDiagnostics = [],
    fichesSolutions = [],
    retoursExperienceDiagnostic = [],
    retoursExperience = [],
  } = searchResult || {};

  const isEmpty =
    ficheDiagnostics.length === 0 &&
    fichesSolutions.length === 0 &&
    retoursExperienceDiagnostic.length === 0 &&
    retoursExperience.length === 0;

  if (isEmpty) {
    return (
      <div className={className}>
        <p className="text-sm text-dsfr-text-mention-grey">Aucun résultat.</p>
      </div>
    );
  }

  return (
    <>
      <Tabs
        className="mt-10"
        tabs={[
          {
            label: `Fiches solution (${fichesSolutions.length ?? 0})`,
            content: (
              <>
                {fichesSolutions.length > 0 ? (
                  <div className="flex flex-wrap gap-8">
                    {fichesSolutions.map((fiche) => (
                      <FicheSolutionCard key={fiche.id} ficheSolution={fiche} />
                    ))}
                  </div>
                ) : (
                  <div>Aucun résultat</div>
                )}
              </>
            ),
          },
          {
            label: `Métbhodes de diagnostic (${ficheDiagnostics.length ?? 0})`,
            content: (
              <>
                {ficheDiagnostics.length > 0 ? (
                  <div className="flex flex-wrap gap-8">
                    {ficheDiagnostics.map((fiche) => (
                      <FicheDiagnosticCard key={fiche.id} ficheDiagnostic={fiche}/>
                    ))}
                  </div>
                ) : (
                  <div>Aucun résultat</div>
                )}
              </>
            ),
          },
          {
            label: `Projets réalisés (${retoursExperience.length ?? 0})`,
            content: (
              <>
                {retoursExperience.length > 0 ? (
                  <div className="flex flex-wrap gap-8">
                    {retoursExperience.map((rex) => (
                      <RetourExperienceCard key={rex.id} retourExperience={rex}/>
                    ))}
                  </div>
                ) : (
                  <div>Aucun résultat</div>
                )}
              </>
            ),
          },
          {
            label: `Diagnostics réalisés (${retoursExperienceDiagnostic.length ?? 0})`,
            content: (
              <>
                {retoursExperienceDiagnostic.length > 0 ? (
                  <div className="flex flex-wrap gap-8">
                    {retoursExperienceDiagnostic.map((rex) => (
                      <RetourExperienceDiagCard key={rex.id} rex={rex}/>
                    ))}
                  </div>
                ) : (
                  <div>Aucun résultat</div>
                )}
              </>
            ),
          },
        ]}
      />
      <div className={className}>
        {fichesSolutions.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 text-base font-semibold text-dsfr-text-title-grey">Fiches solution</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {fichesSolutions.map((fiche) => (
                <FicheSolutionCard key={fiche.id} ficheSolution={fiche} />
              ))}
            </div>
          </section>
        )}

        {ficheDiagnostics.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 text-base font-semibold text-dsfr-text-title-grey">Fiches diagnostic</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {ficheDiagnostics.map((fiche) => (
                <FicheDiagnosticCard key={fiche.id} ficheDiagnostic={fiche} />
              ))}
            </div>
          </section>
        )}

        {retoursExperienceDiagnostic.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 text-base font-semibold text-dsfr-text-title-grey">
              Retours d’expérience (diagnostic)
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {retoursExperienceDiagnostic.map((rex) => (
                <RetourExperienceDiagCardSiteVitrine key={rex.id} rex={rex} />
              ))}
            </div>
          </section>
        )}

        {retoursExperience.length > 0 && (
          <section>
            <h2 className="mb-4 text-base font-semibold text-dsfr-text-title-grey">Retours d’expérience</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {retoursExperience.map((rex) => (
                <RetourExperienceCard key={rex.id} retourExperience={rex} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};
