"use client";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import { AvailableProjetsForCollectiviteButton } from "@/src/components/liste-projets/available-projets-for-collectivite-button";
import { useUserStore } from "@/src/stores/user/provider";

export const ListeProjetsHeader = ({ isListEmpty }: { isListEmpty: boolean }) => {
  const userInfos = useUserStore((state) => state.userInfos);
  return (
    <>
      <div className="flex flex-col justify-between pb-4 md:flex-row">
        <hgroup>
          <h1 className="mb-1 text-2xl text-dsfr-text-label-blue-france">Mon espace projet</h1>
          <p className="mb-8 block text-lg">
            {userInfos?.is_agent_public
              ? "Les projets de rafraîchissement de ma collectivité"
              : "Les projets de rafraîchissement de mon entreprise"}
          </p>
        </hgroup>
        <div className="align-items-center flex flex-wrap-reverse items-center gap-4">
          <AvailableProjetsForCollectiviteButton className="rounded-3xl" />
          {!isListEmpty && (
            <LinkWithoutPrefetch
              href={PFMV_ROUTES.CREATE_PROJET}
              className="fr-btn ri-add-circle-fill fr-btn--icon-left rounded-3xl"
            >
              Créer un projet
            </LinkWithoutPrefetch>
          )}
        </div>
      </div>
    </>
  );
};
