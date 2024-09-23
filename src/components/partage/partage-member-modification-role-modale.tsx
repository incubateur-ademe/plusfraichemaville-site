"use client";

import { Input } from "@codegouvfr/react-dsfr/Input";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { useModalStore } from "@/src/stores/modal/provider";
import { useIsModalOpen } from "@codegouvfr/react-dsfr/Modal/useIsModalOpen";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PartageUserModificationData,
  PartageUserModificationSchema,
} from "@/src/forms/partage/partage-user-modification-schema";
import SelectFormField from "../common/SelectFormField";
import { updateUserRoleProjectAction } from "@/src/actions/users/update-user-role-project-action";
import { useUserStore } from "@/src/stores/user/provider";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { RoleProjet } from "@prisma/client";
import Button from "@codegouvfr/react-dsfr/Button";
import { notifications } from "../common/notifications";

const modal = createModal({
  id: "user-status-modification",
  isOpenedByDefault: false,
});

export const PartageMemberModificationRoleModale = () => {
  const userId = useUserStore((state) => state.userInfos?.id);
  const projetId = useProjetsStore((state) => state.getCurrentProjet()?.id);
  const currentUserModification = useModalStore((state) => state.currentUserModification);
  const setCurrentUserModification = useModalStore((state) => state.setCurrentUserModification);
  const form = useForm<PartageUserModificationData>({
    resolver: zodResolver(PartageUserModificationSchema),
    defaultValues: {
      role: currentUserModification?.member.role,
    },
  });

  useEffect(() => {
    if (currentUserModification) {
      modal.open();
      form.reset({
        role: currentUserModification.member.role,
      });
    }
  }, [currentUserModification, form]);

  useIsModalOpen(modal, {
    onConceal: () => setCurrentUserModification(null),
  });

  const onSubmit: SubmitHandler<PartageUserModificationData> = async (data) => {
    if (userId && currentUserModification?.member.user_id && projetId) {
      const result = await updateUserRoleProjectAction(
        currentUserModification?.member.user_id.toString(),
        projetId,
        data.role as RoleProjet,
      );
      notifications(result.type, result.message);
    }
  };

  // eslint-disable-next-line max-len
  const name = `${currentUserModification?.member.user?.prenom} ${currentUserModification?.member.user?.nom}`;

  return (
    <>
      <modal.Component title="" size="small" className="current-user-status-modale min-h-[376px]">
        {currentUserModification ? (
          <>
            <h2 className="mb-8 text-[22px] leading-7 text-pfmv-navy">Modifier les informations {"d'un membre"}</h2>
            <form id="user-partage-modification" onSubmit={form.handleSubmit(onSubmit)}>
              <Input
                label=""
                disabled
                nativeInputProps={{
                  placeholder: name ?? "",
                }}
              />
              <Input
                label=""
                disabled
                nativeInputProps={{
                  placeholder: currentUserModification.member.user?.poste ?? "",
                }}
              />
              <Input
                label=""
                disabled
                nativeInputProps={{
                  placeholder: currentUserModification.member.user?.email ?? "",
                }}
              />
              <SelectFormField
                control={form.control}
                path="role"
                label=""
                options={[
                  { name: "Admin", value: RoleProjet.ADMIN },
                  { name: "Editeur", value: RoleProjet.EDITEUR },
                  { name: "Lecteur", value: RoleProjet.LECTEUR },
                ]}
              />
              <div className="flex justify-between">
                <Button
                  priority="tertiary"
                  onClick={modal.close}
                  nativeButtonProps={modal.buttonProps}
                  type="button"
                  className="mr-4"
                >
                  Annuler
                </Button>
                <Button priority="primary" type="submit" onClick={modal.close}>
                  Sauvegarder
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div>Chargement en cours...</div>
        )}
      </modal.Component>
    </>
  );
};
