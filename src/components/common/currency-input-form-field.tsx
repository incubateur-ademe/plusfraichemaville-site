import { Controller, FieldValues } from "react-hook-form";
import RedAsterisk from "@/src/components/common/RedAsterisk";
import clsx from "clsx";
import { NumericFormat } from "react-number-format";
import { InputFormFieldProps } from "@/src/components/common/InputFormField";

const CurrencyInputFormField = <T extends FieldValues>({
  label,
  path,
  control,
  placeholder,
  hint,
  disabled,
  className,
  inputClassName,
  valid,
  info,
  asterisk,
  whiteBackground = false,
  onFocus = (_: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {},
}: InputFormFieldProps<T>) => {
  const id = `input-form-field__${path}`;

  return (
    <Controller
      control={control}
      name={path}
      render={({ field: { onBlur, value, onChange, ref }, fieldState: { invalid, isTouched, error } }) => {
        let ariaDescribedBy: string | undefined;
        if (error) {
          ariaDescribedBy = `${id}__error`;
        } else if (valid && isTouched && !invalid) {
          ariaDescribedBy = `${id}__valid`;
        }

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
            <NumericFormat
              className={clsx("fr-input", { "!bg-white": whiteBackground }, inputClassName)}
              aria-describedby={ariaDescribedBy}
              required={asterisk}
              thousandSeparator=" "
              disabled={disabled}
              id={id}
              placeholder={placeholder}
              onBlur={onBlur}
              value={value ?? ""}
              getInputRef={ref}
              onFocus={onFocus}
              suffix=" €"
              onValueChange={(values) => {
                const { value } = values;
                onChange(+value);
              }}
              allowNegative={false}
            />
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

export default CurrencyInputFormField;
