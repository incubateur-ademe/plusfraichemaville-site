export type LczLegendType = {
  description: string;
  color: string;
};

export const LCZ_LEGENDS: LczLegendType[] = [
  { description: "LCZ 1 : Ensemble compact de tours", color: "bg-[#8C0100]" },
  { description: "LCZ 2 : Ensemble compact d'immeubles", color: "bg-[#D00100]" },
  { description: "LCZ 3 : Ensemble compact de maisons", color: "bg-[#FF0000]" },
  { description: "LCZ 4 : Ensemble de tours espacées", color: "bg-[#914113]" },
  { description: "LCZ 5 : Ensemble d'immeubles espacés", color: "bg-[#FA6600]" },
  { description: "LCZ 6 : Ensemble de maisons espacées", color: "bg-[#F19152]" },
  { description: "LCZ 8 : Bâtiments bas de grande emprise", color: "bg-[#BCBCBC]" },
  { description: "LCZ 9 : Implantation diffuse de maisons", color: "bg-[#FFCCAA]" },
  { description: "LCZ A : Espace densément arboré", color: "bg-[#006A00]" },
  { description: "LCZ B : Espace arboré clairsemé", color: "bg-[#05AA02]" },
  { description: "LCZ C : Espace végétalisé hétérogène", color: "bg-[#648525]" },
  { description: "LCZ D : Végétation basse", color: "bg-[#b9db79]" },
  { description: "LCZ E : Sol imperméable naturel ou artificiel", color: "bg-[#000000]" },
  { description: "LCZ F : Sol nu perméable", color: "bg-[#fbf7ae]" },
  { description: "LCZ G : Surface en eau", color: "bg-[#6a6aff]" },
];
