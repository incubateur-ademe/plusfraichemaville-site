"use client";

import clsx from "clsx";

import { useState } from "react";
import { useModalStore } from "@/stores/modal/provider";
import { UserProjetWithUser } from "@/lib/prisma/prismaCustomTypes";

export type PartageOverviewMemberStatusAdminProps = {
  member: UserProjetWithUser;
};

export const PartageOverviewMemberStatusAdmin = (props: PartageOverviewMemberStatusAdminProps) => {
  const [open, setOpen] = useState(false);
  const opener = () => setOpen(!open);
  const closer = () => setOpen(false);
  const setCurrentUserModification = useModalStore((state) => state.setCurrentUserModification);
  const setCurrentDeleteOrQuitModal = useModalStore((state) => state.setCurrentDeleteOrQuitModal);

  const links = [
    {
      label: "Modifier les accès",
      iconId: "ri-pencil-fill",
      className: "text-dsfr-text-label-blue-france",
      onClick: () => setCurrentUserModification(props),
    },
    {
      label: "Supprimer le membre",
      iconId: "ri-delete-bin-fill",
      className: "text-pfmv-climadiag-red",
      onClick: () =>
        setCurrentDeleteOrQuitModal({
          member: props.member,
          options: {
            action: (projetId: string, currentUserId: number, userId: number) => {
              console.log(projetId, currentUserId, userId);
            },
            confirmLabel: "Supprimer le projet",
            title: "Supprimer le projet",
            description:
              // eslint-disable-next-line max-len
              "Attention, cette action est irréversible va impacter les autres membres invités sur votre projet. Toutes les informations seront perdues.",
          },
        }),
    },
  ];

  return (
    <div className="relative flex items-center justify-between">
      <div>
        <i className="ri-checkbox-circle-fill mr-2 size-6 text-dsfr-background-action-high-success-hover"></i>
        activé
      </div>
      <div className="shrink-0">
        <button
          onClick={opener}
          className={clsx(
            "block size-10 rounded-full border-[1px] border-solid border-dsfr-border-default-grey hover:!bg-white",
          )}
        >
          <i className="ri-more-2-line size-6" />
        </button>
        {open && (
          <div className={clsx("absolute right-0 top-[130%] z-10 bg-white px-5 pb-1 pt-3 shadow-pfmv-card-shadow")}>
            <ul className="relative z-10 pl-0">
              {links.map((link, index) => (
                <li className={`mb-3 list-none text-sm ${link.className} font-bold`} key={index}>
                  <i className={clsx(link.iconId, "mr-2 size-6 before:!size-5")} />
                  <button
                    onClick={() => {
                      closer();
                      link.onClick();
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
