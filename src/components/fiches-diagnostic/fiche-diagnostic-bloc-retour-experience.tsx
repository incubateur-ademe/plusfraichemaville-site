"use client";
import "@splidejs/splide/css/core";
// TODO: Check changelog from Splide and remove ts-ignore
// @ts-ignore
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { FicheDiagnosticBlocText } from "./fiche-diagnostic-bloc-text";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";
import { SplideController, SplideFrTranslation } from "../common/splide-controllers";
import { RetourExperienceDiagCard } from "../retour-experience-diag/retour-experience-diag-card";
import { isEmpty } from "@/src/helpers/listUtils";

export const FicheDiagnosticBlocRetourExperience = ({ ficheDiagnostic }: { ficheDiagnostic: FicheDiagnostic }) => {
  const { attributes } = ficheDiagnostic;

  const rex = attributes.lien_rex_diagnostics ?? [];
  if (isEmpty(rex.data)) {
    return null;
  }

  return (
    <>
      <FicheDiagnosticBlocText title="Découvrir les projets de diagnostics réalisés" />
      <span className="mb-6 block">
        Consultez les retours d’expériences de collectivités qui ont mis en place cette méthode.
      </span>

      <Splide
        hasTrack={false}
        options={{
          autoWidth: true,
          focus: 0,
          omitEnd: true,
          gap: "1.25rem",
          drag: false,
          pagination: false,
          i18n: SplideFrTranslation,
        }}
        className="max-w-[60rem]"
      >
        <div className="px-6">
          <SplideTrack className="py-5 !pl-1">
            {rex?.data.map((r, index) => (
              <SplideSlide key={index}>
                <RetourExperienceDiagCard
                  rex={r.attributes.retour_experience_diagnostic?.data}
                  className="h-full max-w-[27rem]"
                  key={index}
                />
              </SplideSlide>
            ))}
          </SplideTrack>
        </div>
        <SplideController arrow="left" className="!left-0 top-[8.5rem] size-12" />
        <SplideController arrow="right" className="!right top-[8.5rem] size-12" />
      </Splide>
    </>
  );
};
