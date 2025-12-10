import React, { useEffect, useState } from "react";
import { Control, useWatch, UseFormSetValue, FieldValues, Path } from "react-hook-form";
import InputFormField from "@/src/components/common/InputFormField";
import Button from "@codegouvfr/react-dsfr/Button";

type EditablePriceFieldProps<T extends FieldValues> = {
  control: Control<T>;
  setValue: UseFormSetValue<T>;
  name: Path<T>;
  calculatedValue: string;
  label: string;
};

export default function EditablePriceField<T extends FieldValues>({
  control,
  setValue,
  name,
  calculatedValue,
  label,
}: EditablePriceFieldProps<T>) {
  const overrideValue = useWatch({ control, name });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (overrideValue !== undefined && overrideValue !== null) {
      setIsEditing(true);
    }
  }, [overrideValue]);

  const handleClear = () => {
    setValue(name, undefined as any);
    setIsEditing(false);
  };

  return (
    <div>
      <div>{label}</div>
      {isEditing ? (
        <div className="flex items-start gap-2">
          <InputFormField
            type="number"
            control={control}
            path={name}
            whiteBackground
            className="mb-0"
            inputClassName="!w-32"
          />
          <Button
            iconId="fr-icon-close-line"
            onClick={handleClear}
            priority="tertiary no outline"
            title="Réinitialiser la valeur"
            className="!px-2"
          />
        </div>
      ) : (
        <div className="mb-2 flex items-center gap-2">
          <div className="font-bold">{calculatedValue}</div>
          <Button
            iconId="fr-icon-edit-line"
            onClick={() => setIsEditing(true)}
            priority="tertiary no outline"
            title="Modifier la valeur"
            className="!px-2"
          />
        </div>
      )}
    </div>
  );
}
