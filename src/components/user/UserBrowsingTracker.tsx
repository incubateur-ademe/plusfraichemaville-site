"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useUserStore } from "@/src/stores/user/provider";
import { updateUserBrowsingDateAction } from "@/src/actions/users/update-user-browsing-date-action";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { hoursSinceDate } from "@/src/helpers/dateUtils";
import { useSession } from "next-auth/react";
import { updateUserProjetLastViewedAction } from "@/src/actions/userProjet/update-user-projet-last-viewed-action";

const NB_HOUR_BEFORE_LOG_NEW_USER_BROWSE = 1;
const NB_HOUR_BEFORE_LOG_NEW_USER_PROJET_BROWSE = 4;

export const UserBrowsingTracker = () => {
  const pathname = usePathname();
  const status = useSession().status;
  const { setUserInfos, userInfos } = useUserStore((state) => state);
  const { addOrUpdateProjet, getCurrentProjet, currentProjetId } = useProjetsStore((state) => state);
  const currentprojet = getCurrentProjet();

  useEffect(() => {
    if (!userInfos) {
      return;
    }

    const updateUserBrowsingDate = async () => {
      const result = await updateUserBrowsingDateAction(userInfos.id);
      if (result.updatedUser) {
        setUserInfos(result.updatedUser);
      }
    };

    const updateUseProjetLastViewedDate = async () => {
      if (!currentprojet) {
        return null;
      }
      const result = await updateUserProjetLastViewedAction(userInfos.id, currentprojet.id);
      if (result.type === "success" && result.projet) {
        addOrUpdateProjet(result.projet);
      }
    };

    const shouldUpdateUser =
      !userInfos.last_browsing_date ||
      hoursSinceDate(userInfos.last_browsing_date) >= NB_HOUR_BEFORE_LOG_NEW_USER_BROWSE;

    if (shouldUpdateUser) {
      updateUserBrowsingDate();
    }

    const currentUserProjet = currentprojet?.users.find((up) => up.user_id === userInfos.id);
    if (currentUserProjet) {
      const shouldUpdateUserProjet =
        !currentUserProjet.last_viewed_at ||
        hoursSinceDate(currentUserProjet.last_viewed_at) >= NB_HOUR_BEFORE_LOG_NEW_USER_PROJET_BROWSE;
      if (shouldUpdateUserProjet) {
        updateUseProjetLastViewedDate();
      }
    }
  }, [pathname, status, currentProjetId]);

  return null;
};
