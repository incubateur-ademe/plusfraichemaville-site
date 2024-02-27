import { SelectOption } from "@/components/common/SelectFormField";

export type NiveauMaturite = {
  label: string;
  code: string;
};

const ALL_NIVEAU_MATURITE: NiveauMaturite[] = [
  {
    label: "Questionnement sur la surchauffe urbaine au sein d’une commune",
    code: "questionnement",
  },
  {
    label: "Priorisation des solutions de rafraîchissement à déployer",
    code: "priorisationSolutions",
  },
  {
    label: "Rédaction du cahier des charges",
    code: "redactionCDC",
  },
  {
    label: "Lancement des travaux",
    code: "lancementTravaux",
  },
  {
    label: "Evaluation des actions déployées",
    code: "evaluationActions",
  },
];

export const niveauxMaturiteProjetOptions: SelectOption[] = [
  {
    name: "Selectionnez un niveau de maturité",
    value: "",
    disabled: true,
    hidden: true,
  },
  ...ALL_NIVEAU_MATURITE.map((niveau) => ({ name: niveau.label, value: niveau.code })),
];
