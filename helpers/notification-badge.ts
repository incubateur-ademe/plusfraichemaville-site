export const NOTIF_BADGE_CLASSNAME = "notification-badge";

export const navSelectionBadgeOn = () => {
  const pastille = document.querySelector<HTMLElement>(`.${NOTIF_BADGE_CLASSNAME}`);
  if (pastille) {
    pastille.classList.add("active");
  }
};
export const navSelectionBadgeOff = () => {
  const pastille = document.querySelector<HTMLElement>(`.${NOTIF_BADGE_CLASSNAME}`);
  if (pastille) {
    pastille.classList.remove("active");
  }
};
