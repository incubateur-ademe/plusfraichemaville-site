import React from "react";
import CmsRichText from "@/src/components/common/CmsRichText";
import CustomAccordion from "@/src/components/common/CustomAccordion";
import CustomTodoStep from "@/src/components/common/CustomTodoStep";
import { GetValues } from "@/src/lib/strapi/types/types";

export default function FicheSolutionTabMiseEnOeuvre({
  ficheSolution,
}: {
  ficheSolution: GetValues<"api::fiche-solution.fiche-solution">;
}) {
  const diagStepToShow = !!(ficheSolution.etapes_diagnostic?.length && ficheSolution.etapes_diagnostic?.length > 0);
  const meoStepToShow = !!(
    ficheSolution.etapes_mise_en_oeuvre?.length && ficheSolution.etapes_mise_en_oeuvre?.length > 0
  );

  return (
    <div>
      <div className="mb-8 text-[1.75rem] font-bold text-dsfr-text-title-grey">Mise en œuvre et travaux</div>
      <div className="fr-accordions-group">
        {diagStepToShow && (
          <CustomAccordion title="Diagnostic en amont" expanded={true} ariaId="accordion-diag">
            <div className="mb-2 mt-4 flex flex-col gap-4">
              {ficheSolution.etapes_diagnostic?.map((diag) => (
                <CustomTodoStep key={diag.titre} title={diag.titre} label={diag.description} />
              ))}
            </div>
          </CustomAccordion>
        )}
        {meoStepToShow && (
          <CustomAccordion
            title="Étapes de mise en œuvre"
            expanded={!diagStepToShow}
            className="mt-10"
            ariaId="accordion-meo"
          >
            <div className="mb-2 mt-4 flex flex-col gap-4">
              {ficheSolution.etapes_mise_en_oeuvre?.map((etapeMeo) => (
                <CustomTodoStep key={etapeMeo.titre} title={etapeMeo.titre} label={etapeMeo.description} />
              ))}
            </div>
          </CustomAccordion>
        )}
        {ficheSolution.etapes_entretien && ficheSolution.etapes_entretien?.length > 0 && (
          <CustomAccordion
            title="Entretien"
            expanded={!diagStepToShow && !meoStepToShow}
            className="mt-10"
            ariaId="accordion-entretien"
          >
            <div className="mb-2 mt-4 flex flex-col gap-4">
              {ficheSolution.etapes_entretien?.map((etapeEntretien) => (
                <CustomTodoStep
                  key={etapeEntretien.titre}
                  title={etapeEntretien.titre}
                  label={etapeEntretien.description}
                />
              ))}
            </div>
          </CustomAccordion>
        )}
      </div>
      {ficheSolution.point_vigilance && (
        <div className="mt-24 rounded-2xl bg-dsfr-background-action-low-blue-france px-12 py-6">
          <div className="mb-6 text-lg font-bold text-dsfr-text-title-grey">Points de vigilance</div>
          <CmsRichText label={ficheSolution.point_vigilance} />
        </div>
      )}
    </div>
  );
}
