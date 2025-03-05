"use client";

import { FicheDiagnosticBloc } from "./fiche-diagnostic-blocs";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SideMenu } from "@codegouvfr/react-dsfr/SideMenu";

export const FicheDiagnosticSideMenu = ({ blocs }: { blocs: FicheDiagnosticBloc[] }) => {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string>(blocs[0]?.contentId);

  const items = blocs.map((bloc) => ({
    isActive: activeTab === bloc.contentId,
    linkProps: {
      href: `${pathname}#${bloc.contentId}`,
      onClick: (e: any) => {
        setActiveTab(bloc.contentId);
        const element = document.getElementById(bloc.contentId);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      },
    },
    text: bloc.label,
  }));

  return (
    <div className="flex flex-col gap-6 md:mb-10">
      <SideMenu
        align="left"
        burgerMenuButtonText="Dans cette rubrique"
        items={items}
        className="p-0 !shadow-none [&>div]:shadow-none"
      />
    </div>
  );
};
