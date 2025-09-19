"use client";
import { SearchResult } from "@/src/components/recherche/recherche-types";
import { FicheDiagnosticCard } from "@/src/components/fiches-diagnostic/fiche-diagnostic-card";
import FicheSolutionCard from "@/src/components/ficheSolution/fiche-solution-card";
import RetourExperienceCard from "@/src/components/retourExperience/RetourExperienceCard";
import Tabs from "@codegouvfr/react-dsfr/Tabs";
import { RetourExperienceDiagCard } from "@/src/components/retour-experience-diag/retour-experience-diag-card";
import { WebinaireCard } from "@/src/components/webinaires/webinaire-card";

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
    webinaires = [],
  } = searchResult || {};

  return (
    <Tabs
      className={className}
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
          label: `Méthodes de diagnostic (${ficheDiagnostics.length ?? 0})`,
          content: (
            <>
              {ficheDiagnostics.length > 0 ? (
                <div className="flex flex-wrap gap-8">
                  {ficheDiagnostics.map((fiche) => (
                    <FicheDiagnosticCard key={fiche.id} ficheDiagnostic={fiche} />
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
                    <RetourExperienceCard key={rex.id} retourExperience={rex} />
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
                    <RetourExperienceDiagCard key={rex.id} rex={rex} />
                  ))}
                </div>
              ) : (
                <div>Aucun résultat</div>
              )}
            </>
          ),
        },
        {
          label: `Webinaires (${webinaires.length ?? 0})`,
          content: (
            <>
              {webinaires.length > 0 ? (
                <div className="flex flex-wrap gap-8">
                  {webinaires.map((webinaire) => (
                    <WebinaireCard key={webinaire.id} webinaire={webinaire} className="pfmv-flat-card" />
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
  );
};
