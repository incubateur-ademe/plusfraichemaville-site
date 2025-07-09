"use client";

import { PropsWithChildren, ReactNode } from "react";
import { ListeProjetsHeader } from "./header";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { groupAndOrderProjetsByCollectivite, sortProjectsByInvitationStatus } from "./helpers";
import Image from "next/image";
import { useUserStore } from "@/src/stores/user/provider";
import { ListeProjetTab } from "./liste";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { InvitationStatus } from "@prisma/client";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

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
  const currentTab = searchParams.get("tab") || tabs[0].id;

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
        <div>
          <div>
            <div className="mb-10 flex w-fit border-b-[1px] border-b-pfmv-grey/20">
              {tabs.map((tab, index) => (
                <div
                  className={clsx(
                    "relative mb-[-1px] text-center text-sm",
                    "hover:!bg-dsfr-background-action-low-blue-france",
                    currentTab === tab.id && "border-b-2 border-b-pfmv-navy",
                  )}
                  key={index}
                >
                  <TabButton isActive={currentTab === tab.id} tab={tab.id}>
                    {tab.label} ({tab.count})
                    {tab.id === "invitation" && tab.count > 0 && (
                      <div className="relative -top-4 left-2 size-2 rounded-full bg-pfmv-climadiag-red"></div>
                    )}
                  </TabButton>
                </div>
              ))}
            </div>
            {tabs.map((tab, index) => (
              <TabContent key={index} content={tab.content} isActive={currentTab === tab.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ isActive, tab, children }: { isActive: boolean; tab: EspaceProjetTabsId } & PropsWithChildren) => (
  <LinkWithoutPrefetch
    href={PFMV_ROUTES.ESPACE_PROJET_WITH_CURRENT_TAB(tab)}
    className={clsx(
      `${isActive ? "z-20 font-bold" : "font-normal"}`,
      "flex h-16 w-60 items-center justify-center !bg-none px-4",
    )}
  >
    {children}
  </LinkWithoutPrefetch>
);

const TabContent = ({ content, isActive }: { content: ReactNode; isActive: boolean }) => (
  <div className={clsx(isActive ? "block" : "hidden", "!p-0")}>{content}</div>
);
