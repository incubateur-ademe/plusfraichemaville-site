"use client";

import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { useModalStore } from "@/src/stores/modal/provider";
import { useIsModalOpen } from "@codegouvfr/react-dsfr/Modal/useIsModalOpen";
import { useEffect } from "react";
import { useSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { useUserStore } from "@/src/stores/user/provider";
import { ProjetWithPublicRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { FicheCardSkeleton } from "../common/fiche-card-skeleton";
import { GET_AVAILABLE_PROJETS_FOR_COLLECTITIVE_URL } from "@/src/helpers/routes";
import { upsert } from "@/src/helpers/listUtils";
import { Case, Conditional } from "@/src/components/common/conditional-renderer";
import { ProjetCard } from "@/src/components/liste-projets/projet-card";

const modal = createModal({
  id: "join-project-modal",
  isOpenedByDefault: false,
});

export const AvailableProjetsForCollectiviteModal = () => {
  const collectiviteId = useModalStore((state) => state.collectiviteIdToListAvailableProjets);
  const setCollectiviteIdToListAvailableProjets = useModalStore(
    (state) => state.setCollectiviteIdToListAvailableProjets,
  );
  const userInfos = useUserStore((state) => state.userInfos);
  const userId = userInfos?.id;
  const userCollectiviteName = userInfos?.collectivites[0].collectivite.nom || "";

  useEffect(() => {
    if (collectiviteId) {
      modal.open();
    }
  }, [collectiviteId]);

  useIsModalOpen(modal, {
    onConceal: () => setCollectiviteIdToListAvailableProjets(null),
  });

  const url = collectiviteId && userId ? GET_AVAILABLE_PROJETS_FOR_COLLECTITIVE_URL(collectiviteId, userId) : null;

  const { data: availableProjects, isLoading, mutate } = useSwrWithFetcher<ProjetWithPublicRelations[]>(url);

  return (
    <>
      <modal.Component title="Rejoindre d'autres projets" size="large" className="join-project-modal">
        <span className="mb-8 block text-base">
          {`Vous pouvez consulter tous les projets de rafraîchissement localisés à ${userCollectiviteName} et
           soumettre une demande d'accès. L'administrateur sera alors notifié de votre demande.`}
        </span>
        <Conditional>
          <Case condition={!isLoading && (availableProjects?.length || 0) === 0}>
            <div className="text-lg font-bold italic">
              {"Il n'y a aucun autre projet disponible pour cette collectivité."}
            </div>
          </Case>
        </Conditional>
        <ul>
          {availableProjects?.map((projet) => (
            <li key={projet.id} className="mb-5">
              <ProjetCard
                projet={projet}
                isBrowsing
                updateProjet={async (updatedProjet) => {
                  await mutate(upsert(availableProjects, updatedProjet));
                }}
              />
            </li>
          ))}
        </ul>
        {isLoading && <FicheCardSkeleton horizontal />}
      </modal.Component>
    </>
  );
};
