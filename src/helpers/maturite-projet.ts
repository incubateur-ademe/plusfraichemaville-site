import { SelectOption } from "@/src/components/common/SelectFormField";

export type NiveauMaturite = {
  label: string;
  code: string;
  avancement: number;
};

const pipelineDealStage = {
  questionnement: "appointmentscheduled",
  priorisationSolutions: "qualifiedtobuy",
  redactionCDC: "presentationscheduled",
  lancementTravaux: "decisionmakerboughtin",
  evaluationActions: "closedwon",
  projetAbandonne: "closedlost",
};

export type HubspotPipelineDealStageKey = keyof typeof pipelineDealStage;

export const getHubspotPipelineDealStageCode = (code: HubspotPipelineDealStageKey | null) =>
  code && pipelineDealStage[code];

export const ALL_NIVEAU_MATURITE: NiveauMaturite[] = [
  {
    label: "Questionnement sur la surchauffe urbaine au sein d’une commune",
    code: "questionnement",
    avancement: 1,
  },
  {
    label: "Priorisation des solutions de rafraîchissement à déployer",
    code: "priorisationSolutions",
    avancement: 2,
  },
  {
    label: "Rédaction du cahier des charges",
    code: "redactionCDC",
    avancement: 3,
  },
  {
    label: "Lancement des travaux",
    code: "lancementTravaux",
    avancement: 4,
  },
  {
    label: "Evaluation des actions déployées",
    code: "evaluationActions",
    avancement: 5,
  },
];

export const niveauxMaturiteProjetOptions: SelectOption[] = [
  ...ALL_NIVEAU_MATURITE.map((niveau) => ({ name: niveau.label, value: niveau.code })),
];

export const getNiveauMaturiteByCode = (currentNiveau: NiveauMaturite["code"] | null) =>
  ALL_NIVEAU_MATURITE.find((niveau) => niveau.code === currentNiveau);
