import clsx from "clsx";
import Image from "next/image";
import {
  ECHELLE_THERMIQUE_DIAG_CONFORT_THERMIQUE,
  ECHELLE_THERMIQUE_DIAG_ICU,
  EchelleThermiqueDiagnostic,
} from "@/src/helpers/ficheDiagnostic/echelle-thermique-diagnostic";

const filters = [
  {
    picto: "/images/fiches-diagnostic/icu.svg",
    filter: ECHELLE_THERMIQUE_DIAG_ICU.code,
    label: "Mesure de l'ICU",
  },
  {
    picto: "/images/fiches-diagnostic/confort-thermique.svg",
    filter: ECHELLE_THERMIQUE_DIAG_CONFORT_THERMIQUE.code,
    label: "Évaluation du confort thermique",
  },
];

export const FicheDiagnosticEchelleThermiqueFilter = ({
  setter,
  selectedFilters,
}: {
  setter: (_filter: EchelleThermiqueDiagnostic["code"]) => void;
  selectedFilters: EchelleThermiqueDiagnostic["code"][];
}) => {
  return (
    <div>
      <div className="flex gap-6">
        {filters.map((f) => {
          const isSelected = selectedFilters.includes(f.filter);

          const isSelectedClass = {
            container: isSelected && " !border-pfmv-navy",
            image: !isSelected && "brightness-0",
            text: isSelected ? "text-pfmv-navy" : "text-black",
          };

          return (
            <div
              className={clsx(
                "relative overflow-hidden rounded-[10px]",
                " !border-[1px] border-white/0 shadow-pfmv-card-shadow",
                "hover:!border-pfmv-navy",
                isSelectedClass.container,
              )}
              key={f.filter}
            >
              <button
                onClick={() => setter(f.filter)}
                className={clsx("flex flex-col items-center justify-center gap-2 px-4 py-2", isSelectedClass.container)}
              >
                {isSelected && <i className="ri-close-line absolute right-2 top-0 text-pfmv-navy before:size-4"></i>}
                <div className="flex flex-wrap items-center gap-4">
                  <Image
                    src={f.picto}
                    alt={f.label}
                    width={80}
                    height={64}
                    className={clsx("mx-auto block", isSelectedClass.image, "h-16")}
                  />
                  <small className={clsx(" mx-auto text-sm", isSelectedClass.text)}>{f.label}</small>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
