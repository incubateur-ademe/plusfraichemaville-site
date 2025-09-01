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
import { RoleProjet } from "@/src/generated/prisma/client";
import Button from "@codegouvfr/react-dsfr/Button";
import { notifications } from "../common/notifications";
import capitalize from "lodash/capitalize";
import { ROLE_EDITEUR, ROLE_LECTEUR } from "@/src/helpers/user-role";
import MandatoryFieldsMention from "@/src/components/common/mandatory-fields-mention";

const modal = createModal({
  id: "user-status-modification",
  isOpenedByDefault: false,
});

export const PartageMemberModificationRoleModale = () => {
  const userId = useUserStore((state) => state.userInfos?.id);
  const projetId = useProjetsStore((state) => state.getCurrentProjet()?.id);
  const addOrUpdateProjet = useProjetsStore((state) => state.addOrUpdateProjet);
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
      if (result.type === "success" && result.projet) {
        addOrUpdateProjet(result.projet);
      }
    }
  };

  const name = `${currentUserModification?.member.user?.prenom} ${currentUserModification?.member.user?.nom}`;

  return (
    <>
      <modal.Component
        title="Modifier les informations d'un membre"
        size="medium"
        className="rounded-modal min-h-[376px]"
      >
        {currentUserModification ? (
          <>
            <form id="user-partage-modification-form" onSubmit={form.handleSubmit(onSubmit)}>
              <MandatoryFieldsMention />
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
                label="Rôle de l'utilisateur"
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
                  className="mr-4 rounded-3xl"
                >
                  Annuler
                </Button>
                <Button priority="primary" type="submit" onClick={modal.close} className="rounded-3xl">
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
