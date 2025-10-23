import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { PictoTableauDeBordSelector } from "../common/pictos/picto-tableau-de-bord";
import { TableauDeBordSuiviCard, TableauDeBordSuiviCardProps } from "./tableau-de-bord-suivi-card";
import { TableauDeBordFichesSolutionImages } from "./tableau-de-bord-suivi-card-with-fiches-solutions";
import { TableauDeBordSuiviWithText } from "./tableau-de-bord-suivi-card-with-text";
import { getLastCompletedEstimation } from "@/src/helpers/estimation";
import { TableauDeBordSuiviWithEstimation } from "@/src/components/tableau-de-bord/tableau-de-bord-suivi-card-with-estimation";
import { FicheType } from "@/src/generated/prisma/client";
import { isEmpty } from "@/src/helpers/listUtils";
import { getProjetFichesIdsByType } from "@/src/components/common/generic-save-fiche/helpers";
import { TypeFiche } from "@/src/helpers/common";
import { ServicesSidebar } from "@/src/components/tableau-de-bord/services-sidebar/services-sidebar";

export const TableauDeBordSuivi = () => {
  return (
    <>
      <div className="flex flex-wrap gap-8">
        <section className="flex h-fit w-fit max-w-[49rem] shrink flex-wrap gap-8">
          {cards.map((card, index) => (
            <TableauDeBordSuiviCard {...card} key={index} />
          ))}
        </section>
        <ServicesSidebar />
      </div>
    </>
  );
};

const cards: TableauDeBordSuiviCardProps[] = [
  {
    title: "Je fais un diagnostic de la surchauffe urbaine",
    progress: (projet: ProjetWithRelations | undefined) => {
      const hasSelectedFicheDiagnostic = !isEmpty(
        getProjetFichesIdsByType({
          projet,
          typeFiche: TypeFiche.diagnostic,
        }),
      );
      const hasInitiatedDiagSimulation = !isEmpty(projet?.diagnostic_simulations);
      if (hasSelectedFicheDiagnostic && hasInitiatedDiagSimulation) {
        return "100";
      } else if (hasSelectedFicheDiagnostic || hasInitiatedDiagSimulation) {
        return "50";
      }
      return "0";
    },
    disabled: false,
    type: "diagnostic",
    picto: <PictoTableauDeBordSelector pictoId="diagnostic" className="w-24" />,
    children: (
      <TableauDeBordSuiviWithText>
        Faire une analyse simplifiée ou un diagnostic approfondi de la surchauffe
      </TableauDeBordSuiviWithText>
    ),
  },
  {
    title: "Je choisis mes solutions de rafraîchissement",
    progress: (projet: ProjetWithRelations | undefined) =>
      projet?.fiches.filter((f) => f.type === FicheType.SOLUTION).length ? "100" : "0",
    disabled: false,
    type: "solution",
    picto: <PictoTableauDeBordSelector pictoId="solution" className="w-44" />,
    children: <TableauDeBordFichesSolutionImages />,
  },
  {
    title: "Je fais une estimation de budget pour mon projet",
    progress: (projet: ProjetWithRelations | undefined) => {
      if (projet && projet.estimations?.length > 0) {
        return getLastCompletedEstimation(projet.estimations) ? "100" : "50";
      } else {
        return "0";
      }
    },
    disabled: false,
    type: "estimation",
    picto: <PictoTableauDeBordSelector pictoId="estimation" className="w-28" />,
    children: <TableauDeBordSuiviWithEstimation />,
  },
  {
    title: "Je trouve des financements",
    progress: (projet: ProjetWithRelations | undefined) =>
      projet?.estimations?.find((estimation) => estimation.estimations_aides.length > 0) ? "100" : "0",
    disabled: false,
    type: "financement",
    picto: <PictoTableauDeBordSelector pictoId="financement" className="w-24" />,
    children: (
      <TableauDeBordSuiviWithText>
        Identifier les aides et les contacts nécessaires pour préparer un dossier de financement.
      </TableauDeBordSuiviWithText>
    ),
  },
];
