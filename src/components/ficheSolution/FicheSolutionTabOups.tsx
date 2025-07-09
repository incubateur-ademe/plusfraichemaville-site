import oupsImage from "../../../public/images/fiches-solutions/oups.svg";
import Image from "next/image";
import Highlight from "@codegouvfr/react-dsfr/Highlight";
import CmsRichText from "@/src/components/common/CmsRichText";
import FicheSolutionCardWithUserInfo from "@/src/components/ficheSolution/FicheSolutionCardWithUserInfo";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

export default function FicheSolutionTabOups({ ficheAttributes }: { ficheAttributes: FicheSolution["attributes"] }) {
  return (
    <div className="text-dsfr-text-title-grey">
      <div className="mb-8 text-[1.75rem] font-bold">Oups !</div>
      <div className="mt-10 rounded-2xl bg-dsfr-background-action-low-blue-france p-6 md:p-0">
        <div className="flex flex-row gap-6">
          <div className="ml-8 hidden w-56 rounded-xl md:flex">
            <Image src={oupsImage} alt="Logo Oups" width={300} height={300} />
          </div>
          <div className="mb-2 mr-10 text-[1.375rem] md:mt-8">
            Oups ! La solution que vous avez déployée ne fonctionne pas comme prévu ? Pas de panique !
          </div>
        </div>
      </div>
      {(!ficheAttributes.oups || ficheAttributes.oups.length === 0) && (
        <div className={"mt-8"}>
          {"Retrouvez bientôt ici les conseils et les solutions complémentaires rapides et faciles à mettre en " +
            "œuvre qui vous permettront de rétablir la situation en un rien de temps."}
          <br />
          <br />
          <div className="flex flex-row flex-wrap items-center gap-4">
            <div>{"Vous avez un retour d’expérience à nous partager ? Contactez nous !"}</div>
            <LinkWithoutPrefetch className="fr-btn fr-btn--tertiary rounded-3xl" href={`/contact`}>
              Nous contacter
            </LinkWithoutPrefetch>
          </div>
        </div>
      )}
      {ficheAttributes.oups?.map((oups) => (
        <div key={oups.titre} className="mt-12">
          <Highlight className="ml-0 text-[1.375rem] font-bold leading-normal">{oups.titre}</Highlight>
          <CmsRichText label={oups.description} className="mt-8" />
          {!!oups.solutions_reparatrices?.data.length && oups.solutions_reparatrices.data.length > 0 && (
            <>
              <div className="mb-4 mt-8 text-[1.375rem] font-bold">Fiches associées</div>
              <ul className="flex list-none flex-wrap justify-center gap-6 pl-2 md:justify-start">
                {oups.solutions_reparatrices.data.slice(0, 2).map((fs) => (
                  <li key={fs.id} className="flex">
                    <FicheSolutionCardWithUserInfo
                      ficheSolution={fs}
                      key={fs.id}
                      className={"mb-12 flex-none"}
                      projectName=""
                    />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
