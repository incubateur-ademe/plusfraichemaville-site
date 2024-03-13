import React from "react";
import aidesTerittoiresLogo from "../../public/images/fiches-solutions/aides-territoires.svg";
import Link from "next/link";
import Image from "next/image";
import { getRegionLabelFromCode } from "@/helpers/regions";
import CmsRichText from "@/components/common/CmsRichText";
import { GetValues } from "@/lib/strapi/types/types";

export default function FicheSolutionTabFinancements({
  ficheSolution,
}: {
  ficheSolution: GetValues<"api::fiche-solution.fiche-solution">;
}) {
  return (
    <div className="text-dsfr-text-title-grey">
      <div className="font-bold text-[1.75rem] mb-8">Financements</div>
      {ficheSolution.lien_aide_territoire && (
        <div className="bg-dsfr-background-action-low-blue-france rounded-2xl mt-10 p-4 md:p-8">
          <div className="flex flex-row gap-6">
            <div className="bg-white rounded-xl w-32 py-2 hidden md:flex">
              <Image src={aidesTerittoiresLogo} alt="Logo Aides Territoires" width={200} height={200} />
            </div>
            <div>
              <div className="font-bold text-[1.375rem] mb-2 mt-2">Aides-territoires</div>
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
          <div className="font-bold text-[1.375rem] mb-2 mt-10">Fonds Vert</div>
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
          <div className="font-bold text-[1.375rem] mb-4 mt-10">Aides spécifiques par régions</div>
          {ficheSolution.aides_regionales.map((aideRegionale) => (
            <div key={aideRegionale.region?.data?.attributes.code} className="mt-2 mb-10">
              <div className="flex">
                <span className="fr-icon-map-pin-2-fill fr-icon--sm mr-2" />
                <div className="text-lg font-bold mb-1">
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
