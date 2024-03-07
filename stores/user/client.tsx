"use client";

import { useLayoutEffect } from "react";

import { useUserStore } from "./provider";
import { UserInfos } from "./store";

export const UserStoreClient = ({ user }: { user: UserInfos }) => {
  const setUserInfos = useUserStore((state) => state.setUserInfos);

  useLayoutEffect(() => {
    setUserInfos(user);
  }, [user, setUserInfos]);

  return <></>;
};
