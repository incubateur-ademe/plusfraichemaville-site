import { ModalProps } from "@codegouvfr/react-dsfr/Modal";

declare module "@splidejs/react-splide" {
  export { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
}

export type DSFRModal = {
  buttonProps: {
    id: string;
    "aria-controls": string;
    "data-fr-opened": boolean;
  };
  Component: (_props: ModalProps) => JSX.Element;
  close: () => void;
  open: () => void;
  isOpenedByDefault: boolean;
  id: string;
};

export type Page = {
  params: Promise<{
    [key: string]: string;
  }>;
  searchParams: Promise<{
    [key: string]: string;
  }>;
};

export type LatLngTuple = [number, number, number?];
