import { PFMV_ROUTES } from "@/src/helpers/routes";
import { PropsWithChildren } from "react";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

type AideEstimationsListeLinkProps = {
  projetId?: number;
  estimationId?: number;
  className?: string;
} & PropsWithChildren;

export const AideEstimationsListeLink = ({ projetId, estimationId, children }: AideEstimationsListeLinkProps) => {
  return (
    <LinkWithoutPrefetch
      className="fr-btn !ml-auto !block rounded-3xl"
      href={PFMV_ROUTES.ESPACE_PROJET_FINANCEMENT_ESTIMATION_EDIT(projetId, estimationId)}
    >
      {children}
    </LinkWithoutPrefetch>
  );
};
