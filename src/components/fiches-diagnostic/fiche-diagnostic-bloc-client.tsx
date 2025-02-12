"use client";

import { FicheDiagnosticBloc } from "./fiche-diagnostic-blocs";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SideMenu } from "@codegouvfr/react-dsfr/SideMenu";

export const FicheDiagnosticClientBloc = ({ blocs }: { blocs: FicheDiagnosticBloc[] }) => {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string>("");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      setActiveTab(hash);
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const items = blocs.map((bloc) => ({
    isActive: activeTab === bloc.contentId,
    linkProps: {
      href: `${pathname}#${bloc.contentId}`,
      onClick: () => setActiveTab(bloc.contentId),
    },
    text: bloc.label,
  }));

  return (
    <div className="flex flex-col gap-6 md:mb-32">
      <SideMenu
        align="left"
        burgerMenuButtonText="Dans cette rubrique"
        items={items}
        className="p-0 !shadow-none [&>div]:shadow-none"
      />
    </div>
  );
};
