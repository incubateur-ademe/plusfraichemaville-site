"use client";
import Image from "next/image";
import clsx from "clsx";
import { notifications } from "@/src/components/common/notifications";
import { StatutUser } from "@/src/generated/prisma/client";
import { useState } from "react";
import { STATUT_USER_BUTTONS } from "@/src/components/espace-projet/statut-user/statut-user";
import { useUserStore } from "@/src/stores/user/provider";
import { updateUserStatutAction } from "@/src/actions/users/update-user-statut-action";

export const StatutUserButtons = () => {
  const [loading, setLoading] = useState(false);
  const userInfos = useUserStore((state) => state.userInfos);
  const setUserInfos = useUserStore((state) => state.setUserInfos);
  if (!userInfos) {
    return null;
  }
  const handleStatutChange = async (statut: StatutUser) => {
    setLoading(true);
    const result = await updateUserStatutAction(statut, userInfos.id);
    if (result.updatedUser) {
      setUserInfos(result.updatedUser);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-row flex-wrap gap-6">
      {STATUT_USER_BUTTONS.map((statutUserButton) => (
        <button
          key={statutUserButton.statut}
          role="radio"
          onClick={() => {
            handleStatutChange(statutUserButton.statut);
          }}
          className={clsx(
            "rounded-xl p-6 shadow-pfmv-card-strong-shadow",
            "!border-1 border-solid",
            userInfos.statut === statutUserButton.statut ? "border-pfmv-navy" : "border-dsfr-border-default-grey",
            loading ? "cursor-progress" : "cursor-pointer",
          )}
          aria-selected={userInfos.statut === statutUserButton.statut}
        >
          <div className="mb-0 flex items-center gap-2 text-xl font-bold">
            <Image src={statutUserButton.icon} alt="" width={40} height={40} />
            {statutUserButton.label}
          </div>
        </button>
      ))}
    </div>
  );
};
