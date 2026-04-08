"use client";

import { InvitationStatus } from "@/src/generated/prisma/client";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { useUserStore } from "@/src/stores/user/provider";
import Tabs from "@codegouvfr/react-dsfr/Tabs";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { ListeProjetsHeader } from "./header";
import { groupAndOrderProjetsByCollectivite, sortProjectsByInvitationStatus } from "./helpers";
import { ListeProjetTab } from "./liste";

export type EspaceProjetTabsId = "projet" | "invitation" | "demande";

export const ListProjets = () => {
  const userId = useUserStore((state) => state.userInfos?.id);
  const projets = useProjetsStore((state) => state.projets);
  const pendingProjets = useProjetsStore((state) => state.pendingProjets);
  const projetsByStatus = sortProjectsByInvitationStatus(pendingProjets, userId);

  const activeProjets = groupAndOrderProjetsByCollectivite(projets);
  const invitedProjets = groupAndOrderProjetsByCollectivite(projetsByStatus.projectsInvited);
  const requestedProjets = groupAndOrderProjetsByCollectivite(projetsByStatus.projectsRequested);

  const searchParams = useSearchParams();

  const tabs = [
    {
      count: projets.length,
      label: projets.length < 2 ? "Projet actif" : "Projets actifs",
      content: <ListeProjetTab projets={activeProjets} invitationStatus={InvitationStatus.ACCEPTED} />,
      id: "projet" as const,
    },
    {
      count: projetsByStatus.projectsInvited.length,
      label: projetsByStatus.projectsInvited.length < 2 ? "Invitation en attente" : "Invitations en attente",
      content: <ListeProjetTab projets={invitedProjets} invitationStatus={InvitationStatus.INVITED} />,
      id: "invitation" as const,
    },
    {
      count: projetsByStatus.projectsRequested.length,
      label: projetsByStatus.projectsRequested.length < 2 ? "Demande envoyée" : "Demandes envoyées",
      content: <ListeProjetTab projets={requestedProjets} invitationStatus={InvitationStatus.REQUESTED} />,
      id: "demande" as const,
    },
  ];
  const [currentTab, setCurrentTab] = useState(searchParams.get("tab") || tabs[0].id);

  return (
    <div className="relative bg-dsfr-background-alt-blue-france">
      <Image
        src="/images/espace-projet/wave.svg"
        width={440}
        height={204}
        alt=""
        className="absolute right-0 top-0 z-0"
      />
      <div className="fr-container relative z-10 min-h-[25rem] py-10">
        <ListeProjetsHeader isListEmpty={projets.length === 0} />
        <div className="mt-10">
          <Tabs
            selectedTabId={currentTab}
            onTabChange={setCurrentTab}
            tabs={tabs.map((tab) => ({
              tabId: tab.id,
              label: (
                <div className="flex">
                  {tab.label} ({tab.count})
                  {tab.id === "invitation" && tab.count > 0 && (
                    <div className="relative -top-2 left-1 size-2 rounded-full bg-pfmv-climadiag-red"></div>
                  )}
                </div>
              ),
            }))}
          >
            {tabs.find((tab) => tab.id === currentTab)?.content}
          </Tabs>
        </div>
      </div>
    </div>
  );
};
