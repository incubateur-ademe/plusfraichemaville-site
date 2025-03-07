"use client";
import "@splidejs/splide/css/core";
// TODO: Check changelog from Splide and remove ts-ignore
// @ts-ignore
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { FicheDiagnosticBlocText } from "./fiche-diagnostic-bloc-text";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";
import { SplideController } from "../common/splide-controllers";
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
        options={{ autoWidth: true, focus: 0, omitEnd: true, gap: "1.25rem" }}
        className="max-w-[60rem]"
      >
        <SplideTrack className="py-5 !pl-1">
          {rex?.data.map((r, index) => (
            <SplideSlide key={index}>
              <RetourExperienceDiagCard
                rex={r.attributes.retour_experience_diagnostic?.data}
                className="h-full max-w-[28rem]"
                key={index}
              />
            </SplideSlide>
          ))}
        </SplideTrack>
        <SplideController
          arrow="left"
          size={{ width: "w-10", height: "h-10" }}
          position={{ top: "top-[8.5rem]", left: "!left-6" }}
        />
        <SplideController
          arrow="right"
          size={{ width: "w-10", height: "h-10" }}
          position={{ top: "top-[8.5rem]", right: "!right-6" }}
        />
      </Splide>
    </>
  );
};
