"use client";
import { RetourExperienceDiagnostic } from "@/src/lib/strapi/types/api/retour-experience-diagnostic";
import { useProjetsStore } from "@/src/stores/projets/provider";
// eslint-disable-next-line max-len
import { RetourExperienceDiagCardEspaceProjet } from "@/src/components/retour-experience-diag/retour-experience-diag-card-espace-projet";
// eslint-disable-next-line max-len
import { RetourExperienceDiagCardSiteVitrine } from "@/src/components/retour-experience-diag/retour-experience-diag-card-site-vitrine";

type RetourExperienceDiagCardProps = {
  flatStyle?: boolean;
  rex?: RetourExperienceDiagnostic;
  className?: string;
  onClickButton?: () => void;
};

export const RetourExperienceDiagCard = ({ rex, className, onClickButton }: RetourExperienceDiagCardProps) => {
  const projetId = useProjetsStore((state) => state.currentProjetId);
  if (!rex) return null;

  return projetId ? (
    <RetourExperienceDiagCardEspaceProjet rex={rex} className={className} onClickButton={onClickButton} />
  ) : (
    <RetourExperienceDiagCardSiteVitrine rex={rex} className={className} />
  );
};
