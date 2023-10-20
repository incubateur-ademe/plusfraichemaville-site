"use client";

function readCookie(name: string) {
  const cookieEntry = document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)");
  return cookieEntry ? cookieEntry.pop() : null;
}

function setCookie(name: string, value: string, isRootPath = false) {
  document.cookie = `${name}=${value};secure;${isRootPath ? ";path=/;" : ""}`;
}

export const isFicheTechniquesBookmarked = (slug: string) => {
  const bookmarkCookie = readCookie("bookmark-ft");
  if (bookmarkCookie) {
    const bookmarks = bookmarkCookie.split(",");
    return bookmarks.includes(slug);
  } else {
    return false;
  }
};

export const bookmarkFicheTechniques = (slug: string) => {
  const bookmarkCookie = readCookie("bookmark-ft");
  if (bookmarkCookie) {
    const bookmarks = bookmarkCookie.split(",");
    if (!bookmarks.includes(slug)) {
      bookmarks.push(slug);
      setCookie("bookmark-ft", bookmarks.toString());
    }
  } else {
    setCookie("bookmark-ft", [slug].toString());
  }
};

export const unBookmarkFicheTechniques = (slug: string) => {
  const bookmarkCookie = readCookie("bookmark-ft");
  if (bookmarkCookie) {
    const bookmarks = bookmarkCookie.split(",");
    const index = bookmarks.indexOf(slug);
    if (index > -1) {
      bookmarks.splice(index, 1); // 2nd parameter means remove one item only
      setCookie("bookmark-ft", bookmarks.toString());
    }
  }
};
