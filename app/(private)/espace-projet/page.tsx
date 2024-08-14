"use client";

import { ClimadiagPanel } from "@/components/climadiag/climadiag-panel";
import { ListProjets } from "@/components/liste-projets";
import { useUserStore } from "@/stores/user/provider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { attachInvitationToUserAction } from "@/actions/userProjet/attach-invitation-to-user-action";
import { notifications } from "@/components/common/notifications";
import { useProjetsStore } from "@/stores/projets/provider";

export default function ListProjetsPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const addOrUpdatePendingProjet = useProjetsStore((state) => state.addOrUpdatePendingProjet);
  const paramsInvitationToken = searchParams.get("invitation_token");
  const paramsInvitationId = searchParams.get("invitation_id");
  const currentUserId = useUserStore((state) => state.userInfos?.id);

  useEffect(() => {
    const attachInvitationToUser = async (userId: string, invitationId: number, invitationToken: string) => {
      const result = await attachInvitationToUserAction(userId, invitationId, invitationToken);
      if (result.type === "error") {
        notifications(result.type, result.message);
      }
      if (result.updatedProjet) {
        addOrUpdatePendingProjet(result.updatedProjet);
      }
    };

    if (paramsInvitationId && paramsInvitationToken && currentUserId) {
      attachInvitationToUser(currentUserId, +paramsInvitationId, paramsInvitationToken).then(() => {
        const params = new URLSearchParams(searchParams);
        params.delete("invitation_token");
        params.delete("invitation_id");
        router.push(pathname + "?" + params.toString(), { scroll: false });
      });
    }
  }, [
    addOrUpdatePendingProjet,
    currentUserId,
    paramsInvitationId,
    paramsInvitationToken,
    pathname,
    router,
    searchParams,
  ]);

  const userInfos = useUserStore((state) => state.userInfos);
  return (
    <div>
      <ListProjets />
      {userInfos?.id && <ClimadiagPanel userId={userInfos.id} />}
    </div>
  );
}
