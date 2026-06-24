"use client";

import { usePostHog } from "posthog-js/react";
import { useEffect } from "react";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { getFirstCreatedProjet, getFirstJoinedProjet } from "../espace-projet/utilisateurs-projet/helpers";
import { useUserStore } from "../../stores/user/provider";

function PostHogTagManager() {
  const posthog = usePostHog();
  const userInfos = useUserStore((state) => state.userInfos);
  const userUserProjets = useProjetsStore((state) => state.userProjets);
  const firstCreatedProjetCreationDate = getFirstCreatedProjet(userUserProjets)?.created_at?.toISOString();
  const firstJoinedProjetJoiningDate = getFirstJoinedProjet(userUserProjets)?.created_at?.toISOString();
  const userSubscriptionDate = userInfos?.created_at.toISOString();

  useEffect(() => {
    if (userInfos && userSubscriptionDate) {
      posthog.identify(userInfos.id, {
        date_inscription_utilisateur: userSubscriptionDate,
      });
    }
  }, [userSubscriptionDate]);

  useEffect(() => {
    if (userInfos && firstCreatedProjetCreationDate) {
      posthog.identify(userInfos.id, {
        date_creation_premier_projet: firstCreatedProjetCreationDate,
      });
    }
  }, [firstCreatedProjetCreationDate]);

  useEffect(() => {
    if (userInfos && firstJoinedProjetJoiningDate) {
      posthog.identify(userInfos.id, {
        date_rattachement_premier_projet: firstJoinedProjetJoiningDate,
      });
    }
  }, [firstJoinedProjetJoiningDate]);

  useEffect(() => {
    if (userInfos) {
      posthog.identify(userInfos.id, {
        nb_projet_total: userUserProjets.length,
      });
    }
  }, [userUserProjets]);

  return null;
}

export function SuspendedPostHogTagManager() {
  return <PostHogTagManager />;
}
