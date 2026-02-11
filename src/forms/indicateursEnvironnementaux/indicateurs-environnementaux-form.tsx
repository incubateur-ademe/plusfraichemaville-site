"use client";
import React, { useCallback, useEffect, useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputFormField from "@/src/components/common/InputFormField";
import {
  IndicateursEnvironnementauxFormData,
  IndicateursEnvironnementauxFormSchema,
} from "@/src/forms/indicateursEnvironnementaux/indicateurs-environnementaux-form-schema";
import { ALL_INDIEN_QUESTIONS } from "@/src/helpers/indicateurs-environnementaux/indi-en-questions";
import { mapAllIndiEnQuestionsToFormValues } from "@/src/helpers/indicateurs-environnementaux/indi-en-helpers";
import Button from "@codegouvfr/react-dsfr/Button";
import Image from "next/image";
import { clsx } from "clsx";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { Separator } from "@/src/components/common/separator";
import { upsertDiagnosticSimulationAction } from "@/src/actions/diagnostic-simulation/upsert-diagnostic-simulation-action";
import { notifications } from "@/src/components/common/notifications";
import { upsert } from "@/src/helpers/listUtils";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/src/helpers/matomo/track-matomo";
import { DIAGNOSTIC_COMPUTE_RESULT } from "@/src/helpers/matomo/matomo-tags";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import { useUnsavedChanges } from "@/src/hooks/use-unsaved-changes";
import { DiagnosticSimulationDto, ProjetWithRelationsDto } from "@/src/types/dto";
import { ProjetIndiEnSimuation } from "@/src/lib/prisma/prismaCustomTypes";

export default function IndicateursEnvironnementauxForm({ projet }: { projet: ProjetWithRelationsDto }) {
  const currentDiagnosticSimulation = projet.diagnosticSimulations[0];
  const updateProjetInStore = useProjetsStore((state) => state.addOrUpdateProjet);
  const router = useRouter();
  const initialValues = useMemo(
    () => ({
      questions: mapAllIndiEnQuestionsToFormValues(currentDiagnosticSimulation?.initialValues as ProjetIndiEnSimuation),
    }),
    [currentDiagnosticSimulation?.initialValues],
  );
  const form = useForm<IndicateursEnvironnementauxFormData>({
    resolver: zodResolver(IndicateursEnvironnementauxFormSchema),
    defaultValues: initialValues,
    mode: "onBlur",
  });

  const { isDirty, isSubmitting } = form.formState;

  useUnsavedChanges(isDirty && !isSubmitting);

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [form, initialValues]);

  const updateStore = (diagnosticSimulation?: DiagnosticSimulationDto) => {
    if (diagnosticSimulation) {
      updateProjetInStore({
        ...projet,
        diagnosticSimulations: upsert(projet.diagnosticSimulations, diagnosticSimulation),
      });
    }
  };

  const onSubmitAndSeeResults = async (data: IndicateursEnvironnementauxFormData) => {
    trackEvent(DIAGNOSTIC_COMPUTE_RESULT);
    await onSubmit(data, true, () => {
      router.push(PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_INDICATEURS_RESULTATS(projet.id));
    });
  };

  const onSubmitAndQuit = async (data: IndicateursEnvironnementauxFormData) =>
    onSubmit(data, false, () => {
      notifications("success", "DIAGNOSTIC_SIMULATION_UPDATED");
      router.push(PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_CHOIX_PARCOURS(projet.id));
    });

  const onSubmit = async (data: IndicateursEnvironnementauxFormData, validated: boolean, onSuccess: () => void) => {
    const actionResult = await upsertDiagnosticSimulationAction(
      projet.id,
      data,
      validated,
      currentDiagnosticSimulation?.id,
    );
    if (actionResult.type !== "success") {
      form.reset(data);
      notifications(actionResult.type, actionResult.message);
    } else {
      updateStore(actionResult.diagnosticSimulation);
      onSuccess();
    }
  };
  const { fields } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const disabled = form.formState.isSubmitting;

  const getFieldIndexFromQuestionCode = useCallback(
    (questionCode: string) => {
      return fields.findIndex((field) => field.questionCode === questionCode);
    },
    [fields],
  );

  return (
    <form
      id={`indicateurs-env-form`}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <>
        <div className="sticky top-0 z-10 mb-12">
          <div className="flex h-20 w-full items-center justify-between bg-white">
            <LinkWithoutPrefetch
              className="fr-link fr-icon-arrow-left-line fr-link--icon-left"
              href={PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_INDICATEURS_PRESENTATION(projet.id)}
            >
              Retour
            </LinkWithoutPrefetch>
            <div className="flex flex-row gap-6">
              <Button
                className={`mr-4 rounded-3xl !shadow-none`}
                type="button"
                onClick={form.handleSubmit(onSubmitAndQuit)}
                iconId="fr-icon-save-3-line"
                iconPosition="left"
                disabled={disabled}
                priority="secondary"
              >
                {"Reprendre plus tard"}
              </Button>
              <Button
                className="mr-4 rounded-3xl"
                type="button"
                onClick={form.handleSubmit(onSubmitAndSeeResults)}
                disabled={disabled}
                iconId="fr-icon-arrow-right-line"
                iconPosition="right"
              >
                Voir mes résultats
              </Button>
            </div>
          </div>
          <Separator className="contrast-100" />
        </div>
        {ALL_INDIEN_QUESTIONS.map((questionGroup) => (
          <div className="mb-10" key={questionGroup.label}>
            <div className="mb-4 flex items-center">
              <Image src={questionGroup.image} alt={questionGroup.label} width={50} height={50} className="h-7" />
              <h2 className="mb-0 text-xl font-bold">{questionGroup.label}</h2>
            </div>
            {questionGroup.questions.map((question) => (
              <div
                key={question.code}
                onClick={() =>
                  form.setFocus(`questions.${+(getFieldIndexFromQuestionCode(question.code) ?? 0)}.quantite`)
                }
                className={clsx(
                  "mb-2 flex items-center justify-between rounded-2xl bg-dsfr-background-contrast-blue-france p-4",
                  "focus-within:!bg-dsfr-background-contrast-blue-france-active",
                  "hover:bg-dsfr-background-contrast-blue-france-hover",
                )}
              >
                <div className="flex items-center">
                  <Image src={question.image} alt="" width={50} height={50} className="mr-3 w-11 rounded-sm" />
                  <label
                    htmlFor={`input-form-field__questions.${+(
                      getFieldIndexFromQuestionCode(question.code) ?? 0
                    )}.quantite`}
                    className="font-bold"
                  >
                    {question.label}
                  </label>
                </div>
                <div className="flex items-center">
                  <InputFormField
                    type="number"
                    control={form.control}
                    path={`questions.${+(getFieldIndexFromQuestionCode(question.code) ?? 0)}.quantite`}
                    whiteBackground
                    className="!m-0 flex flex-col"
                    inputClassName="rounded-lg shadow-none w-20 !ml-auto"
                    unite={question.unite.label}
                    onFocus={(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                      event.target?.select()
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
        <div className="float-right">
          <div className="flex flex-row gap-6">
            <Button
              className={`mr-4 rounded-3xl !shadow-none`}
              type="button"
              onClick={form.handleSubmit(onSubmitAndQuit)}
              iconId="fr-icon-save-3-line"
              iconPosition="left"
              disabled={disabled}
              priority="secondary"
            >
              {"Reprendre plus tard"}
            </Button>
            <Button
              className="mr-4 rounded-3xl"
              type="button"
              onClick={form.handleSubmit(onSubmitAndSeeResults)}
              disabled={disabled}
              iconId="fr-icon-arrow-right-line"
              iconPosition="right"
            >
              Voir mes résultats
            </Button>
          </div>
        </div>
      </>
    </form>
  );
}
