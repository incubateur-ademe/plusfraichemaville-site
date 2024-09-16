"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import Button from "@codegouvfr/react-dsfr/Button";
import InputFormField from "@/src/components/common/InputFormField";
import { useRouter } from "next/navigation";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { ProjetInfoFormData, ProjetInfoFormSchema } from "@/src/forms/projet/ProjetInfoFormSchema";
import SelectFormField from "@/src/components/common/SelectFormField";
import { typeEspaceOptions } from "@/src/components/filters/TypeEspaceFilter";
import { monthDateToString } from "@/src/helpers/dateUtils";
import { niveauxMaturiteProjetOptions } from "@/src/helpers/maturiteProjet";
import CollectiviteInputFormField from "@/src/components/common/CollectiviteInputFormField";
import { upsertProjetAction } from "@/src/actions/projets/upsert-projet-action";
import { notifications } from "@/src/components/common/notifications";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { useShallow } from "zustand/react/shallow";
import { mapDBCollectiviteToCollectiviteAddress, mapDBProjetToProjetAddress } from "@/src/lib/adresseApi/banApiHelper";
import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import AddressInputFormField from "@/src/components/common/address-input-form-field";

export const ProjetInfoForm = ({ projet, readOnly }: { projet?: ProjetWithRelations; readOnly?: boolean }) => {
  const router = useRouter();
  const addOrUpdateProjet = useProjetsStore(useShallow((state) => state.addOrUpdateProjet));

  const form = useForm<ProjetInfoFormData>({
    resolver: zodResolver(ProjetInfoFormSchema),
    defaultValues: {
      adresse: mapDBProjetToProjetAddress(projet),
      collectivite: mapDBCollectiviteToCollectiviteAddress(projet?.collectivite) ?? undefined,
    },
  });

  useEffect(() => {
    form.reset({
      projetId: projet?.id,
      nom: projet?.nom ?? "",
      typeEspace: projet?.type_espace ?? "",
      niveauMaturite: projet?.niveau_maturite ?? "",
      adresse: mapDBProjetToProjetAddress(projet),
      dateEcheance: monthDateToString(projet?.date_echeance),
      collectivite: mapDBCollectiviteToCollectiviteAddress(projet?.collectivite) ?? undefined,
    });
  }, [form, projet]);

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

  const disabled = readOnly ?? form.formState.isSubmitting;

  return (
    <>
      <form id="user-info" onSubmit={form.handleSubmit(onSubmit)}>
        <InputFormField control={form.control} path="nom" label="Nom du projet" asterisk={true} disabled={disabled} />
        <SelectFormField
          control={form.control}
          path="typeEspace"
          label="Sur quel espace souhaitez vous agir ?"
          asterisk={true}
          options={typeEspaceOptions}
          placeholder="Selectionnez un type d'espace"
          disabled={disabled}
        />
        <AddressInputFormField
          control={form.control}
          path="adresse"
          label="Si je la connais, adresse du lieu de l'intervention"
          disabled={disabled}
        />
        <InputFormField
          control={form.control}
          path="dateEcheance"
          label="Date de livraison souhaitée"
          asterisk={true}
          type="month"
          placeholder="YYYY-MM"
          disabled={disabled}
        />
        <SelectFormField
          control={form.control}
          path="niveauMaturite"
          label="Niveau de maturité du projet"
          asterisk={true}
          options={niveauxMaturiteProjetOptions}
          placeholder="Selectionnez un niveau de maturité"
          disabled={disabled}
        />
        <CollectiviteInputFormField
          control={form.control}
          path="collectivite"
          label="Collectivité du projet"
          asterisk={true}
          disabled={disabled}
        />

        {!readOnly && (
          <Button className={`rounded-3xl bg-pfmv-navy text-sm`} type="submit" disabled={disabled}>
            {"Valider"}
          </Button>
        )}
      </form>
      {readOnly && (
        <Button className={`mt-6 rounded-3xl text-sm`} priority="tertiary" onClick={router.back}>
          Retour
        </Button>
      )}
    </>
  );
};
