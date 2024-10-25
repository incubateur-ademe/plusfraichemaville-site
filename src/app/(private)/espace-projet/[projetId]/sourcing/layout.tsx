import { SourcingLayout } from "@/src/components/sourcing/sourcing-layout";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return <SourcingLayout>{children}</SourcingLayout>;
};

export default Layout;
