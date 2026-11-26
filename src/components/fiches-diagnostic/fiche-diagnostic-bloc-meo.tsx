import { CSSProperties } from "react";
import clsx from "clsx";
import CmsRichText from "../common/CmsRichText";
import { FicheDiagnosticBlocText } from "./fiche-diagnostic-bloc-text";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";

export const FicheDiagnosticMiseEnOeuvreBloc = ({ attributes }: { attributes: FicheDiagnostic }) => {
  const meo = attributes.etapes_mise_en_oeuvre;

  return (
    <div>
      <FicheDiagnosticBlocText title="Mise en œuvre" />
      <div className="flex flex-col gap-8">
        <ol
          className={clsx(
            "grid list-inside grid-cols-1 gap-x-24 gap-y-12",
            "md:grid-flow-col md:grid-cols-2 md:grid-rows-[repeat(var(--meo-rows),auto)]",
          )}
          style={{ "--meo-rows": Math.ceil((meo?.length ?? 0) / 2) } as CSSProperties}
        >
          {meo?.map((m) => (
            <li key={m.titre} className="!pb-0 fr-text--xl font-bold">
              <i className="ri-checkbox-circle-line mr-2 text-picto-highlight-diagnostic" aria-hidden />
              <span className="fr-text--xl font-bold">{m.titre}</span>
              <CmsRichText label={m.description} className="fr-text--md font-normal mt-4" />
            </li>
          ))}
        </ol>
      </div>
      {attributes.materiel && (
        <div className="h-fit rounded-2xl bg-dsfr-background-alt-red-marianne pb-8 pl-6 pr-4 pt-8">
          <h3 className="text-lg font-bold">Matériel et données nécessaires</h3>
          <CmsRichText label={attributes.materiel} />
        </div>
      )}
    </div>
  );
};
