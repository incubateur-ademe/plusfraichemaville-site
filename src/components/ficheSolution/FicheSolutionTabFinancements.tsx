import React from "react";
import aidesTerittoiresLogo from "../../public/images/fiches-solutions/aides-territoires.svg";
import Link from "next/link";
import Image from "next/image";
import { getRegionLabelFromCode } from "@/src/helpers/regions";
import CmsRichText from "@/src/components/common/CmsRichText";
import { GetValues } from "@/src/lib/strapi/types/types";

export default function FicheSolutionTabFinancements({
  ficheSolution,
}: {
  ficheSolution: GetValues<"api::fiche-solution.fiche-solution">;
}) {
  return (
    <div className="text-dsfr-text-title-grey">
      <div className="mb-8 text-[1.75rem] font-bold">Financements</div>
      {ficheSolution.lien_aide_territoire && (
        <div className="mt-10 rounded-2xl bg-dsfr-background-action-low-blue-france p-4 md:p-8">
          <div className="flex flex-row gap-6">
            <div className="hidden w-32 rounded-xl bg-white py-2 md:flex">
              <Image src={aidesTerittoiresLogo} alt="Logo Aides Territoires" width={200} height={200} />
            </div>
            <div>
              <div className="mb-2 mt-2 text-[1.375rem] font-bold">Aides-territoires</div>
              <div>
                <Link href={ficheSolution.lien_aide_territoire} target="_blank">
                  Consulter toutes les aides
                </Link>{" "}
                disponibles liées à cette solution sur Aides-territoires
              </div>
            </div>
          </div>
        </div>
      )}
      {ficheSolution.lien_fond_vert && (
        <>
          <div className="mb-2 mt-10 text-[1.375rem] font-bold">Fonds Vert</div>
          <div>
            <Link href={ficheSolution.lien_fond_vert} target="_blank">
              Consulter les aides liées à cette solution
            </Link>{" "}
            dans le cadre du programme Fonds Vert
          </div>
        </>
      )}
      {ficheSolution.aides_regionales && ficheSolution.aides_regionales.length > 0 && (
        <>
          <div className="mb-4 mt-10 text-[1.375rem] font-bold">Aides spécifiques par régions</div>
          {ficheSolution.aides_regionales.map((aideRegionale) => (
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
