"use client";
import { upsertProjetAction } from "@/src/actions/projets/upsert-projet-action";
import AddressInputFormField from "@/src/components/common/address-input-form-field";
import CommuneInputFormField from "@/src/components/common/CommuneInputFormField";
import InputFormField from "@/src/components/common/InputFormField";
import MandatoryFieldsMention from "@/src/components/common/mandatory-fields-mention";
import { notifications } from "@/src/components/common/notifications";
import { ProjetVisibilityFormField } from "@/src/components/common/projet-visibility-form-field";
import SelectFormField from "@/src/components/common/SelectFormField";
import { ProjetInfoFormData, ProjetInfoFormSchema } from "@/src/forms/projet/ProjetInfoFormSchema";
import { niveauxMaturiteProjetOptions } from "@/src/helpers/maturite-projet";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { typeEspaceOptions } from "@/src/helpers/type-espace-filter";
import { useUnsavedChanges } from "@/src/hooks/use-unsaved-changes";
import { mapDBCollectiviteToCollectiviteAddress, mapDBProjetToProjetAddress } from "@/src/lib/adresseApi/banApiHelper";
import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { useProjetsStore } from "@/src/stores/projets/provider";
import Button from "@codegouvfr/react-dsfr/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";

type ProjetInfoFormProps = {
  projet?: ProjetWithRelations;
  readOnly?: boolean;
};
export const ProjetInfoForm = ({ projet, readOnly }: ProjetInfoFormProps) => {
  const router = useRouter();
  const addOrUpdateProjet = useProjetsStore(useShallow((state) => state.addOrUpdateProjet));

  const form = useForm<ProjetInfoFormData>({
    resolver: zodResolver(ProjetInfoFormSchema),
    defaultValues: {
      adresse: mapDBProjetToProjetAddress(projet),
      collectivite: mapDBCollectiviteToCollectiviteAddress(projet?.collectivite) ?? undefined,
      isPublic: projet?.is_public ?? true,
    },
  });

  const { isDirty, isSubmitting } = form.formState;

  useUnsavedChanges(isDirty && !isSubmitting);

  useEffect(() => {
    form.reset({
      projetId: projet?.id,
      nom: projet?.nom ?? "",
      typeEspace: projet?.type_espace ?? "",
      niveauMaturite: projet?.niveau_maturite ?? "",
      adresse: mapDBProjetToProjetAddress(projet),
      collectivite: mapDBCollectiviteToCollectiviteAddress(projet?.collectivite) ?? undefined,
      isPublic: projet?.is_public ?? true,
    });
  }, [form, projet]);

  const onSubmit: SubmitHandler<ProjetInfoFormData> = async (data) => {
    const result = await upsertProjetAction({ ...data });
    notifications(result.type, result.message);

    if (result.type === "success") {
      form.reset(data);

      if (result.updatedProjet) {
        addOrUpdateProjet(result.updatedProjet);
        router.push(PFMV_ROUTES.TABLEAU_DE_BORD(result.updatedProjet.id));
      } else {
        router.push(PFMV_ROUTES.ESPACE_PROJET);
      }
    }
  };

  const handleBack = () => {
    if (
      isDirty &&
      !window.confirm(
        "Attention, certains champs n'ont pas été enregistrés, êtes vous sûr de vouloir quitter la page ?",
      )
    ) {
      return;
    }
    router.back();
  };

  const disabled = readOnly ?? isSubmitting;

  return (
    <>
      <form id="projet-info-form" onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <MandatoryFieldsMention />
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
        <SelectFormField
          control={form.control}
          path="niveauMaturite"
          label="Niveau de maturité du projet"
          asterisk={true}
          options={niveauxMaturiteProjetOptions}
          placeholder="Selectionnez un niveau de maturité"
          disabled={disabled}
        />
        <CommuneInputFormField
          control={form.control}
          path="collectivite"
          label="Commune où se situe le projet"
          asterisk={true}
          disabled={disabled}
        />
        <ProjetVisibilityFormField control={form.control} path="isPublic" disabled={disabled} />

        {!readOnly && (
          <Button className={`rounded-3xl bg-pfmv-navy text-sm`} type="submit" disabled={disabled}>
            {"Valider"}
          </Button>
        )}
      </form>
      {readOnly && (
        <Button className={`mt-6 rounded-3xl text-sm`} priority="tertiary" onClick={handleBack}>
          Retour
        </Button>
      )}
    </>
  );
};
