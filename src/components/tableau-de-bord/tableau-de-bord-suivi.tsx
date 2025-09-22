import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { PictoTableauDeBordSelector } from "../common/pictos/picto-tableau-de-bord";
import { TableauDeBordSuiviCard, TableauDeBordSuiviCardProps } from "./tableau-de-bord-suivi-card";
import { TableauDeBordFichesSolutionImages } from "./tableau-de-bord-suivi-card-with-fiches-solutions";
import { TableauDeBordSuiviCardInfoProjet } from "./tableau-de-bord-suivi-card-info-projet";
import { TableauDeBordSuiviWithText } from "./tableau-de-bord-suivi-card-with-text";
import { getLastCompletedEstimation } from "@/src/helpers/estimation";
import { TableauDeBordSuiviWithEstimation } from "@/src/components/tableau-de-bord/tableau-de-bord-suivi-card-with-estimation";
import { TableauDeBordMaturite } from "./tableau-de-bord-maturite";
import { RexContactId } from "@/src/components/annuaire/types";
import { FicheType } from "@/src/generated/prisma/client";
import { isEmpty } from "@/src/helpers/listUtils";
import { getProjetFichesIdsByType } from "@/src/components/common/generic-save-fiche/helpers";
import { TypeFiche } from "@/src/helpers/common";

export const TableauDeBordSuivi = () => {
  return (
    <>
      <TableauDeBordMaturite />
      <div className="flex flex-wrap gap-8">
        {cards.map((card, index) => (
          <TableauDeBordSuiviCard {...card} key={index} />
        ))}
      </div>
    </>
  );
};

const cards: TableauDeBordSuiviCardProps[] = [
  {
    title: "Je renseigne mon projet",
    index: 1,
    progress: "100",
    disabled: false,
    type: "renseignement",
    picto: <PictoTableauDeBordSelector pictoId="renseignement" className="w-28" />,
    children: <TableauDeBordSuiviCardInfoProjet />,
  },
  {
    title: "Je fais un diagnostic de la surchauffe urbaine",
    index: 2,
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
    index: 3,
    progress: (projet: ProjetWithRelations | undefined) =>
      projet?.fiches.filter((f) => f.type === FicheType.SOLUTION).length ? "100" : "0",
    disabled: false,
    type: "solution",
    picto: <PictoTableauDeBordSelector pictoId="solution" className="w-44" />,
    children: <TableauDeBordFichesSolutionImages />,
  },
  {
    title: "Je fais une estimation de budget pour mon projet",
    index: 4,
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
    index: 5,
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
  {
    title: "Annuaire des projets Plus fraîche ma ville",
    index: 6,
    progress: (projet: ProjetWithRelations | undefined) =>
      (projet?.sourcing_user_projets?.length || 0) > 0 ||
      ((projet?.sourcing_rex as RexContactId[] | null)?.length || 0) > 0
        ? "100"
        : "0",
    disabled: false,
    type: "annuaire",
    picto: <PictoTableauDeBordSelector pictoId="annuaire" className="w-20" />,
    children: (
      <TableauDeBordSuiviWithText>
        {"Contacter des partenaires : bureaux d'étude, AMO, agents de collectivités"}
      </TableauDeBordSuiviWithText>
    ),
  },
];
