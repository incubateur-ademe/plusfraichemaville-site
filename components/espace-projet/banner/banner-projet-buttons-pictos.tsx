/* eslint-disable max-len */

export type BannerPictoProps = {
  active: boolean;
};
export const BannerPictoRecommandations = ({ active }: BannerPictoProps) => {
  const isActive = active ? "#fff" : "#000091";
  return (
    <svg
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      width="30"
      height="25"
      viewBox="0 0 30 25"
      fill="none"
    >
      <path
        d="M27.3214 0H13.3769C12.2538 0 11.3491 0.893683 11.3491 2.00308V3.5131H15.6541C17.9938 3.5131 19.928 5.39291 19.928 7.70416V16.2096C20.8327 17.3498 22.3613 19.0447 24.1394 19.9076C24.2642 19.9692 24.4202 20 24.5762 20C24.8257 20 25.0753 19.9076 25.2625 19.7535C25.5744 19.4761 25.668 19.0447 25.4808 18.6749C25.0441 17.6888 24.9193 16.7643 24.8881 16.0555H27.3214C28.4444 16.0555 29.3491 15.1618 29.3491 14.0524V1.97227C29.3491 0.893683 28.4444 0 27.3214 0Z"
        fill={isActive}
      />
      <path
        d="M15.434 6H2.2642C1.20354 6 0.349121 6.84769 0.349121 7.9V19.3292C0.349121 20.3815 1.20354 21.2292 2.2642 21.2292H4.53283C4.50337 21.9015 4.38552 22.7785 3.97304 23.7138C3.82572 24.0646 3.88465 24.4738 4.17928 24.7369C4.35605 24.9123 4.59175 25 4.82746 25C4.97477 25 5.09262 24.9708 5.23994 24.9123C7.03716 24.0354 8.53976 22.3108 9.36472 21.2292H15.434C16.4947 21.2292 17.3491 20.3815 17.3491 19.3292V7.9C17.3491 6.84769 16.4947 6 15.434 6ZM8.9817 18.7154C8.39245 18.7154 7.92104 18.2477 7.92104 17.6631C7.92104 17.0785 8.39245 16.6108 8.9817 16.6108C9.57096 16.6108 10.0424 17.0785 10.0424 17.6631C10.0424 18.2477 9.57096 18.7154 8.9817 18.7154ZM11.545 13.3077C11.1325 13.8631 10.72 14.1554 10.4254 14.36C10.0718 14.5938 9.92451 14.7108 9.89505 15.2662C9.83612 15.5292 9.62988 15.7046 9.39418 15.7046H8.62815C8.33352 15.7046 8.12728 15.4708 8.15675 15.1785C8.2746 13.8631 8.77546 13.3954 9.42364 12.9569C9.68881 12.7815 9.92451 12.6062 10.1602 12.2846C10.3959 11.9631 10.4254 11.4954 10.2486 11.1154C10.1013 10.8523 9.74773 10.4138 8.92278 10.4138C7.83266 10.4138 7.4791 11.1154 7.39072 11.6415C7.36125 11.8754 7.15501 12.0508 6.91931 12.0508H6.09435C5.79973 12.0508 5.56403 11.7877 5.62295 11.4954C5.82919 10.0631 6.86039 8.68923 8.89331 8.68923C10.1602 8.68923 11.2503 9.30308 11.7807 10.3262C12.2521 11.32 12.1637 12.46 11.545 13.3077Z"
        fill={isActive}
      />
    </svg>
  );
};

export const BannerPictoTableauDeSuivi = ({ active }: BannerPictoProps) => {
  const isActive = active ? "#fff" : "#000091";
  return (
    <svg
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      width="28"
      height="18"
      viewBox="0 0 28 18"
      fill="none"
    >
      <rect width="8" height="8" rx="2" fill={isActive} />
      <rect y="10" width="8" height="8" rx="2" fill={isActive} />
      <rect x="10" width="8" height="8" rx="2" fill={isActive} />
      <rect x="10" y="10" width="8" height="8" rx="2" fill={isActive} />
      <rect x="20" width="8" height="8" rx="2" fill={isActive} />
      <rect x="20" y="10" width="8" height="8" rx="2" fill={isActive} />
    </svg>
  );
};
