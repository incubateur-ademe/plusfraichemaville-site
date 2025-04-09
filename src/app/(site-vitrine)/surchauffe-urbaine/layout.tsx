import { ReactElement } from "react";
import AppFooter from "@/src/components/layout/AppFooter";

export default function Layout({ children }: { children: ReactElement | null }) {
  return (
    <>
      <div className={"pb-20"}>{children}</div>
      <AppFooter />
    </>
  );
}
