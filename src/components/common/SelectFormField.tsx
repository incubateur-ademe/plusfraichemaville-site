import clsx from "clsx";
import { ReactNode } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import RedAsterisk from "@/src/components/common/RedAsterisk";

export type SelectOption<T extends string = string> = {
  name: string;
  value: T;
  disabled?: boolean;
  hidden?: boolean;
};
export type SelectFormFieldProps<T extends FieldValues> = {
  className?: string;
  selectClassName?: string;
  label: ReactNode;
  path: FieldPath<T>;
  control: Control<T>;
  options: SelectOption[];
  disabled?: boolean;
  hint?: string;
  valid?: string;
  asterisk?: boolean;
  placeholder?: string;
};

const SelectFormField = <T extends FieldValues>({
  label,
  path,
  control,
  hint,
  options,
  disabled,
  valid,
  asterisk,
  className,
  placeholder,
  selectClassName,
}: SelectFormFieldProps<T>) => {
  const id = `select-form-field__${path}`;

  return (
    <Controller
      control={control}
      name={path}
      render={({ field: { onChange, onBlur, name, ref, value }, fieldState: { invalid, error, isDirty } }) => {
        let ariaDescribedBy: string | undefined;
        if (error) {
          ariaDescribedBy = `${id}__error`;
        } else if (valid && isDirty && !invalid) {
          ariaDescribedBy = `${id}__valid`;
        }

        return (
          <div
            className={clsx(
              "fr-select-group",
              {
                "fr-select-group--error": error,
                "fr-select-group--valid": valid && isDirty && !invalid,
                "fr-select-group--disabled": disabled,
              },
              className,
            )}
          >
            <label className="fr-label" htmlFor={id}>
              {label} {asterisk && <RedAsterisk />}
              {hint ? <span className="fr-hint-text">{hint}</span> : null}
            </label>
            <select
              className={clsx("fr-select", selectClassName, {
                "fr-select--error": error,
                "fr-select--valid": isDirty && !invalid,
              })}
              aria-describedby={ariaDescribedBy}
              id={id}
              disabled={disabled}
              name={name}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
              value={value || ""}
            >
              {placeholder && (
                <option value="" disabled hidden>
                  {placeholder}
                </option>
              )}
              {options.map((option) => (
                <option key={option.value} value={option.value} disabled={option.disabled} hidden={option.hidden}>
                  {option.name}
                </option>
              ))}
            </select>
            {error && (
              <p id={`${id}__error`} className="fr-error-text">
                {error.message}
              </p>
            )}
            {valid && isDirty && !invalid && (
              <p id={`${id}__valid`} className="fr-valid-text">
                {valid}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};

export default SelectFormField;
