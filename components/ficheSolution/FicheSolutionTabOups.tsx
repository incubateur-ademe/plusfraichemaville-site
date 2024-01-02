import React from "react";
import oupsImage from "../../public/images/fiches-solutions/oups.svg";
import Image from "next/image";
import Highlight from "@codegouvfr/react-dsfr/Highlight";
import CmsRichText from "@/components/common/CmsRichText";
import FicheSolutionCardWithUserInfo from "@/components/ficheSolution/FicheSolutionCardWithUserInfo";
import { GetValues } from "@/lib/strapi/types/types";

export default function FicheSolutionTabOups({
  ficheSolution,
}: {
  ficheSolution: GetValues<"api::fiche-solution.fiche-solution">;
}) {
  return (
    <div className="text-dsfr-text-title-grey">
      <div className="font-bold text-[1.75rem] mb-8">Oups !</div>
      {!!ficheSolution.oups?.length && ficheSolution.oups.length > 0 && (
        <>
          <div className="bg-dsfr-background-action-low-blue-france rounded-2xl mt-10 p-6 md:p-0">
            <div className="flex flex-row gap-6">
              <div className="rounded-xl w-56 hidden md:flex ml-8">
                <Image src={oupsImage} alt="Logo Oups" width={300} height={300} />
              </div>
              <div className="text-[1.375rem] mb-2 md:mt-8 mr-10">
                Oups ! La solution que vous avez déployée ne fonctionne pas comme prévu ? Pas de panique !
              </div>
            </div>
          </div>
          {ficheSolution.oups.map((oups) => (
            <div key={oups.titre} className="mt-12">
              <Highlight className="font-bold text-[1.375rem] ml-0 leading-normal">{oups.titre}</Highlight>
              <CmsRichText label={oups.description} className="mt-8" />
              {!!oups.solutions_reparatrices?.data.length && oups.solutions_reparatrices.data.length > 0 && (
                <>
                  <div className="text-[1.375rem] font-bold mb-4 mt-8">Fiches associées</div>
                  <ul className="flex list-none flex-wrap justify-center md:justify-start pl-2 gap-6">
                    {oups.solutions_reparatrices.data.slice(0, 2).map((fs) => (
                      <li key={fs.attributes.vuid} className="flex">
                        <FicheSolutionCardWithUserInfo
                          ficheSolution={fs.attributes}
                          key={fs.id}
                          className={"flex-none mb-12"}
                          projectName=""
                        />
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
