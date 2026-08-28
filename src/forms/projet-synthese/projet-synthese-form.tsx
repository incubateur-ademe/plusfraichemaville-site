"use client";

import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@codegouvfr/react-dsfr/Button";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { getProjetFichesIdsByType } from "@/src/components/common/generic-save-fiche/helpers";
import { TypeFiche } from "@/src/helpers/common";
import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { makeFicheSolutionUrlApi } from "@/src/components/ficheSolution/helpers";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { notifications } from "@/src/components/common/notifications";
import { exportSyntheseProjetAction } from "@/src/actions/projets/export-synthese-projet-action";
import { ProjetSyntheseFormData, ProjetSyntheseFormSchema } from "./projet-synthese-form-schema";

type ProjetSyntheseFormProps = {
  currentProjet?: ProjetWithRelations;
};

export const ProjetSyntheseForm = ({ currentProjet }: ProjetSyntheseFormProps) => {
  const selectedFichesSolutionsIds =
    getProjetFichesIdsByType({ projet: currentProjet, typeFiche: TypeFiche.solution }) ?? [];

  const { data: fichesSolutions, isLoading } = useImmutableSwrWithFetcher<FicheSolution[]>(
    selectedFichesSolutionsIds.length > 0 ? makeFicheSolutionUrlApi(selectedFichesSolutionsIds) : null,
  );

  const form = useForm<ProjetSyntheseFormData>({
    resolver: zodResolver(ProjetSyntheseFormSchema),
    defaultValues: {
      solutionIds: [],
    },
  });

  const selectedSolutionIds = form.watch("solutionIds") || [];

  useEffect(() => {
    if (fichesSolutions && fichesSolutions.length > 0) {
      form.setValue(
        "solutionIds",
        fichesSolutions.map((fs) => fs.documentId),
      );
    }
  }, [fichesSolutions, form]);

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
      link.download = result.filename || `synthese-projet-${currentProjet.id}.pptx`;
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
        <ol className="mt-4 list-decimal list-outside pl-6 space-y-4 font-bold">
          <li className="fr-h4">
            <span>Contexte et enjeux climatiques</span>
            <p className="text-base font-normal text-dsfr-text-mention-grey">Bientôt disponible</p>
          </li>
          <li className="fr-h4">
            <span>Diagnostic de l’espace</span>
            <p className="text-base font-normal text-dsfr-text-mention-grey">Bientôt disponible</p>
          </li>
          <li className="fr-h4">
            <span>Solutions de rafraîchissement retenues</span>
            <div className="mt-2 font-normal text-base">
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
            <p className="text-base font-normal text-dsfr-text-mention-grey">Bientôt disponible</p>
          </li>
          <li className="fr-h4">
            <span>Aides retenues</span>
            <p className="text-base font-normal text-dsfr-text-mention-grey">Bientôt disponible</p>
          </li>
          <li className="fr-h4">
            <span>Ressources utiles liées aux solutions de rafraîchissement retenues</span>
            <p className="text-base font-normal text-dsfr-text-mention-grey">Bientôt disponible</p>
          </li>
        </ol>
      </div>

      <div className="mt-10">
        <Button
          iconId="ri-download-2-line"
          className="rounded-3xl"
          type="submit"
          disabled={isSubmitting || !currentProjet}
        >
          Télécharger la synthèse
        </Button>
      </div>
    </form>
  );
};
