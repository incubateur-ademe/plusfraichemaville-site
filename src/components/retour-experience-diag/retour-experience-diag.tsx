import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { RetourExperienceDiagnostic } from "@/src/lib/strapi/types/api/retour-experience-diagnostic";
import { ImageLoader } from "../common/image-loader";
import CmsRichText from "../common/CmsRichText";
import { RetourExperienceDiagInformations } from "./retour-experience-diag-informations";
import { RetourExperienceDiagContacts } from "./retour-experience-diag-contacts";
import CustomDSFRQuote from "../common/CustomDSFRQuote";
import { RetourExperienceDiagCombinaison } from "./retour-experience-diag-combinaison";
import { RetourExperienceDiagPdf } from "./retour-experience-diag-pdf";
import { RetourExperienceDiagPrincipauxResultats } from "./retour-experience-diag-principaux-resultats";
import { PropsWithChildren } from "react";
import clsx from "clsx";
import { Separator } from "@/src/components/common/separator";
import Button from "@codegouvfr/react-dsfr/Button";
import { PFMV_ROUTES } from "@/src/helpers/routes";

type RetourExperienceDiagProps = {
  rex: RetourExperienceDiagnostic;
  showContacts: boolean;
};

export const RetourExperienceDiag = ({ rex, showContacts }: RetourExperienceDiagProps) => {
  const {
    lieu,
    titre,
    description,
    citations,
    besoin,
    points_vigilance,
    apres,
    credits,
    contacts,
    lien_rex_diagnostics,
    resultats,
    resultats_images,
  } = rex.attributes;

  return (
    <div>
      <div className="relative">
        <ImageLoader
          width={1920}
          height={415}
          className="block max-h-40 min-h-96 w-full object-cover md:max-h-96"
          src={getStrapiImageUrl(rex.attributes.image_principale, STRAPI_IMAGE_KEY_SIZE.large)}
          alt={titre || "image titre"}
          unoptimized
        />
        <div className="fr-container absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2 text-white">
          <RetourExperienceDiagLabel>
            <i className="ri-map-pin-line mr-2 before:!mb-1 before:!size-4"></i>
            {lieu}
          </RetourExperienceDiagLabel>
          <RetourExperienceDiagLabel>Diagnostics réalisés</RetourExperienceDiagLabel>
        </div>
      </div>
      <div className="fr-container flex flex-col gap-24 pt-6 lg:flex-row">
        <div className="w-full lg:w-72">
          <RetourExperienceDiagInformations rex={rex} />
          {showContacts && <RetourExperienceDiagContacts contacts={contacts} />}
          <RetourExperienceDiagPdf pdf={rex.attributes.guide_pdf?.data?.attributes?.url} />
          {!showContacts && (
            <>
              <Separator className="my-6" />
              <div className={clsx("rounded-xl bg-dsfr-background-alt-blue-france p-4")}>
                <div>
                  Rendez-vous sur l’espace projet pour avoir le contact de la collectivité et des prestataires de ce
                  diagnostic
                </div>
                <Button
                  linkProps={{ href: PFMV_ROUTES.ESPACE_PROJET }}
                  className="mt-4 rounded-3xl text-center"
                  priority="secondary"
                >
                  {"Démarrer sur l'espace projet !"}
                </Button>
              </div>
            </>
          )}
        </div>
        <div>
          <h1 className="mb-5 text-[40px] font-bold leading-[48px]">{titre}</h1>
          <CmsRichText label={description} className={"mb-9 mt-10 [&_p]:text-xl [&_p]:leading-8"} />
          {citations &&
            citations.length > 0 &&
            citations.map((citation) => (
              <CustomDSFRQuote key={citation.auteur} citation={citation} className="mb-11" />
            ))}
          <h2 className="mb-4 mt-20">Besoin</h2>
          <CmsRichText label={besoin} className="mb-20" />
          <h2 className="mb-8">Combinaison de méthodes de diagnostic utilisées</h2>
          <RetourExperienceDiagCombinaison lienRexDiagnostics={lien_rex_diagnostics.data} />
          <RetourExperienceDiagPrincipauxResultats content={resultats} images={resultats_images} />
          {!!points_vigilance && (
            <>
              <h2 className="mb-4">Points de vigilance</h2>
              <CmsRichText label={points_vigilance} className="mb-20" />
            </>
          )}
          {!!apres && (
            <>
              <h2 className="mb-4">Et après ?</h2>
              <CmsRichText label={apres} className="mb-20" />
            </>
          )}
          {!!credits && (
            <>
              <h2 className="mb-4">Crédits</h2>
              <CmsRichText label={credits} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const RetourExperienceDiagLabel = ({ children }: PropsWithChildren) => {
  return <div className="rounded-lg bg-black/80 px-3 py-2 font-bold">{children}</div>;
};
