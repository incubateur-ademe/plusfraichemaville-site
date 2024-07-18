"use client";

import React, { PropsWithChildren, ReactNode, useState } from "react";
import { ListeProjetsHeader } from "./header";
import { useProjetsStore } from "@/stores/projets/provider";
import { groupAndOrderProjetsByCollectivite, sortProjectsByInvitationStatus } from "./helpers";
import Image from "next/image";
import { useUserStore } from "@/stores/user/provider";
import { ListeProjetTab } from "./liste";
import clsx from "clsx";

export const ListProjets = () => {
  const [activeTab, setActiveTab] = useState(0);
  const userId = useUserStore((state) => state.userInfos?.id);
  const projets = useProjetsStore((state) => state.projets);
  const projetsByStatus = sortProjectsByInvitationStatus(projets, userId);

  const activeProjets = groupAndOrderProjetsByCollectivite(projetsByStatus.projectsActive);
  const invitedProjets = groupAndOrderProjetsByCollectivite(projetsByStatus.projectsInvited);
  const requestedProjets = groupAndOrderProjetsByCollectivite(projetsByStatus.projectsRequested);

  const tabs = [
    {
      count: projetsByStatus.projectsActive.length,
      label: "Projet actif",
      content: <ListeProjetTab projets={activeProjets} invitationStatus="ACCEPTED" />,
    },
    {
      count: projetsByStatus.projectsInvited.length,
      label: "Invitation en attente",
      content: <ListeProjetTab projets={invitedProjets} invitationStatus="INVITED" />,
    },
    {
      count: projetsByStatus.projectsRequested.length,
      label: "Demande envoyée",
      content: <ListeProjetTab projets={requestedProjets} invitationStatus="REQUESTED" />,
    },
  ];

  return (
    <div className="relative bg-dsfr-background-alt-blue-france">
      <Image
        src="/images/espace-projet/wave.svg"
        width={440}
        height={204}
        alt=""
        className="absolute right-0 top-0 z-0"
      />
      <div className="fr-container relative z-10 min-h-[25rem] overflow-x-hidden py-10">
        <ListeProjetsHeader />
        <div>
          <div>
            <div className="mb-10 flex w-fit gap-2 border-b-[1px] border-b-pfmv-grey/20">
              {tabs.map((tab, index) => (
                <div
                  className={clsx(
                    "relative mb-[-1px] w-60 px-4 pb-6 text-center text-sm",
                    index === activeTab && "border-b-2 border-b-pfmv-navy",
                  )}
                  key={index}
                >
                  <TabButton isActive={activeTab === index} onClick={() => setActiveTab(index)}>
                    {tab.label} ({tab.count})
                    {index === 1 && tab.count > 0 && (
                      <div className="absolute -top-4 right-0 size-2 rounded-full bg-pfmv-climadiag-red"></div>
                    )}
                  </TabButton>
                </div>
              ))}
            </div>
            {tabs.map((tab, index) => (
              <TabContent key={index} content={tab.content} isActive={activeTab === index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ isActive, onClick, children }: { isActive: boolean; onClick: () => void } & PropsWithChildren) => (
  <button className={clsx(`${isActive ? "z-20 font-bold" : "font-normal"}`)} onClick={onClick}>
    {children}
  </button>
);

const TabContent = ({ content, isActive }: { content: ReactNode; isActive: boolean }) => (
  <div className={clsx(isActive ? "block" : "hidden", "!p-0")}>{content}</div>
);
