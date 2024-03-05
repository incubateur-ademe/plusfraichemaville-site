"use client";

import { BOOKMARK_FS_KEY } from "@/helpers/bookmarkedFicheSolutionHelper";
import { saveBookmarkedFichesSolutionsProjetAction } from "@/actions/users/save-bookmarked-fs-action";
import { useSession } from "next-auth/react";
import { convertBookmarkIdsToNumbers } from "@/app/mon-projet/favoris/helper";
import { useEffect } from "react";

// let init = false;

export const useSavedProjets = () => {
  const session = useSession();

  useEffect(() => {
    const fetchAndSaveBookmarks = async () => {
      if (typeof window !== "undefined") {
        const storedBookmarks = localStorage.getItem(BOOKMARK_FS_KEY);
        if (!storedBookmarks) {
          return null;
        } else if (storedBookmarks && session.data && session.status === "authenticated") {
          const parsedBookmarks = convertBookmarkIdsToNumbers(JSON.parse(storedBookmarks));
          try {
            const saved = await saveBookmarkedFichesSolutionsProjetAction(session.data?.user.id, parsedBookmarks);
            if (saved.updatedBookmarkedFichesSolutions?.length) {
              localStorage.clear();
            }
          } catch (error) {
            console.warn(error);
          }
        }
      }
    };

    fetchAndSaveBookmarks();
  }, [session]);
};

export const UseSavedProjets = () => {
  useSavedProjets();
  return null;
};
