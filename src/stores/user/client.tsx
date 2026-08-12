"use client";

import { useEffect, useLayoutEffect } from "react";

import { useUserStore } from "./provider";
import { UserInfos } from "./store";
import { useProjetsStore } from "@/src/stores/projets/provider";

export const UserStoreClient = ({ user }: { user?: UserInfos }) => {
  const setUserInfos = useUserStore((state) => state.setUserInfos);
  const navigationPreferences = useUserStore((state) => state.navigationPreferences);
  const reinitNavigationPreferences = useUserStore((state) => state.reInitNavigationPreferences);
  const setNavigationPreferencesProjetId = useUserStore((state) => state.setNavigationPreferencesProjetId);
  const currentProjetId = useProjetsStore((state) => state.currentProjetId);

  useLayoutEffect(() => {
    setUserInfos(user);
  }, [user, setUserInfos]);

  useEffect(() => {
    if (currentProjetId) {
      if (navigationPreferences.projetId !== currentProjetId) {
        reinitNavigationPreferences();
        setNavigationPreferencesProjetId(currentProjetId);
      }
    }
  }, [currentProjetId]);

  return <></>;
};
