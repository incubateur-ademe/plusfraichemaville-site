"use client";

import { BOOKMARK_FS_KEY } from "@/helpers/bookmarkedFicheSolutionHelper";
import { saveBookmarkedFichesSolutionsUserAction } from "@/actions/users/save-bookmarked-fs-action";
import { convertBookmarkIdsToNumbers } from "@/app/mon-projet/favoris/helper";
import { useEffect } from "react";
import { useUserStore } from "@/stores/user/provider";
import { getBookmarkedFichesSolutionsAction } from "@/actions/users/get-bookmarked-fs-action";

let init = false;

export const useBookmarkedFichesSolutions = () => {
  const user = useUserStore((state) => state.userInfos);

  const setBookmarkedFichesSolutions = useUserStore((state) => state.setBookmarkedFichesSolutions);
  useEffect(() => {
    const fetchAndSaveBookmarks = async () => {
      if (typeof window !== "undefined") {
        const storedBookmarks = localStorage.getItem(BOOKMARK_FS_KEY);
        console.log(storedBookmarks);

        if (storedBookmarks && user?.id && !init) {
          const parsedBookmarks = convertBookmarkIdsToNumbers(JSON.parse(storedBookmarks));
          try {
            const saved = await saveBookmarkedFichesSolutionsUserAction(user.id, parsedBookmarks);
            init = true;

            if (saved.updatedBookmarkedFichesSolutions && saved.updatedBookmarkedFichesSolutions?.length > 0) {
              setBookmarkedFichesSolutions(saved.updatedBookmarkedFichesSolutions);
              localStorage.setItem(BOOKMARK_FS_KEY, JSON.stringify([]));
            }
          } catch (error) {
            console.warn(error);
          }
        } else {
          if (user?.id) {
            try {
              const savedBookmarks = await getBookmarkedFichesSolutionsAction(user.id);
              if (savedBookmarks.savedBookmarkedFichesSolutions) {
                setBookmarkedFichesSolutions(savedBookmarks.savedBookmarkedFichesSolutions);
              }
            } catch (error) {
              console.warn(error);
            }
          }
        }
      }
    };

    fetchAndSaveBookmarks();
  }, [user, setBookmarkedFichesSolutions]);
};

export const UseBookmarkedFichesSolutions = () => {
  useBookmarkedFichesSolutions();

  return null;
};
