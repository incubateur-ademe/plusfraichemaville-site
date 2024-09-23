import { ModalProps } from "@codegouvfr/react-dsfr/Modal";
import { HubspotQuery } from "../components/hubspot/types";

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
  params: {
    [key: string]: string;
  };
  searchParams: {
    [key: string]: string;
  };
};

declare global {
  export interface Window {
    _hsq: HubspotQuery[];
    _hsp: HubspotQuery[];
  }
}
