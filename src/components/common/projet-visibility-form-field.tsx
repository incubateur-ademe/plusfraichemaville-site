import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { ProjetVisibility } from "./projet-visibility";

type ProjetVisibilityFormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  path: FieldPath<T>;
  disabled?: boolean;
};
export const ProjetVisibilityFormField = <T extends FieldValues>({
  control,
  path,
  disabled,
}: ProjetVisibilityFormFieldProps<T>) => {
  return (
    <Controller
      control={control}
      render={({ field }) => (
        <ProjetVisibility isPublic={field.value} onVisibilityChange={field.onChange} disabled={disabled} />
      )}
      name={path}
    />
  );
};
