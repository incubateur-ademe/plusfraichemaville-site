export const NOTIF_BADGE_CLASSNAME = "notification-badge";

export enum NotificationElements {
  // eslint-disable-next-line no-unused-vars
  selectionMenuItem = "selection-menu-item",
}

export const setBadgeOn = (element: NotificationElements) => {
  const badge = document.querySelector<HTMLElement>(`.${element}`);
  if (badge) {
    badge.classList.add(NOTIF_BADGE_CLASSNAME);
  }
};
export const setBadgeOff = (element: NotificationElements) => {
  const badge = document.querySelector<HTMLElement>(`.${element}`);
  if (badge) {
    badge.classList.remove(NOTIF_BADGE_CLASSNAME);
  }
};
