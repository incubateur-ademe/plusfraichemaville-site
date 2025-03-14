"use client";
import { useCallback, useEffect, useMemo } from "react";
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

export default function IndicateursEnvironnementauxForm() {
  const initialValues = useMemo(
    () => ({
      questions: mapAllIndiEnQuestionsToFormValues(),
    }),
    [],
  );
  const form = useForm<IndicateursEnvironnementauxFormData>({
    resolver: zodResolver(IndicateursEnvironnementauxFormSchema),
    defaultValues: initialValues,
    mode: "onBlur",
  });

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [form, initialValues]);

  const onSubmit = async (data: IndicateursEnvironnementauxFormData) => {
    console.log({ data });
  };
  const { fields } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const disabled = form.formState.isSubmitting;

  const getFieldIndexFromQuestionCode = useCallback(
    (questionCode: string) => {
      return fields.findIndex((field) => field.code === questionCode);
    },
    [fields],
  );

  return (
    <form id={`indicateurs-env-form`} onSubmit={form.handleSubmit((data) => onSubmit(data))}>
      <>
        <div className="mb-12">
          <Button className={`mr-4 rounded-3xl `} type="submit" disabled={disabled}>
            Valider
          </Button>
        </div>
        {ALL_INDIEN_QUESTIONS.map((questionGroup) => (
          <div className="mb-6" key={questionGroup.label}>
            <div className="mb-2 flex items-center">
              <Image src={questionGroup.image} alt={questionGroup.label} width={50} height={50} className="h-7" />
              <div className="mt-2 text-xl font-bold">{questionGroup.label}</div>
            </div>
            {questionGroup.questions.map((question) => (
              <div
                key={question.code}
                onClick={() =>
                  form.setFocus(`questions.${+(getFieldIndexFromQuestionCode(question.code) ?? 0)}.quantite`)
                }
                className={clsx(
                  "mb-2 flex items-center justify-between rounded-2xl bg-dsfr-background-contrast-blue-france p-4",
                  "focus-within:bg-dsfr-background-contrast-blue-france-hover",
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
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </>
    </form>
  );
}
