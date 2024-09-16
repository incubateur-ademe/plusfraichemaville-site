import { PropsWithChildren } from "react";

type HiddenProps = {
  accessible?: boolean;
} & PropsWithChildren;

export const Hidden = ({ accessible, children }: HiddenProps) => {
  return (
    <span className="visually-hidden" aria-hidden={!accessible}>
      {children}
    </span>
  );
};
