import { FicheDiagnosticTabBlocText } from "./fiche-diagnostic-tab-text";
import { FicheDiagnosticResponseAttributes } from "./types";

type MOE = {
  description: string;
  titre: string;
};

export const FicheDiagnosticMiseEnOeuvreTab = ({ attributes }: { attributes: FicheDiagnosticResponseAttributes }) => {
  console.log(attributes.materiel_fiche_diagnostics);
  const moe = attributes.etapes_mise_en_oeuvre as unknown as MOE[];
  return (
    <div>
      <h3 className="text-3xl mb-9">Mise en œuvre</h3>
      <div className="mb-14">
        {moe.map((m, i) => (
          <div className="mb-14" key={i}>
            <FicheDiagnosticTabBlocText withPicto title={m.titre} text={m.description} titleClassName="text-lg mb-2" />
          </div>
        ))}
      </div>
      <div className="h-fit pl-6 pt-8 pr-4 pb-14 rounded-2xl bg-dsfr-background-alt-red-marianne">
        {/* <h4 className="text-lg font-bold">Matériel et données nécessaires</h4>
        {attributes.materiel_fiche_diagnostics?.data.map((mat, index) => (
          <CmsRichText label={mat.attributes.description} />
        ))} */}
      </div>
    </div>
  );
};
