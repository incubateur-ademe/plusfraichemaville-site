export const NOTIF_BADGE_CLASSNAME = "notification-badge";

export const navSelectionBadgeOn = () => {
  const badge = document.querySelector<HTMLElement>(`.${NOTIF_BADGE_CLASSNAME}`);
  if (badge) {
    badge.classList.add("active");
  }
};
export const navSelectionBadgeOff = () => {
  const badge = document.querySelector<HTMLElement>(`.${NOTIF_BADGE_CLASSNAME}`);
  if (badge) {
    badge.classList.remove("active");
  }
};
