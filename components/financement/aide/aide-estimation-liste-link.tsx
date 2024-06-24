import { PFMV_ROUTES } from "@/helpers/routes";
import Link from "next/link";
import { PropsWithChildren } from "react";

type AideEstimationsListeLinkProps = {
  projetId?: number;
  estimationId?: number;
  className?: string;
} & PropsWithChildren;

export const AideEstimationsListeLink = ({ projetId, estimationId }: AideEstimationsListeLinkProps) => {
  return (
    <Link
      className="fr-btn !ml-auto mt-6 !block rounded-3xl"
      href={PFMV_ROUTES.ESPACE_PROJET_FINANCEMENT_ESTIMATION_EDIT(projetId, estimationId)}
    >
      Modifier
    </Link>
  );
};
