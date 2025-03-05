import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import Image from "next/image";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";
import { getDelaiTravauxFiche } from "@/src/helpers/delaiTravauxFiche";
import { getCoutFiche } from "@/src/helpers/cout/cout-fiche-solution";
import { formatNumberWithSpaces, ICON_COLOR_FICHE_DIAGNOSTIC, TypeFiche } from "@/src/helpers/common";
import { Separator } from "../common/separator";
import clsx from "clsx";
import { isEmpty } from "@/src/helpers/listUtils";
import Tag from "@codegouvfr/react-dsfr/Tag";
import { getEchellesSpatialesByFicheDiagnostic } from "@/src/helpers/ficheDiagnostic/echelle-spatiale-diagnostic";

export const FicheDiagnosticHeader = ({ ficheDiagnostic }: { ficheDiagnostic: FicheDiagnostic }) => {
  const { attributes } = ficheDiagnostic;
  const coutMin = attributes.cout_min;
  const coutMax = attributes.cout_max;
  const delaiMin = attributes.delai_min;
  const delaiMax = attributes.delai_max;
  const delai = getDelaiTravauxFiche(TypeFiche.diagnostic, delaiMin, delaiMax);
  const cout = getCoutFiche(TypeFiche.diagnostic, coutMin, coutMax);

  return (
    <div className="bg-dsfr-background-alt-red-marianne">
      <div className="fr-container">
        <div className="flex flex-col justify-between gap-5 pb-11 pt-8 md:flex-row md:gap-10">
          <div
            className={clsx(
              "fiche-diagnostic-icone hidden size-40 shrink-0 items-center justify-center",
              "rounded-full bg-white md:flex",
            )}
          >
            <Image
              src={getStrapiImageUrl(ficheDiagnostic.attributes.image_icone, STRAPI_IMAGE_KEY_SIZE.medium)}
              alt={attributes.titre}
              className="object-contain"
              width={90}
              height={90}
            />
          </div>
          <div>
            <h1 className="mb-3 max-w-2xl text-2xl md:text-4xl md:leading-[50px]">{attributes.titre}</h1>
            <span className="md:text-xl">{attributes.nom_scientifique}</span>
            <div className="mt-4 flex gap-4 uppercase">
              {getEchellesSpatialesByFicheDiagnostic(ficheDiagnostic).map((echelle) => (
                <Tag className="!rounded-sm font-bold !text-dsfr-text-mention-grey">{echelle.label}</Tag>
              ))}
            </div>
            {!isEmpty(ficheDiagnostic.attributes.utilite_methode) && (
              <>
                <Separator className={clsx("mb-5 mt-3 !h-[1px] !opacity-100")} />
                <div className="mb-2 font-bold">Objectifs :</div>
                <ul className="arrow-list">
                  {ficheDiagnostic.attributes.utilite_methode.map((utilite) => (
                    <li key={utilite.description} className="relative !mb-1">
                      {utilite?.description}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div className="pfmv-flat-card h-fit shrink-0 rounded-2xl px-6 py-8 md:w-80">
            <div>
              <small className="mb-1 block text-sm font-bold">Temporalité</small>
              <div className="flex justify-between">
                <div className="mr-2 h-4">{delai?.icons(ICON_COLOR_FICHE_DIAGNOSTIC)}</div>
                <small className="text-sm">
                  {delaiMin} à {delaiMax} mois
                </small>
              </div>
            </div>
            <Separator className="my-5 !h-[1px] !opacity-100" />
            <div>
              <small className="mb-1 block text-sm font-bold">Coût</small>
              <div className="flex justify-between">
                <div className="mr-2 h-4">{cout?.icons(ICON_COLOR_FICHE_DIAGNOSTIC)}</div>
                <small className="text-sm">
                  de {formatNumberWithSpaces(coutMin)} à {formatNumberWithSpaces(coutMax)} euros HT
                </small>
              </div>
              {attributes.explication_source && <div className="mt-6 text-sm">{attributes.explication_source}</div>}
            </div>
            <Separator className="my-5 !h-[1px] !opacity-100" />
            <div>
              <small className="mb-1 block text-sm font-bold">Type de livrables</small>
              <div className="flex justify-between text-sm text-dsfr-text-mention-grey">
                {attributes.type_livrables ?? "Non renseigné"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
