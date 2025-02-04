"use client";

import { FicheDiagnosticTab } from "./fiche-diagnostic-tabs";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SideMenu } from "@codegouvfr/react-dsfr/SideMenu";

export const FicheDiagnosticClientTab = ({ tabs }: { tabs: FicheDiagnosticTab[] }) => {
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

  const items = tabs.map((tab) => ({
    isActive: activeTab === tab.contentId,
    linkProps: {
      href: `${pathname}#${tab.contentId}`,
      onClick: () => setActiveTab(tab.contentId),
    },
    text: tab.label,
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
