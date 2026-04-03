"use client";

import { useState } from "react";
import Stepper from "@codegouvfr/react-dsfr/Stepper";
import Button from "@codegouvfr/react-dsfr/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { ProjetInfoFormData, ProjetInfoFormSchema } from "@/src/forms/projet/ProjetInfoFormSchema";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { upsertProjetAction } from "@/src/actions/projets/upsert-projet-action";
import { updateFichesProjetAction } from "@/src/actions/projets/update-fiches-projet-action";
import { TypeFiche, TypeUpdate } from "@/src/helpers/common";
import { notifications } from "@/src/components/common/notifications";

import InputFormField from "@/src/components/common/InputFormField";
import SelectFormField from "@/src/components/common/SelectFormField";
import AddressInputFormField from "@/src/components/common/address-input-form-field";
import CommuneInputFormField from "@/src/components/common/CommuneInputFormField";
import { ProjetVisibilityFormField } from "@/src/components/common/projet-visibility-form-field";
import { typeEspaceOptions } from "@/src/helpers/type-espace-filter";
import { niveauxMaturiteProjetOptions } from "@/src/helpers/maturite-projet";
import MandatoryFieldsMention from "@/src/components/common/mandatory-fields-mention";

const steps = [
  {
    title: "Votre type d’espace à rafraîchir",
    nextTitle: "Commune de votre projet",
  },
  {
    title: "Commune de votre projet",
    nextTitle: "Nom et niveau d’avancement de votre projet",
  },
  {
    title: "Nom et niveau d’avancement de votre projet",
    nextTitle: "Visibilité de votre projet",
  },
  {
    title: "Visibilité de votre projet",
    nextTitle: "Fin",
  },
];

export function CreateProjetStepper() {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const action = searchParams.get("action");
  const actionParam = searchParams.get("actionParam");
  const callbackUrl = searchParams.get("callbackUrl");

  const addOrUpdateProjet = useProjetsStore(useShallow((state) => state.addOrUpdateProjet));

  const form = useForm<ProjetInfoFormData>({
    resolver: zodResolver(ProjetInfoFormSchema),
    defaultValues: {
      isPublic: true,
      nom: "",
      typeEspace: "",
      niveauMaturite: "",
    },
    mode: "onTouched",
  });

  const { isSubmitting } = form.formState;

  const handleNextStep = async () => {
    let fieldsToValidate: (keyof ProjetInfoFormData)[] = [];
    switch (currentStep) {
      case 1:
        fieldsToValidate = ["typeEspace"];
        break;
      case 2:
        fieldsToValidate = ["collectivite"];
        break;
      case 3:
        fieldsToValidate = ["nom", "niveauMaturite"];
        break;
      default:
        break;
    }

    const isValidStep = await form.trigger(fieldsToValidate);
    if (isValidStep) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      router.back();
    }
  };

  const onSubmit: SubmitHandler<ProjetInfoFormData> = async (data) => {
    const result = await upsertProjetAction({ ...data });
    notifications(result.type, result.message);

    if (result.type === "success") {
      form.reset(data);

      if (result.updatedProjet) {
        let finalProjet = result.updatedProjet;

        if (action === "addFicheSolution" && actionParam) {
          const update = await updateFichesProjetAction({
            projetId: finalProjet.id,
            ficheId: +actionParam,
            typeFiche: TypeFiche.solution,
            typeUpdate: TypeUpdate.add,
          });
          if (update.type === "success" && update.projet) {
            finalProjet = update.projet;
          }
        }

        addOrUpdateProjet(finalProjet);

        if (callbackUrl) {
          router.push(`/espace-projet/${finalProjet.id}${callbackUrl}`);
        } else {
          router.push(PFMV_ROUTES.TABLEAU_DE_BORD(finalProjet.id));
        }
      } else {
        router.push(PFMV_ROUTES.ESPACE_PROJET);
      }
    }
  };

  const currentStepData = steps[currentStep - 1];

  return (
    <div className="w-full">
      <Stepper
        currentStep={currentStep}
        stepCount={steps.length}
        title={currentStepData.title}
        nextTitle={currentStepData.nextTitle}
        className="mb-8"
      />

      <form id="projet-creation-form" onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        {currentStep === 1 && (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <p className="mb-8">
                Créez votre simulation de projet pour trouver les solutions de
                rafraîchissement urbain les plus adaptées à votre espace grâce à
                Plus Fraîche Ma Ville.
                <br />
                Ou rejoignez un projet déjà existant.
              </p>
              <SelectFormField
                control={form.control}
                path="typeEspace"
                label="Quel espace souhaitez-vous rafraîchir ?"
                asterisk={true}
                options={typeEspaceOptions}
                placeholder="Sélectionnez un type d'espace"
                disabled={isSubmitting}
              />
            </div>
            <div className="flex-1 hidden md:flex items-center justify-center bg-gray-50 border border-gray-200 rounded min-h-[200px]">
              {/* Image Placeholder */}
              <span className="text-gray-400 text-sm">Image d'illustration</span>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <p className="mb-8">
                Découvrez les aides financières et en ingénierie mobilisables pour
                votre projet de rafraîchissement et contactez les collectivités de
                votre région pour échanger.
              </p>
              <CommuneInputFormField
                control={form.control}
                path="collectivite"
                label="Dans quelle commune votre projet se situe-t-il ?"
                asterisk={true}
                disabled={isSubmitting}
                className="mb-6"
              />
              <AddressInputFormField
                control={form.control}
                path="adresse"
                label="Quelle est l'adresse exacte du lieu ? (Optionnelle)"
                disabled={isSubmitting}
              />
            </div>
            <div className="flex-1 hidden md:flex items-center justify-center bg-gray-50 border border-gray-200 rounded min-h-[200px]">
              {/* Image Placeholder */}
              <span className="text-gray-400 text-sm">Image d'illustration</span>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <p className="mb-4">
                Plus fraîche ma ville vous permet de travailler sur plusieurs projets
                de rafraîchissement différents. Choisissez un nom simple et évocateur
                pour identifier votre projet.
              </p>
              <p className="mb-8 text-sm italic text-gray-600">
                Exemple : Végétalisation de la cour d'école Marie Curie.
              </p>

              <InputFormField
                control={form.control}
                path="nom"
                label="Quel nom voulez-vous donner à votre projet ?"
                asterisk={true}
                disabled={isSubmitting}
                className="mb-6"
              />
              <SelectFormField
                control={form.control}
                path="niveauMaturite"
                label="Où en êtes-vous dans votre projet ?"
                asterisk={true}
                options={niveauxMaturiteProjetOptions}
                placeholder="Sélectionnez un niveau d'avancement"
                disabled={isSubmitting}
              />
            </div>
            <div className="flex-1 hidden md:flex items-center justify-center bg-gray-50 border border-gray-200 rounded min-h-[200px]">
              {/* Image Placeholder */}
              <span className="text-gray-400 text-sm">Image d'illustration</span>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <ProjetVisibilityFormField
              control={form.control}
              path="isPublic"
              disabled={isSubmitting}
            />
            <MandatoryFieldsMention />
          </div>
        )}

        <div className="flex justify-between items-center mt-12">
          {currentStep > 1 ? (
            <Button priority="secondary" type="button" onClick={handlePreviousStep} disabled={isSubmitting}>
              Précédent
            </Button>
          ) : (
            <div />
          )}
          
          {currentStep < steps.length ? (
            <Button type="button" onClick={handleNextStep}>
              Suivant
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              Créer et voir mon projet
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
