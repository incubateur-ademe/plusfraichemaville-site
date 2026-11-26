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
            "grid list-none grid-cols-1 gap-x-24 gap-y-6 !pl-0 [--ol-content:none]",
            "md:grid-flow-col md:grid-cols-2 md:grid-rows-[repeat(var(--meo-rows),auto)]",
          )}
          style={{ "--meo-rows": Math.ceil((meo?.length ?? 0) / 2) } as CSSProperties}
        >
          {meo?.map((m, index) => (
            <li key={m.titre} className="fr-text--xl !pb-0 font-bold">
              <div className="fr-text--xl !m-0 flex gap-2 font-bold">
                <i className="ri-checkbox-circle-line shrink-0 text-picto-highlight-diagnostic" aria-hidden />
                <span className="shrink-0">{index + 1}.</span>
                <span>{m.titre}</span>
              </div>
              <CmsRichText label={m.description} className="fr-text--md mt-4 font-normal" />
            </li>
          ))}
        </ol>
      </div>
      {attributes.materiel && (
        <div className="h-fit rounded-2xl bg-dsfr-beige-galet pb-8 pl-6 pr-4 pt-8">
          <h2 className="text-lg font-bold">Matériel et données nécessaires</h2>
          <CmsRichText label={attributes.materiel} />
        </div>
      )}
    </div>
  );
};
