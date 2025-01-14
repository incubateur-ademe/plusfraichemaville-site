import { PropsWithChildren } from "react";
import { JSX } from "react/jsx-dev-runtime";
import IntrinsicElements = JSX.IntrinsicElements;

type HiddenProps = {
  accessible?: boolean;
  as?: keyof IntrinsicElements;
} & PropsWithChildren;

export const Hidden = ({ accessible, as: Element = "span", children }: HiddenProps) => {
  return (
    <Element className="visually-hidden" aria-hidden={!accessible}>
      {children}
    </Element>
  );
};
