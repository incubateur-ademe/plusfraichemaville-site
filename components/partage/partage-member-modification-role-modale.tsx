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

export const PartageMemberModificationRoleModale = () => {
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
    console.log(data, data.role);
  };

  // eslint-disable-next-line max-len
  const name = `${currentUserModification?.member.user?.prenom} ${currentUserModification?.member.user?.nom}`;

  return (
    <>
      <modal.Component title="" size="small" className="current-user-status-modale">
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
            </form>
          </>
        ) : (
          <div>Chargement en cours...</div>
        )}
      </modal.Component>
    </>
  );
};
