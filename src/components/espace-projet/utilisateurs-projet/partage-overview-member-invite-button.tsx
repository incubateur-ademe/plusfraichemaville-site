"use client";

import { createModal } from "@codegouvfr/react-dsfr/Modal";

import Button from "@codegouvfr/react-dsfr/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { PartageUserInvitationData, PartageUserInvitationSchema } from "@/src/forms/partage/partage-user-invitation";
import { zodResolver } from "@hookform/resolvers/zod";
import InputFormField from "../../common/InputFormField";
import { inviteMemberAction } from "@/src/actions/users/invite-user-action";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { notifications } from "../../common/notifications";
import { RoleProjet } from "@/src/generated/prisma/client";
import SelectFormField from "../../common/SelectFormField";
import { ROLE_EDITEUR, ROLE_LECTEUR } from "@/src/helpers/user-role";
import capitalize from "lodash/capitalize";
import MandatoryFieldsMention from "@/src/components/common/mandatory-fields-mention";

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
      const result = await inviteMemberAction(projectId, data.email, data.role);
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
      <Button priority="primary" onClick={modal.open} className="rounded-3xl" iconId="ri-add-circle-fill">
        Inviter un nouveau membre
      </Button>
      <modal.Component title="Inviter un membre" size="small" className="rounded-modal min-h-[296px]">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <MandatoryFieldsMention />
          <InputFormField control={form.control} path="email" label="Adresse email de la personne à inviter" asterisk />
          <SelectFormField
            control={form.control}
            path="role"
            label="Rôle du nouveau membre"
            asterisk
            options={[
              { name: capitalize(ROLE_LECTEUR.label), value: ROLE_LECTEUR.code },
              { name: capitalize(ROLE_EDITEUR.label), value: ROLE_EDITEUR.code },
            ]}
          />
          <div className="flex justify-between">
            <Button
              priority="tertiary"
              onClick={modal.close}
              nativeButtonProps={modal.buttonProps}
              type="button"
              className="rounded-3xl"
            >
              Annuler
            </Button>
            <Button priority="primary" type="submit" className="rounded-3xl">
              Inviter
            </Button>
          </div>
        </form>
      </modal.Component>
    </>
  );
};
