import React, { useEffect, useState } from "react";
import { Control, FieldValues, Path, UseFormSetValue, useWatch } from "react-hook-form";
import Button from "@codegouvfr/react-dsfr/Button";
import CurrencyInputFormField from "@/src/components/common/currency-input-form-field";

type EditablePriceFieldProps<T extends FieldValues> = {
  control: Control<T>;
  setValue: UseFormSetValue<T>;
  name: Path<T>;
  calculatedValue: string;
  label: string;
  suffix?: string;
};

export default function EditablePriceField<T extends FieldValues>({
  control,
  setValue,
  name,
  calculatedValue,
  label,
  suffix,
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
        <div className="flex items-start gap-0">
          <CurrencyInputFormField
            type="number"
            control={control}
            path={name}
            whiteBackground
            className="mb-0"
            inputClassName="!w-32 py-1"
            suffix={suffix}
          />
          <Button
            iconId="fr-icon-close-line"
            onClick={handleClear}
            priority="tertiary no outline"
            title="Réinitialiser la valeur"
            className="!px-2 text-pfmv-climadiag-red"
            size="small"
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
            size="small"
          />
        </div>
      )}
    </div>
  );
}
