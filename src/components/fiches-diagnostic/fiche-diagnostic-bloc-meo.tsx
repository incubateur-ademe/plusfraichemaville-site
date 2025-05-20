import CmsRichText from "../common/CmsRichText";
import { FicheDiagnosticBlocText } from "./fiche-diagnostic-bloc-text";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";

export const FicheDiagnosticMiseEnOeuvreBloc = ({ attributes }: { attributes: FicheDiagnostic["attributes"] }) => {
  const meo = attributes.etapes_mise_en_oeuvre;

  return (
    <div>
      <FicheDiagnosticBlocText title="Mise en œuvre" />
      <div className="flex flex-col gap-8">
        <ol className="list-inside">
          {meo?.map((m) => (
            <li key={m.titre} className="mb-6 last:!mb-0">
              <i className={"fr-icon-success-fill fr-icon--sm mr-2 text-dsfr-action-high-red-hover "} />
              <span className="font-bold">{m.titre}</span>
              <CmsRichText label={m.description} />
            </li>
          ))}
        </ol>
      </div>
      {attributes.materiel && (
        <div className="h-fit rounded-2xl bg-dsfr-background-alt-red-marianne pb-8 pl-6 pr-4 pt-8">
          <h4 className="text-lg font-bold">Matériel et données nécessaires</h4>
          <CmsRichText label={attributes.materiel} />
        </div>
      )}
    </div>
  );
};
