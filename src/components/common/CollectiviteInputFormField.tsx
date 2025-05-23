"use client";
import { Fragment, ReactNode, useEffect, useState } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import RedAsterisk from "@/src/components/common/RedAsterisk";
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from "@headlessui/react";
import { fetchCollectiviteFromBanApi } from "@/src/lib/adresseApi/fetch";
import debounce from "lodash/debounce";
import { AddressCollectivite } from "@/src/lib/adresseApi/types";
import clsx from "clsx";
import { Spinner } from "@/src/components/common/spinner";

type CommonProps<T extends FieldValues> = {
  className?: string;
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
};

export type InputFormFieldProps<T extends FieldValues> = CommonProps<T>;

const CollectiviteInputFormField = <T extends FieldValues>({
  label,
  path,
  control,
  hint,
  disabled,
  className,
  valid,
  icon,
  info,
  asterisk,
  ...rest
}: InputFormFieldProps<T>) => {
  const id = `input-form-field__${path}`;

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchedAddresses, setFetchedAddresses] = useState<AddressCollectivite[]>([]);

  useEffect(() => {
    setLoading(true);
    fetchCollectiviteFromBanApi(query)
      .then((result) => {
        setFetchedAddresses(result);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query]);

  const throttledFetchCollectivite = debounce((keyword) => setQuery(keyword), 200);

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

        const input = (
          <Combobox
            defaultValue={value}
            value={value ?? null}
            onChange={onChange}
            disabled={disabled}
            as="div"
            className="relative mt-2"
          >
            <div className="flex items-center">
              <ComboboxInput
                aria-describedby={ariaDescribedBy}
                className=" fr-input w-full "
                displayValue={(address: AddressCollectivite) =>
                  address ? `${address?.nomCollectivite} - ${address?.codePostal}` : ""
                }
                onChange={(event) => throttledFetchCollectivite(event.target.value)}
                onBlur={onBlur}
                ref={ref}
                {...rest}
              />
              {loading && <Spinner />}
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <ComboboxOptions
                className="shadow-lg absolute z-30 mt-1 max-h-60 w-full list-none overflow-auto
                rounded-md bg-white p-0 text-base ring-1 ring-black/5"
              >
                {fetchedAddresses.length === 0 && query !== "" && !loading ? (
                  <div className="relative cursor-default select-none px-4 py-2">Aucun résultat.</div>
                ) : (
                  fetchedAddresses.map((address) => (
                    <ComboboxOption
                      key={address.banId}
                      className={({ focus }) =>
                        `relative cursor-default select-none py-2 pl-4 pr-4 ${
                          focus ? "bg-dsfr-background-alt-grey " : ""
                        }`
                      }
                      value={address}
                    >
                      {({ selected, focus }) => (
                        <>
                          <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                            {`${address.nomCollectivite} - ${address.codePostal}`}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                focus ? "bg-dsfr-background-alt-grey " : ""
                              }`}
                            />
                          ) : null}
                        </>
                      )}
                    </ComboboxOption>
                  ))
                )}
              </ComboboxOptions>
            </Transition>
          </Combobox>
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
            <label className="fr-label fr-mb-1v" htmlFor={id}>
              {label} {asterisk && <RedAsterisk />}
              {hint && <span className="fr-hint-text">{hint}</span>}
            </label>
            {icon ? <div className={`fr-input-wrap ${icon}`}>{input}</div> : input}
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

export default CollectiviteInputFormField;
