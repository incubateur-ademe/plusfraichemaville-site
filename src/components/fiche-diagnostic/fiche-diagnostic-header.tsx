import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import Image from "next/image";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";
import { getDelaiTravauxFiche } from "@/src/helpers/delaiTravauxFiche";
import { getCoutFiche } from "@/src/helpers/cout/cout-fiche-solution";
import { formatNumberWithSpaces, ICON_COLOR_FICHE_DIAGNOSTIC, TypeFiche } from "@/src/helpers/common";
import clsx from "clsx";
import { isEmpty } from "@/src/helpers/listUtils";
import { getEchellesSpatialesByFicheDiagnostic } from "@/src/helpers/ficheDiagnostic/echelle-spatiale-diagnostic";
import { getEchellesThermiquesByFicheDiagnostic } from "@/src/helpers/ficheDiagnostic/echelle-thermique-diagnostic";
import { PublishInformation } from "@/src/components/common/publish-information";
import { GenericSaveFiche } from "@/src/components/common/generic-save-fiche";
import { CopyUrlLink } from "@/src/components/common/copy-url-link";
import { getFullUrl, PFMV_ROUTES } from "@/src/helpers/routes";
import { FicheDiagnosticBadge } from "@/src/components/fiche-diagnostic/fiche-diagnostic-badge";
import Tag from "@codegouvfr/react-dsfr/Tag";

export const FicheDiagnosticHeader = ({ ficheDiagnostic }: { ficheDiagnostic: FicheDiagnostic }) => {
  const { cout_min: coutMin, cout_max: coutMax, delai_min: delaiMin, delai_max: delaiMax } = ficheDiagnostic;
  const delai = getDelaiTravauxFiche(TypeFiche.diagnostic, delaiMin, delaiMax);
  const cout = getCoutFiche(TypeFiche.diagnostic, coutMin, coutMax);
  const tags = [
    ...getEchellesThermiquesByFicheDiagnostic(ficheDiagnostic),
    ...getEchellesSpatialesByFicheDiagnostic(ficheDiagnostic),
  ];

  return (
    <div className="bg-dsfr-background-alt-yellow-tournesol">
      <div className="fr-container fr-pt-4w fr-pb-6w">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm uppercase">
            <FicheDiagnosticBadge className="mb-0" />
            <span className="text-dsfr-text-mention-grey">Fiche méthode</span>
          </div>
          <CopyUrlLink url={getFullUrl(PFMV_ROUTES.SURCHAUFFE_URBAINE_FICHE_DIAGNOSTIC(ficheDiagnostic.slug))} />
        </div>
        <div className="flex flex-col justify-between gap-16 md:flex-row">
          <div className="flex flex-col">
            <div className="flex gap-6">
              <div
                className={clsx(
                  "hidden h-44 w-36 shrink-0 items-center justify-center md:flex",
                  "border border-dsfr-border-default-yellow-moutarde bg-dsfr-background-default-grey",
                )}
              >
                <Image
                  src={getStrapiImageUrl(ficheDiagnostic.image_icone, STRAPI_IMAGE_KEY_SIZE.medium)}
                  alt=""
                  className="object-contain"
                  width={110}
                  height={110}
                  unoptimized
                />
              </div>
              <div>
                <h1 className="mb-6 text-2xl md:text-4xl md:leading-[3rem]">{ficheDiagnostic.titre}</h1>
                {ficheDiagnostic.nom_scientifique && (
                  <p className="mb-1 md:text-lg">{ficheDiagnostic.nom_scientifique}</p>
                )}
                <PublishInformation
                  updatedAt={ficheDiagnostic.updatedAt}
                  className="text-sm text-dsfr-text-mention-grey"
                />
              </div>
            </div>
            {!isEmpty(ficheDiagnostic.objectifs) && (
              <div className="fr-text--lg mt-8">
                <h2 className="fr-text--lg mb-4 font-bold">Objectifs</h2>
                <ul className="m-0 list-none !p-0">
                  {ficheDiagnostic.objectifs.map((objectif) => (
                    <li key={objectif.description} className="mb-2 flex gap-3">
                      <i className="ri-checkbox-circle-line shrink-0 text-picto-highlight-diagnostic" aria-hidden />
                      <span>{objectif.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-auto pt-6">
              <GenericSaveFiche id={ficheDiagnostic.documentId} type={TypeFiche.diagnostic} variant="primary-square" />
            </div>
          </div>
          <div
            className={clsx(
              "shrink-0 border border-dsfr-border-default-yellow-moutarde bg-dsfr-background-default-grey",
              "fr-p-3w md:w-72",
            )}
          >
            {tags.length > 0 && (
              <div className="m-0 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Tag small key={tag.label} className="mb-0 bg-dsfr-background-contrast-yellow-tournesol">
                    {tag.label}
                  </Tag>
                ))}
              </div>
            )}
            <div className="mt-3 flex items-start justify-between gap-2 border-t border-dsfr-border-default-grey py-3">
              <div className="text-xs">
                <div className="mb-1 text-dsfr-text-mention-grey">Durée du diagnostic</div>
                <div className="font-bold">
                  de {delaiMin} à {delaiMax} mois
                </div>
              </div>
              <div className="shrink-0">{delai?.icons(ICON_COLOR_FICHE_DIAGNOSTIC)}</div>
            </div>
            <div className="border-t border-dsfr-border-default-grey py-3 text-xs">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="mb-1 text-dsfr-text-mention-grey">Coût</div>
                  <div className="font-bold">
                    de {formatNumberWithSpaces(coutMin)} à {formatNumberWithSpaces(coutMax)} €
                  </div>
                </div>
                <div className="shrink-0">{cout?.icons(ICON_COLOR_FICHE_DIAGNOSTIC)}</div>
              </div>
              {ficheDiagnostic.explication_source && (
                <div className="mt-2 text-dsfr-text-mention-grey">{ficheDiagnostic.explication_source}</div>
              )}
            </div>
            <div className="border-t border-dsfr-border-default-grey pt-3 text-xs">
              <div className="mb-1 text-dsfr-text-mention-grey">Type de livrables</div>
              <div className="font-bold leading-5">{ficheDiagnostic.type_livrables ?? "Non renseigné"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
