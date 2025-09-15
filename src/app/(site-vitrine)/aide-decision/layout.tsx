import { PropsWithChildren } from "react";

export default function Layout(props: PropsWithChildren) {
  const { children } = props;
  return <div className={"aide-decision-background -mb-40 pb-40"}>{children}</div>;
}
