"use client";

import Link from "next/link";
import { FicheDiagnosticTab } from "./fiche-diagnostic-tabs";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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

  return (
    <div className="mb-32 flex flex-col gap-6">
      {tabs.map((tab) => (
        <Link
          href={`${pathname}#${tab.contentId}`}
          key={tab.contentId}
          className={`!bg-none ${activeTab === tab.contentId ? "font-bold" : ""}`}
          onClick={() => setActiveTab(tab.contentId)}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
};
