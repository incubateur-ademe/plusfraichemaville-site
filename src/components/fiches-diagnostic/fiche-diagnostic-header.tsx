import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import Image from "next/image";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";
import { getDelaiTravauxFiche } from "@/src/helpers/delaiTravauxFiche";
import { getCoutFiche } from "@/src/helpers/cout/cout-fiche-solution";
import { formatNumberWithSpaces, ICON_COLOR_FICHE_DIAGNOSTIC, TypeFiche } from "@/src/helpers/common";
import { Separator } from "../common/separator";
import clsx from "clsx";
import { getFicheDiagUtilite, getFicheDiagUtiliteProperties } from "./helpers";
import { isEmpty } from "@/src/helpers/listUtils";
import { getEchelleSpatialeLabel } from "@/src/helpers/echelle-spatiale-diagnostic";
import { FicheDiagnosticUtilite } from "@/src/lib/strapi/types/strapi-custom-types";
import { getFicheDiagImage } from "../retour-experience-diag/helpers";

export const FicheDiagnosticHeader = ({
  ficheDiagnostic,
  overrideUtiliteFiche,
}: {
  ficheDiagnostic: FicheDiagnostic;
  overrideUtiliteFiche?: FicheDiagnosticUtilite;
}) => {
  const { attributes } = ficheDiagnostic;
  const coutMin = attributes.cout_min;
  const coutMax = attributes.cout_max;
  const delaiMin = attributes.delai_min;
  const delaiMax = attributes.delai_max;
  const delai = getDelaiTravauxFiche(TypeFiche.diagnostic, delaiMin, delaiMax);
  const cout = getCoutFiche(TypeFiche.diagnostic, coutMin, coutMax);
  const utiliteFiche = overrideUtiliteFiche
    ? getFicheDiagUtiliteProperties(overrideUtiliteFiche)
    : getFicheDiagUtilite(ficheDiagnostic);

  const image = getFicheDiagImage(ficheDiagnostic);

  return (
    <div className={utiliteFiche.colors.bgLight} id="fiche-diag-header">
      <div className="fr-container">
        <div
          className={clsx(
            "flex flex-col justify-between gap-5 pb-11 pt-8 md:flex-row md:gap-10",
            utiliteFiche.colors.bgLight,
          )}
        >
          <div className="hidden size-32 shrink-0 items-center justify-center rounded-full bg-white md:flex">
            <Image
              src={getStrapiImageUrl(image, STRAPI_IMAGE_KEY_SIZE.medium)}
              alt={attributes.titre}
              className="object-contain"
              width={90}
              height={90}
            />
          </div>
          <div>
            <h1 className="mb-3 max-w-2xl text-2xl md:text-4xl md:leading-[50px]">{attributes.titre}</h1>
            <span className="italic md:text-xl">{attributes.nom_scientifique ?? "Non renseigné"}</span>
            <Separator className={clsx("my-5 !h-[1px] !opacity-50", utiliteFiche.colors.separator)} />
            {!isEmpty(ficheDiagnostic.attributes.utilite_methode) && (
              <ul className="">
                {ficheDiagnostic.attributes.utilite_methode.map((utilite) => (
                  <li key={utilite.description} className="relative !mb-0">
                    <span className={clsx(utiliteFiche.colors.pictoFaded, "mr-3 text-xl")}>▸</span>
                    {utilite?.description}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={clsx("h-fit shrink-0 rounded-2xl", "px-6 py-8 md:w-80 ", utiliteFiche.colors.bgDark)}>
            <div>
              <small className="mb-1 block text-sm font-bold">Temporalité</small>
              <div className="flex justify-between">
                <div className="mr-2 h-4">{delai?.icons(ICON_COLOR_FICHE_DIAGNOSTIC(utiliteFiche))}</div>
                <small className="text-sm">
                  {delaiMin} à {delaiMax} mois
                </small>
              </div>
            </div>
            <Separator className={clsx(utiliteFiche.colors.separator, "my-3 !h-[1px] !opacity-100")} />
            <div>
              <small className="mb-1 block text-sm font-bold">Coût</small>
              <div className="flex justify-between">
                <div className="mr-2 h-4">{cout?.icons(ICON_COLOR_FICHE_DIAGNOSTIC(utiliteFiche))}</div>
                <small className="text-sm">
                  de {formatNumberWithSpaces(coutMin)} à {formatNumberWithSpaces(coutMax)} euros HT
                </small>
              </div>
              <div className="mt-6 text-sm">{attributes.explication_source}</div>
            </div>
            <Separator className={clsx(utiliteFiche.colors.separator, "my-3 !h-[1px] !opacity-100")} />
            <div>
              <small className="mb-1 block text-sm font-bold">Échelle</small>
              <div className="text-sm">{getEchelleSpatialeLabel(ficheDiagnostic) ?? "Non renseigné"}</div>
            </div>
            <Separator className={clsx(utiliteFiche.colors.separator, "my-3 !h-[1px] !opacity-100")} />
            <div>
              <small className="mb-1 block text-sm font-bold">Type de livrables</small>
              <div className="flex justify-between text-sm">{attributes.type_livrables ?? "Non renseigné"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
