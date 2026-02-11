import React, { ReactNode } from "react";

import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import RedAsterisk from "@/src/components/common/RedAsterisk";
import clsx from "clsx";
import DatePicker from "react-datepicker";
import { fr } from "date-fns/locale/fr";
import { monthDateToString } from "@/src/helpers/dateUtils";

type MonthPickerFieldProps<T extends FieldValues> = {
  className?: string;
  inputClassName?: string;
  control: Control<T>;
  path: FieldPath<T>;
  disabled?: boolean;
  label?: ReactNode;
  hint?: string;
  valid?: string;
  info?: ReactNode | ((_?: string | null) => ReactNode);
  asterisk?: boolean;
};

const MonthFormField = <T extends FieldValues>({
  className,
  inputClassName,
  control,
  path,
  disabled,
  label,
  hint,
  valid,
  info,
  asterisk,
}: MonthPickerFieldProps<T>) => {
  const id = `input-form-field__${path}`;
  return (
    <Controller
      control={control}
      name={path}
      render={({ field: { onChange, onBlur, value }, fieldState: { invalid, isTouched, error } }) => {
        let ariaDescribedBy: string | undefined;
        if (error) {
          ariaDescribedBy = `${id}__error`;
        } else if (valid && isTouched && !invalid) {
          ariaDescribedBy = `${id}__valid`;
        }

        const picker = (
          <DatePicker
            aria-describedby={ariaDescribedBy}
            selected={value}
            className={clsx("fr-input", inputClassName)}
            popperPlacement={"bottom-start"}
            wrapperClassName="w-full"
            onChange={(t) => onChange(monthDateToString(t))}
            showMonthYearPicker
            locale={fr}
            dateFormat="MMMM yyyy"
            placeholderText="-------- ----"
            onBlur={onBlur}
            id={id}
            disabled={disabled}
          />
        );

        return (
          <div
            className={clsx(
              "fr-input-group",
              {
                "fr-input-group--error": error,
                "fr-input-group--disabled": disabled,
                "fr-input-group--valid": valid && isTouched && !invalid,
              },
              className,
            )}
          >
            {label && (
              <label className="fr-label fr-mb-1v" htmlFor={id}>
                {label} {asterisk && <RedAsterisk />}
                {hint && <span className="fr-hint-text">{hint}</span>}
              </label>
            )}
            {picker}

            {info && (
              <p id={`${id}__info`} className="fr-hint-text fr-mt-1v fr-mb-0">
                {typeof info === "function" ? info(value) : info}
              </p>
            )}
            {error && (
              <p id={`${id}__error`} className={clsx("fr-error-text", { "fr-mt-1v": !!info })}>
                {error.message}
              </p>
            )}
            {valid && isTouched && !invalid && (
              <p id={`${id}__valid`} className={clsx("fr-valid-text", { "fr-mt-1v": !!info })}>
                {valid}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};

export default MonthFormField;
