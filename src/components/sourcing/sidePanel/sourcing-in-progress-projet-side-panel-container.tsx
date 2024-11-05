import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { GET_PUBLIC_PROJET_BY_ID } from "@/src/helpers/routes";
import { ProjetWithPublicRelations } from "@/src/lib/prisma/prismaCustomTypes";
// eslint-disable-next-line max-len
import { SourcingInProgressProjetSkeleton } from "@/src/components/sourcing/sidePanel/sourcing-in-progress-projet-skeleton";
import { SourcingInProgressProjetCard } from "@/src/components/sourcing/sidePanel/sourcing-in-progress-projet-card";

export const SourcingInProgressSidePanelContainer = ({ projetId }: { projetId: number }) => {
  const { data, isLoading } = useImmutableSwrWithFetcher<ProjetWithPublicRelations>(GET_PUBLIC_PROJET_BY_ID(+projetId));
  if (isLoading) {
    return <SourcingInProgressProjetSkeleton />;
  }

  return data ? <SourcingInProgressProjetCard projet={data} /> : <div>Erreur de chargement du projet</div>;
};
