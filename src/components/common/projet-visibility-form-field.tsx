import { ProjetInfoFormData } from "@/src/forms/projet/ProjetInfoFormSchema";
import { Control, useController } from "react-hook-form";
import { ProjetVisibility } from "./projet-visibility";

type ProjetVisibilityFormFieldProps = {
  control: Control<ProjetInfoFormData>;
  disabled?: boolean;
};
export const ProjetVisibilityFormField = ({ control, disabled }: ProjetVisibilityFormFieldProps) => {
  const { field } = useController({
    name: "isPublic",
    control,
  });

  return <ProjetVisibility isPublic={field.value} onVisibilityChange={field.onChange} disabled={disabled} />;
};
