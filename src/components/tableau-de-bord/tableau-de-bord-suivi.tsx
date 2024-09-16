import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { PictoTableauDeBordSelector } from "../common/pictos/picto-tableau-de-bord";
import { TableauDeBordSuiviCard, TableauDeBordSuiviCardProps } from "./tableau-de-bord-suivi-card";

import {
  TableauDeBordFichesDiagnoscticImages,
  TableauDeBordFichesSolutionImages,
} from "./tableau-de-bord-suivi-card-with-fiches-solutions";
import { TableauDeBordSuiviCardInfoProjet } from "./tableau-de-bord-suivi-card-info-projet";
import { TableauDeBordSuiviWithText } from "./tableau-de-bord-suivi-card-with-text";
import { getLastCompletedEstimation } from "@/src/helpers/estimation";
// eslint-disable-next-line max-len
import { TableauDeBordSuiviWithEstimation } from "@/src/components/tableau-de-bord/tableau-de-bord-suivi-card-with-estimation";

export const TableauDeBordSuivi = () => {
  return (
    <div className="flex flex-wrap gap-8">
      {cards.map((card, index) => (
        <TableauDeBordSuiviCard {...card} key={index} />
      ))}
    </div>
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
    title: "Je choisis une méthode de diagnostic",
    index: 2,
    progress: (projet: ProjetWithRelations | undefined) => (projet?.fiches_diagnostic_id.length ? "100" : "0"),
    disabled: false,
    type: "diagnostic",
    picto: <PictoTableauDeBordSelector pictoId="diagnostic" className="w-24" />,
    children: <TableauDeBordFichesDiagnoscticImages />,
  },
  {
    title: "Je choisis mes solutions de rafraîchissement",
    index: 3,
    progress: (projet: ProjetWithRelations | undefined) => (projet?.fiches_solutions_id.length ? "100" : "0"),
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
    title: "Je lance la mise en œuvre",
    index: 6,
    progress: "0",
    disabled: true,
    type: "lancement",
    picto: <PictoTableauDeBordSelector pictoId="lancement" className="w-20" />,
    children: (
      <TableauDeBordSuiviWithText>
        Rédiger un cahier des charges et chercher les bons prestataires pour réaliser le projet
      </TableauDeBordSuiviWithText>
    ),
  },
];
