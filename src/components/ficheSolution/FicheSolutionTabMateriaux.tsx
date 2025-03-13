import Image from "next/image";
import CmsRichText from "@/src/components/common/CmsRichText";
import entretienIcon from "../../../public/images/fiches-solutions/entretien.svg";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { getUniteCoutFromCode } from "@/src/helpers/cout/cout-common";
import { formatNumberWithSpaces } from "@/src/helpers/common";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";

export default function FicheSolutionTabMateriaux({
  ficheAttributes,
}: {
  ficheAttributes: FicheSolution["attributes"];
}) {
  const displayEntretienPanel =
    ficheAttributes.cout_minimum_entretien != null && ficheAttributes.cout_maximum_entretien != null;

  return (
    <div>
      <div className="mb-8 text-[1.75rem] font-bold text-dsfr-text-title-grey">Matériaux et coûts</div>
      {ficheAttributes.materiaux?.data && ficheAttributes.materiaux.data.length > 0 ? (
        <>
          <hr className="h-[1px] p-0" />
          {ficheAttributes.materiaux.data.map(({ attributes: mat }) => (
            <div key={mat.titre}>
              <div className={"flex flex-col justify-between gap-1 md:flex-row md:gap-6"}>
                <div className="relative mt-8 hidden h-28 w-28 flex-none md:flex">
                  <Image
                    fill
                    sizes="30vw"
                    src={getStrapiImageUrl(mat.image, STRAPI_IMAGE_KEY_SIZE.small)}
                    alt={mat.titre}
                    className={"rounded-2xl object-cover"}
                    unoptimized
                  />
                </div>
                <div className="mb-0 mt-8 grow text-dsfr-text-title-grey md:mb-8">
                  <div className="mb-4 flex items-center gap-6">
                    <div className="relative flex h-28 w-28 flex-none md:hidden">
                      <Image
                        fill
                        src={getStrapiImageUrl(mat.image, STRAPI_IMAGE_KEY_SIZE.small)}
                        alt={mat.titre}
                        sizes="30vw"
                        className={"rounded-2xl object-cover"}
                      />
                    </div>
                    <div className="text-2xl font-bold">{mat.titre}</div>
                  </div>
                  <CmsRichText label={mat.description} className="text-sm" />
                </div>
                <div
                  className={
                    "flex flex-none flex-col bg-dsfr-background-alt-grey p-6 text-dsfr-text-mention-grey md:w-60"
                  }
                >
                  {mat.cout_minimum_fourniture != null && mat.cout_maximum_fourniture != null ? (
                    <>
                      <div>
                        <b>{`${formatNumberWithSpaces(mat.cout_minimum_fourniture)} - ${formatNumberWithSpaces(
                          mat.cout_maximum_fourniture,
                        )} € `}</b>
                        HT / {getUniteCoutFromCode(mat.cout_unite).unitLabel}
                      </div>
                      <div className="text-sm ">(fourniture et pose)</div>
                    </>
                  ) : (
                    <div className="text-sm ">Information de coût non disponible</div>
                  )}
                </div>
              </div>
              <hr className="h-[1px] p-0" />
            </div>
          ))}
        </>
      ) : (
        <div className="mb-4 text-dsfr-text-title-grey">Aucun matériau n{"'"}a été renseigné pour cette fiche</div>
      )}
      {displayEntretienPanel && (
        <>
          <hr className="mt-16 h-[1px] p-0" />
          <div className={"flex flex-col gap-1 md:flex-row md:gap-6"}>
            <div className="relative mb-8 mt-8 hidden h-28 w-28 flex-none md:flex">
              <Image fill src={entretienIcon} alt="Coût d'entretien" sizes="33vw" />
            </div>
            <div className="mb-0 mt-8 flex grow flex-col text-dsfr-text-title-grey md:mb-8">
              <div className="mb-4 flex items-center gap-6">
                <div className="relative flex h-28 w-28 flex-none md:hidden">
                  <Image fill src={entretienIcon} alt="Coût d'entretien" sizes="80vw" />
                </div>
                <div className="mb-2 text-2xl font-bold">{"Coût d'entretien"}</div>
              </div>
              {ficheAttributes.cout_entretien_description && (
                <div className="flex grow text-sm">
                  <CmsRichText label={ficheAttributes.cout_entretien_description} />
                </div>
              )}
            </div>
            <div
              className={
                "flex flex-none flex-col bg-dsfr-background-action-low-blue-france md:w-60 " +
                " p-6 text-dsfr-text-mention-grey"
              }
            >
              <div>
                <b>{`${formatNumberWithSpaces(ficheAttributes.cout_minimum_entretien)} - 
                ${formatNumberWithSpaces(ficheAttributes.cout_maximum_entretien)} € `}</b>
                HT / {getUniteCoutFromCode(ficheAttributes.cout_entretien_unite).unitLabel}{" "}
              </div>
              <div className="text-sm ">par an</div>
            </div>
          </div>
          <hr className="h-[1px] p-0" />
        </>
      )}
    </div>
  );
}
