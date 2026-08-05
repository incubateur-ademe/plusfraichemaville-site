export const SolutionTabIds = { ARBRE: "arbreDecision", TOUTES_SOLUTIONS: "toutesSolutions" } as const;
export type SolutionTabIdType = (typeof SolutionTabIds)[keyof typeof SolutionTabIds];