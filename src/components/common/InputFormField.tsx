import type { ChangeEventHandler, HTMLInputTypeAttribute, HTMLProps, ReactNode } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import RedAsterisk from "@/src/components/common/RedAsterisk";
import clsx from "clsx";

type CommonProps<T extends FieldValues> = {
  className?: string;
  inputClassName?: string;
  unite?: string;
  control: Control<T>;
  path: FieldPath<T>;
  disabled?: boolean;
  label?: ReactNode;
  hint?: string;
  placeholder?: string;
  valid?: string;
  icon?: string;
  info?: ReactNode | ((_?: string | null) => ReactNode);
  asterisk?: boolean;
  whiteBackground?: boolean;
};

type InputProps = {
  type?: Exclude<HTMLInputTypeAttribute, "checkbox" | "textarea">;
  min?: number | string;
  max?: number | string;
  step?: number | string;
};

type TextareaProps = {
  type: "textarea";
} & Omit<HTMLProps<HTMLTextAreaElement>, "onChange" | "onBlur" | "value" | "ref" | "id" | "aria-describedby">;

export type InputFormFieldProps<T extends FieldValues> = CommonProps<T> & (InputProps | TextareaProps);

const InputFormField = <T extends FieldValues>({
  label,
  path,
  control,
  placeholder,
  type = "text",
  hint,
  disabled,
  className,
  inputClassName,
  unite,
  valid,
  icon,
  info,
  asterisk,
  whiteBackground = false,
  ...rest
}: InputFormFieldProps<T>) => {
  const id = `input-form-field__${path}`;

  return (
    <Controller
      control={control}
      name={path}
      render={({ field: { onChange, onBlur, value, ref }, fieldState: { invalid, isTouched, error } }) => {
        let ariaDescribedBy: string | undefined;
        if (error) {
          ariaDescribedBy = `${id}__error`;
        } else if (valid && isTouched && !invalid) {
          ariaDescribedBy = `${id}__valid`;
        }

        const inputOnChange: ChangeEventHandler<HTMLInputElement> =
          type === "number"
            ? (event) => {
                const eventValue = event.target?.value;
                if (!eventValue) {
                  onChange(null);
                  return;
                }
                onChange(Number.parseFloat(eventValue));
              }
            : onChange;

        const input =
          type === "textarea" ? (
            <textarea
              className={clsx("fr-input", { "!bg-white": whiteBackground })}
              aria-describedby={ariaDescribedBy}
              disabled={disabled}
              id={id}
              placeholder={placeholder}
              onBlur={onBlur}
              onChange={onChange}
              value={value ?? ""}
              ref={ref}
              {...rest}
            />
          ) : (
            <input
              className={clsx("fr-input", { "!bg-white": whiteBackground }, inputClassName)}
              aria-describedby={ariaDescribedBy}
              disabled={disabled}
              type={type}
              id={id}
              placeholder={placeholder}
              onBlur={onBlur}
              onChange={inputOnChange}
              value={value ?? ""}
              ref={ref}
              min={rest.min}
              max={rest.max}
              step={rest.step}
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
            {label && (<label className="fr-label fr-mb-1v" htmlFor={id}>
              {label} {asterisk && <RedAsterisk />}
              {hint && <span className="fr-hint-text">{hint}</span>}
            </label>)}

            <div className="flex items-center">
            {icon ? <div className={`fr-input-wrap ${icon}`}>{input}</div> : input}
              <div className="ml-2">{unite}</div>
            </div>
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

export default InputFormField;
