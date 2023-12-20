import { FicheSolution } from "@/lib/directus/directusModels";
import React from "react";
import CmsRichText from "@/components/common/CmsRichText";
import CustomAccordion from "@/components/common/CustomAccordion";
import CustomTodoStep from "@/components/common/CustomTodoStep";

export default function FicheSolutionTabMiseEnOeuvre({ ficheSolution }: { ficheSolution: FicheSolution }) {
  const diagStepToShow = !!(ficheSolution.etapes_diagnostic?.length && ficheSolution.etapes_diagnostic?.length > 0);
  const meoStepToShow = !!(
    ficheSolution.etapes_mise_en_oeuvre?.length && ficheSolution.etapes_mise_en_oeuvre?.length > 0
  );

  return (
    <div>
      <div className="text-dsfr-text-title-grey font-bold text-[1.75rem] mb-8">Mise en œuvre et travaux</div>
      <div className="fr-accordions-group">
        {diagStepToShow && (
          <CustomAccordion title="Diagnostic en amont" expanded={true} ariaId="accordion-diag">
            <div className="flex flex-col gap-4 mt-4 mb-2">
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
            <div className="flex flex-col gap-4 mt-4 mb-2">
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
            <div className="flex flex-col gap-4 mt-4 mb-2">
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
        <div className="bg-dsfr-background-action-low-blue-france rounded-2xl mt-24 px-12 py-6">
          <div className="text-lg font-bold text-dsfr-text-title-grey mb-6">Points de vigilance</div>
          <CmsRichText label={ficheSolution.point_vigilance} />
        </div>
      )}
    </div>
  );
}
