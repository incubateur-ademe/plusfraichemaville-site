"use client";

import { Input } from "@codegouvfr/react-dsfr/Input";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { useModalStore } from "@/stores/modal/provider";
import { useIsModalOpen } from "@codegouvfr/react-dsfr/Modal/useIsModalOpen";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PartageUserModificationData,
  PartageUserModificationSchema,
} from "@/forms/partage/partage-user-modification-schema";
import SelectFormField from "../common/SelectFormField";
import { updateUserRoleProjectAction } from "@/actions/users/update-user-role-project";
import { useUserStore } from "@/stores/user/provider";
import { useProjetsStore } from "@/stores/projets/provider";
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
                  { name: "Admin", value: "ADMIN" },
                  { name: "Editeur", value: "EDITEUR" },
                  { name: "Lecteur", value: "LECTEUR" },
                ]}
              />
              <div className="flex justify-between">
                <Button priority="tertiary" onClick={modal.close} className="mr-4">
                  Annuler
                </Button>
                <Button priority="primary" onClick={modal.close}>
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
