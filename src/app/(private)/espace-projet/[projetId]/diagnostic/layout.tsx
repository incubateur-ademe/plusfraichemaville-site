import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return <div className="mb-40">{children}</div>;
};

export default Layout;
