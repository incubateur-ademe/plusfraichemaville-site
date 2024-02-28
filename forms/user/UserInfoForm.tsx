"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import Button from "@codegouvfr/react-dsfr/Button";
import { editUserInfoAction } from "@/forms/user/EditUserInfoAction";
import InputFormField from "@/components/common/InputFormField";
import { UserInfoFormData, UserInfoFormSchema } from "@/forms/user/UserInfoFormSchema";
import { useRouter } from "next/navigation";
import { PFMV_ROUTES } from "@/helpers/routes";
import toast from "react-hot-toast";
import { UserWithCollectivite } from "@/lib/prisma/prismaCustomTypes";
import CollectiviteInputFormField from "@/components/common/CollectiviteInputFormField";
import { mapDBCollectiviteToCollectiviteAddress } from "@/lib/adresseApi/banApiHelper";

export const UserInfoForm = ({ user }: { user: UserWithCollectivite }) => {
  const router = useRouter();
  const userCollectivite = user.collectivites[0];

  const form = useForm<UserInfoFormData>({
    resolver: zodResolver(UserInfoFormSchema),
    defaultValues: {
      nom: user.nom ?? "",
      prenom: user.prenom ?? "",
      email: user.email,
      poste: user.poste ?? "",
      collectivite: mapDBCollectiviteToCollectiviteAddress(userCollectivite?.collectivite) ?? undefined,
    },
  });

  const onSubmit: SubmitHandler<UserInfoFormData> = async (data) => {
    const result = await editUserInfoAction({ ...data, userId: user.id });

    if (!result || result.error) {
      toast.error(result?.error ?? "Une erreur s'est produite");
      return;
    }

    toast.success("Vos informations ont bien été enregistrées.");
    router.push(PFMV_ROUTES.ESPACE_PROJET);
  };

  const disabled = form.formState.isSubmitting;

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
      <InputFormField control={form.control} path="poste" label="Mon poste dans la collectivité" asterisk={true} />
      <Button className={`rounded-3xl text-sm`} type="submit" disabled={disabled}>
        {"Je rejoins l'espace projet de ma collectivité"}
      </Button>
    </form>
  );
};
