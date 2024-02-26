"use client";

import { useUserStore } from "@/stores/user";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export const UserClient = () => {
  const { data } = useSession();

  const setUserInfos = useUserStore((state) => state.setUserInfos);
  useEffect(() => {
    setUserInfos(data?.user);
  }, [data?.user, setUserInfos]);

  return null;
};
