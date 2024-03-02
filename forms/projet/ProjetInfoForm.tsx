"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import Button from "@codegouvfr/react-dsfr/Button";
import InputFormField from "@/components/common/InputFormField";
import { useRouter } from "next/navigation";
import { PFMV_ROUTES } from "@/helpers/routes";
import { projet } from "@prisma/client";
import { ProjetInfoFormData, ProjetInfoFormSchema } from "@/forms/projet/ProjetInfoFormSchema";
import SelectFormField from "@/components/common/SelectFormField";
import { typeEspaceOptions } from "@/components/filters/TypeEspaceFilter";
import { monthDateToString } from "@/helpers/dateUtils";
import { niveauxMaturiteProjetOptions } from "@/helpers/maturiteProjet";
import CollectiviteInputFormField from "@/components/common/CollectiviteInputFormField";
import { upsertProjetAction } from "@/actions/projets/upsert-projet-action";
import { notifications } from "@/components/common/notifications";
import { useProjetsStore } from "@/stores/projets/provider";
import { useShallow } from "zustand/react/shallow";

export const ProjetInfoForm = ({ projet }: { projet?: projet }) => {
  const router = useRouter();
  const addOrUpdateProjet = useProjetsStore(useShallow((state) => state.addOrUpdateProjet));
  const getCurrentProjet = useProjetsStore(useShallow((state) => state.getCurrentProjet));
  const projetToUpdate = projet ?? getCurrentProjet();

  const form = useForm<ProjetInfoFormData>({
    resolver: zodResolver(ProjetInfoFormSchema),
    defaultValues: {
      projetId: projetToUpdate?.id,
      nom: projetToUpdate?.nom ?? "",
      typeEspace: projetToUpdate?.type_espace ?? "",
      niveauMaturite: projetToUpdate?.niveau_maturite ?? "",
      adresse: projetToUpdate?.adresse || undefined,
      dateEcheance: monthDateToString(projetToUpdate?.date_echeance),
      collectivite: undefined,
      // collectivite:  collectivite: mapDBCollectiviteToCollectiviteAddress(projet?.collectivite) ?? undefined,
    },
  });

  useEffect(() => {
    form.reset({
      projetId: projetToUpdate?.id,
      nom: projetToUpdate?.nom ?? "",
      typeEspace: projetToUpdate?.type_espace ?? "",
      niveauMaturite: projetToUpdate?.niveau_maturite ?? "",
      adresse: projetToUpdate?.adresse || undefined,
      dateEcheance: monthDateToString(projetToUpdate?.date_echeance),
      collectivite: undefined,
      // collectivite:  collectivite: mapDBCollectiviteToCollectiviteAddress(projet?.collectivite) ?? undefined,
    });
  }, [projetToUpdate]);

  const onSubmit: SubmitHandler<ProjetInfoFormData> = async (data) => {
    const result = await upsertProjetAction({
      ...data,
    });
    notifications(result.type, result.message);

    if (result.type === "success") {
      if (result.updatedProjet) {
        addOrUpdateProjet(result.updatedProjet);
        router.push(PFMV_ROUTES.TABLEAU_DE_BORD(result.updatedProjet.id));
      } else {
        router.push(PFMV_ROUTES.ESPACE_PROJET_LISTE);
      }
    }
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
        placeholder="Selectionnez un type d'espace"
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
      <SelectFormField
        control={form.control}
        path="niveauMaturite"
        label="Niveau de maturité du projet"
        asterisk={true}
        options={niveauxMaturiteProjetOptions}
        placeholder="Selectionnez un niveau de maturité"
      />
      <CollectiviteInputFormField
        control={form.control}
        path="collectivite"
        label="Collectivité du projet"
        asterisk={true}
      />
      <Button className={`rounded-3xl text-sm`} type="submit" disabled={disabled}>
        {"Valider"}
      </Button>
    </form>
  );
};
