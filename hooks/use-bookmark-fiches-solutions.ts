"use client";

import { BOOKMARK_FS_KEY } from "@/helpers/bookmarkedFicheSolutionHelper";
import { saveBookmarkedFichesSolutionsUserAction } from "@/actions/users/save-bookmarked-fs-action";
import { useSession } from "next-auth/react";
import { convertBookmarkIdsToNumbers } from "@/app/mon-projet/favoris/helper";
import { useEffect } from "react";
import { useUserStore } from "@/stores/user/provider";

let init = false;

export const useBookmarkedFichesSolutions = () => {
  const session = useSession();
  const setBookmarkedFichesSolutions = useUserStore((state) => state.setBookmarkedFichesSolutions);
  useEffect(() => {
    const fetchAndSaveBookmarks = async () => {
      if (typeof window !== "undefined") {
        const storedBookmarks = localStorage.getItem(BOOKMARK_FS_KEY);
        if (storedBookmarks && session.data && session.status === "authenticated" && !init) {
          const parsedBookmarks = convertBookmarkIdsToNumbers(JSON.parse(storedBookmarks));
          try {
            const saved = await saveBookmarkedFichesSolutionsUserAction(session.data?.user.id, parsedBookmarks);
            init = true;

            if (saved.updatedBookmarkedFichesSolutions && saved.updatedBookmarkedFichesSolutions?.length > 0) {
              setBookmarkedFichesSolutions(saved.updatedBookmarkedFichesSolutions);
              localStorage.clear();
            }
          } catch (error) {
            console.warn(error);
          }
        }
      }
    };

    fetchAndSaveBookmarks();
  }, [session, setBookmarkedFichesSolutions]);
};

export const UseBookmarkedFichesSolutions = () => {
  useBookmarkedFichesSolutions();
  return null;
};
