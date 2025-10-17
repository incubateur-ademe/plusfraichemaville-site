"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@codegouvfr/react-dsfr/Button";
import InputFormField from "@/src/components/common/InputFormField";
import { UserInfoFormData, UserInfoFormSchema } from "@/src/forms/user/UserInfoFormSchema";
import { useRouter } from "next/navigation";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { UserWithCollectivite } from "@/src/lib/prisma/prismaCustomTypes";
import CollectiviteInputFormField from "@/src/components/common/CollectiviteInputFormField";
import { mapDBCollectiviteToCollectiviteAddress } from "@/src/lib/adresseApi/banApiHelper";
import { editUserInfoAction } from "@/src/actions/users/edit-user-info-action";
import { notifications } from "@/src/components/common/notifications";
import { useUserStore } from "@/src/stores/user/provider";
import SelectFormField from "@/src/components/common/SelectFormField";
import { canalAcquisitionUserOptions, CUSTOM_CANAL_ACQUISITION } from "@/src/helpers/canalAcquisition";
import clsx from "clsx";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { Case, Conditional, Default } from "@/src/components/common/conditional-renderer";
import MandatoryFieldsMention from "@/src/components/common/mandatory-fields-mention";
import { useEffect, useState } from "react";

export const COMMUNICATION_SETTINGS_ANCHOR = "communication";
export const UserInfoForm = ({
  user,
  buttonLabel,
  newUser,
}: {
  user: UserWithCollectivite;
  buttonLabel: string;
  newUser: boolean;
}) => {
  const router = useRouter();
  const userCollectivite = user.collectivites[0];
  const setUserInfos = useUserStore((state) => state.setUserInfos);
  const [anchor, setAnchor] = useState("");

  useEffect(() => {
    setAnchor(window.location.hash);
  }, []);

  const form = useForm<UserInfoFormData>({
    resolver: zodResolver(UserInfoFormSchema),
    defaultValues: {
      nom: user.nom ?? "",
      prenom: user.prenom ?? "",
      email: user.email,
      poste: user.poste ?? "",
      collectivite: mapDBCollectiviteToCollectiviteAddress(userCollectivite?.collectivite) ?? undefined,
      nomEtablissement: user.nom_etablissement ?? "",
      canalAcquisition: user.canal_acquisition ?? "",
      customCanalAcquisition: user.canal_acquisition ?? "",
      acceptCommunicationProduit: user.accept_communication_produit ?? true,
      acceptCommunicationSuiviProjet: user.accept_communication_suivi_projet ?? true,
      subscribeToNewsletter: false,
    },
  });

  const onSubmit: SubmitHandler<UserInfoFormData> = async (data) => {
    const result = await editUserInfoAction({ ...data, userId: user.id });
    notifications(result.type, result.message);

    if (result.type === "success") {
      setUserInfos(result.updatedUser);
      router.push(PFMV_ROUTES.ESPACE_PROJET);
    }
  };

  const disabled = form.formState.isSubmitting;
  const watchCanalAcquisition = form.watch("canalAcquisition");

  return (
    <form id="user-info-form" onSubmit={form.handleSubmit(onSubmit)}>
      <MandatoryFieldsMention />
      <InputFormField control={form.control} path="nom" label="Nom" asterisk={true} />
      <InputFormField control={form.control} path="prenom" label="Prénom" asterisk={true} />
      <InputFormField control={form.control} path="email" label="Email" asterisk={true} disabled={!!user.email} />
      <CollectiviteInputFormField
        control={form.control}
        path={"collectivite"}
        label="Collectivité à laquelle je suis rattaché"
        asterisk={true}
        disabled={!!userCollectivite}
      />
      <InputFormField
        control={form.control}
        path={"nomEtablissement"}
        label="Etablissement auquel je suis rattaché"
        asterisk={true}
        disabled={!!user.nom_etablissement}
      />
      <InputFormField control={form.control} path="poste" label="Mon poste dans l'établissement" asterisk={true} />
      {!user.canal_acquisition && (
        <>
          <SelectFormField
            control={form.control}
            path="canalAcquisition"
            label="Comment nous avez-vous connu ?"
            placeholder="Sélectionnez le canal par lequel vous nous avez connu"
            options={canalAcquisitionUserOptions()}
          />
          <InputFormField
            control={form.control}
            path="customCanalAcquisition"
            label="Précisez..."
            className={clsx(watchCanalAcquisition === CUSTOM_CANAL_ACQUISITION.label ? "block" : "hidden")}
          />
        </>
      )}
      <Conditional>
        <Case condition={newUser}>
          <Checkbox
            options={[
              {
                label:
                  "Je souhaite recevoir la lettre d'information de Plus fraîche ma ville et être informé(e)" +
                  " des actualités sur le rafraîchissement urbain",
                nativeInputProps: {
                  ...form.register("subscribeToNewsletter"),
                },
              },
            ]}
          />
        </Case>
      </Conditional>
      <Conditional>
        <Case condition={!newUser || anchor === `#${COMMUNICATION_SETTINGS_ANCHOR}`}>
          <>
            <h1 id={COMMUNICATION_SETTINGS_ANCHOR} className="fr-h5 !mb-5 !mt-12 !text-dsfr-text-label-blue-france">
              Mes préférences de communication
            </h1>
            <Checkbox
              options={[
                {
                  label: "Je souhaite être informé(e) des nouvelles fonctionnalités de Plus fraîche ma ville",
                  nativeInputProps: {
                    ...form.register("acceptCommunicationProduit"),
                  },
                },
              ]}
            />
            <Checkbox
              className="mt-4"
              options={[
                {
                  label: "J'accepte d'être contacté(e) pour le suivi de mes projets.",
                  nativeInputProps: {
                    ...form.register("acceptCommunicationSuiviProjet"),
                  },
                },
              ]}
            />
          </>
        </Case>
        <Default>
          <a id={COMMUNICATION_SETTINGS_ANCHOR} />
        </Default>
      </Conditional>
      <Button className={`mt-6 rounded-3xl bg-pfmv-navy text-sm`} type="submit" disabled={disabled}>
        {buttonLabel}
      </Button>
    </form>
  );
};
