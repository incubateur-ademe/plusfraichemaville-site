import { PropsWithChildren } from "react";
import { AideFicheModal } from "@/src/components/financement/aide/aide-fiche-modal";

export default function Layout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <div className="mb-40">
      {children}
      <AideFicheModal />
    </div>
  );
}
