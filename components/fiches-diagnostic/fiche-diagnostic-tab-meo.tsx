import CmsRichText from "../common/CmsRichText";
import { FicheDiagnosticTabBlocText } from "./fiche-diagnostic-tab-text";
import { FicheDiagnosticResponseAttributes } from "./types";


export const FicheDiagnosticMiseEnOeuvreTab = ({ attributes }: { attributes: FicheDiagnosticResponseAttributes }) => {
  const meo = attributes.etapes_mise_en_oeuvre;

  return (
    <div>
      <h3 className="text-3xl mb-9">Mise en œuvre</h3>
      <div className="mb-14">
        {meo?.map((m, i) => (
          <div className="mb-14" key={i}>
            <FicheDiagnosticTabBlocText withPicto title={m.titre} text={m.description} titleClassName="text-lg mb-2" />
          </div>
        ))}
      </div>
      {attributes.materiel && (
        <div className="h-fit pl-6 pt-8 pr-4 pb-14 rounded-2xl bg-dsfr-background-alt-red-marianne">
          <h4 className="text-lg font-bold">Matériel et données nécessaires</h4>
          <CmsRichText label={attributes.materiel} className="[&>*]:mb-0" />
        </div>
      )}
    </div>
  );
};
