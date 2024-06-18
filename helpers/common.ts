export const generateRandomId = () => Math.floor(Math.random() * 900000000) + 100000000;

/**
 *
 * @param element Classname or id of the targeted element: .customModal, #card, div ...
 */
export const scrollToTop = (element?: string) => {
  const target = element && document.querySelector(element);
  return element ? target && (target.scrollTop = 0) : window.scrollTo({ top: 0 });
};

export enum TypeFiche {
  // eslint-disable-next-line no-unused-vars
  solution,
  // eslint-disable-next-line no-unused-vars
  diagnostic,
}
export const highlightedIconClass = (typeFiche: TypeFiche) =>
  typeFiche === TypeFiche.solution ? "text-dsfr-text-label-blue-france" : "text-dsfr-background-flat-warning";

export const formatISODateToFullDate = (isoDate: string) => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
