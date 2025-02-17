import { StrapiFicheDiagnosticEchelleSpatiale } from "@/src/lib/strapi/types/strapi-custom-types";
import clsx from "clsx";
import Image from "next/image";

export type FicheDiagnosticTypeFilters = StrapiFicheDiagnosticEchelleSpatiale;

const filters = {
  spatiale: [
    {
      picto: "/images/fiches-diagnostic/icu.svg",
      filter: StrapiFicheDiagnosticEchelleSpatiale.Quartier,
      label: "ICU - grand quartier",
    },
    {
      picto: "/images/fiches-diagnostic/icu.svg",
      filter: StrapiFicheDiagnosticEchelleSpatiale.EspacePublic,
      label: "Espace public",
    },
  ],
} as const;

export const FicheDiagnosticChoixFilterByType = ({
  filterType,
  label,
  setter,
  selectedFilters,
}: {
  filterType: keyof typeof filters;
  label: string;
  setter: (_filter: FicheDiagnosticTypeFilters) => void;
  selectedFilters: FicheDiagnosticTypeFilters[];
}) => {
  const currentFilters = filters[filterType];
  return (
    <div>
      <i className="mb-2 block text-dsfr-background-flat-grey">{label}</i>
      <div className="flex gap-2">
        {currentFilters.map((f) => {
          const isSelected = selectedFilters.includes(f.filter);
          return (
            <div
              className={clsx(
                "relative overflow-hidden rounded-[10px] !border-[1px] !border-pfmv-navy",
                "size-32",
                !isSelected && "opacity-50",
              )}
              key={f.filter}
            >
              <button
                onClick={() => setter(f.filter)}
                className={clsx("flex size-32 flex-col items-center justify-center gap-2")}
              >
                {isSelected && <i className="ri-close-line absolute right-2 top-0 text-pfmv-navy before:size-4"></i>}
                <Image src={f.picto} alt={f.label} width={32} height={32} className="mx-auto block w-20" />
                <small className="text-sm text-pfmv-navy">{f.label}</small>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
