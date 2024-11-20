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

export const UserInfoForm = ({ user, buttonLabel }: { user: UserWithCollectivite; buttonLabel: string }) => {
  const router = useRouter();
  const userCollectivite = user.collectivites[0];
  const setUserInfos = useUserStore((state) => state.setUserInfos);

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
    },
  });

  const onSubmit: SubmitHandler<UserInfoFormData> = async (data) => {
    const result = await editUserInfoAction({ ...data, userId: user.id });
    notifications(result.type, result.message);

    if (result.type === "success") {
      setUserInfos(result.updatedUser);
      router.push(PFMV_ROUTES.ESPACE_PROJET_LISTE);
    }
  };

  const disabled = form.formState.isSubmitting;
  const watchCanalAcquisition = form.watch("canalAcquisition");

  return (
    <form id="user-info" onSubmit={form.handleSubmit(onSubmit)}>
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
      <Button className={`rounded-3xl bg-pfmv-navy text-sm`} type="submit" disabled={disabled}>
        {buttonLabel}
      </Button>
    </form>
  );
};
