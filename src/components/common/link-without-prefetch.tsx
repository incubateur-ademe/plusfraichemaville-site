import Link, { LinkProps } from "next/link";
import { HTMLProps, ReactNode } from "react";

export default function LinkWithoutPrefetch({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  prefetch,
  ...rest
}: LinkProps &
  HTMLProps<HTMLAnchorElement> & {
    children: ReactNode;
  }) {
  return <Link {...rest} prefetch={false} />;
}
