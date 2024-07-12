export const generateRandomId = () => Math.floor(Math.random() * 900000000) + 100000000;

/**
 *
 * @param element Classname or id of the targeted element: .customModal, #card, div ...
 */
export const scrollToTop = (element?: string) => {
  const target = element && document.querySelector(element);
  return element ? target && target.scrollIntoView() : window.scrollTo({ top: 0 });
};

export enum TypeFiche {
  // eslint-disable-next-line no-unused-vars
  solution,
  // eslint-disable-next-line no-unused-vars
  diagnostic,
}

export const highlightedIconClass = (typeFiche: TypeFiche) =>
  typeFiche === TypeFiche.solution ? "text-dsfr-text-label-blue-france" : "text-dsfr-border-action-high-error";

export const formatNumberWithSpaces = (num?: number | string): string => (num ? num.toLocaleString("fr-FR") : "0");

export const nullFunctionalComponent = () => <></>;

export const daysUntilDate = (targetDate: Date | null): number | null => {
  if (!targetDate) {
    return null;
  }
  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  return Math.ceil((targetDate.getTime() - new Date().getTime()) / MS_PER_DAY);
};

export const extractNameSyllables = (name: string) => {
  const match = name.match(/^[^\s-]+|\S+$/g);
  return match ? match.map((word) => word[0].toUpperCase()).join("") : "";
};
