import { PictoTableauDeBordSelector } from "../common/pictos/picto-tableau-de-bord";
import { TableauDeBordSuiviCard, TableauDeBordSuiviCardProps } from "./tableau-de-bord-suivi-card";
import { TableauDeBordSuiviWithFichesSolutions } from "./tableau-de-bord-suivi-card-with-fiches-solutions";
import { TableauDeBordSuiviCardWithList } from "./tableau-de-bord-suivi-card-with-list";
import { TableauDeBordSuiviWithText } from "./tableau-de-bord-suivi-card-with-text";

export const TableauDeBordSuivi = () => {
  return (
    <div className="justify-between flex-wrap max-w-[1120px] flex">
      {cards.map((card, index) => (
        <TableauDeBordSuiviCard {...card} key={index} />
      ))}
    </div>
  );
};

const cards: TableauDeBordSuiviCardProps[] = [
  {
    title: "Je fais un diagnostic de surchauffe urbaine",
    index: 1,
    progress: "0",
    disabled: true,
    picto: <PictoTableauDeBordSelector pictoId="diagnostic" className="w-24" />,
    children: (
      <TableauDeBordSuiviWithText>
        Comprendre les enjeux de surchauffe sur votre territoire avec des données tangibles.
      </TableauDeBordSuiviWithText>
    ),
  },
  {
    title: "Je renseigne mon projet",
    index: 2,
    progress: "100",
    disabled: false,
    picto: <PictoTableauDeBordSelector pictoId="renseignement" className="w-28" />,
    children: <TableauDeBordSuiviCardWithList />,
  },
  {
    title: "Je choisis mes solutions de rafraîchissement",
    index: 3,

    progress: "50",
    disabled: false,
    picto: <PictoTableauDeBordSelector pictoId="solution" className="w-44" />,
    children: <TableauDeBordSuiviWithFichesSolutions />,
  },
  {
    title: "Je fais une estimation de budget pour mon projet",
    index: 4,
    progress: "0",
    disabled: false,
    picto: <PictoTableauDeBordSelector pictoId="estimation" className="w-28" />,
    children: (
      <TableauDeBordSuiviWithText>
        Choisir les matériaux adéquats pour faire une estimation du coût des solutions.
      </TableauDeBordSuiviWithText>
    ),
  },
  {
    title: "Je trouve des financements",
    index: 5,
    progress: "0",
    disabled: true,
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
    picto: <PictoTableauDeBordSelector pictoId="lancement" className="w-20" />,
    children: (
      <TableauDeBordSuiviWithText>
        Rédiger un cahier des charges et chercher les bons prestataires pour réaliser le projet
      </TableauDeBordSuiviWithText>
    ),
  },
];
