"use client";
import "@splidejs/splide/css/core";
// TODO: Check changelog from Splide and remove ts-ignore
// @ts-ignore
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";

import { Separator } from "../common/separator";
import { FicheDiagnosticCard } from "./fiche-diagnostic-card";
import { FicheDiagnosticBlocText } from "./fiche-diagnostic-bloc-text";
import { getCreditsImageForFicheDiagnostic } from "@/src/helpers/credits-image";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";
import { SplideController } from "../common/splide-controllers";
import { FicheDiagnosticRexCard } from "../fiches-diagnostic-rex/fiche-diagnostic-rex-card";

export const FicheDiagnosticMethodeBloc = ({
  ficheDiagnostic,
}: {
  ficheDiagnostic: FicheDiagnostic;
  projetId?: number;
}) => {
  const { attributes } = ficheDiagnostic;

  const creditsImage = getCreditsImageForFicheDiagnostic(attributes);
  const rex = attributes.lien_rex_diagnostics ?? [];

  return (
    <>
      <div className="flex flex-col justify-between pt-12 md:flex-row">
        <FicheDiagnosticBlocText title="La méthode" text={attributes.description} titleClassName="text-3xl mb-4" />
      </div>
      <Separator className="mb-8 mt-4 !h-[1px] !opacity-100" />
      <div className="flex flex-col justify-between gap-8 md:flex-row">
        <FicheDiagnosticBlocText title="Le besoin" text={attributes.besoin} small />
        <FicheDiagnosticBlocText title="Les indicateurs étudiés" text={attributes.indicateurs} small />
      </div>
      {!!attributes.en_savoir_plus_description && (
        <>
          <Separator className="mb-12 mt-6 !h-[1px] !opacity-100" />
          <FicheDiagnosticBlocText
            title="En savoir plus"
            text={attributes.en_savoir_plus_description}
            textClassName="[&>*]:mb-2"
          />
        </>
      )}
      {attributes.fiches_diagnostics_associees?.data && attributes.fiches_diagnostics_associees.data.length > 0 && (
        <>
          <Separator className="my-12 !h-[1px] !opacity-100" />
          <div>
            <h3 className="mb-1 text-2xl">Méthodologies associées</h3>
            <span className="mb-6 block">Consultez les méthodologies de diagnostic associées</span>
            <div className="flex flex-wrap gap-6">
              {attributes.fiches_diagnostics_associees?.data.map((ficheDiagnostic) => (
                <FicheDiagnosticCard ficheDiagnostic={ficheDiagnostic} key={ficheDiagnostic.id} />
              ))}
            </div>
          </div>
        </>
      )}

      <h3 className="mb-1 mt-16 text-2xl">Découvrir les projets de diagnostics réalisés</h3>
      <span className="mb-6 block">
        Consultez les retours d’expériences de collectivités qui ont mis en place cette méthode.
      </span>
      <Splide
        id="fiche-diagnostic-rex-modal-slider"
        hasTrack={false}
        className="max-w-md"
        options={{ rewind: true, type: "loop", autoWidth: true, start: 0 }}
      >
        <SplideTrack className="overflow-auto lg:!overflow-hidden">
          {rex?.data?.map((r, index) => (
            <SplideSlide className="size-full" key={index}>
              <FicheDiagnosticRexCard rex={r.attributes.retour_experience_diagnostic?.data} key={index} />
            </SplideSlide>
          ))}
        </SplideTrack>
        <SplideController
          arrow="left"
          size={{ width: "w-10", height: "h-10" }}
          position={{ top: "top-[8.5rem]", left: "!left-6" }}
          className={`!bg-black/60 ${rex.data.length <= 1 ? "pointer-events-none !hidden" : ""}`}
        />
        <SplideController
          arrow="right"
          size={{ width: "w-10", height: "h-10" }}
          position={{ top: "top-[8.5rem]", right: "!right-6" }}
          className={`!bg-black/60 ${rex.data.length <= 1 ? "pointer-events-none !hidden" : ""}`}
        />
      </Splide>

      {creditsImage.length > 0 && (
        <>
          <hr className="mt-12 pb-8" />
          <div className="mb-4 font-bold text-dsfr-text-title-grey">Crédits images</div>
          <div>{creditsImage.join(", ")}</div>
        </>
      )}
    </>
  );
};
