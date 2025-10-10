import { SelectOption } from "@/src/components/common/SelectFormField";
import clsx from "clsx";
import { MaturiteProgress } from "@/src/components/maturite/maturite-progress";

export enum NiveauMaturiteCode {
  questionnement = "questionnement",
  priorisationSolutions = "priorisationSolutions",
  redactionCDC = "redactionCDC",
  lancementTravaux = "lancementTravaux",
  evaluationActions = "evaluationActions",
}
type NiveauMaturiteType = `${NiveauMaturiteCode}`;

export type NiveauMaturite = {
  label: string;
  crmConnectLabel: string;
  code: NiveauMaturiteType;
  avancement: number;
};

export const ALL_NIVEAU_MATURITE: NiveauMaturite[] = [
  {
    label: "Questionnement sur la surchauffe urbaine au sein d’une commune",
    crmConnectLabel: "Questionnement",
    code: "questionnement",
    avancement: 1,
  },
  {
    label: "Priorisation des solutions de rafraîchissement à déployer",
    crmConnectLabel: "Priorisation",
    code: "priorisationSolutions",
    avancement: 2,
  },
  {
    label: "Rédaction du cahier des charges",
    crmConnectLabel: "Rédaction du cahier des charges",
    code: "redactionCDC",
    avancement: 3,
  },
  {
    label: "Lancement des travaux",
    crmConnectLabel: "Lancement des travaux",
    code: "lancementTravaux",
    avancement: 4,
  },
  {
    label: "Evaluation des actions déployées",
    crmConnectLabel: "Évaluation",
    code: "evaluationActions",
    avancement: 5,
  },
];

export const niveauxMaturiteProjetOptions: SelectOption[] = [
  ...ALL_NIVEAU_MATURITE.map((niveau) => ({ name: niveau.label, value: niveau.code })),
];

export const formatNiveauMaturiteOptionLabel = (niveauMaturite: NiveauMaturite) => (
  <div className="flex flex-row items-center gap-3">
    <MaturiteProgress value={niveauMaturite.avancement} />
    <span className={clsx("mr-4 text-wrap font-normal")}>{niveauMaturite?.label}</span>
  </div>
);

export const formatNiveauMaturiteWithoutLabel = (niveauMaturite: NiveauMaturite) => (
  <div className="flex flex-row items-center gap-3">
    <MaturiteProgress value={niveauMaturite.avancement} />
  </div>
);

export const getNiveauMaturiteByCode = (currentNiveau: NiveauMaturite["code"] | null) =>
  ALL_NIVEAU_MATURITE.find((niveau) => niveau.code === currentNiveau);
