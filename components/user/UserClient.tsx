"use client";

import { getBookmarkedFichesSolutionsAction } from "@/actions/users/get-bookmarked-fs-action";
import { useUserStore } from "@/stores/user/provider";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export const UserClient = () => {
  const { data } = useSession();

  const setUserInfos = useUserStore((state) => state.setUserInfos);
  const setBookmarkedFichesSolutions = useUserStore((state) => state.setBookmarkedFichesSolutions);
  useEffect(() => {
    setUserInfos(data?.user);
    const fetchBookmarkedFichesSolution = async () => {
      if (data) {
        try {
          const fs = await getBookmarkedFichesSolutionsAction(data?.user.id);
          setBookmarkedFichesSolutions(fs.savedBookmarkedFichesSolutions ?? []);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchBookmarkedFichesSolution();
  }, [data?.user, data, setBookmarkedFichesSolutions, setUserInfos]);

  return null;
};
