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
import { generateRandomId, isProduction } from "@/helpers/common";
import { useUserStore } from "@/stores/user/provider";

const modal = createModal({
  id: "partage-overview-invite-member",
  isOpenedByDefault: false,
});

export const PartageOverviewMemberInviteButton = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const user = useUserStore((state) => state.userInfos);
  const form = useForm<PartageUserInvitationData>({
    resolver: zodResolver(PartageUserInvitationSchema),
    defaultValues: {
      role: "LECTEUR",
    },
  });

  const onSubmit: SubmitHandler<PartageUserInvitationData> = async (data) => {
    if (projet) {
      const newInvitationToken = `${generateRandomId()}`;
      const config = {
        link: isProduction
          ? // eslint-disable-next-line max-len
            `${process.env.URL_SITE_PROD}/espace-projet?tab=invitation&token=${newInvitationToken}`
          : // eslint-disable-next-line max-len
            `http://pfmv.localhost:3000/espace-projet?tab=invitation&token=${newInvitationToken}`,
        collectivite: projet.collectivite.nom,
        city: projet.collectivite.nom,
        projectName: projet.nom,
        mail: data.email,
        username: `${user?.prenom} ${user?.nom}`,
      };
      const result = await inviteMemberAction(projet.id, data.email, "LECTEUR", config);
      notifications(result.type, result.message);
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
          <InputFormField control={form.control} path="email" />
          {/* TODO: confirmer que ces valeurs ne sont pas autorisées */}
          {/* <SelectFormField
            control={form.control}
            path="role"
            label=""
            options={[
              { name: "Admin", value: "ADMIN" },
              { name: "Editeur", value: "EDITEUR" },
              { name: "Lecteur", value: "LECTEUR" },
            ]}
          /> */}
          <div className="flex justify-between">
            <Button priority="tertiary" onClick={modal.close} nativeButtonProps={modal} type="button" className="mr-4">
              Annuler
            </Button>
            <Button priority="primary" type="submit" onClick={modal.close}>
              Inviter
            </Button>
          </div>
        </form>
      </modal.Component>
    </>
  );
};
