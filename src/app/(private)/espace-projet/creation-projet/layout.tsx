import { PropsWithChildren } from "react";

export default function Layout(props: PropsWithChildren) {
  const { children } = props;

  return <div className="mb-40">{children}</div>;
}
