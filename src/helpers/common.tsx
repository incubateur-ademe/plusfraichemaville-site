import { UtiliteFicheProperties } from "@/src/components/fiches-diagnostic/helpers";

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
  solution = "solution",
  // eslint-disable-next-line no-unused-vars
  diagnostic = "diagnostic",
}

export enum TypeUpdate {
  // eslint-disable-next-line no-unused-vars
  add = "add",
  // eslint-disable-next-line no-unused-vars
  delete = "delete",
}

export type IconColorsType = {
  highlightClass: string;
  fadedClass: string;
};

export const ICON_COLOR_FICHE_SOLUTION: IconColorsType = {
  highlightClass: "text-dsfr-text-label-blue-france",
  fadedClass: "text-pfmv-light-grey",
};

export const ICON_COLOR_FICHE_DIAGNOSTIC = (utiliteFiche: UtiliteFicheProperties): IconColorsType => ({
  highlightClass: utiliteFiche.colors.pictoHighlight,
  fadedClass: utiliteFiche.colors.pictoFaded,
});

export const formatNumberWithSpaces = (num?: number | string): string => (num ? num.toLocaleString("fr-FR") : "0");

export const nullFunctionalComponent = () => <></>;

export const extractNameInitiales = (name: string) => {
  const match = name.match(/^[^\s-]+|\S+$/g);
  return match ? match.map((word) => word[0].toUpperCase()).join("") : "";
};

export const isBoolean = (param: any): boolean => {
  return typeof param == "boolean";
};
