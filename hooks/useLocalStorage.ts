import * as Sentry from "@sentry/nextjs";

const BOOKMARK_FT_KEY = "bookmark-ft";

export const useLocalStorageBookmarkedFT = () => {
  const bookmarkFicheTechnique = (slug: string) => {
    try {
      const currentBookmarksLocalStorage = window.localStorage.getItem(BOOKMARK_FT_KEY);
      if (currentBookmarksLocalStorage) {
        const currentBookmarks = JSON.parse(currentBookmarksLocalStorage);
        if (!currentBookmarks.includes(slug)) {
          currentBookmarks.push(slug);
          window.localStorage.setItem(BOOKMARK_FT_KEY, JSON.stringify(currentBookmarks));
        }
      } else {
        window.localStorage.setItem(BOOKMARK_FT_KEY, JSON.stringify([slug]));
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  const unBookmarkFicheTechnique = (slug: string) => {
    try {
      const bookmarksLocalStorage = window.localStorage.getItem(BOOKMARK_FT_KEY);
      if (bookmarksLocalStorage) {
        const bookmarks = JSON.parse(bookmarksLocalStorage);
        const index = bookmarks.indexOf(slug);
        if (index > -1) {
          bookmarks.splice(index, 1);
          window.localStorage.setItem(BOOKMARK_FT_KEY, JSON.stringify(bookmarks));
        }
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  const isFicheTechniqueBookmarked = (slug: string) => {
    try {
      const bookmarksLocalStorage = window.localStorage.getItem(BOOKMARK_FT_KEY);
      if (bookmarksLocalStorage) {
        const bookmarks = JSON.parse(bookmarksLocalStorage);
        return bookmarks.includes(slug);
      }
    } catch (error) {
      Sentry.captureException(error);
    }
    return false;
  };

  const getAllBookmarkedFicheTechnique = () => {
    try {
      const allBookmarkedFicheTechniques = window.localStorage.getItem(BOOKMARK_FT_KEY);
      return allBookmarkedFicheTechniques ? JSON.parse(allBookmarkedFicheTechniques) : [];
    } catch (error) {
      Sentry.captureException(error);
    }
    return [];
  };

  return {
    bookmarkFicheTechnique,
    unBookmarkFicheTechnique,
    getAllBookmarkedFicheTechnique,
    isFicheTechniqueBookmarked,
  };
};
