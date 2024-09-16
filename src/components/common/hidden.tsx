import { PropsWithChildren } from "react";

type HiddenProps = {
  accessible?: boolean;
  as?: keyof JSX.IntrinsicElements;
} & PropsWithChildren;

export const Hidden = ({ accessible, as: Element = "span", children }: HiddenProps) => {
  return (
    <Element className="visually-hidden" aria-hidden={!accessible}>
      {children}
    </Element>
  );
};
