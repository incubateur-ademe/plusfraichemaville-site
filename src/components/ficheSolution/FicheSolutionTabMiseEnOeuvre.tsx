import CmsRichText from "@/src/components/common/CmsRichText";
import CustomAccordion from "@/src/components/common/CustomAccordion";
import CustomTodoStep from "@/src/components/common/CustomTodoStep";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";

export default function FicheSolutionTabMiseEnOeuvre({
  ficheAttributes,
}: {
  ficheAttributes: FicheSolution["attributes"];
}) {
  const diagStepToShow = !!(ficheAttributes.etapes_diagnostic?.length && ficheAttributes.etapes_diagnostic?.length > 0);
  const meoStepToShow = !!(
    ficheAttributes.etapes_mise_en_oeuvre?.length && ficheAttributes.etapes_mise_en_oeuvre?.length > 0
  );

  return (
    <div>
      <div className="mb-8 text-[1.75rem] font-bold text-dsfr-text-title-grey">Mise en œuvre et travaux</div>
      <div className="fr-accordions-group">
        {diagStepToShow && (
          <CustomAccordion title="Diagnostic en amont" expanded={true} ariaId="accordion-diag">
            <div className="mb-2 mt-4 flex flex-col gap-4">
              {ficheAttributes.etapes_diagnostic?.map((diag) => (
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
              {ficheAttributes.etapes_mise_en_oeuvre?.map((etapeMeo) => (
                <CustomTodoStep key={etapeMeo.titre} title={etapeMeo.titre} label={etapeMeo.description} />
              ))}
            </div>
          </CustomAccordion>
        )}
        {ficheAttributes.etapes_entretien && ficheAttributes.etapes_entretien?.length > 0 && (
          <CustomAccordion
            title="Entretien"
            expanded={!diagStepToShow && !meoStepToShow}
            className="mt-10"
            ariaId="accordion-entretien"
          >
            <div className="mb-2 mt-4 flex flex-col gap-4">
              {ficheAttributes.etapes_entretien?.map((etapeEntretien) => (
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
      {ficheAttributes.point_vigilance && (
        <div className="mt-24 rounded-2xl bg-dsfr-background-action-low-blue-france px-12 py-6">
          <div className="mb-6 text-lg font-bold text-dsfr-text-title-grey">Points de vigilance</div>
          <CmsRichText label={ficheAttributes.point_vigilance} />
        </div>
      )}
    </div>
  );
}
