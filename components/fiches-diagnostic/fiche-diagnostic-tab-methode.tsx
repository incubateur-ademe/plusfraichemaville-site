import { Separator } from "../common/separator";
import { FicheDiagnosticCard } from "./fiche-diagnostic-card";
import { FicheDiagnosticResponseAttributes } from "./types";
import { FicheDiagnosticTabBlocText } from "./fiche-diagnostic-tab-text";
import { getCoutFicheSolution } from "@/helpers/coutFicheSolution";
import { getDelaiTravauxFicheSolution } from "@/helpers/delaiTravauxFicheSolution";

export const FicheDiagnosticMethodeTab = ({ attributes }: { attributes: FicheDiagnosticResponseAttributes }) => {
  const coutMin = attributes.cout_min;
  const coutMax = attributes.cout_max;
  const delaiMin = attributes.delai_min;
  const delaiMax = attributes.delai_max;

  const delai = getDelaiTravauxFicheSolution(delaiMin, delaiMax);
  const cout = getCoutFicheSolution(coutMin, coutMax);

  return (
    <div>
      <div className="flex justify-between">
        <div className="max-w-screen-sm">
          <FicheDiagnosticTabBlocText
            title="Description de la méthode"
            text={attributes.description}
            titleClassName="text-2xl mb-4"
          />
        </div>
        <div className="w-80 h-fit pl-6 pt-8 pr-4 pb-14 rounded-2xl bg-dsfr-background-alt-red-marianne">
          <div>
            <small className="mb-1 block text-dsfr-text-mention-grey text-sm">Temporalité</small>
            <div className="flex justify-between">
              <div className="h-4 mr-2">{cout?.icons("!text-dsfr-background-flat-warning before:!w-4")}</div>
              <small className="text-dsfr-text-mention-grey text-sm">
                {delaiMin} à {delaiMax} mois
              </small>
            </div>
          </div>
          <Separator className="my-3" />
          <div>
            <small className="mb-1 block text-dsfr-text-mention-grey text-sm">Coût</small>
            <div className="flex justify-between">
              <div className="h-4 mr-2">{delai?.icons("!text-dsfr-background-flat-warning before:!w-4")}</div>
              <small className="text-dsfr-text-mention-grey text-sm">
                de {coutMin} à {coutMax} euros HT
              </small>
            </div>
          </div>
          <Separator className="mt-3 mb-5" />
          <div className="text-dsfr-text-mention-grey text-sm">{attributes.explication_source}</div>
        </div>
      </div>
      <Separator className="my-12" />
      <div className="flex justify-between gap-8">
        <FicheDiagnosticTabBlocText title="Besoin de la collectivité" text={attributes.besoin} small />
        <FicheDiagnosticTabBlocText title="Les indicateurs étudiés" text={attributes.indicateurs} small />
      </div>
      <Separator className="mt-6 mb-12" />
      <FicheDiagnosticTabBlocText
        title="En savoir plus"
        text={attributes.en_savoir_plus_description}
        textClassName="[&>*]:mb-2"
      />

      <Separator className="my-12" />
      <div>
        <h3 className="text-2xl mb-1">Méthodologies associées</h3>
        <span className="mb-14 block">Consultez les méthodologies de diagnostic associées</span>
        <div className="pr-5">
          {attributes.fiches_diagnostics_associees?.data.map((ficheDiagnostic) => (
            <FicheDiagnosticCard ficheDiagnostic={ficheDiagnostic} />
          ))}
        </div>
      </div>
    </div>
  );
};
