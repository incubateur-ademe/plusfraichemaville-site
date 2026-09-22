"use client";

import { useEffect, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@codegouvfr/react-dsfr/Button";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { getProjetFichesIdsByType } from "@/src/components/common/generic-save-fiche/helpers";
import { TypeFiche } from "@/src/helpers/common";
import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { makeFicheSolutionUrlApi } from "@/src/components/ficheSolution/helpers";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { notifications } from "@/src/components/common/notifications";
import { exportSyntheseProjetAction } from "@/src/actions/projets/export-synthese-projet-action";
import { ProjetSyntheseFormData, ProjetSyntheseFormSchema } from "./projet-synthese-form-schema";
import { EstimationRadioOptionLabel } from "./estimation-radio-option-label";
import { isEmpty } from "@/src/helpers/listUtils";
import { dateToStringWithoutTime } from "@/src/helpers/dateUtils";
import { Spinner } from "@/src/components/common/spinner";
import { useUnsavedChanges } from "@/src/hooks/use-unsaved-changes";

const GENERATION_IN_PROGRESS_MESSAGE =
  "La génération de votre synthèse est en cours, si vous quittez la page maintenant vous annulerez son téléchargement.";

type ProjetSyntheseFormProps = {
  currentProjet?: ProjetWithRelations;
};

export const ProjetSyntheseForm = ({ currentProjet }: ProjetSyntheseFormProps) => {
  const selectedFichesSolutionsIds =
    getProjetFichesIdsByType({ projet: currentProjet, typeFiche: TypeFiche.solution }) ?? [];

  const { data: fichesSolutions, isLoading } = useImmutableSwrWithFetcher<FicheSolution[]>(
    selectedFichesSolutionsIds.length > 0 ? makeFicheSolutionUrlApi(selectedFichesSolutionsIds) : null,
  );

  // Memoized so these keep a stable reference across re-renders (e.g. when the user toggles a
  // checkbox or picks an estimation) — the effects below reseed the form's default selection
  // from them, and would otherwise re-fire and overwrite the user's own choice on every render.
  const estimations = useMemo(
    () => currentProjet?.estimations?.filter((e) => !e.deleted_at) ?? [],
    [currentProjet?.estimations],
  );

  const projetAides = useMemo(() => currentProjet?.projetAides ?? [], [currentProjet?.projetAides]);

  const form = useForm<ProjetSyntheseFormData>({
    resolver: zodResolver(ProjetSyntheseFormSchema),
    defaultValues: {
      solutionIds: [],
      estimationId: estimations[0]?.id || null,
      aideIds: [],
    },
  });

  useUnsavedChanges(form.formState.isSubmitting, GENERATION_IN_PROGRESS_MESSAGE);

  const selectedSolutionIds = form.watch("solutionIds") || [];
  const selectedEstimationId = form.watch("estimationId");
  const selectedAideIds = form.watch("aideIds") || [];

  useEffect(() => {
    if (fichesSolutions && fichesSolutions.length > 0) {
      form.setValue(
        "solutionIds",
        fichesSolutions.map((fs) => fs.documentId),
      );
    }
  }, [fichesSolutions, form]);

  useEffect(() => {
    if (!isEmpty(estimations)) {
      form.setValue("estimationId", estimations[0].id);
    }
  }, [estimations]);

  useEffect(() => {
    if (!isEmpty(projetAides)) {
      form.setValue(
        "aideIds",
        projetAides.map((projetAide) => projetAide.aideId),
      );
    }
  }, [projetAides, form]);

  const handleToggleSolution = (documentId: string) => {
    const current = form.getValues("solutionIds") || [];
    if (current.includes(documentId)) {
      form.setValue(
        "solutionIds",
        current.filter((id) => id !== documentId),
      );
    } else {
      form.setValue("solutionIds", [...current, documentId]);
    }
  };

  const handleToggleAide = (aideId: number) => {
    const current = form.getValues("aideIds") || [];
    if (current.includes(aideId)) {
      form.setValue(
        "aideIds",
        current.filter((id) => id !== aideId),
      );
    } else {
      form.setValue("aideIds", [...current, aideId]);
    }
  };

  const onSubmit: SubmitHandler<ProjetSyntheseFormData> = async (data) => {
    if (!currentProjet) {
      return;
    }

    const result = await exportSyntheseProjetAction(currentProjet.id, data);

    if (result.type === "success" && result.fileBase64) {
      const byteCharacters = atob(result.fileBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], {
        type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      });
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download =
        result.filename ||
        `Synthèse-PFMV-${currentProjet.nom.replaceAll(" ", "_")}-${dateToStringWithoutTime(new Date())?.replaceAll(
          "/",
          "",
        )}.pptx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } else {
      notifications(result.type, result.message);
    }
  };

  const hasSolutions = selectedFichesSolutionsIds.length > 0;
  const isSubmitting = form.formState.isSubmitting;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="mt-8">
        <h2 className="text-lg font-bold">Sélectionnez les informations que vous souhaitez dans la synthèse.</h2>
        <ol className="mt-4 list-inside !pl-0">
          <li className="fr-h4">
            <span>Contexte et enjeux climatiques</span>
            <p className="mt-4 pl-12 text-base font-normal text-dsfr-text-mention-grey">Bientôt disponible</p>
          </li>
          <li className="fr-h4">
            <span>Diagnostic de l’espace</span>
            <p className="mt-4 pl-12 text-base font-normal text-dsfr-text-mention-grey">Bientôt disponible</p>
          </li>
          <li className="fr-h4">
            <span>Solutions de rafraîchissement retenues</span>
            <div className="mt-4 pl-12 text-base font-normal">
              {!hasSolutions || (!isLoading && (!fichesSolutions || fichesSolutions.length === 0)) ? (
                <p className="text-base text-dsfr-text-mention-grey">
                  Aucune solution de rafraîchissement ajoutée au projet
                </p>
              ) : (
                <Checkbox
                  className="mb-0"
                  options={(fichesSolutions || []).map((fs) => ({
                    label: fs.titre,
                    nativeInputProps: {
                      checked: selectedSolutionIds.includes(fs.documentId),
                      onChange: () => handleToggleSolution(fs.documentId),
                    },
                  }))}
                />
              )}
            </div>
          </li>
          <li className="fr-h4">
            <span>Estimation budgétaire</span>
            <div className="mt-4 pl-12 text-base font-normal">
              {estimations.length === 0 ? (
                <p className="text-base text-dsfr-text-mention-grey">Aucune estimation ajoutée au projet</p>
              ) : (
                <RadioButtons
                  className="mb-0"
                  options={[
                    {
                      label: "Aucune estimation",
                      nativeInputProps: {
                        name: "estimationId",
                        value: "",
                        checked: !selectedEstimationId,
                        onChange: () => form.setValue("estimationId", null),
                      },
                    },
                    ...estimations.map((estimation) => ({
                      label: <EstimationRadioOptionLabel estimation={estimation} />,
                      nativeInputProps: {
                        name: "estimationId",
                        value: estimation.id,
                        checked: selectedEstimationId === estimation.id,
                        onChange: () => form.setValue("estimationId", estimation.id),
                      },
                    })),
                  ]}
                />
              )}
            </div>
          </li>
          <li className="fr-h4">
            <span>Aides retenues</span>
            <div className="mt-4 pl-12 text-base font-normal">
              {projetAides.length === 0 ? (
                <p className="text-base text-dsfr-text-mention-grey">Aucune aide ajoutée au projet</p>
              ) : (
                <Checkbox
                  className="mb-0"
                  options={projetAides.map((projetAide) => ({
                    label: projetAide.aide.name ?? "",
                    nativeInputProps: {
                      checked: selectedAideIds.includes(projetAide.aideId),
                      onChange: () => handleToggleAide(projetAide.aideId),
                    },
                  }))}
                />
              )}
            </div>
          </li>
        </ol>
      </div>

      <div className="mt-10">
        {isSubmitting ? (
          <Button className="rounded-3xl" type="submit" disabled>
            <span className="flex items-center gap-2">
              Télécharger la synthèse
              <Spinner className="!size-6" pathColor="fill-dsfr-text-mention-grey" />
            </span>
          </Button>
        ) : (
          <Button
            iconId="ri-download-2-line"
            iconPosition="right"
            className="rounded-3xl"
            type="submit"
            disabled={!currentProjet}
          >
            Télécharger la synthèse
          </Button>
        )}
      </div>
    </form>
  );
};
