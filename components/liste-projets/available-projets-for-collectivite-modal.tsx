"use client";

import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { useModalStore } from "@/stores/modal/provider";
import { useIsModalOpen } from "@codegouvfr/react-dsfr/Modal/useIsModalOpen";
import { useEffect } from "react";
import { useSwrWithFetcher } from "@/hooks/use-swr-with-fetcher";
import { useUserStore } from "@/stores/user/provider";
import { ListeProjetsCard } from "./card";
import { ProjetWithPublicRelations } from "@/lib/prisma/prismaCustomTypes";
import { FicheCardSkeleton } from "../common/fiche-card-skeleton";
import { GET_AVAILABLE_PROJETS_FOR_COLLECTITIVE_URL } from "@/helpers/routes";

const modal = createModal({
  id: "join-project-modal",
  isOpenedByDefault: false,
});

export const AvailableProjetsForCollectiviteModal = () => {
  const collectiviteId = useModalStore((state) => state.collectiviteIdToListAvailableProjets);
  const setCollectiviteIdToListAvailableProjets = useModalStore(
    (state) => state.setCollectiviteIdToListAvailableProjets,
  );
  const userId = useUserStore((state) => state.userInfos?.id);

  useEffect(() => {
    if (collectiviteId) {
      modal.open();
    }
  }, [collectiviteId]);

  useIsModalOpen(modal, {
    onConceal: () => setCollectiviteIdToListAvailableProjets(null),
  });

  const url = collectiviteId && userId ? GET_AVAILABLE_PROJETS_FOR_COLLECTITIVE_URL(collectiviteId, userId) : null;

  const { data: availableProjects, isLoading } = useSwrWithFetcher<ProjetWithPublicRelations[]>(url);

  return (
    <>
      <modal.Component title="" size="large" className="join-project-modal">
        <h2 className="mb-4 text-xl font-bold">Rejoindre {"d'autres"} projets</h2>
        <span className="mb-8 block text-base">
          Vous pouvez consulter tous les projets liés à la collectivité concernée et soumettre une demande {"d'accès"}.
          {"L'administrateur"} sera alors notifié de votre demande.
        </span>
        {availableProjects?.map((projet) => <ListeProjetsCard projet={projet} isBrowsing key={projet.id} />)}
        {isLoading && <FicheCardSkeleton horizontal />}
      </modal.Component>
    </>
  );
};
