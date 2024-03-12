"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import Button from "@codegouvfr/react-dsfr/Button";
import InputFormField from "@/components/common/InputFormField";
import { useRouter } from "next/navigation";
import { PFMV_ROUTES } from "@/helpers/routes";
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
import { mapDBCollectiviteToCollectiviteAddress } from "@/lib/adresseApi/banApiHelper";
import { ProjetWithRelations } from "@/lib/prisma/prismaCustomTypes";
import { useUserStore } from "@/stores/user/provider";
import { UserInfos } from "@/stores/user/store";
import clsx from "clsx";
import Link from "next/link";

const hasAllRequiredFieldsSet = (user?: UserInfos) =>
  user && user.nom && user.prenom && user.email && user.collectivites[0].collectivite_id && user.poste;

export const ProjetInfoForm = ({ projet }: { projet?: ProjetWithRelations }) => {
  const router = useRouter();
  const user = useUserStore((state) => state.userInfos);
  const addOrUpdateProjet = useProjetsStore(useShallow((state) => state.addOrUpdateProjet));

  const form = useForm<ProjetInfoFormData>({
    resolver: zodResolver(ProjetInfoFormSchema),
    defaultValues: {
      collectivite: mapDBCollectiviteToCollectiviteAddress(projet?.collectivite) ?? undefined,
    },
  });

  useEffect(() => {
    form.reset({
      projetId: projet?.id,
      nom: projet?.nom ?? "",
      typeEspace: projet?.type_espace ?? "",
      niveauMaturite: projet?.niveau_maturite ?? "",
      adresse: projet?.adresse || undefined,
      dateEcheance: monthDateToString(projet?.date_echeance),
      collectivite: mapDBCollectiviteToCollectiviteAddress(projet?.collectivite) ?? undefined,
    });
  }, [form, projet]);

  const onSubmit: SubmitHandler<ProjetInfoFormData> = async (data) => {
    if (!hasAllRequiredFieldsSet(user)) {
      return null;
    }
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
    <>
      {!hasAllRequiredFieldsSet(user) && (
        <p className="my-10">
          Pour créer ou modifier un projet, vous dever{" "}
          <Link href={PFMV_ROUTES.MON_PROFIL} className="font-bold">
            compléter votre profil
          </Link>
        </p>
      )}
      <form
        id="user-info"
        onSubmit={form.handleSubmit(onSubmit)}
        className={clsx(!hasAllRequiredFieldsSet(user) && "opacity-50 pointer-events-none")}
      >
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
    </>
  );
};
