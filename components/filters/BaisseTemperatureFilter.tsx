"use client";
import { useMultipleValuesFilter } from "@/hooks/useMultipleValuesFilter";
import { ALL_BAISSES_TEMPERATURE_FICHE_SOLUTION } from "@/helpers/baisseTemperatureFicheSolution";

export default function BaisseTemperatureFilter({ className }: { className?: string }) {
  const FILTER_NAME = "baisseTemperatureFilter";

  const { changeFilter, isFilterCodeSelected } = useMultipleValuesFilter(FILTER_NAME);

  const linkStyle = (codeBaisseTemperature: string) => {
    const baseStyle = " fr-tag fr-text--xs whitespace-nowrap ";
    return isFilterCodeSelected(codeBaisseTemperature) ? "fr-tag--dismiss " + baseStyle : baseStyle;
  };

  return (
    <div>
      <div className="text-sm text-center md:text-left text-dsfr-text-mention-grey mb-3">Baisse de la température</div>
      <div className={`flex flex-row md:flex-col justify-center md:justify-start flex-wrap shrink gap-4 ${className}`}>
        {ALL_BAISSES_TEMPERATURE_FICHE_SOLUTION.map((baisseTemperature) => (
          <button
            key={baisseTemperature.code}
            onClick={() => changeFilter(baisseTemperature.code)}
            className={linkStyle(baisseTemperature.code)}
          >
            {baisseTemperature.label}
          </button>
        ))}
      </div>
    </div>
  );
}
