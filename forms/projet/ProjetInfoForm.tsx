"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import Button from "@codegouvfr/react-dsfr/Button";
import InputFormField from "@/components/common/InputFormField";
import { useRouter } from "next/navigation";
import { PFMV_ROUTES } from "@/helpers/routes";
import { projet } from "@prisma/client";
import { ProjetInfoFormData, ProjetInfoFormSchema } from "@/forms/projet/ProjetInfoFormSchema";
import SelectFormField from "@/components/common/SelectFormField";
import { typeEspaceOptions } from "@/components/filters/TypeEspaceFilter";
import { monthDateToString } from "@/helpers/dateUtils";
import { editProjetInfoAction } from "@/forms/projet/EditProjetInfoAction";
import toast from "react-hot-toast";

export const ProjetInfoForm = ({ projet }: { projet?: projet }) => {
  const router = useRouter();

  const form = useForm<ProjetInfoFormData>({
    resolver: zodResolver(ProjetInfoFormSchema),
    defaultValues: {
      projetId: projet?.id,
      nom: projet?.nom ?? "",
      typeEspace: projet?.type_espace ?? "",
      adresse: projet?.adresse || undefined,
      dateEcheance: monthDateToString(projet?.date_echeance),
    },
  });

  const onSubmit: SubmitHandler<ProjetInfoFormData> = async (data) => {
    const result = await editProjetInfoAction({
      ...data,
    });

    if (!result || result.error) {
      toast.error(result?.error ?? "Une erreur s'est produite");
      return;
    }

    toast.success("Les informations du projet ont bien été enregistrées.");
    router.push(PFMV_ROUTES.ESPACE_PROJET);
  };

  const disabled = form.formState.isSubmitting;

  return (
    <form id="user-info" onSubmit={form.handleSubmit(onSubmit)}>
      <InputFormField control={form.control} path="nom" label="Nom du projet" asterisk={true} />
      <SelectFormField
        control={form.control}
        path="typeEspace"
        label="Sur quel espace souhaitez vous agir ?"
        asterisk={true}
        options={typeEspaceOptions}
      />
      <InputFormField
        control={form.control}
        path="adresse"
        label="Si je la connais, adresse du lieu de l'intervention"
      />
      <InputFormField
        control={form.control}
        path="dateEcheance"
        label="Date de livraison souhaitée"
        asterisk={true}
        type="month"
        placeholder="YYYY-MM"
      />
      <Button className={`rounded-3xl text-sm`} type="submit" disabled={disabled}>
        {"Valider"}
      </Button>
    </form>
  );
};
