"use client";

import { createModal } from "@codegouvfr/react-dsfr/Modal";

import Button from "@codegouvfr/react-dsfr/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { PartageUserInvitationData, PartageUserInvitationSchema } from "@/forms/partage/partage-user-invitation";
import { zodResolver } from "@hookform/resolvers/zod";
import InputFormField from "../common/InputFormField";
import { inviteMemberAction } from "@/actions/users/invite-user-action";
import { useProjetsStore } from "@/stores/projets/provider";
import { notifications } from "../common/notifications";
import { RoleProjet } from "@prisma/client";

const modal = createModal({
  id: "partage-overview-invite-member",
  isOpenedByDefault: false,
});

export const PartageOverviewMemberInviteButton = () => {
  const projectId = useProjetsStore((state) => state.currentProjetId);
  const addOrUpdateProjet = useProjetsStore((state) => state.addOrUpdateProjet);
  const form = useForm<PartageUserInvitationData>({
    resolver: zodResolver(PartageUserInvitationSchema),
    defaultValues: {
      email: "",
      role: RoleProjet.LECTEUR,
    },
  });

  const onSubmit: SubmitHandler<PartageUserInvitationData> = async (data) => {
    if (projectId) {
      const result = await inviteMemberAction(projectId, data.email);
      notifications(result.type, result.message);
      if (result.type === "success") {
        if (result.updatedProjet) {
          addOrUpdateProjet(result.updatedProjet);
        }
        modal.close();
      }
    }
  };

  return (
    <>
      <Button priority="primary" onClick={modal.open} className="rounded-3xl">
        Inviter un membre
      </Button>
      <modal.Component title="" size="small" className="current-user-status-modale min-h-[296px]">
        <h2 className="mb-8 text-[22px] leading-7 text-pfmv-navy">Inviter un membre</h2>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <InputFormField control={form.control} path="email" placeholder="Adresse email de la personne à inviter" />
          <div className="flex justify-between">
            <Button priority="tertiary" onClick={modal.close} nativeButtonProps={modal.buttonProps} type="button">
              Annuler
            </Button>
            <Button priority="primary" type="submit">
              Inviter
            </Button>
          </div>
        </form>
      </modal.Component>
    </>
  );
};
