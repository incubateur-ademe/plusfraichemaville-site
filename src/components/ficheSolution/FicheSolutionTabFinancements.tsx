import aidesTerittoiresLogo from "../../../public/images/fiches-solutions/aides-territoires.svg";
import Image from "next/image";
import { getRegionLabelFromCode } from "@/src/helpers/regions";
import CmsRichText from "@/src/components/common/CmsRichText";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

export default function FicheSolutionTabFinancements({
  ficheAttributes,
}: {
  ficheAttributes: FicheSolution["attributes"];
}) {
  return (
    <div className="text-dsfr-text-title-grey">
      <h2 className="mb-8 text-[1.75rem] font-bold">Financements</h2>
      {ficheAttributes.lien_aide_territoire && (
        <div className="mt-10 rounded-2xl bg-dsfr-background-action-low-blue-france p-4 md:p-8">
          <div className="flex flex-row gap-6">
            <div className="hidden w-32 rounded-xl bg-white py-2 md:flex">
              <Image src={aidesTerittoiresLogo} alt="Logo Aides Territoires" width={200} height={200} />
            </div>
            <div>
              <h3 className="mb-2 mt-2 text-[1.375rem] font-bold">Aides-territoires</h3>
              <div>
                <LinkWithoutPrefetch href={ficheAttributes.lien_aide_territoire} target="_blank">
                  Consulter toutes les aides
                </LinkWithoutPrefetch>{" "}
                disponibles liées à cette solution sur Aides-territoires
              </div>
            </div>
          </div>
        </div>
      )}
      {ficheAttributes.aides_regionales && ficheAttributes.aides_regionales.length > 0 && (
        <>
          <h3 className="mb-4 mt-10 text-[1.375rem] font-bold">Aides spécifiques par régions</h3>
          {ficheAttributes.aides_regionales.map((aideRegionale) => (
            <div key={aideRegionale.region?.data?.attributes.code} className="mb-10 mt-2">
              <div className="flex">
                <span className="fr-icon-map-pin-2-fill fr-icon--sm mr-2" />
                <div className="mb-1 text-lg font-bold">
                  {getRegionLabelFromCode(aideRegionale.region?.data?.attributes.code)}
                </div>
              </div>
              <CmsRichText label={aideRegionale.description} />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
