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

const modal = createModal({
  id: "user-status-modification",
  isOpenedByDefault: false,
});

export const PartageOverviewMemberStatusAdminModificationModale = () => {
  const currentUserStatusModification = useModalStore((state) => state.currentUserStatusModification);
  const setCurrentUserStatusModification = useModalStore((state) => state.setCurrentUserStatusModification);
  const form = useForm<PartageUserModificationData>({
    resolver: zodResolver(PartageUserModificationSchema),
    defaultValues: {
      role: currentUserStatusModification?.member.role,
    },
  });
  useEffect(() => {
    if (currentUserStatusModification) {
      modal.open();
      form.reset({
        role: currentUserStatusModification.member.role,
      });
    }
  }, [currentUserStatusModification, form]);

  useIsModalOpen(modal, {
    onConceal: () => setCurrentUserStatusModification(null),
  });

  const onSubmit: SubmitHandler<PartageUserModificationData> = async (data) => {
    console.log(data);
  };

  // eslint-disable-next-line max-len
  const name = `${currentUserStatusModification?.member.user?.prenom} ${currentUserStatusModification?.member.user?.nom}`;

  return (
    <>
      <modal.Component title="" size="small" className="current-user-status-modale">
        {currentUserStatusModification ? (
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
                  placeholder: currentUserStatusModification.member.user?.poste ?? "",
                }}
              />
              <Input
                label=""
                disabled
                nativeInputProps={{
                  placeholder: currentUserStatusModification.member.user?.email ?? "",
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
            </form>
          </>
        ) : (
          <div>Chargement en cours...</div>
        )}
      </modal.Component>
    </>
  );
};
